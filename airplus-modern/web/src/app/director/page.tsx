import { promises as fs } from "node:fs";
import path from "node:path";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Director = { name: string; title: string; photo: string; message: string[] };

async function readDirector(): Promise<Director> {
  const file = path.join(process.cwd(), "public/information/director.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as Director;
}

export default async function DirectorPage() {
  const director = await readDirector();

  return (
    <div className="container-px section grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <div className="overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white shadow-sm">
          <Image src={director.photo} alt={director.name} width={800} height={1000} className="w-full h-auto object-cover" />
        </div>
        <div className="mt-3">
          <div className="text-xl font-semibold tracking-[-0.03em]">{director.name}</div>
          <div className="text-muted-foreground">{director.title}</div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em]">A note from the director</h1>
        {(director.message || []).map((p, i) => (
          <p key={i} className="text-lg leading-8 text-muted-foreground">{p}</p>
        ))}
        <p className="text-sm text-muted-foreground">— {director.name}, {director.title}</p>
      </div>
    </div>
  );
}

