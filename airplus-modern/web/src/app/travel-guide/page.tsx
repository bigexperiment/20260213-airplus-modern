import Link from "next/link";
import FAQ from "@/components/FAQ";

const seasonRows = [
  { season: "Spring (Mar - May)", conditions: "Stable weather, blooming trails, clear mountain views", bestFor: "First-time trekkers, photographers" },
  { season: "Monsoon (Jun - Aug)", conditions: "Rainfall in many regions, greener landscapes", bestFor: "Lower-elevation cultural trips" },
  { season: "Autumn (Sep - Nov)", conditions: "Crisp air and peak visibility", bestFor: "Classic high-altitude trekking" },
  { season: "Winter (Dec - Feb)", conditions: "Cold temperatures, quieter routes", bestFor: "Prepared hikers and short treks" },
];

const packingItems = [
  "Layered clothing system (base, fleece, insulated outer).",
  "Waterproof jacket and backpack rain cover.",
  "Broken-in trekking boots and spare socks.",
  "Sun protection: sunglasses, hat, SPF 50+.",
  "Power bank, headlamp, and basic first-aid kit.",
  "Reusable water bottle with purification support.",
];

export default function TravelGuidePage() {
  return (
    <div className="container-px section space-y-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold">Nepal Travel Guide</h1>
        <p className="mt-2 text-muted-foreground">
          Use this page to plan permits, timing, packing, and on-trail safety before your trek or tour in Nepal.
        </p>
      </div>

      <section id="seasons" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold">Best Seasons</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 font-medium">Season</th>
                <th className="px-4 py-3 font-medium">Conditions</th>
                <th className="px-4 py-3 font-medium">Best For</th>
              </tr>
            </thead>
            <tbody>
              {seasonRows.map((row) => (
                <tr key={row.season} className="border-t border-white/10">
                  <td className="px-4 py-3">{row.season}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.conditions}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.bestFor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section id="permits" className="scroll-mt-24 rounded-2xl border border-white/10 p-5">
          <h2 className="text-xl font-semibold">Permits & Visa</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Tourist visa is available on arrival for many nationalities (passport validity required).</li>
            <li>Treks usually require TIMS and/or national park permits depending on route.</li>
            <li>Restricted areas require special permits and licensed guide arrangements.</li>
            <li>Carry printed passport copies and digital backups while traveling.</li>
          </ul>
        </section>

        <section id="safety" className="scroll-mt-24 rounded-2xl border border-white/10 p-5">
          <h2 className="text-xl font-semibold">Health & Safety</h2>
          <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Follow a gradual acclimatization profile and keep contingency days.</li>
            <li>Hydrate consistently and avoid rushing on high-altitude sections.</li>
            <li>Travel insurance should include emergency evacuation coverage.</li>
            <li>Use licensed local guides for logistics, weather calls, and route safety.</li>
          </ul>
        </section>
      </div>

      <section id="packing" className="scroll-mt-24 rounded-2xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold">Packing Essentials</h2>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {packingItems.map((item) => (
            <li key={item} className="text-sm text-muted-foreground">• {item}</li>
          ))}
        </ul>
      </section>

      <section id="faq" className="scroll-mt-24">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <FAQ />
      </section>

      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-primary/10 to-accent/10 p-6 md:p-8">
        <h2 className="text-2xl font-semibold">Want help planning your route?</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell us your dates, pace, and interests. We will recommend the right trek/tour mix with practical logistics.
        </p>
        <Link href="/contact" className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium">
          Plan My Trip
        </Link>
      </section>
    </div>
  );
}
