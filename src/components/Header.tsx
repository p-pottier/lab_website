import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "../content/site";

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
 * The lab name spelled out, with the letters that make up PEACE picked out in
 * gold so the acronym is legible without being explained.
 */
export function Acronym({
  className = "",
  restClassName = "",
  goldClassName = "text-gold",
}: {
  className?: string;
  restClassName?: string;
  goldClassName?: string;
}) {
  // Only the five words that carry the acronym take a gold initial.
  const WORDS = [
    ["P", "lasticity"],
    null,
    ["E", "cological"],
    ["A", "daptations"],
    null,
    ["C", "hanging"],
    ["E", "nvironments"],
  ] as const;
  const FILLER = ["and", "to"];
  let fillerIndex = 0;

  return (
    <span className={className}>
      {WORDS.map((w, i) => {
        if (w === null) {
          const word = FILLER[fillerIndex++];
          return (
            <span key={i} className={restClassName}>
              {word}{" "}
            </span>
          );
        }
        return (
          <span key={i}>
            <span className={goldClassName}>{w[0]}</span>
            <span className={restClassName}>{w[1]}</span>
            {i < WORDS.length - 1 ? <span className={restClassName}> </span> : null}
          </span>
        );
      })}
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
        <div className="mx-auto flex h-[90px] w-full max-w-content items-center justify-between px-5 sm:px-8">
          {/* Colours stay put on hover; only the weight changes. */}
          <Link to="/" className="group block" aria-label="PEACE Lab, home">
            <span className="flex items-baseline gap-2.5">
              <span className="brand-text font-display text-[26px] font-bold leading-none tracking-tight">
                PEACE
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-cyan transition-all duration-200 group-hover:font-bold">
                Lab
              </span>
            </span>
            <span className="mt-1.5 hidden max-w-[34rem] text-[11px] leading-tight tracking-wide text-white transition-all duration-200 sm:block">
              <Acronym
                restClassName="font-medium group-hover:font-semibold"
                goldClassName="text-gold font-semibold group-hover:font-bold"
              />
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
