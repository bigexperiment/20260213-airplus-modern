export type RequestGeo = {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
};

export function isHoneypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function firstIp(forwarded: string | null): string | undefined {
  if (!forwarded) return undefined;
  const ip = forwarded.split(",")[0]?.trim();
  return ip || undefined;
}

function isPrivateIp(ip: string): boolean {
  return (
    ip === "127.0.0.1" ||
    ip === "::1" ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("172.16.") ||
    /^fc|^fd|^fe80/i.test(ip)
  );
}

export function getClientIp(req: Request): string {
  const headers = req.headers;
  return (
    firstIp(headers.get("x-forwarded-for")) ||
    headers.get("x-real-ip")?.trim() ||
    headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  );
}

export async function getRequestGeo(req: Request): Promise<RequestGeo> {
  const ip = getClientIp(req);

  const cityHeader = req.headers.get("x-vercel-ip-city");
  const region = req.headers.get("x-vercel-ip-country-region") || undefined;
  const country = req.headers.get("x-vercel-ip-country") || undefined;
  const city = cityHeader ? decodeURIComponent(cityHeader) : undefined;

  if (city || region || country) {
    return { ip, city, region, country };
  }

  if (ip === "unknown" || isPrivateIp(ip)) {
    return { ip };
  }

  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return { ip };
    const data = (await res.json()) as {
      city?: string;
      region?: string;
      country_name?: string;
    };
    return {
      ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
    };
  } catch {
    return { ip };
  }
}

export function formatLocation(geo: RequestGeo): string {
  const parts = [geo.city, geo.region, geo.country].filter(Boolean);
  if (parts.length === 0) return "unknown location";
  return parts.join(", ");
}

export function toHttpHeaderValue(value: string): string {
  return value
    .replace(/\u2014/g, "-")
    .replace(/[^\x00-\xFF]/g, "")
    .trim()
    .slice(0, 200) || "-";
}

export function logRequestGeo(context: string, geo: RequestGeo, extra?: Record<string, string>) {
  console.log(`[${context}]`, {
    ip: geo.ip,
    city: geo.city ?? null,
    region: geo.region ?? null,
    country: geo.country ?? null,
    ...extra,
  });
}
