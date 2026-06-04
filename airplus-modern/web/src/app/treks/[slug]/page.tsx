import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { getTrekGuide } from "@/content/trekGuides";
import {
  ArrowRight,
  Backpack,
  CalendarDays,
  ChevronRight,
  Clock,
  FileCheck2,
  Lightbulb,
  MapPin,
  Mountain,
  Utensils,
} from "lucide-react";
import InstagramFeed from "@/components/InstagramFeed";

type ItineraryItem = { day: number; title: string; description: string };
type LongformArticle = { title: string; body: string };
type Trek = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  destination: string;
  maxElevation?: string;
  difficulty?: string;
  accommodation?: string;
  transport?: string;
  coverImage?: string;
  images?: { src: string; name?: string }[];
  overview?: string[];
  highlights?: string[];
  itinerary: ItineraryItem[];
  longformArticle?: LongformArticle;
};

function friendlySectionHeading(heading: string): string {
  if (heading.startsWith("What's the")) return "Why people choose this trek";
  if (heading === "The Route - Day by Day") return "How the route usually flows";
  if (heading === "How Hard Is It?") return "How challenging it feels";
  if (heading === "Best Time to Go") return "When this trek feels best";
  if (heading === "How Much Does It Cost?") return "What to budget";
  if (heading === "What to Pack") return "What to bring";
  if (heading === "Teahouses, Food & the Vibe") return "What the trail experience is like";
  if (heading === "Permits & Getting There") return "Permits and getting to the trail";
  if (heading === "Tips from People Who've Done It") return "Helpful tips before you go";
  return heading;
}

async function getTrek(slug: string): Promise<Trek | null> {
  const file = path.join(process.cwd(), "public/information/treks", `${slug}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Trek;
  } catch {
    return null;
  }
}

function renderLongformArticle(raw: string) {
  const text = raw.replace(/\r\n/g, "\n").trim();
  const lines = text.split("\n");

  type Node =
    | { kind: "h"; level: 1 | 2 | 3; text: string }
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "table"; header: string[]; rows: string[][] };

  const nodes: Node[] = [];
  let i = 0;

  const pushParagraph = (buf: string[]) => {
    const txt = buf.join(" ").trim();
    if (txt) nodes.push({ kind: "p", text: txt });
  };

  while (i < lines.length) {
    const line = lines[i].trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    const hMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (hMatch) {
      const level = hMatch[1].length as 1 | 2 | 3;
      nodes.push({ kind: "h", level, text: hMatch[2].trim() });
      i++;
      continue;
    }

    if (trimmed.startsWith("|")) {
      const headerLine = trimmed;
      const sepLine = (lines[i + 1] || "").trim();
      if (sepLine.startsWith("|") && sepLine.replace(/[|\s:-]/g, "") === "") {
        const parseRow = (row: string) =>
          row
            .trim()
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        const header = parseRow(headerLine);
        const rows: string[][] = [];
        i += 2;
        while (i < lines.length) {
          const r = lines[i].trim();
          if (!r || !r.startsWith("|")) break;
          rows.push(parseRow(r));
          i++;
        }
        nodes.push({ kind: "table", header, rows });
        continue;
      }
    }

    if (/^(-|\*|•)\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length) {
        const li = lines[i].trim();
        if (!/^(-|\*|•)\s+/.test(li)) break;
        items.push(li.replace(/^(-|\*|•)\s+/, "").trim());
        i++;
      }
      nodes.push({ kind: "ul", items });
      continue;
    }

    const buf: string[] = [];
    while (i < lines.length) {
      const cur = lines[i].trim();
      if (!cur) break;
      if (/^(#{1,3})\s+/.test(cur)) break;
      if (/^(-|\*|•)\s+/.test(cur)) break;
      if (cur.startsWith("|")) break;
      buf.push(cur);
      i++;
    }
    pushParagraph(buf);
  }

  return (
    <div className="prose-trek space-y-6">
      {nodes.map((n, idx) => {
        if (n.kind === "h") {
          const Tag = n.level === 1 ? "h3" : n.level === 2 ? "h4" : "h5";
          const cls =
            n.level === 1
              ? "text-2xl font-bold md:text-[1.75rem]"
              : n.level === 2
                ? "text-xl font-semibold md:text-[1.4rem]"
                : "text-lg font-semibold";
          return (
            <Tag key={idx} className={cls}>
              {n.text}
            </Tag>
          );
        }
        if (n.kind === "ul") {
          return (
            <ul key={idx} className="list-disc space-y-2 pl-5 marker:text-primary">
              {n.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          );
        }
        if (n.kind === "table") {
          return (
            <div key={idx} className="overflow-x-auto rounded-xl border border-[color:var(--border)]">
              <table className="w-full border-collapse text-left text-[0.9375rem]">
                <thead>
                  <tr className="bg-muted/60">
                    {n.header.map((h) => (
                      <th key={h} className="border-b border-[color:var(--border)] px-4 py-3 font-semibold text-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {n.rows.map((r, rIdx) => (
                    <tr key={rIdx} className="even:bg-muted/30">
                      {r.map((c, cIdx) => (
                        <td key={`${rIdx}-${cIdx}`} className="border-b border-[color:var(--border)] px-4 py-3">
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return <p key={idx}>{n.text}</p>;
      })}
    </div>
  );
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "public/information/treks");
  const files = await fs.readdir(dir);
  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ slug: f.replace(/\.json$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrek(slug);
  const guide = getTrekGuide(slug);

  if (!trek) {
    return {
      title: "Trek not found | AirPlus Nepal",
      description: "The requested trek page does not exist.",
    };
  }

  const image = trek.coverImage || trek.images?.[0]?.src || "/images/everest-base-camp.jpg";

  return {
    title: `${trek.title} | AirPlus Nepal`,
    description: guide?.metaDescription || `Explore ${trek.title} with detailed route and planning support from AirPlus Nepal.`,
    keywords: guide?.quickKeywords,
    openGraph: {
      title: `${trek.title} | AirPlus Nepal`,
      description: guide?.metaDescription || `Explore ${trek.title} with practical route planning in Nepal.`,
      images: [{ url: image, width: 1200, height: 630, alt: trek.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${trek.title} | AirPlus Nepal`,
      description: guide?.metaDescription || `Explore ${trek.title} with practical route planning in Nepal.`,
      images: [image],
    },
  };
}

