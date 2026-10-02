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

export default function NowPlaying() {
  const [track, setTrack] = useState<NowPlaying | null>(null);
  const [dismissed, setDismissed] = useState(false);

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

  if (!track?.title || dismissed) return null;

  return (
    <aside
      aria-label={
        track.isPlaying ? "Currently playing on Spotify" : "Last played on Spotify"
      }
      className="fixed bottom-6 left-6 z-50 hidden max-w-xs items-center gap-4 rounded-lg border border-muted bg-panel p-4 shadow-lg sm:flex"
    >
      {/* Three bars reading like a level meter — the instrument idea, applied
          to something that is genuinely changing. */}
      <span aria-hidden="true" className="flex items-end gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`w-1 rounded-full ${
              track.isPlaying ? "animate-pulse bg-amber" : "bg-muted"
            }`}
            style={{
              height: `${[10, 16, 7][i]}px`,
              animationDelay: `${i * 180}ms`,
            }}
          />
        ))}
      </span>

      <span className="min-w-0">
        <span className="block font-mono text-label uppercase text-muted">
          {track.isPlaying ? "Now playing" : "Last played"}
        </span>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate text-body text-ink transition-colors duration-180 hover:text-amber focus-ring"
        >
          {track.title}
        </a>
        <span className="block truncate font-mono text-label text-muted">
          {track.artist}
        </span>
      </span>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Hide Spotify readout"
        className="ml-2 shrink-0 self-start font-mono text-label text-muted transition-colors duration-180 hover:text-amber focus-ring"
      >
        ×
      </button>
    </aside>
  );
}
