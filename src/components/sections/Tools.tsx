import { siteConfig } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Tools() {
  const { tools } = siteConfig;

  return (
    <section id="tools" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      {/* Scrolling ticker of tool names */}
      <div aria-hidden className="mb-20 flex overflow-hidden border-y border-line py-5 select-none">
        <div className="flex shrink-0 animate-marquee items-center whitespace-nowrap">
          {[...tools, ...tools].map((tool, i) => (
            <span key={i} className="flex items-center font-display text-4xl text-bone/20 italic sm:text-6xl">
              <span className="px-8">{tool.name}</span>
              <span className="text-xl text-ember not-italic">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="container-x">
        <SectionHeading
          scene="04"
          label="Toolkit"
          title="Industry-standard *tools*, used daily."
          intro="Project files delivered in whichever application your team works in."
        />

        <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {tools.map((tool, i) => (
            <Reveal as="li" key={tool.name} delay={i * 50}>
              <div className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-xl border border-line bg-ink-2 p-5 transition duration-500 hover:-translate-y-1 hover:border-bone/20 sm:p-6">
                <span
                  aria-hidden
                  className="absolute -top-16 -right-16 size-40 rounded-full opacity-0 blur-3xl transition duration-700 group-hover:opacity-30"
                  style={{ background: tool.color }}
                />
                <span
                  className="relative grid size-12 place-items-center rounded-lg border font-mono text-sm font-semibold"
                  style={{ color: tool.color, borderColor: `${tool.color}55`, background: `${tool.color}12` }}
                >
                  {tool.short}
                </span>
                <div className="relative">
                  <h3 className="text-base font-semibold sm:text-lg">{tool.name}</h3>
                  <p className="eyebrow mt-1.5 !tracking-[0.12em]">{tool.use}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
