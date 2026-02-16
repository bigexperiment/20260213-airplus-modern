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
        <h1 className="text-3xl md:text-5xl font-semibold">Nepal Tours and Activities</h1>
        <p className="mt-3 text-muted-foreground">
          This page collects practical, research-based tour and activity guides with current 2024/2025 cost ranges,
          timing notes, and planning tips.
        </p>
      </div>

      <section className="rounded-3xl border border-white/10 bg-black/10 p-5 md:p-7">
        <h2 className="text-xl font-semibold">Quick Menu</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium text-foreground/90">Popular Tours</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tourGuides.map((tour) => (
                <a
                  key={tour.id}
                  href={`#${tour.id}`}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10"
                >
                  {tour.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground/90">Adventure Activities</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {activityGuides.map((activity) => (
                <a
                  key={activity.id}
                  href={`#${activity.id}`}
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10"
                >
                  {activity.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Popular Nepal Tours</h2>
        {tourGuides.map((tour, idx) => (
          <article
            id={tour.id}
            key={tour.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-black/10 scroll-mt-24"
          >
            <div className="relative">
              <Image
                src={tour.image}
                alt={tour.title}
                width={1280}
                height={760}
                sizes="(max-width: 768px) 100vw, 90vw"
                priority={idx === 0}
                className="h-64 md:h-80 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <h3 className="text-2xl font-semibold text-white">{tour.title}</h3>
                <p className="text-sm text-white/80">{tour.duration}</p>
              </div>
            </div>

            <div className="p-5 md:p-7 space-y-4">
              <p className="text-sm text-muted-foreground">{tour.introNote}</p>
              <div className="flex flex-wrap gap-2">
                {tour.quickKeywords.map((keyword) => (
                  <span key={keyword} className="rounded-full border border-white/15 px-3 py-1 text-xs">
                    {keyword}
                  </span>
                ))}
              </div>

              {tour.sections.map((section) => (
                <section key={section.heading} className="rounded-2xl border border-white/10 bg-black/15 p-4 md:p-5">
                  <h4 className="text-lg font-semibold">{section.heading}</h4>
                  <div className="mt-2 space-y-2">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-3 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <section className="rounded-2xl border border-white/10 bg-black/15 p-4 md:p-5">
                <h4 className="text-lg font-semibold">Research Sources</h4>
                <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                  {tour.sources.map((source) => (
                    <li key={source.url}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                        className="underline decoration-dotted underline-offset-3"
                      >
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
        <h2 className="text-2xl md:text-3xl font-semibold">Top Adventure Activities</h2>
        <div className="grid gap-6 xl:grid-cols-2">
          {activityGuides.map((activity) => (
            <article
              id={activity.id}
              key={activity.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-black/10 scroll-mt-24"
            >
              <Image src={activity.image} alt={activity.title} width={1200} height={700} className="h-56 w-full object-cover" />
              <div className="p-5 md:p-6 space-y-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground">Level: {activity.level}</p>
                </div>

                <p className="text-sm text-muted-foreground">{activity.introNote}</p>
                <div className="flex flex-wrap gap-2">
                  {activity.quickKeywords.map((keyword) => (
                    <span key={keyword} className="rounded-full border border-white/15 px-3 py-1 text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>

                {activity.sections.map((section) => (
                  <section key={section.heading} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                    <h4 className="text-base font-semibold">{section.heading}</h4>
                    <div className="mt-2 space-y-2">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets && section.bullets.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                <section className="rounded-2xl border border-white/10 bg-black/15 p-4">
                  <h4 className="text-base font-semibold">Research Sources</h4>
                  <ul className="mt-2 list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
                    {activity.sources.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-dotted underline-offset-3"
                        >
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

      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary/12 to-accent/12 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Need a custom route?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us your number of days, comfort level, and interests. We can combine treks, cultural tours, and
          activities into one realistic plan.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium">
          Plan My Nepal Trip
        </Link>
      </section>
    </div>
  );
}
