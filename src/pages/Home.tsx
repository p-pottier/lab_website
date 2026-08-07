import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { NEWS, POSITIONS, SITE } from "../content/site";
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

/**
 * The site palette, for the accents that are set in JavaScript rather than
 * through a Tailwind class. The same eight colours drive --brand-stops in
 * index.css and the colour names in tailwind.config.cjs.
 */
const ACCENTS = {
  deep: "#005f73",
  teal: "#0a9396",
  mint: "#94d2bd",
  sand: "#e9d8a6",
  amber: "#ee9b00",
  rust: "#ca6702",
  brick: "#bb3e03",
  red: "#ae2012",
};

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
            <span className="h-px w-10" style={{ backgroundColor: ACCENTS.amber }} />
            <span
              className="text-xs font-semibold uppercase tracking-[0.24em]"
              style={{ color: ACCENTS.amber }}
            >
              {SITE.university} · Sweden
            </span>
          </div>

          {/* Only the acronym itself takes the heavy weight. */}
          <h1 className="font-display text-[3.1rem] font-normal leading-[0.98] text-white sm:text-7xl md:text-[5.3rem]">
            The <span className="brand-title font-black">PEACE</span> lab
          </h1>

          <p className="mt-5 max-w-2xl font-display text-xl font-medium leading-snug sm:text-2xl">
            <Acronym
              twoLines
              restClassName="text-white"
              goldClassName="text-[color:var(--accent)]"
            />
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
            className="h-1.5 w-1 rounded-full"
            style={{ backgroundColor: ACCENTS.amber }}
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
                main system, but we also explore some questions across broader taxonomic levels. We
                take pride in collaborating with scientists from all across the globe, and believe
                uniting forces is the best way to make new discoveries and tackle pressing
                ecological challenges.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                {
                  title: "Experiments",
                  body: "Laboratory and field work to quantify how animals, mostly fish and invertebrates, tolerate temperature extremes and adjust their physiology in response to changing environments.",
                  color: ACCENTS.amber,
                },
                {
                  title: "Synthesis",
                  body: "Systematic reviews, meta-analyses and phylogenetic comparative analyses to establish generality at broader scales.",
                  color: ACCENTS.teal,
                },
                {
                  title: "Distributed science",
                  body: "Globally distributed experiments coordinated through the Thermal Ecology Alliance to standardise methods, solve geographical biases, and answer questions no individual lab could tackle alone.",
                  color: ACCENTS.rust,
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
            lead="Nothing we do would be possible without the help of our precious collaborators. We have been fortunate to work with some of the most brilliant and generous scientists from all over the world, and take pride in establishing new collaborations."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatTile value={collab.total} label="Co-authors" color={ACCENTS.teal} />
            <StatTile value={collab.institutions} label="Institutions" color={ACCENTS.sand} />
            <StatTile value={collab.countries} label="Countries" color={ACCENTS.rust} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6">
            <TextLink to="/people" color="#0A9396">
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
          <div
            className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-white/[0.05] via-panel to-panel p-8 sm:p-12"
            style={{ borderColor: `${ACCENTS.amber}4D` }}
          >
            <div className="brand-gradient absolute inset-x-0 top-0 h-[3px]" />
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div className="max-w-xl">
                <Chip color={ACCENTS.amber}>Now recruiting</Chip>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                  {open.length} funded {open.length === 1 ? "position" : "positions"} in Gothenburg
                </h2>
                <p className="mt-4 text-[16px] leading-relaxed text-neutral-300">
                  We are recruiting a PhD student and a postdoctoral researcher! Applications close
                  on <span className="font-semibold" style={{ color: ACCENTS.amber }}>
                    {open[0].deadline}
                  </span>.
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
  Paper: ACCENTS.sand,
  Opportunities: ACCENTS.amber,
  Events: ACCENTS.teal,
  Award: ACCENTS.red,
  Media: ACCENTS.mint,
  Lab: ACCENTS.sand,
};

function LatestNews() {
  const items = [...NEWS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <section className="py-20">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="News" title="Latest from the group" />
            <TextLink to="/news" color={ACCENTS.teal}>
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
                    <Chip color={TAG_COLOUR[n.tag] ?? "#EE9B00"}>{n.tag}</Chip>
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
      <Network />
      <OpenPositions />
      <LatestNews />
    </>
  );
}
