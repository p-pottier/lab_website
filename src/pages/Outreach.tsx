import { OUTREACH } from "../content/site";
import { Container, PageHero, Reveal, SectionHeading, TextLink } from "../components/ui";

export default function Outreach() {
  return (
    <>
      <PageHero
        eyebrow="Outreach"
        title="Beyond our own papers"
        lead="Building networks, changing research practice, and making the evidence reusable by people who did not collect it."
        image="/images/research-bias.jpg"
      />

      <Container className="py-16">
        <Reveal>
          <div className="prose-dark max-w-3xl">
            <p>
              A great deal of what limits thermal ecology is not a missing experiment. It is that the
              experiments already run are scattered, inconsistently measured and unevenly
              distributed across the globe. Fixing that is community work, and it is a substantial
              part of what this group does.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {OUTREACH.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.07}>
              <article
                className="card h-full p-7"
                style={{ borderColor: `${o.accent}26` }}
              >
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

        <section className="mt-24">
          <Reveal>
            <SectionHeading
              eyebrow="Talks and teaching"
              title="Where we have spoken"
              lead="This section is a placeholder. Add invited talks, conference symposia, teaching and public engagement here, or drop it if it never fills up."
            />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-2xl border border-dashed border-neutral-700 p-8 text-sm leading-relaxed text-neutral-500">
              Nothing listed yet. Entries would go in{" "}
              <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">src/content/site.ts</code>,
              in the same form as the news items.
            </div>
          </Reveal>
        </section>
      </Container>
    </>
  );
}
