import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { activityGuides, tourGuides } from "@/content/tourActivityGuides";

export const metadata: Metadata = {
  title: "Nepal Tours and Activities (2024/2025) | AirPlus Nepal",
  description:
    "Explore detailed Nepal tour and adventure activity guides with practical costs, route planning, and seasonal tips.",
};

export default function ToursPage() {
  return (
    <div className="container-px section space-y-10">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Nepal tours and activities</h1>
        <p className="mt-3 text-muted-foreground leading-7">
          Not every Nepal trip needs to revolve around a long trek. These tours and activities are here for travelers who want more variety, a gentler pace, or a few meaningful days before or after heading into the mountains.
        </p>
      </div>

      <section className="panel rounded-[1.5rem] p-5 md:p-7">
        <h2 className="text-xl font-semibold tracking-[-0.03em]">Start here</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium text-foreground/90">Popular tours</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tourGuides.map((tour) => (
                <a key={tour.id} href={`#${tour.id}`} className="rounded-full border border-[color:var(--border)] bg-muted px-3 py-1.5 text-xs hover:bg-white">
                  {tour.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground/90">Adventure activities</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {activityGuides.map((activity) => (
                <a key={activity.id} href={`#${activity.id}`} className="rounded-full border border-[color:var(--border)] bg-muted px-3 py-1.5 text-xs hover:bg-white">
                  {activity.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">Popular Nepal tours</h2>
        {tourGuides.map((tour, idx) => (
          <article id={tour.id} key={tour.id} className="panel overflow-hidden rounded-[1.75rem] scroll-mt-24">
            <Image
              src={tour.image}
              alt={tour.title}
              width={1280}
              height={760}
              sizes="(max-width: 768px) 100vw, 90vw"
              priority={idx === 0}
              className="h-64 w-full object-cover md:h-80"
            />

            <div className="space-y-4 p-5 md:p-7">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{tour.title}</h3>
                <p className="text-sm text-muted-foreground">{tour.duration}</p>
              </div>

              <p className="text-sm text-muted-foreground leading-7">{tour.introNote}</p>
              <div className="flex flex-wrap gap-2">
                {tour.quickKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-[color:var(--border)] bg-muted px-3 py-1 text-xs">
                    {keyword}
                  </span>
                ))}
              </div>

              {tour.sections.map((section) => (
                <section key={section.heading} className="rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4 md:p-5">
                  <h4 className="text-lg font-semibold">{section.heading}</h4>
                  <div className="mt-2 space-y-2">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section className="rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4 md:p-5">
                <h4 className="text-lg font-semibold">Research sources</h4>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  {tour.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-3">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-[-0.03em] md:text-3xl">Adventure activities worth adding</h2>
        <div className="grid gap-6 xl:grid-cols-2">
          {activityGuides.map((activity) => (
            <article id={activity.id} key={activity.id} className="panel overflow-hidden rounded-[1.75rem] scroll-mt-24">
              <Image src={activity.image} alt={activity.title} width={1200} height={700} className="h-56 w-full object-cover" />
              <div className="space-y-4 p-5 md:p-6">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.03em] md:text-2xl">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">Level: {activity.level}</p>
                </div>

                <p className="text-sm leading-7 text-muted-foreground">{activity.introNote}</p>
                <div className="flex flex-wrap gap-2">
                  {activity.quickKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-[color:var(--border)] bg-muted px-3 py-1 text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>

                {activity.sections.map((section) => (
                  <section key={section.heading} className="rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4">
                    <h4 className="text-base font-semibold">{section.heading}</h4>
                    <div className="mt-2 space-y-2">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                <section className="rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4">
                  <h4 className="text-base font-semibold">Research sources</h4>
                  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                    {activity.sources.map((source) => (
                      <li key={source.url}>
                        <a href={source.url} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-3">
                          {source.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel rounded-[1.75rem] p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Want help putting it together?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us how many days you have, what kind of pace you enjoy, and whether you want your trip to lean more toward mountains, culture, wildlife, or rest. We can help you combine it into one plan that actually feels comfortable to travel.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground">
          Plan my Nepal trip
        </Link>
      </section>
    </div>
  );
}
