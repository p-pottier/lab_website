import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { NEWS, POSITIONS, SITE, THEMES } from "../content/site";
import { useCollaborators } from "../lib/useData";
import {
  Chip,
  Container,
  GhostButton,
  GradientButton,
  Reveal,
  SectionHeading,
  StatTile,
  TextLink,
} from "../components/ui";
import { ArrowRight } from "../components/Icons";
import { Acronym } from "../components/Header";
import LogoMark from "../components/LogoMark";

/* ------------------------------------------------------------------ hero */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // The photograph drifts and dims as the copy scrolls off; a shallow parallax.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y, opacity }}>
        {/* Swap back to /images/hero-leaf-insect.jpg if the eggs do not work. */}
        <img
          src="/images/fish-eggs.jpg"
          alt="Developing fish embryos inside their eggs"
          className="h-full w-full object-cover"
        />
        {/* Three overlapping washes so the photograph dissolves into the page
            on every side rather than ending on a visible edge. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/75" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      <Container className="relative pb-16 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-4xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-12"
        >
          {/* Pulled left of the container on wide screens so the mark sits over
              the photograph rather than inside the text column. */}
          <LogoMark
            size={300}
            priority
            className="-ml-2 w-[190px] sm:w-[240px] lg:-ml-32 lg:w-[300px] xl:-ml-44"
          />

          <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
              {SITE.university} · Sweden
            </span>
          </div>

          {/* Only the acronym itself takes the heavy weight. */}
          <h1 className="font-display text-[3.1rem] font-normal leading-[0.98] text-white sm:text-7xl md:text-[5.3rem]">
            The <span className="brand-title font-black">PEACE</span> lab
          </h1>

          <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-snug sm:text-2xl">
            <Acronym twoLines restClassName="text-white" goldClassName="text-gold" />
          </p>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-neutral-300">
            We study how biodiversity responds to rapidly changing environments. Our aim is to
            understand how animals cope with environmental change, from the mechanistic to the
            global scale, so we can better predict and mitigate the impacts of climate change on our
            precious biodiversity.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <GradientButton to="/research">
              Our research <ArrowRight />
            </GradientButton>
            <GhostButton to="/opportunities">Join the PEACE lab</GhostButton>
          </div>
          </div>
        </motion.div>
      </Container>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-neutral-600 p-1.5">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-gold"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}

/* --------------------------------------------------------------- mission */

