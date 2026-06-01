import { formatLocation, getRequestGeo, isHoneypotTripped, logRequestGeo, toHttpHeaderValue } from "@/lib/request-geo";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isHoneypotTripped(body.honeypot)) {
      return Response.json({ ok: true });
    }

    const geo = await getRequestGeo(req);
    logRequestGeo("trip-inquiry", geo, { name: body.name || "-" });

    const { name, email, country, trek, dates, message } = body;

    const location = formatLocation(geo);
    const opener = `${name || "Someone"} from ${location} and ${geo.ip} requested a trip inquiry with these details:`;

    const lines = [
      opener,
      "",
      `Email: ${email || "-"}`,
      `Country (form): ${country || "-"}`,
      `Preferred: ${trek || "-"}`,
      `Dates: ${dates || "-"}`,
      "---",
      message || "",
    ];

    const payload = lines.join("\n").trim();

    const res = await fetch("https://ntfy.sh/airplusnepal", {
      method: "POST",
      headers: {
        Priority: "high",
        Title: toHttpHeaderValue(`${name || "Trip inquiry"} - ${location}`),
        Tags: "airplane,nepal,mailbox",
      },
      body: payload,
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ ok: false, error: text }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
