"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { timecode } from "@/lib/utils";

/**
 * Ambient background loop. Skips playback for reduced-motion / data-saver users,
 * pauses when scrolled off-screen, and drives the REC timecode readout.
 */
export function HeroVideo() {
  const { background } = siteConfig.hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const allowMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && !connection?.saveData;

    let frame = 0;
    const tick = () => {
      if (tcRef.current) tcRef.current.textContent = timecode(video.currentTime);
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && allowMotion) {
        video.play().catch(() => {});
        frame = requestAnimationFrame(tick);
      } else {
        video.pause();
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(video);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        poster={background.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 size-full scale-105 object-cover"
      >
        <source src={background.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={background.desktop} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute bottom-6 left-0 hidden w-full sm:block">
        <div className="container-x flex justify-end">
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-bone/70">
            <span className="flex items-center gap-2">
              <span className="size-2 animate-rec rounded-full bg-red-500" /> REC
            </span>
            <span ref={tcRef} className="tabular-nums">
              00:00:00:00
            </span>
            <span className="text-mute">24 FPS · 2.39:1</span>
          </p>
        </div>
      </div>
    </>
  );
}
