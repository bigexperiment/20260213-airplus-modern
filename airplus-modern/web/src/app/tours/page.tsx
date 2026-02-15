import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";

type TourPkg = { name: string; duration: string; image: string; link: string };
type HomeData = { tourPackages: TourPkg[] };

async function readHome(): Promise<HomeData> {
  const file = path.join(process.cwd(), "public/information/home.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as HomeData;
}

function anchorFor(link: string, name: string): string {
  const last = (link || "").split("/").filter(Boolean).pop();
  if (last) return last;
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function ToursPage() {
  const home = await readHome();
  const tours = home.tourPackages || [];

  return (
    <div className="container-px section">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold">Cultural Tours in Nepal</h1>
        <p className="mt-2 text-muted-foreground">
          Discover UNESCO heritage sites, mountain viewpoints, lakeside cities, and wildlife destinations with flexible private or group departures.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {tours.map((tour, idx) => {
          const anchor = anchorFor(tour.link, tour.name);
          return (
            <article id={anchor} key={tour.name} className="overflow-hidden rounded-3xl border border-white/10 bg-black/10 scroll-mt-24">
              <div className="relative">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <h2 className="text-white text-xl font-semibold">{tour.name}</h2>
                  <p className="text-white/80 text-sm">{tour.duration}</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-muted-foreground">
                  Guided sightseeing, comfortable stays, private transfers, and optional local experiences can all be customized around your preferred travel pace.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Customizable Itinerary</span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Local Guide Support</span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs">Private Transfers</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-primary/12 to-accent/12 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Need a private custom tour?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your dates, interests, and travel style. We will build a city-and-nature route that fits your schedule.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium">
          Plan My Tour
        </Link>
      </div>
    </div>
  );
}
