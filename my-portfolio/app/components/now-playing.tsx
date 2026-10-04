"use client";

import { useEffect, useState } from "react";

/**
 * A floating readout of what's playing on Spotify.
 *
 * Renders nothing at all when nothing is playing or the API is unreachable, so
 * it can only ever add to the page, never break it. Hidden below the sm
 * breakpoint only: on a phone a fixed overlay competes with content for a screen
 * that has no room to spare, but anything laptop-sized can show it.
 */

type NowPlaying = {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  url?: string;
};

const POLL_MS = 30_000;

/** The badge's geometry, defined once. Collapsed it is a 44px circle; the
 *  expanded card grows from it rather than replacing it. */
const BADGE =
  "fixed bottom-6 left-6 z-50 hidden min-h-11 min-w-11 items-center justify-center " +
  "rounded-full border border-muted bg-panel px-3 shadow-lg sm:flex";

function Bars({ playing }: { playing: boolean }) {
  return (
    <span aria-hidden="true" className="flex shrink-0 items-end gap-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`w-1 rounded-full ${
            playing ? "animate-pulse bg-amber" : "bg-muted"
          }`}
          style={{
            height: `${[10, 16, 7][i]}px`,
            animationDelay: `${i * 180}ms`,
          }}
        />
      ))}
    </span>
  );
}

export default function NowPlaying() {
  const [track, setTrack] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const data: NowPlaying = await res.json();
        if (!cancelled) setTrack(data.title ? data : null);
      } catch {
        // Offline or blocked — leave the last state alone rather than flicker.
      }
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = null;
    };

    // Polling a hidden tab asks Spotify about a card nobody is looking at, so
    // it stops on blur and resumes — with an immediate fetch, since the track
    // has probably changed — when the page is looked at again.
    const start = () => {
      if (timer) return;
      load();
      timer = setInterval(load, POLL_MS);
    };

    const onVisibility = () =>
      document.visibilityState === "visible" ? start() : stop();

    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!track?.title) return null;

  return (
    <aside
      aria-label={
        track.isPlaying ? "Currently playing on Spotify" : "Last played on Spotify"
      }
      className={`group ${BADGE} gap-0 transition-[gap,padding,border-radius] duration-300 ease-out focus-within:gap-3 focus-within:rounded-lg focus-within:py-3 hover:gap-3 hover:rounded-lg hover:py-3`}
    >
      {/* Collapsed, this is ~52px wide and sits clear of the content column.
          The track details expand on hover or keyboard focus, so the card can
          never sit on top of the page's own text unasked. */}
      <Bars playing={track.isPlaying} />

      <span className="grid max-h-0 max-w-0 grid-cols-[auto] overflow-hidden opacity-0 transition-[max-width,max-height,opacity] duration-300 ease-out group-focus-within:max-h-24 group-focus-within:max-w-[17rem] group-focus-within:opacity-100 group-hover:max-h-24 group-hover:max-w-[17rem] group-hover:opacity-100">
        <span className="block whitespace-nowrap font-mono text-label uppercase text-muted">
          {track.isPlaying ? "Now playing" : "Last played"}
        </span>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block pr-1 text-body leading-tight text-ink transition-colors duration-180 hover:text-amber focus-ring"
        >
          {track.title}
        </a>
        <span className="block pr-1 font-mono text-label text-muted">
          {track.artist}
        </span>
      </span>

    </aside>
  );
}
