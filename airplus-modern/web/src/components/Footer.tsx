import Link from "next/link";
import contactData from "../../public/information/contact.json";
import directorData from "../../public/information/director.json";
import { footerSections } from "@/components/siteMenus";

type Company = { registered?: string; tourismLicense?: string; vat?: string };
type Rep = { country: string; name: string; phone: string; email: string };

export default function Footer() {
  const year = new Date().getFullYear();
  const company = (contactData as { company?: Company }).company || {};
  const office = (contactData as { headOffice?: { phones?: string[]; email?: string; address?: string } }).headOffice;
  const reps = (contactData as { representatives?: Rep[] }).representatives || [];
  const dir = directorData as { name?: string; title?: string; message?: string[] };
  const short = (dir.message?.[0] || "Welcome to AirPlus Nepal — seamless, memorable adventures.").replace(/\.$/, "");
  const directorNote = `${short}.`;

  return (
    <footer className="mt-10 border-t border-white/10">
      <div className="container-px py-10 text-sm text-muted-foreground space-y-8">
        <div className="text-base md:text-lg text-foreground/90 [font-family:'Bradley_Hand','Segoe_Script','Comic_Sans_MS',cursive]">
          <Link href="/director" className="hover:underline">
            “{directorNote}” <span className="text-muted-foreground">— Madan Bhandari, Director</span>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <div className="lg:col-span-2 space-y-3">
            <div className="text-lg font-semibold text-foreground">AirPlus Nepal</div>
            <p className="max-w-md text-sm">
              Professional trekking and cultural tour operator based in Kathmandu, focused on safe itineraries, strong logistics, and real local expertise.
            </p>
            <div className="space-y-1 text-sm">
              {office?.address && <div>{office.address}</div>}
              {office?.phones && office.phones.length > 0 && <div>{office.phones.join(" • ")}</div>}
              {office?.email && <div><a href={`mailto:${office.email}`} className="underline">{office.email}</a></div>}
            </div>
            <Link href="/contact" className="inline-flex rounded-full bg-primary px-4 py-2 text-primary-foreground font-medium">
              Start Planning
            </Link>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <div className="text-foreground font-medium mb-3">{section.title}</div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mini reps bar (country only) */}
        {Array.isArray(reps) && reps.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-muted-foreground/80">Local reps:</span>
            {reps.map((r: Rep) => (
              <span key={r.email} className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                {flagEmoji(r.country)} {r.country}
              </span>
            ))}
            <span className="opacity-70">•</span>
            <Link href="/contact" className="underline">See details</Link>
          </div>
        )}

        <div className="pt-3 border-t border-white/10 text-xs">
          © {year} AirPlus Nepal • Reg: {company.registered} • License: {company.tourismLicense} • VAT: {company.vat}
        </div>
      </div>
    </footer>
  );
}

function flagEmoji(country: string): string {
  const m: Record<string, string> = {
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    Japan: "🇯🇵",
    USA: "🇺🇸",
  };
  return m[country] || "🌍";
}
