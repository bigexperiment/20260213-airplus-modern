import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Nepal Travel Guide (2024/2025): Permits, Seasons and Packing",
  description:
    "A practical Nepal travel guide with current permit references, seasonal planning, and smart packing advice.",
};

const seasonRows = [
  {
    season: "Spring (Mar-May)",
    conditions: "Mild temperatures, flowering hills, and good visibility in many regions",
    bestFor: "Everest, Annapurna, Langtang, and mixed city + trek routes",
  },
  {
    season: "Monsoon (Jun-Aug)",
    conditions: "Frequent rain at lower elevations, greener landscapes, possible transport delays",
    bestFor: "Cultural tours, short trips, and flexible itineraries",
  },
  {
    season: "Autumn (Sep-Nov)",
    conditions: "Clear skies, stable trekking weather, high trail demand",
    bestFor: "Peak-season trekking in Nepal and mountain-view itineraries",
  },
  {
    season: "Winter (Dec-Feb)",
    conditions: "Cold mornings, quieter trails, variable high-pass conditions",
    bestFor: "Lower and mid-altitude treks, city tours, and scenic flights",
  },
];

const permitRows = [
  {
    permit: "TIMS (organized trekkers)",
    fee: "Approx. NPR 1,000",
    note: "Children below 10 are generally exempt. Confirm latest route-specific policy before departure.",
  },
  {
    permit: "ACAP (Annapurna Conservation Area)",
    fee: "Approx. NPR 3,000 (non-SAARC)",
    note: "Used for ABC, Annapurna Circuit, Poon Hill, and Mardi Himal routes.",
  },
  {
    permit: "MCAP (Manaslu Conservation Area)",
    fee: "Approx. NPR 3,000 (non-SAARC)",
    note: "Applies with Manaslu-area travel and combines with restricted permits on full circuit plans.",
  },
  {
    permit: "Sagarmatha National Park",
    fee: "Approx. NPR 3,000 (non-SAARC)",
    note: "Used for Everest region treks alongside Khumbu local permit.",
  },
  {
    permit: "Langtang National Park",
    fee: "Approx. NPR 3,000 (non-SAARC)",
    note: "Required for Langtang Valley and nearby Langtang-region routes.",
  },
  {
    permit: "Khumbu Local Permit",
    fee: "Approx. NPR 3,000",
    note: "Collected for many Everest-region itineraries. Separate from Sagarmatha park entry.",
  },
  {
    permit: "Manaslu Restricted Area Permit",
    fee: "Seasonal USD rate + daily extension",
    note: "Guide/agency handling required. Check latest official rates for your exact travel month.",
  },
];

const packingItems = [
  "Layering system instead of one heavy jacket only.",
  "Broken-in trekking shoes plus lightweight backup sandals.",
  "Rain shell and backpack rain cover in all seasons.",
  "Power bank and charging cable backups.",
  "Reusable bottle and water treatment option.",
  "Basic first-aid and personal prescription medicine.",
  "Sun protection: hat, sunglasses, SPF, lip balm.",
  "Cash buffer for remote stops with no card support.",
];

const sourceLinks = [
  {
    label: "Nepal Tourism Board permit and entry fee references",
    href: "https://nepaltourismboard.gov.np/plan-your-trip/before-you-come/visas-and-entry-procedure",
  },
  {
    label: "Nepal Tourism Board - TIMS card guidance",
    href: "https://ntb.gov.np/plan-your-trip/before-you-come/TIMS%20Card",
  },
  {
    label: "Department of Immigration - trekking permit reference",
    href: "https://www.immigration.gov.np/en/page/trekking-permit",
  },
  {
    label: "Welcome Nepal destination and activity references",
    href: "https://www.welcomenepal.com/things-to-do.html",
  },
];

export default function TravelGuidePage() {
  return (
    <div className="container-px section space-y-10">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] md:text-5xl">Nepal travel guide</h1>
        <p className="mt-3 text-muted-foreground leading-7">
          This page is for the questions most travelers ask before they feel ready to book: when to come, what permits they may need, how much to budget, what to pack, and how to avoid common first-trip mistakes.
        </p>
      </div>

      <section id="seasons" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Best seasons</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[color:var(--border)]">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Season</th>
                <th className="px-4 py-3 font-medium">Conditions</th>
                <th className="px-4 py-3 font-medium">Best for</th>
              </tr>
            </thead>
            <tbody>
              {seasonRows.map((row) => (
                <tr key={row.season} className="border-t border-[color:var(--border)]">
                  <td className="px-4 py-3">{row.season}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.conditions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="permits" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Permits and entry basics (2024/2025)</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Permit rules and fees can change, so think of these as planning numbers first and final confirmation points later.
        </p>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-[color:var(--border)]">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Permit</th>
                <th className="px-4 py-3 font-medium">Typical fee</th>
                <th className="px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {permitRows.map((row) => (
                <tr key={row.permit} className="border-t border-[color:var(--border)]">
                  <td className="px-4 py-3">{row.permit}</td>
                  <td className="px-4 py-3">{row.fee}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-1">
        <article id="packing" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Packing essentials</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep your bag simple and useful. Most travelers are happier when they pack fewer extra clothes and pay more attention to layers, feet, water, and small comfort items.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {packingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4 text-sm text-muted-foreground">
            Good trick: if your trip includes both cities and trekking, pack in small groups so you can leave what you do not need at the hotel.
          </div>
        </article>
      </section>

      <section id="activities" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Helpful activity shortcuts</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          If you already know what kind of extra experience you want, these links take you straight to the most useful planning notes.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {[
            ["/tours#kathmandu-pokhara", "Kathmandu and Pokhara"],
            ["/tours#kathmandu-chitwan", "Kathmandu and Chitwan"],
            ["/tours#kathmandu-lumbini", "Kathmandu and Lumbini"],
            ["/tours#paragliding-pokhara", "Paragliding in Pokhara"],
            ["/tours#trishuli-rafting", "White Water Rafting"],
            ["/tours#everest-mountain-flight", "Everest Mountain Flight"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-[color:var(--border)] bg-muted px-3 py-1.5 text-xs hover:bg-white">
              {label}
            </a>
          ))}
        </div>
      </section>

      <section id="sources" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Useful official references</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {sourceLinks.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-3">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="scroll-mt-24">
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">Common questions</h2>
        <FAQ />
      </section>

      <section className="panel rounded-[1.75rem] p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Want help turning this into a real itinerary?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Send us your dates, budget style, and the kind of experience you want, and we can help shape it into something realistic and enjoyable.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground">
          Plan my trip
        </Link>
      </section>
    </div>
  );
}
