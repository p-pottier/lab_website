import { THEMES } from "../content/site";
import { Container, PageHero, Reveal, SectionHeading } from "../components/ui";

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="What we are interested in"
        image="/images/research-warming.jpg"
      />

      <Container className="py-16">
        <Reveal>
          <div className="prose-dark max-w-3xl">
            <p>
              The central goal of our research is to generate robust and accurate predictions of how
              climate change is affecting, and will affect, animal biodiversity.
            </p>
            <p>
              We address these aims through empirical research and synthesis. We conduct laboratory
              experiments to quantify how well animals tolerate environmental change, how tolerance
              varies within and across species, how tolerance shifts through plasticity and
              adaptation, and which physiological mechanisms drive that variation. We also enjoy
              field work to characterise the conditions animals experience in their natural
              environments, and to link natural history to environmental resilience.
            </p>
            <p>
              We conduct evidence syntheses, meta-analyses and phylogenetic comparative analyses to
              pool published datasets, test hypotheses, and generate predictions at broad scales.
              This is an incredible way to test the generality of empirical patterns, identify groups
              or areas that may be more vulnerable, and propose new directions for the field. We also
              lead globally distributed experiments to collect new data with standardised methods, so
              we can collaborate internationally, fill existing knowledge gaps and test new and
              exciting questions.
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
              lead="While a lot of our experimental work currently focuses on fish and aquatic invertebrates, we enjoy working across taxa to better assess the generality of patterns between species."
            />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
