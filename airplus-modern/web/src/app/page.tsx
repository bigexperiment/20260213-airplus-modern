import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CirclePlay, Clock3, MessageSquareQuote, ShieldCheck, Trophy, UserRoundCheck, UsersRound } from "lucide-react";
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
    { title: "Best Time to Trek in Nepal", date: "May 10, 2024", image: "/information/assets/gallery_1.jpg", href: "/travel-guide#seasons" },
    { title: "Packing List for Nepal Trekking", date: "April 25, 2024", image: "/information/assets/gallery_2.jpg", href: "/travel-guide#packing" },
    { title: "Top 10 Places to Visit in Nepal", date: "April 10, 2024", image: "/information/assets/gallery_7.jpg", href: "/tours" },
    { title: "Nepal Travel Guide for Beginners", date: "March 29, 2024", image: "/information/assets/gallery_8.jpg", href: "/travel-guide" },
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
            <h1 className="max-w-2xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white md:text-7xl">
              Explore Nepal. Experience the Himalayas.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/88">
              Airplusnepal is your trusted partner for unforgettable trekking, tours and adventure experiences in Nepal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="#popular-treks" className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg">
                Explore Treks
                <ArrowRight className="size-4" />
              </Link>
              <button type="button" className="inline-flex items-center gap-3 text-sm font-medium text-white">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-lg">
                  <CirclePlay className="size-5" />
                </span>
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-px relative z-20 -mt-10 md:-mt-12">
        <div className="grid gap-px overflow-hidden rounded-[1.25rem] border border-[color:var(--border)] bg-white shadow-[0_18px_45px_rgba(18,43,86,0.12)] md:grid-cols-4">
          {[
            { title: "Local Experts", text: "Team of experienced and licensed local guides.", Icon: UsersRound },
            { title: "Safety First", text: "Your safety and comfort are our top priorities.", Icon: ShieldCheck },
            { title: "Best Price Guarantee", text: "Competitive prices with no hidden charges.", Icon: Trophy },
            { title: "24/7 Support", text: "We are here to assist you anytime, anywhere.", Icon: UserRoundCheck },
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
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Popular Treks</h2>
          <p className="mt-3 text-sm text-muted-foreground">Explore our handpicked trekking packages in Nepal.</p>
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-4 md:grid-cols-2">
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
              </div>
              <div className="p-5">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">{trek.title}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-4" /> {trek.duration}</span>
                  <span>{trek.difficulty || "Moderate"}</span>
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
        <div className="mt-10 text-center">
          <Link href="/treks" className="inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground">
            View All Treks
          </Link>
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
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">About Airplusnepal</div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">Your Journey, Our Passion</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              Airplusnepal Treks & Expedition Pvt. Ltd. is a government registered company based in Kathmandu, Nepal. We are a team of passionate travel enthusiasts dedicated to providing exceptional trekking, tour and adventure experiences in the Himalayas.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Government Registered & Licensed Company</div>
              <div className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Experienced, Friendly & Professional Team</div>
              <div className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Sustainable & Responsible Tourism</div>
              <div className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Thousands of Happy Travelers</div>
            </div>
            <Link href="/director" className="mt-8 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <section className="container-px py-16">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">What Our Travelers Say</h2>
          <p className="mt-3 text-sm text-muted-foreground">Real experiences from our happy clients.</p>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {home.testimonials.slice(0, 3).map((item, index) => (
            <div key={item.name + index} className="rounded-[1.25rem] border border-[color:var(--border)] bg-white p-6 shadow-[0_12px_30px_rgba(18,43,86,0.06)]">
              <MessageSquareQuote className="size-8 text-primary" />
              <p className="mt-4 text-sm leading-7 text-muted-foreground">“{item.text}”</p>
              <div className="mt-5 text-sm font-semibold">{item.name}</div>
              <div className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{["USA", "UK", "Spain"][index] || "Traveler"}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-px py-8 md:py-12">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.04em]">Latest from Our Blog</h2>
          <p className="mt-3 text-sm text-muted-foreground">Tips, guides and inspiration for your next adventure.</p>
        </div>
        <div className="mt-10 grid gap-6 xl:grid-cols-4 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.title} className="overflow-hidden rounded-[1.1rem] border border-[color:var(--border)] bg-white shadow-[0_10px_24px_rgba(18,43,86,0.06)]">
              <Image src={post.image} alt={post.title} width={720} height={480} className="h-52 w-full object-cover" />
              <div className="p-5">
                <div className="text-xs text-muted-foreground">{post.date}</div>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{post.title}</h3>
                <Link href={post.href} className="mt-5 inline-flex text-sm font-medium text-primary hover:underline">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/travel-guide" className="inline-flex rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground">
            View All Articles
          </Link>
        </div>
      </section>
    </div>
  );
}
