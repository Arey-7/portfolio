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

type Payload = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
};

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

    const res = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    // 204 = nothing playing. 429 = rate limited. Both are silence, not errors.
    if (res.status !== 200) return Response.json(SILENT);

    const song = (await res.json()) as {
      is_playing?: boolean;
      item?: {
        name?: string;
        external_urls?: { spotify?: string };
        artists?: { name?: string }[];
      };
    };

    if (!song.is_playing || !song.item) return Response.json(SILENT);

    return Response.json(
      {
        isPlaying: true,
        title: song.item.name,
        artist: (song.item.artists ?? [])
          .map((a) => a.name)
          .filter(Boolean)
          .join(", "),
        url: song.item.external_urls?.spotify,
      } satisfies Payload,
      // Short cache: fresh enough to feel live, infrequent enough to stay well
      // inside Spotify's rate limit no matter how many people are reading.
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    );
  } catch {
    return Response.json(SILENT);
  }
}
