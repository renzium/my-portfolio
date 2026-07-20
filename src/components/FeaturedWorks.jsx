import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const works = [
  {
    id: "nyxidiom",
    title: "Nyxidiom Streamlined Core",
    tag: "Full-Stack · Distributed Architecture",
    year: "2025",
    desc: "Architected high-throughput cloud infrastructure and unified state orchestration mechanisms to deploy low-latency web applications into production.",
  },
  {
    id: "sqe-holding",
    title: "SQE Holding Payment Orchestration Engine",
    tag: "Payments Systems · Backend",
    year: "2024",
    desc: "Built a multi-gateway payment orchestration system with bulletproof transactional consistency, sustaining high-concurrency write loads across secure financial domains.",
  },
  {
    id: "ai-extraction",
    title: "AI-Powered Invoice Extraction Pipeline",
    tag: "AI Systems · Backend Automation",
    year: "2025",
    desc: "Engineered an asynchronous document extraction pipeline using LLM-based parsing to automate structured data capture from thousands of invoices weekly.",
  },
  {
    id: "aquaculture",
    title: "AquaSense IoT Node",
    tag: "IoT · Embedded Firmware Integration",
    year: "2024",
    desc: "Designed an automated, IoT-enabled environmental monitoring node utilizing an ESP32 edge node and real-time Firebase syncing.",
  },
];

export default function FeaturedWorks() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive((a) => (a + 1) % works.length),
      4000
    );
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("works-visible");
          startTimer();
        } else {
          if (entry.boundingClientRect.top > 0) {
            section.classList.remove("works-visible");
          }
          clearInterval(timerRef.current);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      clearInterval(timerRef.current);
    };
  }, [startTimer]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center border-t border-border/60 py-20 bg-card/30 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[--emerald]/3 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 w-full relative z-10">

        {/* Header */}
        <div className="works-item mb-14 flex items-end justify-between">
          <div>
            <div className="mb-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              01 — Selected Systems Work
            </div>
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl text-foreground">
              Engineering Case Studies.
            </h2>
          </div>
          <div className="hidden text-xs text-muted-foreground md:block tabular-nums">
            {String(active + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
          </div>
        </div>

        {/* Card */}
        <div className="works-item-delay relative h-[460px] overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur md:h-[420px]">
          {works.map((w, i) => (
            <div
              key={w.id}
              className={`absolute inset-0 grid grid-cols-1 md:grid-cols-2 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i === active
                  ? "translate-x-0 opacity-100"
                  : i < active
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="flex flex-col justify-between p-10 md:p-14">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[--emerald]">{w.tag}</div>
                <div>
                  <h3 className="text-3xl font-medium tracking-tight md:text-4xl text-foreground">{w.title}</h3>
                  <p className="mt-4 max-w-sm text-base text-muted-foreground leading-relaxed">{w.desc}</p>
                  <div className="mt-8 flex items-center gap-4">
                    <Link
                      to={`/works/${w.id}`}
                      className="group inline-flex items-center gap-2 text-sm text-foreground hover:text-[--emerald] transition-colors"
                    >
                      View system breakdown
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                    <span className="text-xs text-muted-foreground">{w.year}</span>
                  </div>
                </div>
              </div>

              <div className="relative hidden overflow-hidden md:block bg-gradient-to-br from-border/10 to-transparent">
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--emerald-glow), transparent 70%)" }} />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-[120px] font-mono font-light text-muted-foreground/5 select-none">0{i + 1}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Progress indicators */}
          <div className="absolute bottom-6 left-10 right-10 flex gap-2 z-10">
            {works.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); startTimer(); }}
                className="relative h-0.5 flex-1 overflow-hidden bg-border cursor-pointer"
              >
                <span
                  className={`absolute inset-y-0 left-0 bg-[--emerald] transition-all duration-700 ${
                    i === active ? "w-full" : i < active ? "w-full opacity-40" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}