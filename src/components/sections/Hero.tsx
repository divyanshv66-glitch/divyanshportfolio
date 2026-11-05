import { siteConfig } from "@/config/site";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Emphasis } from "@/components/ui/Emphasis";
import { HeroVideo } from "./HeroVideo";
import { ShowreelButton } from "./ShowreelButton";

export function Hero() {
  const { hero, name, location } = siteConfig;

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <HeroVideo />
        {/* Grade the plate so type always reads: vignette + bottom fade */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,7,8,0.75)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/40" />
      </div>

      <div className="container-x pt-32 pb-24 sm:pb-28">
        <p className="eyebrow animate-fade-up text-bone/80">
          {name} <span className="mx-2 text-ember">●</span> {hero.eyebrow}
        </p>

        <h1 className="mt-6 max-w-[14ch] animate-fade-up font-display text-[clamp(3.2rem,10vw,9.5rem)] leading-[0.92] tracking-[-0.02em] text-balance [animation-delay:120ms]">
          <Emphasis text={hero.headline} />
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="animate-fade-up [animation-delay:240ms]">
            <p className="max-w-xl text-base leading-relaxed text-bone/75 sm:text-lg">{hero.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ShowreelButton />
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-bone/25 px-6 py-3.5 text-sm font-medium transition hover:border-bone hover:bg-bone/5"
              >
                Start a project
                <ArrowRightIcon className="transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <dl className="grid animate-fade-up grid-cols-3 gap-6 border-t border-line pt-6 [animation-delay:360ms] sm:gap-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse">
                <dt className="eyebrow mt-2 !tracking-[0.14em]">{stat.label}</dt>
                <dd className="font-display text-4xl sm:text-5xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="eyebrow mt-14 hidden sm:block">Based in {location}</p>
      </div>
    </section>
  );
}
