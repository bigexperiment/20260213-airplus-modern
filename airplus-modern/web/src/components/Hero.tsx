import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPinned } from "lucide-react";
import Balancer from "react-wrap-balancer";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  primaryHref: string;
  secondaryHref: string;
};

export default function Hero({ title, subtitle, image, primaryHref, secondaryHref }: Props) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-white shadow-[0_20px_50px_rgba(22,35,31,0.06)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-7 md:p-10 lg:p-12">
          <div className="eyebrow">
            <MapPinned className="size-3.5" />
            Local trekking company in Nepal
          </div>
          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-semibold leading-[0.98] tracking-[-0.05em] md:text-6xl">
            <Balancer>{title}</Balancer>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            <Balancer>{subtitle}</Balancer>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={primaryHref} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95">
              Browse treks
              <ArrowRight className="size-4" />
            </Link>
            <Link href={secondaryHref} className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted">
              Start planning
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 border-t border-[color:var(--border)] pt-6">
            {[
              ["Kathmandu based", "Local logistics"],
              ["Small-team planning", "Direct contact"],
              ["Simple pricing", "Clear route options"],
            ].map(([titleText, detail]) => (
              <div key={titleText} className="min-w-[9rem]">
                <div className="text-sm font-semibold">{titleText}</div>
                <div className="mt-1 text-sm text-muted-foreground">{detail}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[22rem] border-t border-[color:var(--border)] lg:min-h-full lg:border-l lg:border-t-0">
          <Image
            src={image}
            alt="Himalayan landscape"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/12 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-black/5" />
        </div>
      </div>
    </div>
  );
}
