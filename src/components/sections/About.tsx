import { siteConfig } from "@/config/site";
import { Emphasis } from "@/components/ui/Emphasis";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about, role, location } = siteConfig;

  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <Reveal className="mb-8 flex items-center gap-3">
            <span className="eyebrow text-ember">SC.01</span>
            <span className="h-px w-10 bg-line" />
            <span className="eyebrow">About</span>
          </Reveal>
          <Reveal as="blockquote" delay={80} className="font-display text-[clamp(2.2rem,5vw,4.25rem)] leading-[1.02] tracking-tight text-balance">
            <Emphasis text={about.statement} />
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pt-16">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal as="p" key={i} delay={120 + i * 80} className="mb-5 text-base leading-relaxed text-bone/75 sm:text-lg">
              {paragraph}
            </Reveal>
          ))}

          <Reveal delay={300} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
            {about.highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-ink-2 p-4 text-sm sm:p-5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember" />
                {item}
              </div>
            ))}
          </Reveal>

          <Reveal delay={380} className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <p className="eyebrow">
              Role <span className="ml-2 text-bone">{role}</span>
            </p>
            <p className="eyebrow">
              Base <span className="ml-2 text-bone">{location}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
