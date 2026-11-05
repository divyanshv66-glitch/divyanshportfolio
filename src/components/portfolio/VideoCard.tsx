"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/config/site";
import { cn } from "@/lib/utils";
import { PlayIcon } from "@/components/ui/Icons";

type VideoCardProps = {
  project: Project;
  onOpen: () => void;
  featured?: boolean;
  priority?: boolean;
};

/**
 * Poster-first card. The lightweight preview clip is only requested on the
 * first hover/focus, so the grid costs nothing but optimised images on load.
 */
export function VideoCard({ project, onOpen, featured, priority }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hovering = useRef(false);
  const [armed, setArmed] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const preview = project.video.type === "file" ? project.video.preview : undefined;

  const start = () => {
    if (!preview || window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    hovering.current = true;
    setArmed(true);
    videoRef.current?.play().catch(() => {});
  };

  const stop = () => {
    hovering.current = false;
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setPreviewing(false);
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onPointerEnter={start}
      onPointerLeave={stop}
      onFocus={start}
      onBlur={stop}
      aria-label={`Play ${project.title} for ${project.client}`}
      className="group relative block size-full overflow-hidden rounded-xl bg-ink-3 text-left ring-1 ring-line transition duration-500 hover:ring-ember/50"
    >
      <div className={cn("relative aspect-video w-full", featured && "lg:aspect-auto lg:h-full")}>
        <Image
          src={project.poster}
          alt=""
          fill
          priority={priority}
          sizes={featured ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
          className="object-cover transition duration-[1.2s] ease-[var(--ease-cinema)] group-hover:scale-[1.04]"
        />

        {armed && preview && (
          <video
            ref={videoRef}
            src={preview}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onPlaying={(e) => (hovering.current ? setPreviewing(true) : e.currentTarget.pause())}
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700",
              previewing ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

        {/* Viewfinder corners */}
        <span aria-hidden className="pointer-events-none absolute inset-4 opacity-0 transition duration-500 group-hover:opacity-100">
          <span className="absolute top-0 left-0 size-4 border-t border-l border-bone/70" />
          <span className="absolute top-0 right-0 size-4 border-t border-r border-bone/70" />
          <span className="absolute bottom-0 left-0 size-4 border-b border-l border-bone/70" />
          <span className="absolute right-0 bottom-0 size-4 border-r border-b border-bone/70" />
        </span>

        <div className="absolute top-4 left-4 flex items-center gap-2 sm:top-5 sm:left-5">
          <span className="rounded-full bg-black/50 px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase backdrop-blur">
            {project.category}
          </span>
          {project.orientation === "portrait" && (
            <span className="rounded-full border border-bone/20 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-mute backdrop-blur">
              9:16
            </span>
          )}
        </div>

        {previewing && (
          <span className="absolute top-5 right-5 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-bone uppercase">
            <span className="size-1.5 animate-rec rounded-full bg-red-500" /> Preview
          </span>
        )}

        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 scale-75 place-items-center rounded-full bg-bone/95 pl-1 text-xl text-ink opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <PlayIcon />
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-6">
          <div className="min-w-0">
            <h3 className={cn("font-display leading-none", featured ? "text-3xl sm:text-5xl" : "text-2xl sm:text-3xl")}>
              {project.title}
            </h3>
            <p className="mt-2 truncate text-sm text-mute">
              {project.client} <span className="mx-1.5 text-line">/</span> {project.role}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-mute">{project.year}</span>
        </div>
      </div>
    </button>
  );
}
