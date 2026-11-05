import type { CSSProperties } from "react";
import { siteConfig } from "@/config/site";
import { timecode } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const clipColors = ["#e3a857", "#c9683a", "#9a8cff", "#5fd6b4", "#ede8e0"];

export function Process() {
  const { process } = siteConfig;

  return (
    <section id="process" className="relative border-t border-line bg-ink-2 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          scene="05"
          label="Process"
          title="From first call to *final* export."
          intro="A clear, collaborative workflow, so you always know where your project is and what happens next."
        />

        {/* Desktop: an edit timeline with a playhead sweeping across the steps */}
        <Reveal className="relative mt-20 hidden lg:block">
          <div className="flex justify-between border-b border-line pb-2 font-mono text-[10px] text-mute">
            {Array.from({ length: process.length + 1 }, (_, i) => (
              <span key={i}>{timecode(i * 12)}</span>
            ))}
          </div>
          <div className="relative grid grid-cols-5 gap-1.5 py-4">
            {process.map((step, i) => (
              <span
                key={step.title}
                className="clip-block h-10 origin-left rounded-[3px]"
                style={{ "--i": i, background: `${clipColors[i % clipColors.length]}cc` } as CSSProperties}
              />
            ))}
            <span className="playhead pointer-events-none absolute -top-3 bottom-0 w-px bg-red-500">
              <span className="absolute -top-1 -left-[5px] size-[11px] rotate-45 rounded-[2px] bg-red-500" />
            </span>
          </div>
          <ol className="grid grid-cols-5 gap-6 pt-6">
            {process.map((step, i) => (
              <li key={step.title}>
                <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-3xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{step.description}</p>
                <p className="eyebrow mt-5 !tracking-[0.14em] text-bone/80">→ {step.output}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Mobile & tablet: vertical track */}
        <ol className="relative mt-14 border-l border-line pl-8 lg:hidden">
          {process.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 60} className="relative pb-12 last:pb-0">
              <span
                className="absolute top-1 -left-[37px] size-[9px] rounded-full ring-4 ring-ink-2"
                style={{ background: clipColors[i % clipColors.length] }}
              />
              <span className="font-mono text-xs text-ember">
                {String(i + 1).padStart(2, "0")} · {timecode(i * 12)}
              </span>
              <h3 className="mt-2 font-display text-3xl">{step.title}</h3>
              <p className="mt-2 max-w-md text-mute">{step.description}</p>
              <p className="eyebrow mt-4 !tracking-[0.14em] text-bone/80">→ {step.output}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
