import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "../content/site";
import LogoMark from "./LogoMark";

/** The wordmark also returns to the home page; this is the visible route to it. */
const NAV = [
  { to: "/", label: "Home" },
  { to: "/research", label: "Research" },
  { to: "/people", label: "People" },
  { to: "/publications", label: "Publications" },
  { to: "/outreach", label: "Outreach" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

/**
 * The lab name spelled out. `accent` picks the initials of the five words that
 * spell PEACE out in gold; the header and footer set it to false and run plain
 * white, because the logo beside them already carries the colour.
 */
export function Acronym({
  className = "",
  restClassName = "",
  goldClassName = "text-gold",
  accent = true,
  twoLines = false,
}: {
  className?: string;
  restClassName?: string;
  goldClassName?: string;
  accent?: boolean;
  twoLines?: boolean;
}) {
  const LINE_ONE = [
    ["P", "lasticity"],
    null,
    ["E", "cological"],
    ["A", "daptations"],
  ] as const;
  const LINE_TWO = [null, ["C", "hanging"], ["E", "nvironments"]] as const;

  const render = (words: readonly (readonly [string, string] | null)[], filler: string[]) => {
    let fillerIndex = 0;
    return words.map((w, i) => {
      if (w === null) {
        return (
          <span key={i} className={restClassName}>
            {filler[fillerIndex++]}{" "}
          </span>
        );
      }
      return (
        <span key={i}>
          <span className={accent ? goldClassName : restClassName}>{w[0]}</span>
          <span className={restClassName}>{w[1]}</span>
          {i < words.length - 1 ? <span className={restClassName}> </span> : null}
        </span>
      );
    });
  };

  if (!twoLines) {
    return (
      <span className={className}>
        {render([...LINE_ONE, ...LINE_TWO], ["and", "to"])}
      </span>
    );
  }

  return (
    <span className={`block ${className}`}>
      <span className="block">{render(LINE_ONE, ["and"])}</span>
      <span className="block">{render(LINE_TWO, ["to"])}</span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // The bar is always fixed; past 24px it gains a background so text stays legible.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Stop the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "border-b border-white/10 bg-ink/90 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/80 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[96px] w-full max-w-content items-center justify-between px-5 sm:px-8">
          {/* Colours stay put on hover; only the weight changes. */}
          <Link to="/" className="group flex items-center gap-3.5" aria-label="PEACE lab, home">
            <LogoMark size={62} priority />
            <span className="block">
              <span className="flex items-baseline gap-2">
                <span className="brand-text font-display text-[27px] font-black leading-none tracking-tight">
                  PEACE
                </span>
                <span className="font-display text-[25px] font-normal leading-none text-white transition-all duration-200 group-hover:font-medium">
                  lab
                </span>
              </span>
              <span className="mt-1 hidden text-[11px] leading-tight tracking-wide text-white transition-all duration-200 sm:block">
                <Acronym
                  accent={false}
                  twoLines
                  restClassName="font-medium group-hover:font-semibold"
                />
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `link-underline text-[15px] font-medium transition-colors ${
                    isActive ? "text-gold" : "text-neutral-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <span data-active={isActive} className="link-underline">
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 text-neutral-200 transition hover:border-gold hover:text-gold lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-[2px] w-5 bg-current transition-all duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-5 bg-current transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>

        {/* the four-colour hairline that ties the site to the TEA identity */}
        <div className="brand-gradient h-[2px] w-full opacity-70" />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink/98 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex h-full flex-col justify-center gap-1 px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045, duration: 0.4 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `block border-b border-white/5 py-3.5 font-display text-[1.75rem] font-semibold ${
                        isActive ? "text-gold" : "text-neutral-200"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.p
                className="mt-8 text-sm text-neutral-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {SITE.university} · {SITE.city}
              </motion.p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
