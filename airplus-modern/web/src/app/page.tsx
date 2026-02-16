import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import {
  Mountain,
  MapIcon,
  Camera,
  Phone,
  Mail,
  ShieldCheck,
  Clock3,
  Leaf,
  Star,
  Route,
  Wallet,
  Plane,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero";
import GradientText from "@/components/GradientText";
import TrekCard from "@/components/TrekCard";
import FAQ from "@/components/FAQ";
import PlanForm from "@/components/PlanForm";
import MasonryGallery from "@/components/MasonryGallery";
import { popularTrekSlugs } from "@/content/trekGuides";

async function readJson<T>(relative: string): Promise<T> {
  const file = path.join(process.cwd(), "public", relative);
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data) as T;
}

type HomeData = {
  hero: { title: string; subtitle: string; image: string };
  trekkingPackages: { name: string; duration: string; image: string; link: string }[];
  tourPackages: { name: string; duration: string; image: string; link: string }[];
  activities: { name: string; icon: string }[];
  testimonials: { name: string; text: string }[];
  gallery: { images: string[] };
  reviews: { score: number; countText: string };
};

type ContactData = {
  headOffice: { name: string; address: string; phones: string[]; whatsapp?: string; email: string };
};

type TrekSummary = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  maxElevation?: string;
  difficulty?: string;
  coverImage?: string;
  images?: { src: string; name?: string }[];
};

