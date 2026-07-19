import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./use-theme.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/works", label: "Works" },
  { to: "/blog", label: "Blog" },
];

export default function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showBackground = scrolled || !isHomePage;

  return (
    /* FIX: print:hidden hides the entire nav when printing CV */
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 print:hidden ${
        showBackground
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5 font-medium tracking-tight">
          <span className="inline-block h-2 w-2 rounded-full bg-[--emerald] shadow-[0_0_16px_var(--emerald-glow)]" />
          {/* FIX: nav brand text increased from text-sm → text-base */}
          <span className="text-base text-foreground">portfolio</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  /* FIX: nav link text increased from text-[13px] → text-[15px] */
                  `text-[15px] transition-colors hover:text-foreground ${
                    isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:text-foreground cursor-pointer bg-background"
          >
            {theme === "dark"
              ? <Sun size={16} className="text-foreground" />
              : <Moon size={16} className="text-foreground" />}
          </button>

          <a
            href="/#contact"
            /* FIX: button text increased from text-xs → text-sm */
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[--emerald]/30 bg-[--emerald]/10 px-4 py-2 text-sm font-medium text-[--emerald] transition-all hover:bg-[--emerald]/20"
          >
            Let's talk
          </a>
        </div>
      </nav>
    </header>
  );
}