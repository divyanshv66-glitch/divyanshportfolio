"use client";

import { siteConfig } from "@/config/site";
import { PlayIcon } from "@/components/ui/Icons";
import { useVideoModal } from "@/components/portfolio/VideoModal";

export function ShowreelButton() {
  const { open } = useVideoModal();

  return (
    <button
      type="button"
      onClick={() => open(siteConfig.showreel)}
      className="group inline-flex items-center gap-3 rounded-full bg-bone py-2 pr-6 pl-2 text-sm font-semibold text-ink transition hover:bg-ember"
    >
      <span className="grid size-10 place-items-center rounded-full bg-ink pl-0.5 text-bone transition group-hover:scale-110">
        <PlayIcon />
      </span>
      Play showreel
    </button>
  );
}