async function readTreks(): Promise<TrekSummary[]> {
  const treksDir = path.join(process.cwd(), "public/information/treks");
  const files = await fs.readdir(treksDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const treks = await Promise.all(
    jsonFiles.map(async (f) => {
      const data = await fs.readFile(path.join(treksDir, f), "utf8");
      return JSON.parse(data) as TrekSummary;
    })
  );
  return treks;
}

export default async function Home() {
  const [home, contact, treks] = await Promise.all([
    readJson<HomeData>("information/home.json"),
    readJson<ContactData>("information/contact.json"),
    readTreks(),
  ]);

  const iconFor = (name: string) => {
    switch (name) {
      case "Trekking":
        return <Mountain className="size-5" />;
      case "Cultural Tours":
        return <Camera className="size-5" />;
      default:
        return <MapIcon className="size-5" />;
    }
  };

  const pickImageForSlug = (slug: string): string => {
    const s = slug.toLowerCase();
    if (s.includes("everest")) return "/information/assets/trekking_everest1.jpg";
    if (s.includes("annapurna-base-camp")) return "/information/assets/cover_annapurna_base_camp.jpg";
    if (s.includes("annapurna-circuit")) return "/information/assets/cover_annapurna_circuit.jpg";
    if (s.includes("langtang")) return "/information/assets/cover_langtang_valley.jpg";
    if (s.includes("mardi-himal")) return "/information/assets/cover_mardi_himal.jpg";
    if (s.includes("poon-hill")) return "/information/assets/cover_poon_hill.jpg";
    if (s.includes("gokyo")) return "/information/assets/cover_gokyo_lake.jpg";
    if (s.includes("manaslu")) return "/information/assets/trekking_manaslu1.jpg";
    return "/information/assets/hero_main.png";
  };

  const order = new Map<string, number>(popularTrekSlugs.map((slug, idx) => [slug, idx]));
  const featuredTreks = treks
    .sort((a, b) => {
      const aOrder = order.get(a.slug);
      const bOrder = order.get(b.slug);
      if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
      if (aOrder !== undefined) return -1;
      if (bOrder !== undefined) return 1;
      return a.title.localeCompare(b.title);
    })
    .slice(0, 8);

  const tourAnchorFromLink = (link: string, name: string): string => {
    const last = (link || "").split("/").filter(Boolean).pop();
    if (last) return last;
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const seasonCards = [
    { season: "Spring", months: "Mar - May", mood: "Colorful forests and stable mountain weather." },
    { season: "Autumn", months: "Sep - Nov", mood: "The clearest skies and peak trekking rhythm." },
    { season: "Winter", months: "Dec - Feb", mood: "Quiet trails and dramatic, crisp landscapes." },
  ];

  const routeIntelligence = [
    {
      icon: <Route className="size-4" />,
      title: "Route Match",
      detail: "We match trek grade, number of days, and altitude profile to your pace.",
    },
    {
      icon: <Wallet className="size-4" />,
      title: "Budget Clarity",
      detail: "Get realistic cost bands for permits, transport, guide, and teahouse spending.",
    },
    {
      icon: <Plane className="size-4" />,
      title: "Logistics Buffer",
      detail: "Weather and transfer buffers are built in so your trip does not feel rushed.",
    },
  ];

  return (
    <div className="min-h-screen bg-noise aurora-bg">
      <section className="section container-px pb-4">
        <Hero title={home.hero.title} subtitle={home.hero.subtitle} image={home.hero.image} primaryHref="#trekking" secondaryHref="#tours" />
      </section>

      <section className="container-px pb-4">
        <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-black/30 to-black/10 px-4 py-3 md:px-6 md:py-4">
          <div className="grid gap-3 text-base md:text-sm md:grid-cols-3">
            <div className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Verified guides</div>
            <div className="inline-flex items-center gap-2"><Clock3 className="size-4 text-primary" /> 24/7 local support</div>
            <div className="inline-flex items-center gap-2"><Leaf className="size-4 text-primary" /> Responsible routes</div>
          </div>
        </div>
      </section>

      <section className="section container-px pt-8">
        <div className="grid gap-4 md:grid-cols-3">
          {home.activities.map((a) => (
            <div key={a.name} className="group rounded-2xl border border-white/12 bg-black/15 p-5 transition hover:-translate-y-0.5 hover:border-primary/45">
              <div className="inline-flex items-center gap-2 text-primary">
                {iconFor(a.name)}
                <span className="text-xs uppercase tracking-wider">Travel Mode</span>
              </div>
              <div className="mt-3 text-xl md:text-lg font-medium">{a.name}</div>
              <p className="mt-1 text-base md:text-sm text-muted-foreground md:hidden">Clear routes, clear prices.</p>
              <p className="mt-1 text-sm text-muted-foreground hidden md:block">Curated options with practical timings, local support, and clear cost expectations.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-px pt-2">
        <div className="grid gap-3 sm:grid-cols-4">
          {[{ k: "Years", v: "12+" }, { k: "Curated Treks", v: "100+" }, { k: "Local Guides", v: "25+" }, { k: "Guest Rating", v: "4.9/5" }].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-black/10 p-5">
              <div className="text-3xl font-semibold tracking-tight">{s.v}</div>
              <div className="text-sm text-muted-foreground">{s.k}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="trekking" className="section container-px">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Top Routes This Season</h2>
            <p className="mt-1 text-base md:text-sm text-muted-foreground md:hidden">Pick your trek and go.</p>
            <p className="mt-1 text-sm text-muted-foreground hidden md:block">From first trek to high-altitude challenge, pick your line and pace.</p>
          </div>
          <Link href="/treks" className="text-sm text-muted-foreground hover:text-foreground">View all treks</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredTreks.map((t) => {
            const cover = t.coverImage || t.images?.[0]?.src || pickImageForSlug(t.slug);
            return (
              <TrekCard
                key={t.slug}
                title={t.title}
                slug={t.slug}
                region={t.region}
                duration={t.duration}
                difficulty={t.difficulty}
                maxElevation={t.maxElevation}
                cover={cover}
              />
            );
          })}
        </div>
      </section>

      <section className="section container-px pt-4">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-primary/12 via-black/10 to-accent/12 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl md:text-3xl font-semibold">Trail Intelligence</h2>
              <p className="mt-2 max-w-2xl text-base md:text-sm text-muted-foreground md:hidden">Smarter planning. Less stress.</p>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground hidden md:block">Better trips come from better prep. We blend local logistics, route reality, and your energy level.</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs">
              <Sparkles className="size-3.5 text-accent" /> Smart planning, less guesswork
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {routeIntelligence.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-5">
                <div className="inline-flex items-center gap-2 text-primary">{item.icon}<span className="font-medium">{item.title}</span></div>
                <p className="mt-2 text-base md:text-sm text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tours" className="section container-px">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold">Journeys Beyond The Trail</h2>
            <p className="mt-1 text-base md:text-sm text-muted-foreground md:hidden">Tours, safaris, and city escapes.</p>
            <p className="mt-1 text-sm text-muted-foreground hidden md:block">Culture, wildlife, and short escapes that pair perfectly with trekking itineraries.</p>
          </div>
          <Link href="/tours" className="text-sm text-muted-foreground hover:text-foreground">Open full tour guide</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {home.tourPackages.map((p) => (
            <Link
              key={p.name}
              href={`/tours#${tourAnchorFromLink(p.link, p.name)}`}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-black/15"
            >
              <div className="relative">
                <Image src={p.image} alt={p.name} width={960} height={600} className="h-52 w-full object-cover transition group-hover:scale-[1.03]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/30 px-2.5 py-1 text-[11px] text-white/85">{p.duration}</div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-white text-base font-medium">{p.name}</div>
                  <div className="text-xs text-white/75 mt-1">Read itinerary and cost →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container-px pt-4">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-3xl md:text-3xl font-semibold">Best Time To Trek</h2>
          <Link href="/travel-guide#seasons" className="text-sm text-muted-foreground hover:text-foreground">Season planner</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {seasonCards.map((s) => (
            <div key={s.season} className="rounded-2xl border border-white/10 bg-black/15 p-5">
              <div className="text-lg font-medium">{s.season}</div>
              <div className="text-xs tracking-wide text-primary mt-1">{s.months}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.mood}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-px pt-2">
        <div className="mb-4 flex items-center gap-2 text-amber-300">
          <Star className="size-4 fill-current" />
          <Star className="size-4 fill-current" />
          <Star className="size-4 fill-current" />
          <Star className="size-4 fill-current" />
          <Star className="size-4 fill-current" />
          <span className="ml-1 text-base md:text-sm text-muted-foreground">Loved by trekkers worldwide</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {home.testimonials.map((t) => (
            <div key={t.name} className="glass rounded-2xl p-6">
              <blockquote className="text-balance text-lg">“{t.text}”</blockquote>
              <div className="mt-3 text-sm text-muted-foreground">— {t.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section container-px">
        <h2 className="text-3xl md:text-3xl font-semibold"><GradientText>Moments from Nepal</GradientText></h2>
        <div className="mt-4">
          <MasonryGallery images={home.gallery.images} />
        </div>
      </section>

      <section className="section container-px pt-4">
        <div className="rounded-3xl border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 to-accent/10">
          <div>
            <div className="text-3xl md:text-2xl font-semibold">Ready for the Himalayas?</div>
            <div className="text-base md:text-sm text-muted-foreground md:hidden">Send dates. Get your plan.</div>
            <div className="text-sm text-muted-foreground hidden md:block">Tell us your dates and goals and get a free custom itinerary with realistic pace and logistics.</div>
          </div>
          <Link href="#contact" className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">Start planning</Link>
        </div>
      </section>

      <section className="section container-px pb-16">
        <div className="glass rounded-3xl p-6 flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold">Rated {home.reviews.score} / 5</div>
            <div className="text-base md:text-sm text-muted-foreground">{home.reviews.countText}</div>
          </div>
          <Link href="/contact" className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-medium hover:opacity-90 transition">Plan your trip</Link>
        </div>
      </section>

      <section className="section container-px pt-0">
        <h2 className="text-3xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-3">
          <FAQ />
        </div>
      </section>

      <section id="contact" className="section container-px pb-24">
        <h2 className="text-3xl md:text-3xl font-semibold">Plan Your Trek</h2>
        <p className="text-base md:text-sm text-muted-foreground mt-1">Share dates and goals. We build a clear plan.</p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <PlanForm />
          </div>
          <div className="space-y-3">
            <div className="glass rounded-2xl p-6 space-y-2">
              <div className="text-lg font-medium">Contact</div>
              <div className="text-sm text-muted-foreground">{contact.headOffice.name}</div>
              <div className="text-sm text-muted-foreground">{contact.headOffice.address}</div>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div className="inline-flex items-center gap-2"><Phone className="size-4" /> {contact.headOffice.phones.join(", ")}</div>
                <div className="inline-flex items-center gap-2"><Mail className="size-4" /> <a className="underline" href={`mailto:${contact.headOffice.email}`}>{contact.headOffice.email}</a></div>
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="font-medium mb-2">What you get in your plan</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Route options with days and elevation profile</li>
                <li>Accommodation and transport recommendations</li>
                <li>Packing and weather prep guidance</li>
                <li>Transparent cost estimate with no hidden fees</li>
              </ul>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="font-medium mb-2">Why trek with us?</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Licensed guides and safety-first planning</li>
                <li>Flexible itineraries with acclimatization days</li>
                <li>Local-first, low-impact travel ethos</li>
                <li>24/7 support during your trek</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
