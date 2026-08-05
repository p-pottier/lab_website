import { THEMES } from "../content/site";
import { Container, PageHero, Reveal, SectionHeading } from "../components/ui";

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="What we work on"
        lead="Six threads run through everything the group does. They overlap by design: the same organisms, the same methods and the same problem approached from different sides."
        image="/images/research-warming.jpg"
      />

      <Container className="py-16">
        <Reveal>
          <div className="prose-dark max-w-3xl">
            <p>
              Our central question is simple to state and hard to answer. How and why does thermal
              sensitivity vary across the life cycle, and what does that variation mean for animal
              populations under climate change?
            </p>
            <p>
              Answering it needs three kinds of work at once. Experiments establish what an organism
              can tolerate and how that tolerance shifts with the environment it developed in.
              Synthesis pools what the field already knows, and exposes where the evidence is too
              biased to support a global claim. Methods work makes the first two comparable, so that
              an embryo and an adult can be placed on the same axis.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20">
          {THEMES.map((t, i) => (
            <section key={t.id} id={t.id} className="scroll-mt-28">
              <Reveal>
                <div
                  className={`grid items-center gap-8 lg:grid-cols-2 ${
                    i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-edge">
                    <img
                      src={t.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover opacity-85 transition duration-700 hover:scale-[1.03] hover:opacity-100"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-1"
                      style={{ backgroundColor: t.accent }}
                    />
                  </div>

                  <div>
                    <div className="mb-3 flex items-center gap-3">
                      <span className="text-3xl">{t.emoji}</span>
                      <span
                        className="text-xs font-semibold uppercase tracking-[0.2em]"
                        style={{ color: t.accent }}
                      >
                        Theme {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                      {t.title}
                    </h2>

                    <p className="mt-4 text-[16px] leading-relaxed text-neutral-400">{t.lead}</p>

                    <div className="mt-6">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Questions we are asking
                      </h3>
                      <ul className="mt-3 space-y-2.5">
                        {t.questions.map((q) => (
                          <li key={q} className="flex gap-3 text-[15px] leading-relaxed text-neutral-300">
                            <span
                              className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: t.accent }}
                            />
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </section>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 rounded-2xl border border-white/10 bg-panel/50 p-8">
            <SectionHeading
              title="Working across taxa, on purpose"
              lead="Fishes are the starting point for most of our funded work, but the comparative questions are broader. Amphibians, reptiles and invertebrates all appear in our datasets, because a pattern that holds in one clade and fails in another is more informative than either result alone."
            />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
