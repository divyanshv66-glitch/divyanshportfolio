"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Project, VideoSource } from "@/config/site";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "@/components/ui/Icons";

type PlayerState = { playlist: Project[]; index: number } | null;
type VideoModalContextValue = { open: (project: Project, playlist?: Project[]) => void };

const VideoModalContext = createContext<VideoModalContextValue | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx) throw new Error("useVideoModal must be used inside <VideoModalProvider>");
  return ctx;
}

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlayerState>(null);

  const open = useCallback((project: Project, playlist?: Project[]) => {
    const list = playlist?.length ? playlist : [project];
    setState({ playlist: list, index: Math.max(0, list.findIndex((p) => p.id === project.id)) });
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <VideoModalContext.Provider value={value}>
      {children}
      {state && <VideoModal state={state} onChange={setState} onClose={() => setState(null)} />}
    </VideoModalContext.Provider>
  );
}

function embedUrl(video: Exclude<VideoSource, { type: "file" }>) {
  return video.type === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`;
}

function VideoModal({
  state,
  onChange,
  onClose,
}: {
  state: NonNullable<PlayerState>;
  onChange: (s: PlayerState) => void;
  onClose: () => void;
}) {
  const { playlist, index } = state;
  const project = playlist[index];
  const hasNav = playlist.length > 1;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = useCallback(
    (dir: 1 | -1) => onChange({ playlist, index: (index + dir + playlist.length) % playlist.length }),
    [index, playlist, onChange],
  );

  // Lock page scroll, move focus into the dialog and restore it on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = overflow;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (hasNav && e.key === "ArrowRight") go(1);
      else if (hasNav && e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button, iframe, video, [href]");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, hasNav, onClose]);

  const portrait = project.orientation === "portrait";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} — ${project.client}`}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm animate-fade-up [animation-duration:0.35s]"
    >
      <div className="container-x flex items-center justify-between gap-4 py-4">
        <div className="min-w-0">
          <p className="eyebrow truncate">
            {project.category} · {project.year}
            {hasNav && (
              <span className="ml-3 text-ember">
                {String(index + 1).padStart(2, "0")} / {String(playlist.length).padStart(2, "0")}
              </span>
            )}
          </p>
          <h3 className="truncate font-display text-2xl sm:text-3xl">{project.title}</h3>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close video"
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-xl transition hover:border-bone hover:bg-bone hover:text-ink"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Click on the backdrop (outside the player) closes the modal. */}
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          className={cn(
            "relative overflow-hidden rounded-lg bg-ink-3 shadow-2xl shadow-black",
            portrait ? "aspect-[9/16] h-full max-h-[78svh]" : "aspect-video w-full max-w-6xl max-h-full",
          )}
        >
          {project.video.type === "file" ? (
            <video
              key={project.id}
              src={project.video.src}
              poster={project.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="size-full bg-black object-contain"
            />
          ) : (
            <iframe
              key={project.id}
              src={embedUrl(project.video)}
              title={project.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
              className="size-full"
            />
          )}
        </div>

        {hasNav && (
          <>
            <NavButton side="left" onClick={() => go(-1)} />
            <NavButton side="right" onClick={() => go(1)} />
          </>
        )}
      </div>

      <div className="container-x flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8">
        <p className="eyebrow shrink-0 text-bone">
          {project.client} — <span className="text-ember">{project.role}</span>
        </p>
        <p className="max-w-3xl text-sm leading-relaxed text-mute">{project.description}</p>
      </div>
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      onClick={onClick}
      aria-label={side === "left" ? "Previous project" : "Next project"}
      className={cn(
        "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-black/60 text-xl backdrop-blur transition hover:border-bone hover:bg-bone hover:text-ink",
        side === "left" ? "left-2 sm:left-4" : "right-2 sm:right-4",
      )}
    >
      <Icon />
    </button>
  );
}
