import { promises as fs } from "node:fs";
import path from "node:path";
import PlanForm from "@/components/PlanForm";

type ContactData = {
  headOffice: { name: string; address: string; phones: string[]; whatsapp?: string; line?: string; email: string };
  representatives: { country: string; name: string; phone: string; email: string }[];
  company: { registered: string; tourismLicense: string; vat: string };
};

async function readContact(): Promise<ContactData> {
  const file = path.join(process.cwd(), "public/information/contact.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw) as ContactData;
}

export default async function ContactPage() {
  const data = await readContact();

  return (
    <div className="container-px section">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-[-0.04em]">Let&apos;s plan your Nepal trip</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground leading-7">
        Send us whatever you already know, even if it is just rough dates, a budget range, or one trek you keep coming back to. We usually reply within 24 hours with clear next steps and honest suggestions.
      </p>

      {/* Form + office */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4">
          <PlanForm />

          <div className="panel rounded-2xl p-5">
            <div className="font-medium">Head Office</div>
            <div className="text-sm text-muted-foreground mt-1">{data.headOffice.name}</div>
            <div className="text-sm text-muted-foreground">{data.headOffice.address}</div>
            <div className="mt-2 text-sm">
              <div>Phones: {data.headOffice.phones.join(", ")}</div>
              <div>Email: <a href={`mailto:${data.headOffice.email}`} className="underline">{data.headOffice.email}</a></div>
              {data.headOffice.whatsapp && (<div>WhatsApp: {data.headOffice.whatsapp}</div>)}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              If you are not sure where to begin, just tell us your travel month, how many days you have, and whether you want trekking, culture, wildlife, or a mix.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="panel rounded-2xl p-5">
            <div className="font-medium mb-1">Company Details</div>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Reg: {data.company.registered}</div>
              <div>Tourism License: {data.company.tourismLicense}</div>
              <div>VAT: {data.company.vat}</div>
            </div>
          </div>
          <div className="panel rounded-2xl p-5">
            <div className="font-medium">Quick Contact</div>
            <div className="text-sm text-muted-foreground mt-1">Email: <a className="underline" href={`mailto:${data.headOffice.email}`}>{data.headOffice.email}</a></div>
            {data.headOffice.whatsapp && (<div className="text-sm text-muted-foreground">WhatsApp: {data.headOffice.whatsapp}</div>)}
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              We are happy to help with route ideas, custom itineraries, permits, transport questions, or simply narrowing down what fits your time and comfort level best.
            </p>
          </div>
        </aside>
      </div>

      {/* International representatives */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold">International Representatives</h2>
        <p className="text-sm text-muted-foreground">If it feels easier to start locally, you can also reach out to one of our contacts in your country.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.representatives.map((r) => {
            const flag = countryFlag(r.country);
            return (
              <div key={r.email} className="panel rounded-2xl p-4 flex items-start gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-muted text-lg">
                  <span aria-hidden>{flag}</span>
                </div>
                <div className="space-y-1">
                  <div className="font-medium flex items-center gap-2">{r.country} <span className="text-xs text-muted-foreground">{flagCode(r.country)}</span></div>
                  <div className="text-sm text-muted-foreground">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.phone}</div>
                  <div className="text-sm"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function countryFlag(name: string): string {
  const m: Record<string, string> = {
    Australia: "🇦🇺",
    Canada: "🇨🇦",
    Japan: "🇯🇵",
    USA: "🇺🇸",
    Nepal: "🇳🇵",
    India: "🇮🇳",
    France: "🇫🇷",
    Germany: "🇩🇪",
    "United Kingdom": "🇬🇧",
  };
  return m[name] || "🌏";
}

function flagCode(name: string): string {
  const m: Record<string, string> = {
    Australia: "AU",
    Canada: "CA",
    Japan: "JP",
    USA: "US",
    Nepal: "NP",
    India: "IN",
    France: "FR",
    Germany: "DE",
    "United Kingdom": "GB",
  };
  return m[name] || "";
}
