import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SkillGlyph } from "@/components/ui/Icons";

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-line bg-ink-2 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          scene="03"
          label="Craft"
          title="Every department of *post*, under one roof."
          intro="One editor from first assembly to final master means a consistent vision and fewer hand-offs."
        />

        <ul className="mt-16 border-t border-line">
          {siteConfig.skills.map((skill, i) => (
            <Reveal as="li" key={skill.title} delay={i * 60} className="border-b border-line">
              <div className="group relative grid gap-4 py-8 transition-colors duration-500 hover:bg-white/[0.02] sm:grid-cols-[4rem_1fr] sm:py-10 lg:grid-cols-[5rem_1.1fr_1.4fr_auto] lg:items-center lg:gap-10 lg:px-4">
                <span className="absolute top-0 left-0 h-px w-0 bg-ember transition-all duration-700 group-hover:w-full" />
                <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="flex items-center gap-4 font-display text-3xl transition duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl">
                  <SkillGlyph name={skill.icon} className="shrink-0 text-2xl text-ember" />
                  {skill.title}
                </h3>
                <p className="max-w-md text-mute sm:col-start-2 lg:col-start-auto">{skill.description}</p>
                <ul className="flex flex-wrap gap-2 sm:col-start-2 lg:col-start-auto lg:max-w-[16rem] lg:justify-end">
                  {skill.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-mute uppercase transition group-hover:border-bone/25 group-hover:text-bone"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
