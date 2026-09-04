import { saveFlightQuote } from "@/lib/flight-quotes-store";
import { formatLocation, getRequestGeo, isHoneypotTripped, logRequestGeo, toHttpHeaderValue } from "@/lib/request-geo";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (isHoneypotTripped(body.honeypot)) {
      return Response.json({ ok: true });
    }

    const geo = await getRequestGeo(req);
    logRequestGeo("flight-quote", geo, { name: body.name || "-" });

    const {
      name,
      email,
      phone,
      tripType,
      from,
      to,
      departDate,
      returnDate,
      adults,
      children,
      cabinClass,
      notes,
    } = body;

    if (!phone?.trim() || !departDate?.trim() || !cabinClass?.trim()) {
      return Response.json(
        { ok: false, error: "Phone, departure date, and cabin class are required." },
        { status: 400 },
      );
    }

    const record = await saveFlightQuote(
      {
        name,
        email,
        phone,
        tripType,
        from,
        to,
        departDate,
        returnDate,
        adults,
        children,
        cabinClass,
        notes,
      },
      geo,
    );

    const location = formatLocation(geo);
    const opener = `${name || "Someone"} from ${location} and ${geo.ip} requested a flight quote (${record.quoteCode}) with these details:`;

    const lines = [
      opener,
      "",
      `Quote code: ${record.quoteCode}`,
      `Email: ${email?.trim() || "not provided"}`,
      `Phone: ${phone || "-"}`,
      `Trip: ${tripType || "-"}`,
      `From: ${from || "-"}`,
      `To: ${to || "-"}`,
      `Depart: ${departDate || "-"}`,
      `Return: ${returnDate || "-"}`,
      `Passengers: ${adults || 1} adult(s), ${children || 0} child(ren)`,
      `Cabin: ${cabinClass || "-"}`,
      "---",
      notes || "",
    ];

    const payload = lines.join("\n").trim();

    const res = await fetch("https://ntfy.sh/airplusnepal", {
      method: "POST",
      headers: {
        Priority: "high",
        Title: toHttpHeaderValue(`${name || "Flight quote"} - ${location}`),
        Tags: "airplane,envelope",
      },
      body: payload,
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text();
      return Response.json({ ok: false, error: text }, { status: 502 });
    }

    return Response.json({ ok: true, quoteCode: record.quoteCode });
  } catch (error) {
    return Response.json({ ok: false, error: String(error) }, { status: 500 });
  }
}
