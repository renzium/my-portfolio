import { useRef, useEffect } from "react";
import photo from "../assets/images/me.jpg";

const techIcons = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#1a1a1a" },
  { name: "Node.js", color: "#339933" },
  { name: "Python", color: "#3776AB" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Firebase", color: "#F5820D" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" },
  { name: "Redis", color: "#DC382D" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Git", color: "#F05032" },
  { name: "NestJS", color: "#E0234E" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "React Native", color: "#61DAFB" },
  { name: "C++", color: "#6366F1" },
];

const highlights = [
  { k: "6+", v: "Years shipping production systems" },
  { k: "10K+", v: "Concurrent transactions scaled" },
  { k: "40%", v: "Avg. performance gains delivered" },
  { k: "99.5%", v: "Uptime across live platforms" },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("about-visible");
        } else {
          if (entry.boundingClientRect.top > 0) {
            section.classList.remove("about-visible");
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
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center border-t border-border/60 overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-[--primary]/4 via-transparent to-[--emerald]/4" />

      <div className="mx-auto max-w-6xl px-6 py-16 w-full relative z-10">

        {/* Label */}
        <div className="about-item delay-0 mb-12 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          02 — About
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">

          {/* LEFT */}
          <div className="flex flex-col justify-center space-y-8">
            <h2 className="about-item delay-1 text-4xl font-medium tracking-tight md:text-5xl text-foreground leading-tight">
              Engineer.<br />
              <span className="text-muted-foreground">Builder.</span><br />
              <span style={{ color: "var(--emerald)" }}>Shipper.</span>
            </h2>

            <p className="about-item delay-2 text-base text-muted-foreground leading-relaxed">
              I am Lawrence Ughonu — a Lagos-based Software Development Engineer with 6+ years
              building enterprise-grade distributed systems, backend microservices, and full-stack
              platforms across fintech, logistics, and AI-powered domains. My foundation in Electrical
              and Electronic Engineering from the University of Ibadan gives me a systems-thinking
              perspective that most web engineers do not have.
            </p>

            <p className="about-item delay-3 text-base text-muted-foreground leading-relaxed">
              I design high-availability architectures on AWS, optimize database performance under
              high concurrency, and ship production systems that directly move business outcomes.
              My work has scaled databases to sustain 10,000+ concurrent transactions, cut query
              latency by 45%, and kept platforms running at 99.5%+ uptime — with a strong bias
              toward operational ownership and measurable delivery.
            </p>

            <p className="about-item delay-4 text-base text-muted-foreground leading-relaxed">
              Under my freelance brand{" "}
              <span className="text-foreground font-medium">Renzium</span>, I take on contract
              work spanning full-stack web, React Native mobile, and video monetization platforms.
            </p>

            <div className="about-item delay-5 flex gap-4 pt-2">
              <a
                href="https://linkedin.com/in/lawrence-ughonu"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-foreground border border-border/60 px-4 py-2 rounded-lg hover:border-[--emerald] hover:text-[--emerald] transition-colors"
              >
                LinkedIn →
              </a>
              <a
                href="https://github.com/renzium"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium text-foreground border border-border/60 px-4 py-2 rounded-lg hover:border-[--emerald] hover:text-[--emerald] transition-colors"
              >
                GitHub →
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-8">
            {/* Photo */}
            <div className="about-item-right delay-1 relative">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[--emerald]/30 to-[--secondary]/20 blur-sm" />
              <img
                src={photo}
                alt="Lawrence Ughonu"
                className="relative w-full max-h-[340px] object-cover object-top rounded-2xl border border-border/40"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div
                  key={h.v}
                  className={`about-item-right delay-${i + 2} bg-card/60 border border-border/60 rounded-xl p-4 backdrop-blur-sm`}
                >
                  <div className="text-xl font-medium text-foreground tracking-tight">{h.k}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground leading-relaxed">{h.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech icons */}
        <div className="about-item delay-6 mt-14 border-t border-border/40 pt-16">
          <div className="mb-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Technologies I have worked with
          </div>
          <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
            {techIcons.map((tech, i) => (
              <div
                key={tech.name}
                className={`about-icon delay-icon-${i} flex flex-col items-center gap-2 group`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold text-white transition-transform duration-200 group-hover:scale-110 shadow-sm"
                  style={{ backgroundColor: tech.color }}
                >
                  {tech.name.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[9px] text-muted-foreground text-center leading-tight">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}