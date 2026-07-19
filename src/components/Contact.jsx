import { useRef, useState, useEffect } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("contact-visible");
        } else {
          if (entry.boundingClientRect.top > 0) {
            section.classList.remove("contact-visible");
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
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center border-t border-border/60 py-20 overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[--secondary]/5 via-transparent to-transparent" />

      <div className="max-w-xl mx-auto px-6 space-y-8 w-full relative z-10">

        {/* Header */}
        <div className="contact-item delay-0 text-center space-y-2">
          <h2 className="text-3xl font-black text-foreground">Lets Talk</h2>
          <p className="text-muted-foreground text-sm">
            Drop a line to talk architecture, system optimizations, or role matching.
          </p>
        </div>

        {sent ? (
          <div className="contact-item delay-1 border border-border/60 bg-card p-6 rounded-xl text-center text-foreground font-bold text-sm">
            🚀 Connection query queued successfully!
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="contact-item delay-1 space-y-5 bg-card border border-border/60 p-8 rounded-2xl shadow-sm"
          >
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Name
              </label>
              <input
                required
                type="text"
                className="
                  w-full rounded-lg py-2.5 px-4 text-sm
                  bg-background text-foreground
                  border border-border
                  focus:outline-none focus:border-[--emerald] focus:ring-1 focus:ring-[--emerald]
                  transition-all placeholder:text-muted-foreground
                "
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Email
              </label>
              <input
                required
                type="email"
                className="
                  w-full rounded-lg py-2.5 px-4 text-sm
                  bg-background text-foreground
                  border border-border
                  focus:outline-none focus:border-[--emerald] focus:ring-1 focus:ring-[--emerald]
                  transition-all placeholder:text-muted-foreground
                "
                placeholder="your@email.com"
              />
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Message
              </label>
              <textarea
                required
                rows={4}
                className="
                  w-full rounded-lg py-2.5 px-4 text-sm
                  bg-background text-foreground
                  border border-border
                  focus:outline-none focus:border-[--emerald] focus:ring-1 focus:ring-[--emerald]
                  transition-all resize-none placeholder:text-muted-foreground
                "
                placeholder="Tell me about your project or role..."
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="
                w-full font-bold text-sm py-3 rounded-xl
                uppercase tracking-wider shadow-sm
                transition-all duration-300
                bg-foreground text-background
                hover:opacity-80
              "
            >
              Send
            </button>
          </form>
        )}
      </div>
    </section>
  );
}