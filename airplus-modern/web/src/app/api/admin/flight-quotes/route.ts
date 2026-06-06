import { listFlightQuotes } from "@/lib/flight-quotes-store";

function isAuthorized(req: Request): boolean {
  const token = process.env.FLIGHT_QUOTES_ADMIN_TOKEN?.trim();
  if (!token) return false;

  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${token}`) return true;

  const url = new URL(req.url);
  return url.searchParams.get("token") === token;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const quotes = await listFlightQuotes();
  return Response.json({ ok: true, quotes });
}
