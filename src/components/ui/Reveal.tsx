"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Fades and lifts its children into view the first time they enter the viewport. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      // The huge top margin counts anything already scrolled past as "seen", so fast
      // scrolls or anchor jumps never leave content hidden above the viewport.
      { threshold: 0.12, rootMargin: "100000px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}>
      {children}
    </Tag>
  );
}
