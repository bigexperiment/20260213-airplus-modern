import { promises as fs } from "node:fs";
import path from "node:path";
import type { RequestGeo } from "@/lib/request-geo";

export type FlightQuoteInput = {
  name?: string;
  email?: string;
  phone: string;
  tripType?: string;
  from?: string;
  to?: string;
  departDate: string;
  returnDate?: string;
  adults?: string;
  children?: string;
  cabinClass: string;
  notes?: string;
};

export type FlightQuoteRecord = FlightQuoteInput & {
  quoteCode: string;
  createdAt: string;
  geo: RequestGeo;
};

type FlightQuotesFile = {
  quotes: FlightQuoteRecord[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "flight-quotes.json");

function randomCode(length = 6): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export function createQuoteCode(): string {
  return `FQ-${randomCode(6)}`;
}

async function ensureDataFile(): Promise<FlightQuotesFile> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as FlightQuotesFile;
    if (!Array.isArray(parsed.quotes)) return { quotes: [] };
    return parsed;
  } catch {
    return { quotes: [] };
  }
}

async function writeDataFile(data: FlightQuotesFile): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function saveFlightQuote(
  input: FlightQuoteInput,
  geo: RequestGeo,
): Promise<FlightQuoteRecord> {
  const data = await ensureDataFile();

  let quoteCode = createQuoteCode();
  while (data.quotes.some((q) => q.quoteCode === quoteCode)) {
    quoteCode = createQuoteCode();
  }

  const record: FlightQuoteRecord = {
    quoteCode,
    createdAt: new Date().toISOString(),
    name: input.name?.trim() || "",
    email: input.email?.trim() || "",
    phone: input.phone.trim(),
    tripType: input.tripType || "",
    from: input.from?.trim() || "",
    to: input.to?.trim() || "",
    departDate: input.departDate.trim(),
    returnDate: input.returnDate?.trim() || "",
    adults: input.adults || "1",
    children: input.children || "0",
    cabinClass: input.cabinClass.trim(),
    notes: input.notes?.trim() || "",
    geo: {
      ip: geo.ip,
      city: geo.city,
      region: geo.region,
      country: geo.country,
    },
  };

  data.quotes.unshift(record);
  await writeDataFile(data);
  return record;
}

export async function listFlightQuotes(): Promise<FlightQuoteRecord[]> {
  const data = await ensureDataFile();
  return data.quotes;
}

export async function getFlightQuoteByCode(quoteCode: string): Promise<FlightQuoteRecord | null> {
  const data = await ensureDataFile();
  return data.quotes.find((q) => q.quoteCode === quoteCode) ?? null;
}
