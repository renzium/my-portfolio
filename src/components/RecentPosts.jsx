import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const posts = [
   {
    id: 1,
    title: "Building Cross-Platform Mobile Apps with React Native",
    date: "15 Dec 2024",
    tags: "React Native · Mobile",
    text: "A practical deep-dive into building production-grade iOS and Android applications from a single codebase — covering Expo, TypeScript, native modules, and lessons learned from shipping the Paka and SQE apps.",
  },
  {
    id: 2,
    title: "Integrating AI Voice Features into Mobile Apps",
    date: "10 Dec 2024",
    tags: "AI Integration · React Native",
    text: "How to combine speech-to-text, conversational AI, and text-to-speech into a cohesive voice interface in React Native — covering OpenAI Whisper, expo-speech, permission handling, and real-time audio streaming.",
  },
   {
    id: 3,
    title: "Optimizing Client-Side Hydration on React 19 Engine Hooks",
    date: "12 Feb 2026",
    tags: "React · DevOps",
    text: "A breakdown of performance loops, environment context drift, and the five optimization routines that cut Time to Interactive by 62% on a production React 19 application.",
  },
  {
    id: 4,
    title: "Building Production Pipelines with Vite and Custom Assets",
    date: "28 Jan 2026",
    tags: "Vite · Architecture",
    text: "Manual chunk configuration, validated environment variables, lazy-loaded routes, and plugin ordering — the four things that turned a sluggish CRA migration into a 68kb initial bundle.",
  },
];

export default function RecentPosts() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("posts-visible");
        } else {
          if (entry.boundingClientRect.top > 0) {
            section.classList.remove("posts-visible");
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="posts"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center border-t border-border/60 py-24 overflow-hidden bg-background"
    >
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/60 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 space-y-16">

        {/* Section title — clearly labelled */}
        <div className="posts-item delay-0">
          <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            04 — Writing
          </div>
          {/* FIX: large clear section title so visitors know what this section is */}
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="text-4xl font-medium tracking-tight md:text-5xl text-foreground">
              Recent Articles.
            </h2>
            <Link
              to="/blog"
              className="text-sm font-semibold text-[--emerald] hover:underline underline-offset-4 transition-colors"
            >
              View all entries →
            </Link>
          </div>
          <p className="mt-4 text-base text-muted-foreground max-w-xl leading-relaxed">
            Technical writing on distributed systems, frontend architecture, and engineering craft.
          </p>
        </div>

        {/* Post cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`posts-item delay-${i + 1} group bg-card border border-border/60 p-8 rounded-2xl shadow-sm flex flex-col justify-between gap-6 hover:border-border transition-all duration-300`}
            >
              <div className="space-y-3">
                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.split(" · ").map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border border-border/60 text-muted-foreground bg-background"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-[--emerald] transition-colors leading-snug">
                  <Link to={"/blog/blogpost" + post.id}>{post.title}</Link>
                </h3>

                {/* Excerpt */}
                <p className="text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {post.text}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <span className="text-sm text-muted-foreground">{post.date}</span>
                <Link
                  to={"/blog/blogpost" + post.id}
                  className="text-sm font-semibold text-[--emerald] hover:underline underline-offset-4 transition-colors"
                >
                  Read →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}