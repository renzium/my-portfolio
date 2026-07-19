import { useRef, useState, useCallback } from "react";
import { useIntersectionAnimation, useStickyScrollStrip } from "./usePinnedSection";

const stack = [
  "TypeScript", "React", "Next.js", "C++", "Python", "Node.js",
  "PostgreSQL", "Tailwind CSS", "Distributed Systems", "Git", "Firebase", "Systems Architecture"
];

const stats = [
  { k: "5+ Yrs", v: "Professional Engineering" },
  { k: "Global", v: "Scale Architecture" },
  { k: "Hardware", v: "IoT Integration" },
  { k: "∞", v: "Refactoring & Iterations" },
];

export default function TechStack() {
  const [progress, setProgress] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);

  const onProgress = useCallback((p) => {
    setProgress(p);
  }, []);

  // Sticky scroll strip — drives skill strip horizontally via scrollY
  const { wrapperRef, stripRef } = useStickyScrollStrip({
    onProgress,
    scrollRange: 800,
  });

  // Header and stats animate in via IntersectionObserver (not scroll-driven)
  const onEnter = useCallback(() => setHeaderVisible(true), []);
  const onLeave = useCallback((entry) => {
    if (entry.boundingClientRect.top > 0) setHeaderVisible(false);
  }, []);
  const sectionRef = useIntersectionAnimation({ onEnter, onLeave, threshold: 0.1 });

  const isRevealed = progress >= 0.95;

  return (
    /*
      WRAPPER gets position:sticky + a tall height so the page
      scrolls through it while the inner section stays pinned.
      No position:fixed ever used — zero jumping.
    */
    <div
      ref={wrapperRef}
      style={{ height: "200vh" }} /* tall enough for scroll range */
      className="relative border-t border-border/60"
    >
      <div
        ref={sectionRef}
        id="stack"
        className="sticky top-0 min-h-screen flex flex-col justify-center overflow-hidden bg-background"
      >
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[--emerald]/5 via-transparent to-[--secondary]/5" />

        {/* Header — animates in automatically on entry */}
        <div
          className="mx-auto max-w-6xl px-6 relative z-10 w-full transition-all duration-700"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <div className="mb-16 max-w-2xl">
            <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              03 — Toolkit
            </div>
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl text-foreground">
              The stack behind the craft.
            </h2>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              Scroll to reveal the full toolkit — high-level full-stack tools and lower-level
              systems engineering environments.
            </p>
          </div>
        </div>

        {/* Horizontal skill strip — ONLY this part is scroll-driven */}
        <div className="relative overflow-hidden border-y border-border/60 py-8 bg-card/20 backdrop-blur-sm">
          {/* Progress bar */}
          <div
            className="absolute bottom-0 left-0 h-[2px] bg-[--emerald]"
            style={{ width: `${progress * 100}%`, transition: "none" }}
          />

          <div
            ref={stripRef}
            className="flex w-max gap-16 whitespace-nowrap will-change-transform"
            style={{ transform: "translateX(0px)" }}
          >
            {stack.map((s, i) => (
              <span
                key={i}
                className="flex items-center gap-6 text-2xl font-medium tracking-tight text-muted-foreground select-none px-4"
              >
                {s}
                <span className="h-1.5 w-1.5 rounded-full bg-[--emerald] flex-shrink-0" />
              </span>
            ))}
          </div>
        </div>

        {/* Stats — fade in once strip is fully revealed */}
        <div
          className="mx-auto mt-16 grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 md:grid-cols-4 relative z-10 w-full px-6 transition-all duration-700"
          style={{
            opacity: isRevealed ? 1 : 0,
            transform: isRevealed ? "translateY(0)" : "translateY(24px)",
            pointerEvents: isRevealed ? "auto" : "none",
          }}
        >
          {stats.map((s, idx) => (
            <div
              key={s.v}
              className="bg-background p-8"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">{s.k}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-relaxed">{s.v}</div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-500"
          style={{ opacity: progress < 0.05 ? 1 : 0 }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to explore</span>
          <div className="h-6 w-px bg-gradient-to-b from-[--emerald] to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
}