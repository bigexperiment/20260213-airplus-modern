import { MapPin, Phone } from "lucide-react";

type LocationMapProps = {
  address: string;
  phones?: string[];
};

export default function LocationMap({ address, phones = [] }: LocationMapProps) {
  const embedQuery = encodeURIComponent(address);
  const embedSrc = `https://maps.google.com/maps?q=${embedQuery}&hl=en&z=16&output=embed`;

  return (
    <section className="border-t border-[color:var(--border)] bg-white/60">
      <div className="container-px py-5 md:py-6">
        <div className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
            <div className="flex flex-col justify-center p-4 md:p-5">
              <p className="flex items-start gap-2 text-sm leading-relaxed text-foreground md:text-base">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                {address}
              </p>
              {phones.length > 0 && (
                <div className="mt-3 space-y-1">
                  {phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 text-sm text-foreground transition hover:text-primary md:text-base"
                    >
                      <Phone className="size-4 shrink-0 text-primary" />
                      {phone}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="relative min-h-[10rem] bg-muted lg:min-h-[11rem]">
              <iframe
                title={`Map showing ${address}`}
                src={embedSrc}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
