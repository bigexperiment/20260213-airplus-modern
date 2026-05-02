import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Nepal Travel Guide (2024/2025): Permits, Seasons, Budget and Packing",
  description:
    "A practical Nepal travel guide with current permit references, seasonal planning, estimated costs, and smart packing advice.",
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

const budgetRows = [
  { type: "Short Trek (4-7 days)", cost: "USD 350-900", includes: "Permits, guide, teahouse basics, local transport" },
  { type: "Classic Trek (10-15 days)", cost: "USD 900-2,300", includes: "Guide support, permits, accommodation, meals on trail" },
  { type: "Cultural Tour (4-7 days)", cost: "USD 300-1,000", includes: "Hotels, city transfer, sightseeing logistics" },
  { type: "Adventure Add-ons", cost: "USD 35-300", includes: "Rafting, paragliding, mountain flight, bungee (activity dependent)" },
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
          Practical planning notes for trekking in Nepal, cultural touring, permits, season choice, and realistic cost expectations for 2024/2025.
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
          Permit fees can be updated by authorities. Treat these as planning numbers and reconfirm before departure.
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

      <section className="grid gap-6 md:grid-cols-2">
        <article id="budget" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Budget planner</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Final trip cost depends on guide style, hotel class, flight choices, and how much buffer you keep for weather delays.
          </p>
          <div className="mt-4 space-y-3">
            {budgetRows.map((row) => (
              <div key={row.type} className="rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4">
                <div className="font-medium">{row.type}</div>
                <div className="mt-1 text-sm text-primary">{row.cost}</div>
                <p className="mt-1 text-sm text-muted-foreground">{row.includes}</p>
              </div>
            ))}
          </div>
        </article>

        <article id="packing" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Packing essentials</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep your bag practical and light. Most people overpack clothing and underpack weather and foot-care basics.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            {packingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-[color:var(--border)] bg-[rgba(246,244,239,0.72)] p-4 text-sm text-muted-foreground">
            Pro tip: If you are doing multiple activities, pack in modules so you can leave unnecessary gear at your hotel.
          </div>
        </article>
      </section>

      <section id="activities" className="panel scroll-mt-24 rounded-[1.75rem] p-5 md:p-7">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Popular activity planning links</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We prepared detailed planning notes for major tours and adventure add-ons on the tours page.
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
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Research sources</h2>
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
        <h2 className="mb-4 text-2xl font-semibold tracking-[-0.03em]">FAQ</h2>
        <FAQ />
      </section>

      <section className="panel rounded-[1.75rem] p-6 md:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.03em]">Want a custom trip plan?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share your dates and budget style, and we can combine treks, tours, and activities into one practical route.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground">
          Plan my trip
        </Link>
      </section>
    </div>
  );
}
