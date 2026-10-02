/**
 * Spotify "now playing", read server-side.
 *
 * The client never sees Spotify credentials: the browser calls this route, the
 * route exchanges a long-lived refresh token for a short-lived access token and
 * asks Spotify what's playing. Putting the token in the page instead would hand
 * every visitor access to the account.
 *
 * Every failure path returns 200 with isPlaying:false. A personal flourish must
 * never make the site look broken — if Spotify is down, rate-limiting us, or the
 * credentials aren't set, the widget simply doesn't appear.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

type Payload = {
  /** True only while a track is actually playing. The widget labels itself
   *  "Now playing" or "Last played" from this — claiming something is playing
   *  when it stopped an hour ago would be a small lie the page tells. */
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
};

type SpotifyTrack = {
  name?: string;
  external_urls?: { spotify?: string };
  artists?: { name?: string }[];
};

function toPayload(track: SpotifyTrack, isPlaying: boolean): Payload {
  return {
    isPlaying,
    title: track.name,
    artist: (track.artists ?? []).map((a) => a.name).filter(Boolean).join(", "),
    url: track.external_urls?.spotify,
  };
}

const SILENT: Payload = { isPlaying: false };

async function accessToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string };
  return json.access_token ?? null;
}

export async function GET() {
  try {
    const token = await accessToken();
    if (!token) return Response.json(SILENT);

    const auth = { Authorization: `Bearer ${token}` };

    const res = await fetch(NOW_PLAYING_URL, { headers: auth, cache: "no-store" });

    let payload: Payload | null = null;

    // A 200 carries the track the player holds, playing or paused — a paused
    // track still answers "what were you last listening to" better than history
    // does, because the history endpoint only lists tracks that finished.
    // 204 means no active session; 429 means rate limited. Both fall through.
    if (res.status === 200) {
      const song = (await res.json()) as {
        is_playing?: boolean;
        item?: SpotifyTrack;
      };
      if (song.item) payload = toPayload(song.item, song.is_playing === true);
    }

    // No player session at all — fall back to whatever finished last.
    if (!payload) {
      const recent = await fetch(RECENTLY_PLAYED_URL, {
        headers: auth,
        cache: "no-store",
      });
      if (recent.status === 200) {
        const history = (await recent.json()) as {
          items?: { track?: SpotifyTrack }[];
        };
        const track = history.items?.[0]?.track;
        if (track) payload = toPayload(track, false);
      }
    }

    if (!payload) return Response.json(SILENT);

    return Response.json(
      payload,
      // Short cache: fresh enough to feel live, infrequent enough to stay well
      // inside Spotify's rate limit no matter how many people are reading.
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    );
  } catch {
    return Response.json(SILENT);
  }
}
