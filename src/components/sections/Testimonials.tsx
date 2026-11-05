"use client";

import { useCallback, useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";

const AUTOPLAY_MS = 7000;

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export function Testimonials() {
  const { testimonials } = siteConfig;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (dir: 1 | -1) => setActive((i) => (i + dir + testimonials.length) % testimonials.length),
    [testimonials.length],
  );

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, go]);

  const current = testimonials[active];

  return (
    <section id="testimonials" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading scene="06" label="Testimonials" title="Kind words from *collaborators*." />

        <Reveal
          delay={150}
          className="mt-16 grid gap-12 lg:grid-cols-12"
        >
          <div
            className="lg:col-span-8"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client testimonials"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span aria-hidden className="block font-display text-8xl leading-none text-ember">
              &ldquo;
            </span>
            <figure key={active} className="animate-fade-up" aria-live={paused ? "polite" : "off"}>
              <blockquote className="-mt-6 font-display text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.12] text-balance">
                {current.quote}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-ember to-ember-deep font-mono text-sm font-semibold text-ink">
                  {initials(current.name)}
                </span>
                <span>
                  <span className="block font-semibold">{current.name}</span>
                  <span className="text-sm text-mute">
                    {current.role}, {current.company}
                  </span>
                </span>
              </figcaption>
            </figure>

            <div className="mt-12 flex items-center gap-6">
              <div className="flex gap-2">
                {(["prev", "next"] as const).map((dir) => {
                  const Icon = dir === "prev" ? ChevronLeftIcon : ChevronRightIcon;
                  return (
                    <button
                      key={dir}
                      onClick={() => go(dir === "prev" ? -1 : 1)}
                      aria-label={dir === "prev" ? "Previous testimonial" : "Next testimonial"}
                      className="grid size-11 place-items-center rounded-full border border-line text-lg transition hover:border-bone hover:bg-bone hover:text-ink"
                    >
                      <Icon />
                    </button>
                  );
                })}
              </div>
              <p className="font-mono text-xs text-mute">
                <span className="text-bone">{String(active + 1).padStart(2, "0")}</span> /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* Index of all collaborators — doubles as tab navigation */}
          <ul className="flex flex-col border-t border-line lg:col-span-4">
            {testimonials.map((t, i) => (
              <li key={t.name} className="border-b border-line">
                <button
                  onClick={() => setActive(i)}
                  aria-current={i === active}
                  className={cn(
                    "relative flex w-full items-center justify-between gap-4 overflow-hidden py-5 text-left transition",
                    i === active ? "text-bone" : "text-mute hover:text-bone",
                  )}
                >
                  <span>
                    <span className="block font-medium">{t.name}</span>
                    <span className="text-xs text-mute">{t.company}</span>
                  </span>
                  <span className="font-mono text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                  {i === active && (
                    <span
                      key={`${active}-${paused}`}
                      className="absolute bottom-0 left-0 h-px w-full origin-left bg-ember"
                      style={{ animation: paused ? undefined : `progress ${AUTOPLAY_MS}ms linear both` }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
