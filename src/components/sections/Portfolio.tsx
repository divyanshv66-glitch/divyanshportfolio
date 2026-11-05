"use client";

import { useMemo, useState } from "react";
import { categories, siteConfig, type Category } from "@/config/site";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { VideoCard } from "@/components/portfolio/VideoCard";
import { useVideoModal } from "@/components/portfolio/VideoModal";

type Filter = "All" | Category;

export function Portfolio() {
  const { projects } = siteConfig;
  const { open } = useVideoModal();
  const [filter, setFilter] = useState<Filter>("All");

  const filters = useMemo(
    () =>
      (["All", ...categories] as Filter[])
        .map((name) => ({
          name,
          count: name === "All" ? projects.length : projects.filter((p) => p.category === name).length,
        }))
        .filter((f) => f.count > 0),
    [projects],
  );

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  // The lead project gets a 2×2 tile only when there are enough neighbours to fill the rows beside it.
  const leadIsLarge = visible.length >= 3;

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            scene="02"
            label="Selected work"
            title="Frames that *earn* their place."
            intro="Commercials, music videos, travel films and vertical content. Hover to preview, tap or click to watch."
          />

          <Reveal delay={200}>
            <div
              role="group"
              aria-label="Filter projects by category"
              className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end"
            >
              {filters.map(({ name, count }) => (
                <button
                  key={name}
                  aria-pressed={filter === name}
                  onClick={() => setFilter(name)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition duration-300",
                    filter === name
                      ? "border-bone bg-bone text-ink"
                      : "border-line text-mute hover:border-bone/40 hover:text-bone",
                  )}
                >
                  {name}
                  <span className={cn("font-mono text-[10px]", filter === name ? "text-ink/60" : "text-mute/70")}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <ul key={filter} className="mt-14 grid grid-flow-dense grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => {
            const large = leadIsLarge && i === 0;
            return (
              <li
                key={project.id}
                className={cn("animate-fade-up", large && "md:col-span-2 lg:row-span-2")}
                style={{ animationDelay: `${Math.min(i, 8) * 70}ms` }}
              >
                <VideoCard project={project} featured={large} priority={i < 2} onOpen={() => open(project, visible)} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
