import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { NEWS, type NewsItem } from "../content/site";
import { Chip, Container, PageHero, Reveal } from "../components/ui";
import { ArrowRight } from "../components/Icons";

const TAG_COLOUR: Record<NewsItem["tag"], string> = {
  Paper: "#02B8A6",
  Position: "#FAD103",
  Talk: "#FA6A03",
  Award: "#B80502",
  Media: "#B55EA8",
  Lab: "#FAD103",
  Network: "#02B8A6",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const colour = TAG_COLOUR[item.tag];
  const external = item.href?.startsWith("http");

  const body = (
    <article
      className="card group flex h-full flex-col overflow-hidden"
      style={{ borderColor: `${colour}26` }}
    >
      {item.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Chip color={colour}>{item.tag}</Chip>
          <time className="text-xs text-neutral-500" dateTime={item.date}>
            {formatDate(item.date)}
          </time>
        </div>

        <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-white">
          {item.title}
        </h2>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-400">{item.body}</p>

        {item.href && (
          <span
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: colour }}
          >
            {external ? "Read more" : "Go to page"}
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        )}
      </div>
    </article>
  );

  const wrapper = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05 }}
      className="h-full"
    >
      {body}
    </motion.div>
  );

  if (!item.href) return wrapper;
  return external ? (
    <a href={item.href} target="_blank" rel="noreferrer" className="h-full">
      {wrapper}
    </a>
  ) : (
    <Link to={item.href} className="h-full">
      {wrapper}
    </Link>
  );
}

export default function News() {
  const [tag, setTag] = useState<string>("All");

  const sorted = useMemo(() => [...NEWS].sort((a, b) => b.date.localeCompare(a.date)), []);
  const tags = useMemo(() => ["All", ...new Set(sorted.map((n) => n.tag))], [sorted]);
  const shown = tag === "All" ? sorted : sorted.filter((n) => n.tag === tag);

  const years = useMemo(() => {
    const map = new Map<string, NewsItem[]>();
    for (const n of shown) {
      const y = n.date.slice(0, 4);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(n);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [shown]);

  return (
    <>
      <PageHero
        eyebrow="News"
        title="What is happening"
        lead="Papers, positions, talks and everything else worth mentioning, newest first."
        image="/images/frog-moss.jpg"
        height="h-[40vh] min-h-[280px]"
      />

      <Container className="py-16">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  tag === t
                    ? "border-gold bg-gold text-ink"
                    : "border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 space-y-16">
          {years.map(([year, items]) => (
            <section key={year}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-display text-2xl font-bold text-white">{year}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
                <span className="text-sm text-neutral-500">{items.length}</span>
              </div>
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {items.map((n, i) => (
                    <NewsCard key={n.title} item={n} index={i} />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          ))}
        </div>

        {shown.length === 0 && (
          <p className="py-20 text-center text-neutral-500">No items with that tag yet.</p>
        )}

        <Reveal>
          <div className="mt-20 rounded-2xl border border-white/10 bg-panel/50 p-6 text-sm text-neutral-500">
            <span className="font-semibold text-neutral-300">Adding a news item:</span> open{" "}
            <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">src/content/site.ts</code>,
            copy any block in the <code className="rounded bg-ink px-1.5 py-0.5 text-cyan">NEWS</code>{" "}
            array, and change the date, tag, title and text. The date sets the position, the tag sets
            the colour, and the image is optional.
          </div>
        </Reveal>
      </Container>
    </>
  );
}
