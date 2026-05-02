import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, CirclePlay, Clock3, Heart, MapPin, ShieldCheck, Star, Trophy, UserRoundCheck, UsersRound } from "lucide-react";
import { popularTrekSlugs } from "@/content/trekGuides";

async function readJson<T>(relative: string): Promise<T> {
  const file = path.join(process.cwd(), "public", relative);
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data) as T;
}

type HomeData = {
  hero: { title: string; subtitle: string; image: string };
  trekkingPackages: { name: string; duration: string; image: string; link: string }[];
  testimonials: { name: string; text: string }[];
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
  return Promise.all(
    jsonFiles.map(async (f) => {
      const data = await fs.readFile(path.join(treksDir, f), "utf8");
      return JSON.parse(data) as TrekSummary;
    })
  );
}

function trekPrice(slug: string): string {
  if (slug.includes("everest")) return "1,350";
  if (slug.includes("annapurna-base-camp")) return "1,150";
  if (slug.includes("langtang")) return "650";
  if (slug.includes("manaslu")) return "1,450";
  return "950";
}

function trekBadge(index: number): string {
  return ["Best Seller", "Popular", "Trending", "Top Pick"][index] || "Featured";
}

export default async function Home() {
  const [home, treks] = await Promise.all([
    readJson<HomeData>("information/home.json"),
    readTreks(),
  ]);

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
    .slice(0, 4);

  const pickImageForTrek = (trek: TrekSummary, fallback?: string): string => {
    if (trek.coverImage) return trek.coverImage;
    if (trek.images?.[0]?.src) return trek.images[0].src;
    if (fallback) return fallback;
    return "/information/assets/hero_main.png";
  };

  const blogPosts = [
    { title: "First time trekking in Nepal? Start with these 10 useful tips", date: "May 10, 2024", image: "/information/assets/gallery_1.jpg", href: "/travel-guide#seasons", category: "Trekking Tips" },
    { title: "When is the best time to visit Nepal for your kind of trip?", date: "Apr 25, 2024", image: "/information/assets/gallery_2.jpg", href: "/travel-guide#packing", category: "Travel Guide" },
    { title: "7 cultural experiences that make a Nepal trip feel more personal", date: "Apr 10, 2024", image: "/information/assets/gallery_7.jpg", href: "/tours", category: "Culture" },
  ];

  return (
    <div className="bg-noise">
      <section className="relative bg-[#0f4da0]">
        <div className="absolute inset-0">
          <Image src={home.hero.image} alt="Himalayan mountain" fill priority sizes="100vw" className="object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#103d7e]/88 via-[#103d7e]/62 to-[#103d7e]/18" />
        </div>
        <div className="container-px relative z-10 py-16 md:py-24">
          <div className="max-w-3xl py-10 md:py-16">
            <div className="mb-4 text-white">
              <svg width="86" height="42" viewBox="0 0 86 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 30L18 12L28 22L38 8L56 26" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M54 11L61 6L60 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="display-face max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] text-white md:text-8xl">
              Explore Nepal.
              <span className="block text-accent">Live The Adventure.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/88">
              We help you see Nepal in a way that feels clear, welcoming, and worth the journey, whether you want a famous Himalayan trek, a shorter holiday, or a mix of both.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#popular-treks" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg">
                Explore Treks
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/36 px-6 py-3 text-sm font-semibold text-white">
                Plan Your Trip
                <CirclePlay className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px relative z-20 -mt-10 md:-mt-12">
        <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[color:var(--border)] bg-white shadow-[0_18px_45px_rgba(18,43,86,0.12)] md:grid-cols-4">
            {[
            { title: "Local Experts", text: "You are planning with people who know the trails, transport, weather shifts, and small details that make a trip smoother.", Icon: UsersRound },
            { title: "Safety First", text: "We keep the plan realistic, talk honestly about altitude and pace, and make sure you feel looked after on the road and on the trail.", Icon: ShieldCheck },
            { title: "Best Price Guarantee", text: "Our quotes stay simple and easy to understand, so you know what matters and what you can skip.", Icon: Trophy },
            { title: "24/7 Support", text: "If plans change, flights move, or you just need help, there is a real team here to respond.", Icon: UserRoundCheck },
          ].map(({ title, text, Icon }) => (
            <div key={title} className="bg-white p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ff] text-primary">
                <Icon className="size-6" />
              </div>
              <div className="mt-4 text-xl font-semibold">{title}</div>
              <div className="mt-2 text-sm leading-6 text-muted-foreground">{text}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="popular-treks" className="container-px py-16 md:py-20">
        <div className="flex items-center justify-center">
          <h2 className="section-kicker">Popular Treks</h2>
        </div>
        <div className="mt-3 text-center text-sm text-muted-foreground">These are some of the routes travelers ask us about most, especially when they want a classic Nepal experience without overcomplicating the planning.</div>
        <div className="mt-2 text-right">
          <Link href="/treks" className="text-sm font-semibold text-primary hover:underline">View All Treks</Link>
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-4 md:grid-cols-2">
          {featuredTreks.map((trek, index) => (
            <article key={trek.slug} className="overflow-hidden rounded-[1.25rem] border border-[color:var(--border)] bg-white shadow-[0_12px_34px_rgba(18,43,86,0.08)]">
              <div className="relative h-64">
                <Image
                  src={pickImageForTrek(trek, home.trekkingPackages[index]?.image)}
                  alt={trek.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                  {trekBadge(index)}
                </div>
                <button type="button" className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary">
                  <Heart className="size-4" />
                </button>
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{trek.title}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-4" /> {trek.duration}</span>
                  <span>{trek.difficulty || "Moderate"}</span>
                  {trek.maxElevation && <span><MapPin className="mr-1 inline size-4" /> {trek.maxElevation}</span>}
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                  <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">From USD</div>
                  <div className="text-3xl font-semibold text-primary">{trekPrice(trek.slug)}</div>
                  </div>
                  <Link href={`/treks/${trek.slug}`} className="text-sm font-medium text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container-px py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div className="relative overflow-hidden rounded-[1.25rem]">
            <Image src="/information/assets/gallery_7.jpg" alt="Nepal landmark" width={1200} height={900} className="h-full w-full object-cover" />
            <div className="absolute bottom-5 left-5 inline-flex h-28 w-28 flex-col items-center justify-center rounded-full bg-primary text-center text-white shadow-xl">
              <span className="text-4xl font-semibold leading-none">10+</span>
              <span className="mt-1 text-xs uppercase tracking-[0.12em]">Years of Experience</span>
            </div>
          </div>
          <div className="rounded-[1.25rem] border border-[color:var(--border)] bg-white p-7 shadow-[0_12px_34px_rgba(18,43,86,0.08)] md:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">About Us</div>
            <h2 className="mt-4 display-face text-5xl font-black uppercase tracking-[-0.05em]">About Airplusnepal</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Airplusnepal is a local team based in Kathmandu. We work with travelers who want honest advice, steady planning, and a trip that still feels personal once they arrive, not something rushed, confusing, or overly packaged.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-4">
              {[
                ["15+", "Years of Experience"],
                ["1,000+", "Happy Travelers"],
                ["50+", "Destinations"],
                ["98%", "Positive Reviews"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div className="text-3xl font-semibold text-primary">{value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
            <Link href="/director" className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="flex items-center justify-center">
          <h2 className="section-kicker">What Our Travelers Say</h2>
        </div>
        <div className="mt-3 text-center text-sm text-muted-foreground">A few notes from travelers who wanted their Nepal trip to feel exciting, but also well supported from start to finish.</div>
        <div className="mt-4 text-right">
          <Link href="/contact" className="text-sm font-semibold text-primary hover:underline">View All Reviews</Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {home.testimonials.slice(0, 3).map((item, index) => (
            <div key={item.name + index} className="rounded-[1.25rem] border border-[color:var(--border)] bg-white p-6 shadow-[0_12px_30px_rgba(18,43,86,0.06)]">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ff] text-lg font-semibold text-primary">
                  {item.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{["France", "Australia", "USA"][index] || "Traveler"}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">“{item.text}”</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-8 md:py-12">
        <div className="flex items-center justify-center">
          <h2 className="section-kicker">Travel Blog & News</h2>
        </div>
        <div className="mt-4 text-right">
          <Link href="/travel-guide" className="text-sm font-semibold text-primary hover:underline">View All Posts</Link>
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-[1.1rem] border border-[color:var(--border)] bg-white shadow-[0_10px_24px_rgba(18,43,86,0.06)]">
              <div className="relative">
                <Image src={post.image} alt={post.title} width={720} height={480} className="h-56 w-full object-cover" />
                <div className="absolute left-4 top-4 rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-foreground">
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {post.date}</span>
                  <span>By Airplusnepal</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{post.title}</h3>
                <Link href={post.href} className="mt-5 inline-flex text-sm font-medium text-primary hover:underline">
                  Read Article
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
