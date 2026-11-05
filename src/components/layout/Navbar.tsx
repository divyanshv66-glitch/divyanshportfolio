"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";

export function Navbar() {
  const { nav, name } = siteConfig;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the section crossing the middle of the viewport.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled && !menuOpen ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between sm:h-[4.5rem]">
        <a href="#home" className="group flex items-baseline gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-2xl tracking-tight sm:text-[1.7rem]">{name}</span>
          <span className="size-1.5 rounded-full bg-ember transition group-hover:scale-150" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition",
                  active === item.href ? "text-bone" : "text-mute hover:text-bone",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-4 -bottom-0.5 h-px origin-left bg-ember transition-transform duration-500",
                    active === item.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-bone px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-ember sm:inline-flex"
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative z-10 grid size-11 place-items-center rounded-full border border-line text-xl lg:hidden"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 -z-10 flex flex-col bg-ink/98 px-4 pt-24 pb-10 backdrop-blur-xl sm:px-8 lg:hidden"
      >
        <ul className="flex flex-1 flex-col justify-center gap-1">
          {nav.map((item, i) => (
            <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-baseline gap-4 py-2 font-display text-5xl transition sm:text-6xl",
                  active === item.href ? "text-ember" : "hover:text-ember",
                )}
              >
                <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          onClick={() => setMenuOpen(false)}
          className="mt-8 inline-flex justify-center rounded-full bg-bone px-6 py-4 text-sm font-semibold text-ink"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
