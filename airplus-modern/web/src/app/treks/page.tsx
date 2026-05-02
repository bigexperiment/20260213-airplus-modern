import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { popularTrekSlugs } from "@/content/trekGuides";

type Trek = {
  slug: string;
  title: string;
  region: string;
  duration: string;
  destination: string;
  maxElevation?: string;
  difficulty?: string;
  coverImage?: string;
  images?: { src: string; name?: string }[];
};

async function readTreks(): Promise<Trek[]> {
  const treksDir = path.join(process.cwd(), "public/information/treks");
  const files = await fs.readdir(treksDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));
  const treks = await Promise.all(
    jsonFiles.map(async (f) => {
      const data = await fs.readFile(path.join(treksDir, f), "utf8");
      return JSON.parse(data) as Trek;
    })
  );
  const order = new Map<string, number>(popularTrekSlugs.map((slug, idx) => [slug, idx]));
  return treks.sort((a, b) => {
    const aOrder = order.get(a.slug);
    const bOrder = order.get(b.slug);
    if (aOrder !== undefined && bOrder !== undefined) return aOrder - bOrder;
    if (aOrder !== undefined) return -1;
    if (bOrder !== undefined) return 1;
    return a.title.localeCompare(b.title);
  });
}

export default async function TreksPage() {
  const treks = await readTreks();
  const pickImageFor = (t: Trek): string => {
    const slug = t.slug.toLowerCase();
    if (t.coverImage) return t.coverImage;
    if (t.images && t.images.length) return t.images[0].src;
    if (slug.includes("everest")) return "/information/assets/trekking_everest2.jpg";
    if (slug.includes("annapurna-base-camp")) return "/information/assets/cover_annapurna_base_camp.jpg";
    if (slug.includes("annapurna-circuit")) return "/information/assets/cover_annapurna_circuit.jpg";
    if (slug.includes("mardi-himal")) return "/information/assets/cover_mardi_himal.jpg";
    if (slug.includes("poon-hill")) return "/information/assets/cover_poon_hill.jpg";
    if (slug.includes("gokyo")) return "/information/assets/cover_gokyo_lake.jpg";
    if (slug.includes("langtang")) return "/information/assets/cover_langtang_valley.jpg";
    if (slug.includes("manaslu")) return "/information/assets/trekking_manaslu2.jpg";
    return "/information/assets/hero_main.png";
  };
  return (
    <div className="section container-px">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em]">Treks in Nepal</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground leading-7">
        Browse the main trekking routes we feature, from shorter teahouse walks to longer high-mountain journeys. If you are still comparing options, this is a good place to get a feel for what suits your time and energy best.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treks.map((t) => {
          const cover = pickImageFor(t);
          return (
            <Link key={t.slug} href={`/treks/${t.slug}`} className="group panel overflow-hidden rounded-[1.5rem] transition hover:-translate-y-0.5">
              <Image src={cover} alt={t.title} width={960} height={640} className="h-56 w-full object-cover transition group-hover:scale-[1.02]" />
              <div className="p-5">
                <div className="text-lg font-semibold tracking-[-0.03em]">{t.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.region} • {t.duration}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
