import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FELLOWSHIPS,
  POSITIONS,
  SHORT_VISITS,
  SITE,
  WHO_WE_LOOK_FOR,
  type Position,
} from "../content/site";
import {
  Chip,
  Container,
  GhostButton,
  GradientButton,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { ArrowRight } from "../components/Icons";

const SCOPE_COLOUR: Record<string, string> = {
  Sweden: "#FAD103",
  Europe: "#02B8A6",
  Global: "#FA6A03",
};

function PositionCard({ position }: { position: Position }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="card overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr]">
        {position.image && (
          <div className="relative h-48 overflow-hidden lg:h-full">
            <img src={position.image} alt="" className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-panel/90 lg:to-panel" />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <Chip color="#FAD103">{position.kind}</Chip>
            <Chip color="#02B8A6">Open</Chip>
            <span className="text-sm text-neutral-500">{position.duration}</span>
          </div>

          <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-white">
            {position.title}
          </h3>

          <p className="mt-3 text-[16px] leading-relaxed text-neutral-300">{position.summary}</p>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.15em] text-neutral-500">Location</dt>
              <dd className="mt-1 text-sm text-neutral-300">{position.location}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.15em] text-neutral-500">
                Applications close
              </dt>
              <dd className="mt-1 text-sm font-semibold text-gold">{position.deadline}</dd>
            </div>
          </dl>

          <button
            onClick={() => setOpen((v) => !v)}
            className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition hover:text-white"
          >
            {open ? "Hide details" : "What the project involves"}
            <ArrowRight
              className={`transition-transform duration-300 ${open ? "rotate-90" : "group-hover:translate-x-1"}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 space-y-3 overflow-hidden border-l-2 border-cyan/30 pl-5"
              >
                {position.details.map((d) => (
                  <li key={d} className="text-[15px] leading-relaxed text-neutral-400">
                    {d}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mt-7 flex flex-wrap gap-3">
            {position.applyUrl ? (
              <GradientButton href={position.applyUrl}>
                Apply <ArrowRight />
              </GradientButton>
            ) : (
              <GradientButton href={`mailto:${SITE.email}?subject=${encodeURIComponent(position.title)}`}>
                Ask about this position <ArrowRight />
              </GradientButton>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Opportunities() {
  const open = POSITIONS.filter((p) => p.status === "open");

  return (
    <>
      <PageHero
        eyebrow="Opportunities"
        title="Join the group"
        lead="Two funded positions are open in Gothenburg, and there are several routes in for researchers who bring their own funding."
        image="/images/opportunities-banner.webp"
      />

      <Container className="py-16">
        {/* ---------------------------------------------------- positions */}
        <Reveal>
          <SectionHeading
            eyebrow="Funded positions"
            title={`${open.length} open ${open.length === 1 ? "position" : "positions"}`}
            lead="Both positions sit within a Swedish Research Council programme on the vulnerability of fish life stages to climate change. Both are flexible in scope."
          />
        </Reveal>

        <div className="mt-10 space-y-6">
          {open.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <PositionCard position={p} />
            </Reveal>
          ))}
        </div>

        {/* --------------------------------------------------- who we want */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Who we are looking for"
              title="Ideas and potential, not publication counts"
              lead={WHO_WE_LOOK_FOR.lead}
            />
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_WE_LOOK_FOR.traits.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <div className="card h-full p-6">
                  <div className="mb-3 h-1 w-10 rounded-full brand-gradient" />
                  <h3 className="font-display text-[17px] font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-6 rounded-2xl border border-cyan/25 bg-cyan/[0.05] p-6">
              <p className="text-[15px] leading-relaxed text-neutral-300">
                {WHO_WE_LOOK_FOR.closing}
              </p>
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------- fellowships */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Bring your own funding"
              title="Fellowship schemes worth considering"
              lead="If neither advertised position fits, a fellowship may. These schemes have funded researchers in groups like ours; deadlines shift each year, so check the funder's page before planning around one. I am glad to help develop a proposal, and the earlier we start the better it goes."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-edge">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-edge bg-panel">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                      Scheme
                    </th>
                    <th className="hidden px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 md:table-cell">
                      Who it is for
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                      Timing
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FELLOWSHIPS.map((f) => (
                    <tr
                      key={f.name}
                      className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-4">
                        <a
                          href={f.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-white transition hover:text-gold"
                        >
                          {f.name}
                        </a>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-neutral-500">{f.funder}</span>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                            style={{
                              color: SCOPE_COLOUR[f.scope],
                              backgroundColor: `${SCOPE_COLOUR[f.scope]}14`,
                            }}
                          >
                            {f.scope}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-neutral-400 md:hidden">{f.who}</div>
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-neutral-400 md:table-cell">
                        {f.who}
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-400">{f.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------- short visits */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Short-term visits"
              title="Come and work with us for a few months"
              lead="Not every collaboration needs a contract. Several schemes fund a stay of a few weeks to several months, which is long enough to run an experiment, learn a method or start a synthesis together. Write to me before applying, since most of these ask for a host letter."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-edge">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-edge bg-panel">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                      Scheme
                    </th>
                    <th className="hidden px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 md:table-cell">
                      Who it is for
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SHORT_VISITS.map((v) => (
                    <tr
                      key={v.name}
                      className="border-b border-white/5 transition last:border-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-5 py-4">
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-white transition hover:text-gold"
                        >
                          {v.name}
                        </a>
                        <div className="mt-1 text-xs text-neutral-500">{v.funder}</div>
                        <div className="mt-2 text-sm text-neutral-400 md:hidden">{v.who}</div>
                      </td>
                      <td className="hidden px-5 py-4 text-sm text-neutral-400 md:table-cell">
                        {v.who}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-cyan">
                        {v.duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        {/* --------------------------------------------------------- ask */}
        <Reveal>
          <div className="mt-20 rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/[0.07] to-panel p-8 sm:p-12">
            <h2 className="font-display text-3xl font-bold text-white">
              Not sure whether you fit?
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-300">
              Write anyway. A short email describing what you find interesting and what you would
              want to work on tells me far more than a CV does. Master's students and visiting
              researchers are welcome to get in touch as well.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GradientButton href={`mailto:${SITE.email}`}>
                Email {SITE.email} <ArrowRight />
              </GradientButton>
              <GhostButton to="/research">Read about the research first</GhostButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}
