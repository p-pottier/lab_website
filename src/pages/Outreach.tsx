import {
  CONFERENCES,
  CONFERENCE_PHOTO,
  MEDIA,
  OUTREACH,
  OUTREACH_PHOTO,
  POSTERS,
  SERVICE,
  TALKS,
  TEACHING,
  WORKSHOPS,
  type Engagement,
} from "../content/site";
import { Container, PageHero, Reveal, SectionHeading, TextLink } from "../components/ui";
import { ArrowRight } from "../components/Icons";

/** Shared table for talks, workshops, teaching and service. */
function EngagementTable({ items, accent = "#EE9B00" }: { items: Engagement[]; accent?: string }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-edge">
      {items.map((e, i) => (
        <div
          key={`${e.year}-${e.title}-${i}`}
          className="flex flex-col gap-1.5 border-b border-white/5 p-5 transition last:border-0 hover:bg-white/[0.03] sm:flex-row sm:gap-6"
        >
          <span
            className="shrink-0 font-display text-sm font-bold sm:w-24"
            style={{ color: accent }}
          >
            {e.year}
          </span>
          <span className="min-w-0 flex-1">
            {/* Same colour as the year beside it; neutral-500 was too dim to read. */}
            <span
              className="block text-xs font-semibold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {e.kind}
            </span>
            <span className="mt-1 block font-medium leading-snug text-neutral-200">{e.title}</span>
            {e.detail && (
              <span className="mt-1 block text-sm leading-snug text-neutral-500">{e.detail}</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Outreach() {
  return (
    <>
      <PageHero
        eyebrow="Outreach"
        title="Beyond scientific papers"
        lead="We are also actively involved in communicating our science, building networks, and changing research practice."
        image="/images/research-bias.jpg"
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <Reveal>
            <div className="prose-dark lg:pt-2">
              <p>
                Scientific publishing is a key part of our academic responsibilities, but we also
                enjoy communicating our science to broad audiences and contributing to advocacy to
                ensure that research becomes more open, reliable, and inclusive.
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
            <SectionHeading eyebrow="Posters" title="Work presented at conferences" />
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
              lead="Some of the meetings we plan to attend. Come say hi, or please write ahead if you would like to meet there!"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 overflow-hidden rounded-2xl border border-edge">
              {CONFERENCES.map((c) => {
                const Row = (
                  <>
                    <span className="shrink-0 font-display text-lg font-bold text-ember sm:w-20">
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

        {/* --------------------------------------------- presentations, workshops */}
        <section className="mt-24">
          <Reveal>
            {/* Matched to the SEB photo above, which is one column of a two-column
                grid with a gap-10 gutter. Same arithmetic, so the two figures
                render at identical widths at every viewport. */}
            <figure className="mb-10 w-full overflow-hidden rounded-2xl border border-edge bg-panel lg:w-[calc((100%-2.5rem)/2)]">
              <img
                src={CONFERENCE_PHOTO.src}
                alt={CONFERENCE_PHOTO.alt}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
              <figcaption className="px-5 py-3.5 text-sm leading-snug text-neutral-400">
                {CONFERENCE_PHOTO.caption}
              </figcaption>
            </figure>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Presentations and workshops"
              title="Invited talks, workshops, and symposia"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <EngagementTable items={TALKS} accent="#EE9B00" />
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mt-12 font-display text-xl font-semibold text-white">
              Workshops and symposia organised
            </h3>
            <EngagementTable items={WORKSHOPS} accent="#0A9396" />
          </Reveal>
        </section>

        {/* ----------------------------------------------------------- teaching */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading eyebrow="Teaching" title="Courses and units" />
          </Reveal>
          <Reveal delay={0.1}>
            <EngagementTable items={TEACHING} accent="#CA6702" />
          </Reveal>
        </section>

        {/* -------------------------------------------------------------- media */}
        {MEDIA.length > 0 && (
          <section className="mt-24">
            <Reveal>
              <SectionHeading
                eyebrow="Communicating with the public"
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
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-ember sm:w-56">
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

        {/* ------------------------------------------------- service and review */}
        <section className="mt-24">
          <Reveal>
            <SectionHeading eyebrow="Service" title="Outreach and peer review" />
          </Reveal>
          <Reveal delay={0.1}>
            <EngagementTable items={SERVICE} accent="#94D2BD" />
          </Reveal>
        </section>
      </Container>
    </>
  );
}
