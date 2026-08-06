import {
  CURRENT_MEMBERS,
  CV_URL,
  MAIN_COLLABORATORS,
  PAST_MEMBERS,
  PI,
  PI_BIO,
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
import { Icon } from "../components/Icons";

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

function MemberCard({ person, muted = false }: { person: Person; muted?: boolean }) {
  return (
    <div className="card flex gap-5 p-5">
      <Avatar person={person} size={84} />
      <div className="min-w-0">
        <h3 className="font-display text-lg font-semibold text-white">{person.name}</h3>
        <p className="mt-0.5 text-sm font-medium" style={{ color: muted ? "#02B8A6" : "#FAD103" }}>
          {person.role}
        </p>
        {person.affiliation && (
          <p className="mt-1 text-sm text-neutral-500">{person.affiliation}</p>
        )}
        {person.years && <p className="mt-1 text-xs text-neutral-600">{person.years}</p>}
        {person.now && <p className="mt-1 text-sm text-neutral-400">Now: {person.now}</p>}
        {person.blurb && (
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">{person.blurb}</p>
        )}
        {person.links && person.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
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
  return (
    <>
      <PageHero
        eyebrow="People"
        title="The group"
        lead="A small team in Gothenburg, working inside a much larger network of collaborators."
        image="/images/ideel-lab.jpg"
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
                  {PI_BIO.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

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
            <SectionHeading eyebrow="Current members" title="Who is here now" />
          </Reveal>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {CURRENT_MEMBERS.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <MemberCard person={m} />
              </Reveal>
            ))}
            <Reveal delay={CURRENT_MEMBERS.length * 0.06}>
              <div className="card flex h-full flex-col justify-center border-dashed p-7">
                <h3 className="font-display text-lg font-semibold text-white">
                  There is room for you here
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  We are recruiting a PhD student and a postdoctoral researcher, and we are always
                  glad to hear from people who want to bring their own fellowship.
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
              title="A network, not a laboratory"
              lead="The questions we care about are larger than any single group, so most of our work is shared. This map is built automatically from every co-authored paper on record."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <CollaboratorMap />
            </div>
          </Reveal>

          {/* the handful worth naming, edited by hand in src/content/site.ts */}
          <div className="mt-14">
            <Reveal>
              <SectionHeading
                title="People we work with most closely"
                lead="A few of the collaborators behind the projects on this site."
              />
            </Reveal>

            {MAIN_COLLABORATORS.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {MAIN_COLLABORATORS.map((c, i) => (
                  <Reveal key={c.name} delay={i * 0.05}>
                    <div className="card flex h-full gap-4 p-5">
                      {c.photo ? (
                        <img
                          src={c.photo}
                          alt={c.name}
                          className="h-16 w-16 shrink-0 rounded-xl border border-white/10 object-cover"
                        />
                      ) : (
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-cyan/25 bg-gradient-to-br from-cyan/15 to-gold/10 font-display text-lg font-bold text-cyan">
                          {c.name
                            .split(" ")
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-display text-[16px] font-semibold text-white">
                          {c.href ? (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noreferrer"
                              className="transition hover:text-gold"
                            >
                              {c.name}
                            </a>
                          ) : (
                            c.name
                          )}
                        </h3>
                        {c.role && <p className="mt-0.5 text-sm text-cyan">{c.role}</p>}
                        <p className="mt-0.5 text-sm leading-snug text-neutral-500">
                          {c.affiliation}
                        </p>
                        {c.blurb && (
                          <p className="mt-2 text-sm leading-relaxed text-neutral-400">{c.blurb}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            ) : (
              <Reveal>
                <div className="mt-8 rounded-2xl border border-dashed border-neutral-700 p-8 text-sm leading-relaxed text-neutral-500">
                  Nobody listed yet. Add entries to{" "}
                  <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">MAIN_COLLABORATORS</code>{" "}
                  in <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">src/content/site.ts</code>
                  , with a name, affiliation and optionally a photograph in{" "}
                  <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">public/images/</code>.
                </div>
              </Reveal>
            )}
          </div>
        </section>
      </Container>
    </>
  );
}
