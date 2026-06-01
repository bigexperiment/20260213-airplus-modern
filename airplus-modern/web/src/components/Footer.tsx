import Link from "next/link";
import contactData from "../../public/information/contact.json";
import BrandLogo from "@/components/BrandLogo";
import LocationMap from "@/components/LocationMap";

type Company = { registered?: string; tourismLicense?: string; vat?: string };

export default function Footer() {
  const year = new Date().getFullYear();
  const company = (contactData as { company?: Company }).company || {};
  const office = (contactData as {
    headOffice?: { phones?: string[]; email?: string; address?: string; mapsUrl?: string };
  }).headOffice;

  return (
    <footer className="mt-16 border-t border-[color:var(--border)] bg-[#eff6ff]">
      <div className="container-px grid gap-8 py-12 md:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-7 text-muted-foreground">
            We help travelers explore Nepal with clear local advice, practical planning, and trips that still feel personal once they begin.
          </p>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold text-[#334155]">Quick Links</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link href="/" className="block hover:text-primary">Home</Link>
            <Link href="/director" className="block hover:text-primary">About Us</Link>
            <Link href="/treks" className="block hover:text-primary">Treks</Link>
            <Link href="/tours" className="block hover:text-primary">Tour Packages</Link>
            <Link href="/travel-guide" className="block hover:text-primary">Blog</Link>
            <Link href="/contact" className="block hover:text-primary">Contact Us</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold text-[#334155]">Popular Treks</div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link href="/treks/everest-base-camp" className="block hover:text-primary">Everest Base Camp Trek</Link>
            <Link href="/treks/everest-three-passes" className="block hover:text-primary">Everest Three Passes Trek</Link>
            <Link href="/treks/gokyo-lake" className="block hover:text-primary">Gokyo Lakes Trek</Link>
            <Link href="/treks/annapurna-base-camp" className="block hover:text-primary">Annapurna Base Camp Trek</Link>
            <Link href="/treks/annapurna-circuit" className="block hover:text-primary">Annapurna Circuit Trek</Link>
            <Link href="/treks/poon-hill" className="block hover:text-primary">Poon Hill Trek</Link>
            <Link href="/treks/khopra-danda" className="block hover:text-primary">Khopra Danda Trek</Link>
            <Link href="/treks/mardi-himal" className="block hover:text-primary">Mardi Himal Trek</Link>
            <Link href="/treks/langtang-valley" className="block hover:text-primary">Langtang Valley Trek</Link>
            <Link href="/treks/manaslu-circuit" className="block hover:text-primary">Manaslu Circuit Trek</Link>
            <Link href="/treks/tsum-valley" className="block hover:text-primary">Tsum Valley Trek</Link>
            <Link href="/treks/upper-mustang" className="block hover:text-primary">Upper Mustang Trek</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold text-[#334155]">Contact Us</div>
          <div className="space-y-2 text-sm leading-7 text-muted-foreground">
            <div>{office?.address}</div>
            <div>{office?.phones?.[0]}</div>
            <div>{office?.phones?.[1]}</div>
            <div>{office?.email}</div>
            <div>www.airplusnepal.com</div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold text-[#334155]">Newsletter</div>
          <p className="text-sm leading-7 text-muted-foreground">
            Get simple travel tips, seasonal ideas, and useful updates from our team in Nepal.
          </p>
          <div className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="field"
            />
            <button className="btn-accent w-full">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {office?.address && (
        <LocationMap address={office.address} phones={office.phones} />
      )}

      <div className="border-t border-[color:var(--border)] bg-white/60">
        <div className="container-px py-2 text-[0.6875rem] leading-snug text-muted-foreground">
          © {year} Airplusnepal Treks & Expedition Pvt. Ltd. All Rights Reserved. Reg: {company.registered} • License: {company.tourismLicense} • VAT: {company.vat}
        </div>
      </div>
    </footer>
  );
}
