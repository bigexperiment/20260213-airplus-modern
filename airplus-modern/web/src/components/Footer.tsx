import Link from "next/link";
import contactData from "../../public/information/contact.json";
import BrandLogo from "@/components/BrandLogo";

type Company = { registered?: string; tourismLicense?: string; vat?: string };

export default function Footer() {
  const year = new Date().getFullYear();
  const company = (contactData as { company?: Company }).company || {};
  const office = (contactData as { headOffice?: { phones?: string[]; email?: string; address?: string } }).headOffice;

  return (
    <footer className="mt-16 bg-[#0f3468] text-white">
      <div className="container-px grid gap-8 py-12 md:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
        <div className="space-y-4">
          <BrandLogo />
          <p className="max-w-xs text-sm leading-7 text-white/78">
            We help travelers explore Nepal with clear local advice, practical planning, and trips that still feel personal once they begin.
          </p>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold">Quick Links</div>
          <div className="space-y-2 text-sm text-white/78">
            <Link href="/" className="block hover:text-white">Home</Link>
            <Link href="/director" className="block hover:text-white">About Us</Link>
            <Link href="/treks" className="block hover:text-white">Treks</Link>
            <Link href="/tours" className="block hover:text-white">Tour Packages</Link>
            <Link href="/travel-guide" className="block hover:text-white">Blog</Link>
            <Link href="/contact" className="block hover:text-white">Contact Us</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold">Popular Treks</div>
          <div className="space-y-2 text-sm text-white/78">
            <Link href="/treks/everest-base-camp" className="block hover:text-white">Everest Base Camp Trek</Link>
            <Link href="/treks/annapurna-base-camp" className="block hover:text-white">Annapurna Base Camp Trek</Link>
            <Link href="/treks/langtang-valley" className="block hover:text-white">Langtang Valley Trek</Link>
            <Link href="/treks/manaslu-circuit" className="block hover:text-white">Manaslu Circuit Trek</Link>
            <Link href="/treks/gokyo-lake" className="block hover:text-white">Gokyo Lakes Trek</Link>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold">Contact Us</div>
          <div className="space-y-2 text-sm leading-7 text-white/78">
            <div>{office?.address}</div>
            <div>{office?.phones?.[0]}</div>
            <div>{office?.phones?.[1]}</div>
            <div>{office?.email}</div>
            <div>www.airplusnepal.com</div>
          </div>
        </div>
        <div>
          <div className="mb-4 text-sm font-semibold">Newsletter</div>
          <p className="text-sm leading-7 text-white/78">
            Get simple travel tips, seasonal ideas, and useful updates from our team in Nepal.
          </p>
          <div className="mt-4 space-y-3">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-lg border border-white/15 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            />
            <button className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/12">
        <div className="container-px flex flex-col gap-3 py-5 text-xs text-white/62 md:flex-row md:items-center md:justify-between">
          <div>© {year} Airplusnepal Treks & Expedition Pvt. Ltd. All Rights Reserved.</div>
          <div>Reg: {company.registered} • License: {company.tourismLicense} • VAT: {company.vat}</div>
        </div>
      </div>
    </footer>
  );
}