function TrekHero({ trek, cover }: { trek: Trek; cover: string }) {
  return (
    <section className="container-px pt-6 md:pt-8">
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-primary">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/treks" className="transition hover:text-primary">Treks</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{trek.title}</span>
      </nav>

      <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-sm">
        <div className="relative aspect-[2/1] w-full max-h-72 md:aspect-[21/8] md:max-h-80">
          <Image src={cover} alt={trek.title} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <div className="mt-6 md:mt-8">
        <span className="eyebrow">{trek.region}</span>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {trek.title}
        </h1>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="stat-pill">
            <Clock className="size-3.5 text-primary" />
            {trek.duration}
          </span>
          {trek.maxElevation && (
            <span className="stat-pill">
              <Mountain className="size-3.5 text-primary" />
              {trek.maxElevation}
            </span>
          )}
          {trek.difficulty && (
            <span className="stat-pill">
              <MapPin className="size-3.5 text-primary" />
              {trek.difficulty}
            </span>
          )}
          <span className="stat-pill">
            <MapPin className="size-3.5 text-primary" />
            {trek.destination}
          </span>
        </div>
      </div>
    </section>
  );
}

function Sidebar({ trek }: { trek: Trek }) {
  return (
    <aside className="space-y-5 md:sticky md:top-24 md:self-start">
      <div className="surface-card overflow-hidden">
        <div className="border-b border-[color:var(--border)] bg-[#eff6ff] px-5 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-primary">At a glance</h2>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 px-5 py-4 text-sm">
          {trek.maxElevation && (
            <>
              <dt className="text-muted-foreground">Max elevation</dt>
              <dd className="font-medium">{trek.maxElevation}</dd>
            </>
          )}
          {trek.difficulty && (
            <>
              <dt className="text-muted-foreground">Difficulty</dt>
              <dd className="font-medium">{trek.difficulty}</dd>
            </>
          )}
          {trek.accommodation && (
            <>
              <dt className="text-muted-foreground">Stay</dt>
              <dd className="font-medium">{trek.accommodation}</dd>
            </>
          )}
          {trek.transport && (
            <>
              <dt className="text-muted-foreground">Transport</dt>
              <dd className="font-medium">{trek.transport}</dd>
            </>
          )}
          <dt className="text-muted-foreground">Duration</dt>
          <dd className="font-medium">{trek.duration}</dd>
          <dt className="text-muted-foreground">Region</dt>
          <dd className="font-medium">{trek.region}</dd>
        </dl>
      </div>

      {trek.highlights && trek.highlights.length > 0 && (
        <div className="surface-card p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Why travelers like it
          </h2>
          <ul className="space-y-2.5">
            {trek.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="surface-card overflow-hidden">
        <div className="p-5">
          <h2 className="text-lg font-bold">Thinking about this trek?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We can help you compare routes, dates, and budget before you commit — no pressure, just honest advice.
          </p>
          <Link href="/contact" className="btn-primary mt-5 w-full">
            Ask about this trek
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default async function TrekDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = await getTrek(slug);
  const guide = getTrekGuide(slug);
  if (!trek) return notFound();

  const cover = trek.coverImage || trek.images?.[0]?.src || "/images/everest-base-camp.jpg";
  const hasLongform = Boolean(trek.longformArticle?.body);

  const sectionByKeyword = (keywords: string[]) =>
    guide?.sections.find((section) => keywords.some((keyword) => section.heading.toLowerCase().includes(keyword)));

  const difficultySection = sectionByKeyword(["hard"]);
  const bestTimeSection = sectionByKeyword(["best time"]);
  const packingSection = sectionByKeyword(["pack"]);
  const permitSection = sectionByKeyword(["permit"]);
  const vibeSection = sectionByKeyword(["teahouse", "food", "vibe"]);
  const tipsSection = sectionByKeyword(["tips"]);

  const plannerCards = [
    { title: "Difficulty", icon: Lightbulb, section: difficultySection },
    { title: "Best season", icon: CalendarDays, section: bestTimeSection },
    { title: "Permits", icon: FileCheck2, section: permitSection },
    { title: "Packing", icon: Backpack, section: packingSection },
  ].filter((card) => card.section);

  const articleSections = guide?.sections.filter(
    (section) =>
      !["teahouse", "food", "vibe", "tips"].some((keyword) => section.heading.toLowerCase().includes(keyword))
  );

  return (
    <div>
      <TrekHero trek={trek} cover={cover} />

      <div className="container-px py-8 md:py-12">
        <div className={`grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] ${hasLongform ? "lg:grid-cols-1" : ""}`}>
          <main className="min-w-0 space-y-10">
            {/* Overview intro */}
            {!hasLongform && trek.overview?.[0] && (
              <div className="surface-card p-6 md:p-8">
                <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">{trek.overview[0]}</p>
              </div>
            )}

            {!hasLongform && trek.overview && trek.overview.length > 1 && (
              <div className="space-y-4">
                {trek.overview.slice(1).map((p, i) => (
                  <p key={i} className="text-base leading-relaxed text-muted-foreground md:text-[1.05rem]">
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Longform article */}
            {hasLongform && (
              <article className="surface-card p-6 md:p-10 lg:p-12">
                <div className="mb-8 border-b border-[color:var(--border)] pb-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">Full guide</p>
                  <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                    {trek.longformArticle!.title || trek.title}
                  </h2>
                </div>
                {renderLongformArticle(trek.longformArticle!.body)}
              </article>
            )}

            {/* Image gallery */}
            {!hasLongform && trek.images && trek.images.length > 0 && (
              <section>
                <h2 className="section-kicker mb-6">On the trail</h2>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                  {trek.images.map((img, i) => (
                    <div
                      className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2 md:col-span-1" : ""}`}
                      key={img.src}
                    >
                      <Image
                        src={img.src}
                        alt={img.name || trek.title}
                        width={960}
                        height={640}
                        className={`w-full object-cover ${i === 0 ? "h-56 md:h-72" : "h-40 md:h-48"}`}
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Itinerary timeline */}
            {!hasLongform && (
              <section className="surface-card p-6 md:p-8">
                <h2 className="section-kicker mb-8">Day-by-day</h2>
                <ol className="relative space-y-0">
                  {trek.itinerary.map((d, idx) => (
                    <li key={d.day} className="relative pl-8 pb-8 last:pb-0">
                      {idx < trek.itinerary.length - 1 && <span className="timeline-line" aria-hidden />}
                      <div className="absolute left-0 top-0 flex size-[1.375rem] items-center justify-center rounded-full bg-primary text-[0.65rem] font-bold text-white shadow-[0_0_0_4px_rgba(13,124,102,0.15)]">
                        {d.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{d.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {d.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Guide sections */}
            {!hasLongform && guide && (
              <section className="space-y-8">
                <div>
                  <h2 className="section-kicker mb-4">Before you choose</h2>
                  <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                    Practical details travelers usually want first — difficulty, timing, budget, and what the trail actually feels like.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {guide.quickKeywords.map((kw) => (
                      <span
                        key={kw}
                        className="rounded-full border border-[color:var(--border)] bg-white px-3.5 py-1.5 text-xs font-medium text-foreground/75"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {plannerCards.length > 0 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {plannerCards.map(({ title, icon: Icon, section }) => (
                      <article key={title} className="surface-card p-5 transition hover:shadow-md">
                        <div className="mb-3 inline-flex items-center gap-2.5">
                          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Icon className="size-4" />
                          </span>
                          <h3 className="font-semibold">{title}</h3>
                        </div>
                        <div className="space-y-2">
                          {section?.paragraphs.slice(0, 2).map((paragraph) => (
                            <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        {section?.bullets && section.bullets.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {section.bullets.slice(0, 5).map((bullet) => (
                              <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-2">
                  {vibeSection && (
                    <article className="surface-card p-5">
                      <div className="mb-3 inline-flex items-center gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Utensils className="size-4" />
                        </span>
                        <h3 className="font-semibold">{friendlySectionHeading(vibeSection.heading)}</h3>
                      </div>
                      <div className="space-y-2">
                        {vibeSection.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </article>
                  )}
                  {tipsSection && (
                    <article className="surface-card p-5">
                      <div className="mb-3 inline-flex items-center gap-2.5">
                        <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Lightbulb className="size-4" />
                        </span>
                        <h3 className="font-semibold">{friendlySectionHeading(tipsSection.heading)}</h3>
                      </div>
                      {tipsSection.paragraphs.length > 0 && (
                        <p className="text-sm leading-relaxed text-muted-foreground">{tipsSection.paragraphs[0]}</p>
                      )}
                      {tipsSection.bullets && tipsSection.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {tipsSection.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  )}
                </div>

                <article className="surface-card p-5 md:p-6">
                  <h3 className="font-semibold">Useful references</h3>
                  <ul className="mt-3 space-y-2">
                    {guide.sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary underline decoration-primary/30 underline-offset-4 transition hover:decoration-primary"
                        >
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>

                {articleSections && articleSections.length > 0 && (
                  <article className="surface-card p-6 md:p-8">
                    <h3 className="text-xl font-bold md:text-2xl">Detailed route article</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      A fuller breakdown in plain language so you can understand the route before you decide.
                    </p>
                    <div className="mt-6 space-y-8">
                      {articleSections.map((section) => (
                        <section key={section.heading} className="space-y-3">
                          <h4 className="text-lg font-semibold">{friendlySectionHeading(section.heading)}</h4>
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground md:text-base">
                              {paragraph}
                            </p>
                          ))}
                          {section.bullets && section.bullets.length > 0 && (
                            <ul className="space-y-1.5">
                              {section.bullets.map((bullet) => (
                                <li key={bullet} className="flex gap-2 text-sm text-muted-foreground md:text-base">
                                  <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                                  {bullet}
                                </li>
                              ))}
                            </ul>
                          )}
                        </section>
                      ))}
                    </div>
                  </article>
                )}

                <InstagramFeed />
              </section>
            )}

            {hasLongform && (
              <div className="surface-card p-6 md:p-8">
                <h2 className="text-lg font-semibold">Have questions about this trek?</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  We&apos;re happy to help you figure out dates, budget, and whether this route fits your plans.
                </p>
                <Link href="/contact" className="btn-primary mt-4 inline-flex">
                  Get in touch
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            )}

            {hasLongform && <InstagramFeed />}
          </main>

          {!hasLongform && <Sidebar trek={trek} />}
        </div>
      </div>
    </div>
  );
}
