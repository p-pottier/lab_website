import { LINKS, SITE } from "../content/site";
import { Icon } from "../components/Icons";
import { Container, GradientButton, PageHero, Reveal, SectionHeading } from "../components/ui";
import { ArrowRight } from "../components/Icons";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        image="/images/research-plasticity.jpg"
        height="h-[40vh] min-h-[280px]"
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div>
              <img
                src="/images/patrice-portrait.jpg"
                alt="Patrice Pottier"
                className="mb-8 w-full max-w-xs rounded-2xl border border-white/10 object-cover"
              />
              <SectionHeading
                title="Patrice Pottier"
                lead="Associate senior lecturer, PEACE lab"
              />

              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Email
                  </dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-lg font-medium text-gold transition hover:text-white"
                    >
                      {SITE.email}
                    </a>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Address
                  </dt>
                  <dd className="mt-1.5 space-y-0.5 text-[16px] leading-relaxed text-neutral-300">
                    {SITE.address.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="mt-9">
                <GradientButton href={`mailto:${SITE.email}`}>
                  Shoot me an email <ArrowRight />
                </GradientButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-xl font-semibold text-white">Elsewhere on the web</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card group flex items-center gap-4 p-4"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-ink text-neutral-400 transition group-hover:border-gold/50 group-hover:text-gold">
                      <Icon name={l.icon} size={18} />
                    </span>
                    <span className="text-sm font-medium text-neutral-200 transition group-hover:text-white">
                      {l.label}
                    </span>
                  </a>
                ))}
              </div>

              <div className="card mt-6 border-cyan/40 bg-cyan/[0.04] p-6 hover:border-cyan">
                <h3 className="font-display text-lg font-semibold text-cyan">
                  Prospective students and postdocs
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  Please consult the Opportunities and Research pages first, then send me a short
                  email with your CV and your research interests. Two funded positions are currently
                  open. I am also glad to support fellowship or grant applications for people who
                  want to bring their own funding.
                </p>
              </div>

              <div className="card mt-4 border-ember/40 bg-ember/[0.04] p-6 hover:border-ember">
                <h3 className="font-display text-lg font-semibold text-ember">
                  Joining the Thermal Ecology Alliance
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  Anyone interested in how temperature shapes life can join the Thermal Ecology
                  Alliance. Please sign up through the Alliance's website.
                </p>
                <a
                  href="https://www.thermalecologyalliance.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-block text-sm font-semibold text-cyan transition hover:text-white"
                >
                  thermalecologyalliance.org →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </>
  );
}