function Mission() {
  return (
    <section className="relative py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title={
              <>
                Environments are changing faster than{" "}
                <span className="brand-text">anything animals have faced before</span>.
              </>
            }
          />
        </Reveal>

        <div className="relative z-10 mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <Reveal delay={0.1}>
            <div className="prose-dark">
              <p>
                Climate change is not only increasing average temperatures, but also the frequency,
                intensity and duration of extreme weather events. In every part of the world, these
                changes have been redrawing where animals can survive, leading to geographical and
                phenological shifts, population declines, and extinctions. In this landscape, a
                major challenge in global change biology is to predict which species, populations
                and geographical regions will be most severely impacted, so we can design effective
                mitigation and conservation strategies.
              </p>
              <p>
                Addressing this challenge requires working at multiple scales. We need to understand
                how resilient animals are to rapid environmental changes, how patterns vary across
                the tree of life, and what mechanisms drive variation in resilience within and among
                species.
              </p>
              <p>
                In the PEACE lab, we study how biodiversity tolerates, responds and adapts to rapid
                environmental changes, from the individual to the community level. Ectotherms are our
                main system, but we also explore some questions across broader taxonomic levels.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  title: "Experiments",
                  body: "Laboratory and field work on thermal tolerance, acclimation and developmental plasticity, in fishes, amphibians, reptiles and invertebrates.",
                  color: "#FA6A03",
                },
                {
                  title: "Synthesis",
                  body: "Systematic reviews, meta-analyses and phylogenetic comparative methods that turn a scattered literature into a pattern we can test.",
                  color: "#02B8A6",
                },
                {
                  title: "Distributed science",
                  body: "Coordinated experiments run by dozens of laboratories at once, through the Thermal Ecology Alliance, at a scale no single group can reach.",
                  color: "#FAD103",
                },
              ].map((c) => (
                <div key={c.title} className="card p-6">
                  <div
                    className="mb-3 h-1 w-10 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <h3 className="font-display text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{c.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Built from the titles and abstracts of our own papers. The mask
            feathers every edge so it rises out of the section rather than
            sitting on it as a picture. */}
        <Reveal>
          <div className="pointer-events-none relative z-0 mt-10 flex justify-center sm:mt-14">
            <img
              src="/images/wordcloud.png"
              alt="A word cloud built from the titles of the group's papers"
              className="feather-edges w-full max-w-3xl opacity-90"
              loading="lazy"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- themes */

function Themes() {
  return (
    <section className="relative py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Research" title="The questions we keep coming back to" />
            <TextLink to="/research">All research themes</TextLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {THEMES.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <Link
                to={`/research#${t.id}`}
                className="card group block h-full overflow-hidden"
                style={{ borderColor: `${t.accent}26` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/25 to-transparent" />
                </div>
                <div className="p-5">
                  <h3
                    className="font-display text-[17px] font-semibold leading-snug text-white transition"
                    style={{ textDecorationColor: t.accent }}
                  >
                    {t.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-400">
                    {t.lead}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: t.accent }}
                  >
                    Read more
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- numbers */

function Network() {
  const collab = useCollaborators();
  if (!collab) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Collaboration"
            title="A global collaborative network"
            lead="Almost nothing here was done alone. These figures come from every co-authored paper on record, counted nightly from OpenAlex."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatTile value={collab.total} label="Co-authors" color="#02B8A6" />
            <StatTile value={collab.institutions} label="Institutions" color="#FAD103" />
            <StatTile value={collab.countries} label="Countries" color="#FA6A03" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6">
            <TextLink to="/people" color="#02B8A6">
              See the network
            </TextLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------- positions */

function OpenPositions() {
  const open = POSITIONS.filter((p) => p.status === "open");
  if (open.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-gold/[0.09] via-panel to-panel p-8 sm:p-12">
            <div className="brand-gradient absolute inset-x-0 top-0 h-[3px]" />
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div className="max-w-xl">
                <Chip color="#FAD103">Now recruiting</Chip>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {open.length} funded {open.length === 1 ? "position" : "positions"} in Gothenburg
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-neutral-300">
                  We are recruiting {open.map((p) => p.kind.toLowerCase()).join(" and ")} researchers
                  to work on thermal sensitivity across the life cycle. Applications close on{" "}
                  <span className="font-semibold text-gold">{open[0].deadline}</span>.
                </p>
                <div className="mt-7">
                  <GradientButton to="/opportunities">
                    See the positions <ArrowRight />
                  </GradientButton>
                </div>
              </div>

              <ul className="w-full max-w-sm space-y-3">
                {open.map((p) => (
                  <li key={p.title} className="rounded-xl border border-white/10 bg-ink/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-[15px] font-semibold text-white">
                        {p.kind}
                      </span>
                      <span className="text-xs text-neutral-500">{p.duration}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-neutral-400">{p.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ news */

const TAG_COLOUR: Record<string, string> = {
  Paper: "#FAD103",
  Opportunities: "#FA6A03",
  Events: "#02B8A6",
  Award: "#B80502",
  Media: "#B55EA8",
  Lab: "#FAD103",
};

function LatestNews() {
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="News" title="Latest from the group" />
            <TextLink to="/news" color="#02B8A6">
              All news
            </TextLink>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((n, i) => (
            <Reveal key={n.title} delay={i * 0.07}>
              <article className="card group flex h-full flex-col overflow-hidden">
                {n.image &&
                  (n.imageFit === "contain" ? (
                    <div className="flex h-36 items-center justify-center bg-white/[0.04] px-10">
                      <img
                        src={n.image}
                        alt=""
                        loading="lazy"
                        className="max-h-14 w-full object-contain opacity-90"
                      />
                    </div>
                  ) : (
                    <div className="h-36 overflow-hidden">
                      <img
                        src={n.image}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />
                    </div>
                  ))}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <Chip color={TAG_COLOUR[n.tag] ?? "#FAD103"}>{n.tag}</Chip>
                    <time className="text-xs text-neutral-500">
                      {new Date(n.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h3 className="mt-3 font-display text-[17px] font-semibold leading-snug text-white">
                    {n.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">{n.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ page */

export default function Home() {
  return (
    <>
      <Hero />
      <Mission />
      <Themes />
      <Network />
      <OpenPositions />
      <LatestNews />
    </>
  );
}
