import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mountain, Timer } from "lucide-react";

export default function TrekCard({
  title,
  slug,
  region,
  duration,
  maxElevation,
  difficulty,
  cover,
}: {
  title: string;
  slug: string;
  region: string;
  duration: string;
  maxElevation?: string;
  difficulty?: string;
  cover: string;
}) {
  return (
    <Link href={`/treks/${slug}`} className="group panel overflow-hidden rounded-[1.5rem] transition hover:-translate-y-0.5">
      <Image src={cover} alt={title} width={960} height={640} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xl font-semibold tracking-[-0.03em]">{title}</div>
            <div className="mt-1 text-sm text-muted-foreground">{region}</div>
          </div>
          <ArrowUpRight className="mt-1 size-4 text-muted-foreground transition group-hover:text-foreground" />
        </div>
        <div className="inline-flex w-fit rounded-full border border-[color:var(--border)] bg-muted px-3 py-1 text-xs font-medium text-foreground">
          {difficulty || "Moderate"}
        </div>
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
          <Timer className="size-4 text-primary" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mountain className="size-4 text-accent" />
          <span>{maxElevation || "Flexible altitude profile"}</span>
        </div>
      </div>
      </div>
    </Link>
  );
}
