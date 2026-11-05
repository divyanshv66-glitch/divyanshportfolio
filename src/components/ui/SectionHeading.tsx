import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Emphasis } from "./Emphasis";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  scene: string;
  label: string;
  title: string;
  intro?: ReactNode;
  className?: string;
};

/** Slate-style section header: "SC.02 — Selected Work" followed by a display headline. */
export function SectionHeading({ scene, label, title, intro, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal className="mb-6 flex items-center gap-3">
        <span className="eyebrow text-ember">SC.{scene}</span>
        <span className="h-px w-10 bg-line" />
        <span className="eyebrow">{label}</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.98] tracking-tight text-balance">
        <Emphasis text={title} />
      </Reveal>
      {intro && (
        <Reveal as="p" delay={160} className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
          {intro}
        </Reveal>
      )}
    </div>
  );
}
