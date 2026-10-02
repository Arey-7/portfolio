"use client";

import { useEffect, useState } from "react";

/**
 * A floating readout of what's playing on Spotify.
 *
 * Renders nothing at all when nothing is playing or the API is unreachable, so
 * it can only ever add to the page, never break it. Hidden below the lg
 * breakpoint: on a phone a fixed overlay competes with the content for a screen
 * that hasn't got room to spare.
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

    const load = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const data: NowPlaying = await res.json();
        if (!cancelled) setTrack(data.isPlaying ? data : null);
      } catch {
        // Offline or blocked — leave the last state alone rather than flicker.
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!track?.isPlaying || dismissed) return null;

  return (
    <aside
      aria-label="Currently playing on Spotify"
      className="fixed bottom-6 left-6 z-50 hidden max-w-xs items-center gap-4 rounded-lg border border-muted bg-panel p-4 shadow-lg lg:flex"
    >
      {/* Three bars reading like a level meter — the instrument idea, applied
          to something that is genuinely changing. */}
      <span aria-hidden="true" className="flex items-end gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 animate-pulse rounded-full bg-amber"
            style={{
              height: `${[10, 16, 7][i]}px`,
              animationDelay: `${i * 180}ms`,
            }}
          />
        ))}
      </span>

      <span className="min-w-0">
        <span className="block font-mono text-label uppercase text-muted">
          Now playing
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
        aria-label="Hide now playing"
        className="ml-2 shrink-0 self-start font-mono text-label text-muted transition-colors duration-180 hover:text-amber focus-ring"
      >
        ×
      </button>
    </aside>
  );
}
