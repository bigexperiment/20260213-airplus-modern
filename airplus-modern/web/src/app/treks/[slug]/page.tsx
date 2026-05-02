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
    guide?.sections.find((section) => keywords.some((keyword) => section.heading.toLowerCase().includes(keyword)));

  const difficultySection = sectionByKeyword(["hard"]);
  const bestTimeSection = sectionByKeyword(["best time"]);
  const costSection = sectionByKeyword(["cost"]);
  const packingSection = sectionByKeyword(["pack"]);
  const permitSection = sectionByKeyword(["permit"]);
  const vibeSection = sectionByKeyword(["teahouse", "food", "vibe"]);
  const tipsSection = sectionByKeyword(["tips"]);

  const plannerCards = [
    { title: "Difficulty", icon: <Lightbulb className="size-4" />, section: difficultySection },
    { title: "Best season", icon: <CalendarDays className="size-4" />, section: bestTimeSection },
    { title: "Budget range", icon: <WalletCards className="size-4" />, section: costSection },
    { title: "Permits", icon: <FileCheck2 className="size-4" />, section: permitSection },
    { title: "Packing", icon: <Backpack className="size-4" />, section: packingSection },
  ].filter((card) => card.section);

  return (
    <div>
      <div className="container-px pt-8 md:pt-10">
        <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="p-6 md:p-8 lg:p-10">
              <div className="eyebrow">Trek in Nepal</div>
              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-5xl">{trek.title}</h1>
              <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                {trek.region} • {trek.duration}
                {trek.maxElevation ? ` • ${trek.maxElevation}` : ""}
              </p>
              {trek.overview?.[0] && <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">{trek.overview[0]}</p>}
            </div>
            <div className="relative min-h-[18rem]">
              <Image src={cover} alt={trek.title} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="container-px section grid gap-8 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          {trek.overview && trek.overview.length > 1 && (
            <div className="panel rounded-[1.5rem] p-6 space-y-3">
              {trek.overview.slice(1).map((p, i) => (
                <p key={i} className="text-sm leading-7 text-muted-foreground md:text-base">
                  {p}
                </p>
              ))}
            </div>
          )}

          {trek.images && trek.images.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {trek.images.map((img) => (
                <div className="overflow-hidden rounded-xl" key={img.src}>
                  <Image src={img.src} alt={img.name || trek.title} width={960} height={640} className="h-48 w-full object-cover" />
                </div>
              ))}
            </div>
          )}

          <section>
            <h2 className="mb-3 text-2xl font-semibold tracking-[-0.03em]">Day-by-day outline</h2>
            <ol className="space-y-3">
              {trek.itinerary.map((d) => (
                <li key={d.day} className="panel rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-muted text-xs font-medium text-primary">
                      {d.day}
                    </div>
                    <div>
                      <div className="font-medium">{d.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{d.description}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {guide && (
            <section className="space-y-5">
              <div className="panel rounded-[1.5rem] p-6">
                <h2 className="text-2xl font-semibold tracking-[-0.03em]">Before you choose this trek</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Here are the practical details travelers usually want first, including how difficult the route feels, when to go, what to budget, and what the trail experience is actually like.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.quickKeywords.map((kw) => (
                    <span key={kw} className="rounded-full border border-[color:var(--border)] bg-muted px-3 py-1 text-xs">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {plannerCards.length > 0 && (
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">Quick planning notes</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {plannerCards.map((card) => (
                      <article key={card.title} className="panel rounded-[1.5rem] p-5">
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
                          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
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
                  <article className="panel rounded-[1.5rem] p-5">
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Utensils className="size-4" />
                      <h3 className="text-lg font-semibold">{friendlySectionHeading(vibeSection.heading)}</h3>
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
                  <article className="panel rounded-[1.5rem] p-5">
                    <div className="inline-flex items-center gap-2 text-primary">
                      <Lightbulb className="size-4" />
                      <h3 className="text-lg font-semibold">{friendlySectionHeading(tipsSection.heading)}</h3>
                    </div>
                    {tipsSection.paragraphs.length > 0 && (
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{tipsSection.paragraphs[0]}</p>
                    )}
                    {tipsSection.bullets && tipsSection.bullets.length > 0 && (
                      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                        {tipsSection.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                )}
              </section>

              <article className="panel rounded-[1.5rem] p-5 md:p-6">
                <h3 className="text-xl font-semibold tracking-[-0.03em]">Useful references</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
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
          <div className="panel rounded-[1.5rem] p-5">
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {trek.maxElevation && (
                <>
                  <div className="text-muted-foreground">Max elevation</div>
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
            <div className="panel rounded-[1.5rem] p-5">
              <div className="mb-2 font-medium">Why travelers like it</div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {trek.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="panel rounded-[1.5rem] p-5">
            <div className="font-medium">Thinking about this trek?</div>
            <p className="mt-1 text-sm text-muted-foreground">
              If you are comparing a few routes, we can help you figure out what fits your dates, budget, and comfort level before you commit.
            </p>
            <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              Ask about this trek
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
