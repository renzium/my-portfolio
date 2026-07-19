import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add visible class to section so CSS child selectors fire
          section.classList.add("hero-visible");
        } else {
          // Only reverse if scrolling back up past it (section is below viewport)
          if (entry.boundingClientRect.top > 0) {
            section.classList.remove("hero-visible");
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Grid texture */}
      <div className="hero-grid pointer-events-none absolute inset-0" />

      {/* Emerald glow orb */}
      <div
        className="pointer-events-none absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl"
        style={{ background: "var(--emerald-glow)" }}
      />

      <div className="mx-auto max-w-6xl px-6 w-full relative z-10">

        {/* Status badge */}
        <div className="hero-item delay-0 mb-12 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 backdrop-blur-sm">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--emerald)" }}
          />
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Available for new roles & contracts
          </span>
        </div>

        {/* Name */}
        <div className="hero-item delay-1 mb-4 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Lawrence Ughonu
        </div>

        {/* Headline words */}
        {["Software", "Development", "Engineer."].map((word, i) => (
          <div
            key={word}
            className={`hero-item delay-${i + 2} block text-6xl font-medium tracking-tight leading-none md:text-8xl text-foreground`}
          >
            {word}
          </div>
        ))}

        {/* Sub text */}
        <p className="hero-item delay-5 mt-6 max-w-md text-base text-muted-foreground leading-relaxed">
          Building distributed systems, fintech infrastructure, and AI-powered platforms
          across Lagos and globally. 6+ years shipping production-grade software.
        </p>

        {/* CTAs */}
        <div className="hero-item delay-6 mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/works"
            className="group inline-flex items-center gap-2 rounded-xl border border-foreground bg-foreground px-5 py-3 text-xs font-medium text-background hover:bg-transparent hover:text-foreground transition-all duration-300"
          >
            View my work
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/cvs/amazon-sde-canada-new"
            className="group inline-flex items-center gap-2 rounded-xl border border-border/60 px-5 py-3 text-xs font-medium text-foreground hover:border-[--emerald] hover:text-[--emerald] transition-all duration-300"
          >
            Download Resume
            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Meta row */}
        <div className="hero-item delay-7 mt-14 flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <span>Lagos, Nigeria</span>
          <span className="h-px w-8 bg-border" />
          <span>renzium.com</span>
          <span className="h-px w-8 bg-border" />
          <span>Open to remote</span>
        </div>
      </div>
    </section>
  );
}