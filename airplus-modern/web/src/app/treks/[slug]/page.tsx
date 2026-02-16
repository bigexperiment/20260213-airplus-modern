import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { getTrekGuide } from "@/content/trekGuides";
import { Backpack, CalendarDays, FileCheck2, Lightbulb, Utensils, WalletCards } from "lucide-react";

type ItineraryItem = { day: number; title: string; description: string };
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
};

async function getTrek(slug: string): Promise<Trek | null> {
  const file = path.join(process.cwd(), "public/information/treks", `${slug}.json`);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as Trek;
  } catch {
    return null;
  }
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
    title: guide?.seoTitle || `${trek.title} | AirPlus Nepal`,
    description: guide?.metaDescription || `Explore ${trek.title} with detailed route and planning support from AirPlus Nepal.`,
    keywords: guide?.quickKeywords,
    openGraph: {
      title: guide?.seoTitle || `${trek.title} | AirPlus Nepal`,
      description: guide?.metaDescription || `Explore ${trek.title} with practical route planning in Nepal.`,
      images: [image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide?.seoTitle || `${trek.title} | AirPlus Nepal`,
      description: guide?.metaDescription || `Explore ${trek.title} with practical route planning in Nepal.`,
      images: [image],
    },
  };
}

export default async function TrekDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = await getTrek(slug);
  const guide = getTrekGuide(slug);
  if (!trek) return notFound();

  const cover = trek.coverImage || trek.images?.[0]?.src || "/images/everest-base-camp.jpg";
  const sectionByKeyword = (keywords: string[]) =>
    guide?.sections.find((section) =>
      keywords.some((keyword) => section.heading.toLowerCase().includes(keyword))
    );

  const difficultySection = sectionByKeyword(["hard"]);
  const bestTimeSection = sectionByKeyword(["best time"]);
  const costSection = sectionByKeyword(["cost"]);
  const packingSection = sectionByKeyword(["pack"]);
  const permitSection = sectionByKeyword(["permit"]);
  const vibeSection = sectionByKeyword(["teahouse", "food", "vibe"]);
  const tipsSection = sectionByKeyword(["tips"]);

  const plannerCards = [
    {
      title: "Difficulty",
      icon: <Lightbulb className="size-4" />,
      section: difficultySection,
      accent: "from-sky-400/15 to-transparent",
    },
    {
      title: "Best Season",
      icon: <CalendarDays className="size-4" />,
      section: bestTimeSection,
      accent: "from-emerald-400/15 to-transparent",
    },
    {
      title: "Budget Range",
      icon: <WalletCards className="size-4" />,
      section: costSection,
      accent: "from-amber-400/15 to-transparent",
    },
    {
      title: "Permits & Access",
      icon: <FileCheck2 className="size-4" />,
      section: permitSection,
      accent: "from-fuchsia-400/15 to-transparent",
    },
    {
      title: "Packing",
      icon: <Backpack className="size-4" />,
      section: packingSection,
      accent: "from-cyan-400/15 to-transparent",
    },
  ].filter((card) => card.section);

  return (
    <div>
      <div className="relative h-[42svh] w-full overflow-hidden">
        <Image src={cover} alt={trek.title} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 md:from-black/70 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-white text-3xl md:text-5xl font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">{trek.title}</h1>
          <p className="text-white/80 text-sm md:text-base mt-1">
            {trek.region} • {trek.duration}
          </p>
        </div>
      </div>

      <div className="container-px section grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {trek.overview && (
            <div className="glass rounded-2xl p-6 space-y-3">
              {trek.overview.map((p, i) => (
                <p key={i} className="text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          )}

          {trek.images && (
            <div className="grid grid-cols-2 gap-3">
              {trek.images.map((img) => (
                <div className="overflow-hidden rounded-xl" key={img.src}>
                  <Image
                    src={img.src}
                    alt={img.name || trek.title}
                    width={960}
                    height={640}
                    className="h-48 w-full object-cover hover:scale-[1.03] transition"
                  />
                </div>
              ))}
            </div>
          )}

          <section>
            <h2 className="text-2xl font-semibold mb-3">Itinerary</h2>
            <ol className="space-y-3">
              {trek.itinerary.map((d) => (
                <li key={d.day} className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-primary/20 text-xs text-primary font-medium">
                      {d.day}
                    </div>
                    <div>
                      <div className="font-medium">{d.title}</div>
                      <div className="text-muted-foreground text-sm mt-1">{d.description}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {guide && (
            <section className="space-y-5">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-6">
                <h2 className="text-2xl font-semibold">Complete Trek Guide</h2>
                <p className="mt-2 text-sm text-muted-foreground">{guide.introNote}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.quickKeywords.map((kw) => (
                    <span key={kw} className="rounded-full border border-white/15 px-3 py-1 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {plannerCards.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Quick Planner</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {plannerCards.map((card) => (
                      <article
                        key={card.title}
                        className={`rounded-2xl border border-white/10 bg-gradient-to-br ${card.accent} p-5`}
                      >
                        <div className="inline-flex items-center gap-2 text-primary">
                          {card.icon}
                          <span className="font-medium">{card.title}</span>
                        </div>
                        <div className="mt-2 space-y-2">
                          {card.section?.paragraphs.slice(0, 2).map((paragraph) => (
                            <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                        {card.section?.bullets && card.section.bullets.length > 0 && (
                          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                            {card.section.bullets.slice(0, 5).map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              )}

              <section className="grid gap-3 md:grid-cols-2">
                {vibeSection && (
                  <article className="rounded-2xl border border-white/10 bg-black/10 p-5">
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Utensils className="size-4" />
                      <h3 className="text-lg font-semibold">{vibeSection.heading}</h3>
                    </div>
                    <div className="mt-3 space-y-2">
                      {vibeSection.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                )}
                {tipsSection && (
                  <article className="rounded-2xl border border-white/10 bg-black/10 p-5">
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Lightbulb className="size-4" />
                      <h3 className="text-lg font-semibold">{tipsSection.heading}</h3>
                    </div>
                    {tipsSection.paragraphs.length > 0 && (
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{tipsSection.paragraphs[0]}</p>
                    )}
                    {tipsSection.bullets && tipsSection.bullets.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                        {tipsSection.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                )}
              </section>

              <article className="rounded-2xl border border-white/10 bg-black/10 p-5 md:p-6">
                <h3 className="text-xl font-semibold">Research Sources</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  {guide.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-3">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </section>
          )}
        </div>

        <aside className="space-y-3">
          <div className="glass rounded-2xl p-5">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {trek.maxElevation && (
                <>
                  <div className="text-muted-foreground">Max Elevation</div>
                  <div>{trek.maxElevation}</div>
                </>
              )}
              {trek.difficulty && (
                <>
                  <div className="text-muted-foreground">Difficulty</div>
                  <div>{trek.difficulty}</div>
                </>
              )}
              {trek.accommodation && (
                <>
                  <div className="text-muted-foreground">Accommodation</div>
                  <div>{trek.accommodation}</div>
                </>
              )}
              {trek.transport && (
                <>
                  <div className="text-muted-foreground">Transport</div>
                  <div>{trek.transport}</div>
                </>
              )}
              <div className="text-muted-foreground">Destination</div>
              <div>{trek.destination}</div>
            </div>
          </div>

          {trek.highlights && trek.highlights.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <div className="font-medium mb-2">Highlights</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                {trek.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="glass rounded-2xl p-5">
            <div className="font-medium">Ready to trek?</div>
            <p className="text-sm text-muted-foreground mt-1">
              Contact us to customize your itinerary, dates, and budget style.
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium"
            >
              Plan with AirPlus
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
