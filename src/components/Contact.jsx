import { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// ─── Replace these four values with your own from emailjs.com ───────────────
const EMAILJS_SERVICE_ID            = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_NOTIFICATION = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFICATION;
const EMAILJS_TEMPLATE_AUTOREPLY    = import.meta.env.VITE_EMAILJS_TEMPLATE_AUTOREPLY;
const EMAILJS_PUBLIC_KEY            = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
// ─────────────────────────────────────────────────────────────────────────────

const STATUS = {
  IDLE:    "idle",
  SENDING: "sending",
  SUCCESS: "success",
  ERROR:   "error",
};

export default function Contact() {
  const sectionRef = useRef(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [form, setForm] = useState({
    from_name:  "",
    from_email: "",
    message:    "",
  });

  // Scroll reveal
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

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATUS.SENDING);

    const templateParams = {
      from_name:       form.from_name,
      from_name_initial: form.from_name.charAt(0).toUpperCase(),
      from_email:      form.from_email,
      message:         form.message,
      to_email:        "lawrenceughonu@gmail.com",
    };

    try {
      // 1. Send notification email to Lawrence
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_NOTIFICATION,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      // 2. Send auto-reply to the person who contacted
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_AUTOREPLY,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus(STATUS.SUCCESS);
      setForm({ from_name: "", from_email: "", message: "" });

    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus(STATUS.ERROR);
    }
  };

  const inputClass = `
    w-full rounded-lg py-3 px-4 text-base
    bg-background text-foreground
    border border-border
    focus:outline-none focus:border-[--emerald] focus:ring-1 focus:ring-[--emerald]
    transition-all placeholder:text-muted-foreground
  `;

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center border-t border-border/60 py-20 overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[--secondary]/5 via-transparent to-transparent" />

      <div className="max-w-xl mx-auto px-6 w-full relative z-10 space-y-10">

        {/* Header */}
        <div className="contact-item delay-0 space-y-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            05 — Contact
          </div>
          <h2 className="text-4xl font-medium tracking-tight md:text-5xl text-foreground">
            Let's talk.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Open to engineering roles, contract work, and interesting problems.
            Drop me a message and I will get back to you within 24–48 hours.
          </p>
        </div>

        {/* Success state */}
        {status === STATUS.SUCCESS ? (
          <div className="contact-item delay-1 border border-[--emerald]/30 bg-[--emerald]/10 p-8 rounded-2xl text-center space-y-3">
            <div className="text-4xl">✓</div>
            <p className="text-base font-semibold text-foreground">
              Message sent successfully.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Check your inbox — I have sent you a confirmation.
              I will be in touch shortly.
            </p>
            <button
              onClick={() => setStatus(STATUS.IDLE)}
              className="mt-2 text-sm text-[--emerald] hover:underline underline-offset-4 transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="contact-item delay-1 space-y-5 bg-card border border-border/60 p-8 rounded-2xl shadow-sm"
          >
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="from_name"
                className="text-xs font-bold text-foreground uppercase tracking-wider block"
              >
                Your Name
              </label>
              <input
                id="from_name"
                name="from_name"
                type="text"
                required
                value={form.from_name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Lawrence Ughonu"
                disabled={status === STATUS.SENDING}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="from_email"
                className="text-xs font-bold text-foreground uppercase tracking-wider block"
              >
                Your Email
              </label>
              <input
                id="from_email"
                name="from_email"
                type="email"
                required
                value={form.from_email}
                onChange={handleChange}
                className={inputClass}
                placeholder="you@example.com"
                disabled={status === STATUS.SENDING}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-xs font-bold text-foreground uppercase tracking-wider block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="Tell me about the role, project, or problem..."
                disabled={status === STATUS.SENDING}
              />
            </div>

            {/* Error message */}
            {status === STATUS.ERROR && (
              <p className="text-sm text-red-500 leading-relaxed">
                Something went wrong. Please try again or email me directly at{" "}
                <a
                  href="mailto:lawrenceughonu@gmail.com"
                  className="underline underline-offset-4 hover:text-red-400 transition-colors"
                >
                  lawrenceughonu@gmail.com
                </a>
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === STATUS.SENDING}
              className={`
                w-full font-semibold text-base py-3.5 rounded-xl
                uppercase tracking-wider shadow-sm
                transition-all duration-300
                ${status === STATUS.SENDING
                  ? "bg-border text-muted-foreground cursor-not-allowed"
                  : "bg-foreground text-background hover:opacity-80 cursor-pointer"
                }
              `}
            >
              {status === STATUS.SENDING ? "Sending…" : "Send Message →"}
            </button>

            {/* Direct email fallback */}
            <p className="text-center text-xs text-muted-foreground pt-1">
              Or email directly:{" "}
              <a
                href="mailto:lawrenceughonu@gmail.com"
                className="text-foreground font-medium hover:text-[--emerald] transition-colors"
              >
                lawrenceughonu@gmail.com
              </a>
            </p>
          </form>
        )}

      </div>
    </section>
  );
}