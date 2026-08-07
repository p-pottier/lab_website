import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CURRENT_MEMBERS,
  CV_URL,
  PAST_MEMBERS,
  PI,
  PI_BIO,
  PI_INTRO,
  type Person,
} from "../content/site";
import CollaboratorMap from "../components/CollaboratorMap";
import {
  Container,
  GhostButton,
  GradientButton,
  PageHero,
  Reveal,
  SectionHeading,
} from "../components/ui";
import { ArrowRight, Icon } from "../components/Icons";

/** Initials stand in until a photograph is supplied. */
function Avatar({ person, size = 96 }: { person: Person; size?: number }) {
  const initials = person.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  if (person.photo) {
    return (
      <img
        src={person.photo}
        alt={person.name}
        className="rounded-2xl border border-white/10 object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/15 to-cyan/10 font-display font-bold text-gold"
      style={{ width: size, height: size, fontSize: size * 0.3 }}
    >
      {initials}
    </div>
  );
}

/** Sized to hold a paragraph of self-introduction, not just a name and title. */
function MemberCard({ person, muted = false }: { person: Person; muted?: boolean }) {
  return (
    <div
      className={`card flex flex-col gap-5 p-7 sm:flex-row ${muted ? "" : "min-h-[260px]"}`}
    >
      <Avatar person={person} size={muted ? 96 : 132} />
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-semibold text-white">{person.name}</h3>
        <p
          className="mt-1 text-sm font-medium"
          style={{ color: muted ? "#0A9396" : "#EE9B00" }}
        >
          {person.role}
        </p>
        {person.affiliation && (
          <p className="mt-1 text-sm text-neutral-500">{person.affiliation}</p>
        )}
        {person.years && <p className="mt-1 text-xs text-neutral-600">{person.years}</p>}
        {person.now && <p className="mt-1 text-sm text-neutral-400">Now: {person.now}</p>}
        {person.blurb && (
          <p className="mt-4 text-[15px] leading-relaxed text-neutral-400">{person.blurb}</p>
        )}
        {person.links && person.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {person.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-neutral-400 transition hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function People() {
  const [bioOpen, setBioOpen] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="People"
        title="Our team"
        lead="We are based at the University of Gothenburg, but we also work with a growing network of collaborators globally."
        image="/images/fish-trevally.jpg"
      />

      <Container className="py-16">
        {/* ------------------------------------------------------------ PI */}
        <Reveal>
          <div className="card overflow-hidden">
            <div className="brand-gradient h-[3px] w-full" />
            <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[220px_1fr]">
              <div>
                <img
                  src={PI.photo}
                  alt={PI.name}
                  className="w-full max-w-[220px] rounded-2xl border border-white/10 object-cover"
                />
                <div className="mt-5 flex flex-col gap-2">
                  {PI.links?.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target={l.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="text-sm font-medium text-neutral-300 transition hover:text-gold"
                    >
                      {l.label} →
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {PI.role}
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                  {PI.name}
                </h2>
                <p className="mt-2 text-sm text-neutral-500">{PI.affiliation}</p>

                <div className="prose-dark mt-6">
                  <p>{PI_INTRO}</p>
                </div>

                <button
                  onClick={() => setBioOpen((v) => !v)}
                  className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan transition hover:text-white"
                >
                  {bioOpen ? "Show less" : "Learn more about me"}
                  <ArrowRight
                    className={`transition-transform duration-300 ${
                      bioOpen ? "rotate-90" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {bioOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="prose-dark mt-5 border-l-2 border-cyan/30 pl-5">
                        {PI_BIO.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <GradientButton href={CV_URL}>
                    <Icon name="cv" size={16} /> Curriculum vitae
                  </GradientButton>
                  <GhostButton href="https://www.thermalecologyalliance.org/">
                    Thermal Ecology Alliance
                  </GhostButton>
                  <GhostButton href="https://www.sortee.org/">SORTEE</GhostButton>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------- current */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading eyebrow="Current" title="Current members" />
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {CURRENT_MEMBERS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <MemberCard person={m} />
              </Reveal>
            ))}
            <Reveal delay={CURRENT_MEMBERS.length * 0.06}>
              <div className="card flex h-full min-h-[260px] flex-col justify-center border-dashed p-7">
                <h3 className="font-display text-lg font-semibold text-gold">
                  There is room for you here!
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  We are recruiting a PhD student and a postdoctoral researcher, and we gladly
                  welcome people who want to bring their own funding to conduct research in the lab.
                </p>
                <div className="mt-5">
                  <GhostButton to="/opportunities">See open positions</GhostButton>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------------------------------------------------- past */}
        {PAST_MEMBERS.length > 0 && (
          <section className="mt-20">
            <Reveal>
              <SectionHeading eyebrow="Alumni" title="Past members" />
            </Reveal>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {PAST_MEMBERS.map((m, i) => (
                <Reveal key={m.name} delay={i * 0.06}>
                  <MemberCard person={m} muted />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------- collaborators */}
        <section className="mt-20">
          <Reveal>
            <SectionHeading
              eyebrow="Collaborators"
              title="A global collaborative network"
              lead="None of our work would be possible without the expertise and contributions of our collaborators. We have been very fortunate to work with many researchers from all across the globe, and would love to establish new collaborations."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <CollaboratorMap />
            </div>
          </Reveal>

        </section>
      </Container>
    </>
  );
}
