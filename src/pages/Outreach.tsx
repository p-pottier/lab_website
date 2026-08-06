import { CONFERENCES, MEDIA, OUTREACH, OUTREACH_PHOTO, POSTERS } from "../content/site";
import { Container, PageHero, Reveal, SectionHeading, TextLink } from "../components/ui";
import { ArrowRight } from "../components/Icons";

export default function Outreach() {
  return (
    <>
      <PageHero
        eyebrow="Outreach"
        title="Beyond our own papers"
        lead="Building networks, changing research practice, and getting the evidence to the people who need it."
        image="/images/research-bias.jpg"
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div className="prose-dark lg:pt-2">
              <p>
                Much of what limits thermal ecology is not a missing experiment. The experiments
                already exist, but they are scattered, measured in incompatible ways, and drawn from
                a narrow slice of the planet. Fixing that is community work, and it takes up a
                substantial part of what this group does.
              </p>
              <p>
                The rest is telling people what we found. Research that never leaves the journals it
                was published in rarely changes anything.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <figure className="overflow-hidden rounded-2xl border border-edge bg-panel">
              <img
                src={OUTREACH_PHOTO.src}
                alt={OUTREACH_PHOTO.caption}
                className="aspect-[3/2] w-full object-cover object-[50%_28%]"
              />
              <figcaption className="px-5 py-3.5 text-sm leading-snug text-neutral-400">
                {OUTREACH_PHOTO.caption}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {OUTREACH.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07}>
              <article className="card h-full p-7" style={{ borderColor: `${o.accent}26` }}>
                <div className="mb-4 h-1 w-12 rounded-full" style={{ backgroundColor: o.accent }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: o.accent }}
                >
                  {o.role}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold text-white">{o.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-400">{o.body}</p>
                {o.href && (
                  <div className="mt-5">
                    <TextLink href={o.href} color={o.accent}>
                      Visit
                    </TextLink>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* ------------------------------------------------------------ posters */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Posters"
              title="Work presented at conferences"
              lead="Each poster is a snapshot of a project mid-flight. Most of them became papers."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {POSTERS.map((p, i) => (
              <Reveal key={p.pdf} delay={i * 0.07}>
                <a
                  href={p.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="card group flex h-full flex-col overflow-hidden"
                >
                  {p.image ? (
                    <div className="relative h-64 overflow-hidden bg-black">
                      <img
                        src={p.image}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover object-top opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-panel to-transparent" />
                    </div>
                  ) : (
                    <div className="flex h-64 items-center justify-center bg-gradient-to-br from-panel to-ink">
                      <span className="font-display text-5xl font-bold text-gold/30">PDF</span>
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                      {p.event} · {p.year}
                    </p>
                    <h3 className="mt-2 font-display text-[16px] font-semibold leading-snug text-white">
                      {p.title}
                    </h3>
                    {p.note && <p className="mt-2 text-sm text-neutral-500">{p.note}</p>}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                      Open the PDF
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------- conferences */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Coming up"
              title="Where to find us next"
              lead="Meetings we plan to attend. Say hello, or write ahead if you would like to meet there."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-edge">
              {CONFERENCES.map((c) => {
                const Row = (
                  <>
                    <span className="shrink-0 font-display text-lg font-bold text-gold sm:w-20">
                      {c.acronym}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-neutral-200 transition group-hover:text-gold">
                        {c.name}
                      </span>
                      <span className="mt-0.5 block text-sm text-neutral-500">{c.where}</span>
                    </span>
                    <span className="shrink-0 text-sm font-semibold text-cyan">{c.when}</span>
                  </>
                );
                const cls =
                  "group flex flex-col gap-2 border-b border-white/5 p-5 transition last:border-0 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-6";
                return c.url ? (
                  <a key={c.name} href={c.url} target="_blank" rel="noreferrer" className={cls}>
                    {Row}
                  </a>
                ) : (
                  <div key={c.name} className={cls}>
                    {Row}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- media */}
        {MEDIA.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <SectionHeading
                eyebrow="Writing for the public"
                title="Articles for general audiences"
              />
            </Reveal>

            <div className="mt-8 overflow-hidden rounded-2xl border border-edge">
              {MEDIA.map((m) => (
                <a
                  key={m.href}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col gap-1 border-b border-white/5 p-5 transition last:border-0 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-ember sm:w-40">
                    {m.outlet} · {m.year}
                  </span>
                  <span className="font-medium text-neutral-200 transition group-hover:text-gold">
                    {m.title}
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* --------------------------------------------------------- talks stub */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Talks and teaching"
              title="Invited talks, workshops and teaching"
              lead="This section is waiting to be filled. Add invited talks, conference symposia, workshops and public engagement here, or remove it if it stays empty."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-dashed border-neutral-700 p-8 text-sm leading-relaxed text-neutral-500">
              Nothing listed yet. Entries would go in{" "}
              <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">src/content/site.ts</code>, in
              the same form as the posters above.
            </div>
          </Reveal>
        </section>
      </Container>
    </>
  );
}
