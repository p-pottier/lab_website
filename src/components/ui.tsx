import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "./Icons";

/* ------------------------------------------------------------- container */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-content px-5 sm:px-8 ${className}`}>{children}</div>;
}

/* ---------------------------------------------------------------- reveal */

/** Fades and lifts its children the first time they enter the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------- heading */

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <div
          className={`mb-3 flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
          <span
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.12] text-white sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-neutral-400">{lead}</p>}
    </div>
  );
}

/* ----------------------------------------------------------------- pills */

/** Gradient-outlined pill, the TEA house style, on a black inner surface. */
export function GradientButton({
  children,
  to,
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const inner = (
    <span className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[15px] font-semibold leading-none text-white transition group-hover:bg-transparent group-hover:text-ink">
      {children}
    </span>
  );
  const shell = `group brand-gradient inline-flex rounded-full p-[2px] transition duration-300 hover:shadow-[0_0_28px_-6px_rgba(250,209,3,0.6)] active:scale-[0.98] ${className}`;

  if (to) return <Link to={to} className={shell}>{inner}</Link>;
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={shell}>
        {inner}
      </a>
    );
  return (
    <button onClick={onClick} className={shell}>
      {inner}
    </button>
  );
}

export function GhostButton({
  children,
  to,
  href,
  className = "",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  className?: string;
}) {
  const cls = `inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-[15px] font-medium text-neutral-200 transition hover:border-gold hover:text-gold ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  );
}

export function Chip({
  children,
  color = "#EE9B00",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${className}`}
      style={{ color, borderColor: `${color}59`, backgroundColor: `${color}14` }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ stat tiles */

export function StatTile({
  value,
  label,
  color = "#EE9B00",
  sub,
}: {
  value: ReactNode;
  label: string;
  color?: string;
  sub?: string;
}) {
  return (
    <div
      className="card overflow-hidden p-5 sm:p-6"
      style={{ borderColor: `${color}33` }}
    >
      <div
        className="font-display text-4xl font-bold leading-none sm:text-[2.75rem]"
        style={{ color }}
      >
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-neutral-300">{label}</div>
      {sub && <div className="mt-1 text-xs text-neutral-500">{sub}</div>}
    </div>
  );
}

/* ---------------------------------------------------------- text link cta */

export function TextLink({
  children,
  to,
  href,
  color = "#EE9B00",
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  color?: string;
}) {
  const content = (
    <span className="group inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color }}>
      {children}
      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
    </span>
  );
  if (to) return <Link to={to}>{content}</Link>;
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {content}
    </a>
  );
}

/* ------------------------------------------------------------ page intro */

/** Full-width banner used at the top of every page except the home page. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  height = "h-[46vh] min-h-[320px]",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image: string;
  height?: string;
}) {
  // A <section>, not a <header>: the site navigation is already the page banner.
  // pt-[96px] clears the fixed header, so a short banner cannot slide under it.
  return (
    <section
      className={`relative flex items-end overflow-hidden pt-[96px] ${height}`}
    >
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="h-full w-full animate-slow-zoom object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/25" />
        {/* keeps the navigation legible over a pale or busy photograph */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
      </div>
      <Container className="relative pb-10 sm:pb-14">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow && (
            <div className="mb-3 flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: "var(--accent)" }} />
              <span
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: "var(--accent)" }}
          >
                {eyebrow}
              </span>
            </div>
          )}
          <h1 className="brand-title max-w-4xl text-4xl font-black leading-[1.06] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {lead && (
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-neutral-300">{lead}</p>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
