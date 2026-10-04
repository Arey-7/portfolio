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
  const [minimised, setMinimised] = useState(false);

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

  // Minimised: a small button that restores the card. Hiding it outright would
  // be a one-way door — nothing on the page could bring it back short of a
  // reload, which nobody would guess at.
  if (minimised) {
    return (
      <button
        type="button"
        onClick={() => setMinimised(false)}
        aria-label="Show what I'm listening to"
        title="Show what I'm listening to"
        className="fixed bottom-6 left-6 z-50 hidden size-11 items-center justify-center rounded-full border border-muted bg-panel shadow-lg transition-colors duration-180 hover:border-amber focus-ring sm:flex"
      >
        <span aria-hidden="true" className="flex shrink-0 items-end gap-1">
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
      </button>
    );
  }

  return (
    <aside
      aria-label={
        track.isPlaying ? "Currently playing on Spotify" : "Last played on Spotify"
      }
      className="group fixed bottom-6 left-6 z-50 hidden h-11 min-w-11 items-center justify-center gap-0 rounded-full border border-muted bg-panel px-3 shadow-lg transition-all duration-180 focus-within:gap-3 focus-within:rounded-lg hover:gap-3 hover:rounded-lg sm:flex"
    >
      {/* Collapsed, this is ~52px wide and sits clear of the content column.
          The track details expand on hover or keyboard focus, so the card can
          never sit on top of the page's own text unasked. */}
      <span aria-hidden="true" className="flex shrink-0 items-end gap-1">
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

      <span className="grid max-w-0 grid-cols-[auto] overflow-hidden opacity-0 transition-all duration-180 group-focus-within:max-w-[16rem] group-focus-within:opacity-100 group-hover:max-w-[16rem] group-hover:opacity-100">
        <span className="block whitespace-nowrap font-mono text-label uppercase text-muted">
          {track.isPlaying ? "Now playing" : "Last played"}
        </span>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate pr-2 text-body text-ink transition-colors duration-180 hover:text-amber focus-ring"
        >
          {track.title}
        </a>
        <span className="block truncate pr-2 font-mono text-label text-muted">
          {track.artist}
        </span>
      </span>

      <button
        type="button"
        onClick={() => setMinimised(true)}
        aria-label="Minimise Spotify readout"
        title="Minimise"
        className="max-w-0 overflow-hidden self-start font-mono text-label text-muted opacity-0 transition-all duration-180 hover:text-amber focus-ring group-focus-within:max-w-4 group-focus-within:opacity-100 group-hover:max-w-4 group-hover:opacity-100"
      >
        &minus;
      </button>
    </aside>
  );
}
