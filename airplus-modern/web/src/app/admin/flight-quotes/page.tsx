"use client";

import { useCallback, useState } from "react";
import type { FlightQuoteRecord } from "@/lib/flight-quotes-store";

export default function FlightQuotesAdminPage() {
  const [token, setToken] = useState("");
  const [quotes, setQuotes] = useState<FlightQuoteRecord[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "loaded" | "error">("idle");
  const [error, setError] = useState("");

  const loadQuotes = useCallback(async () => {
    if (!token.trim()) return;

    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/admin/flight-quotes", {
        headers: { Authorization: `Bearer ${token.trim()}` },
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        setStatus("error");
        setError(data?.error || "Could not load quotes.");
        return;
      }

      setQuotes(data.quotes ?? []);
      setStatus("loaded");
    } catch {
      setStatus("error");
      setError("Could not load quotes.");
    }
  }, [token]);

  return (
    <div className="container-px section">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Flight quote submissions</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Enter the admin token to view saved flight quote requests, including contact details and visitor location.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block flex-1">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Admin token
            </span>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="FLIGHT_QUOTES_ADMIN_TOKEN"
              className="field"
            />
          </label>
          <button type="button" className="btn-primary" onClick={loadQuotes} disabled={status === "loading"}>
            {status === "loading" ? "Loading..." : "Load quotes"}
          </button>
        </div>

        {status === "error" && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {status === "loaded" && (
          <div className="mt-8 overflow-x-auto rounded-xl border border-[color:var(--border)] bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-[color:var(--border)] bg-[#f8fafc] text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Quote code</th>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Route</th>
                  <th className="px-4 py-3">Dates</th>
                  <th className="px-4 py-3">Passengers</th>
                  <th className="px-4 py-3">Cabin</th>
                  <th className="px-4 py-3">IP</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {quotes.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="px-4 py-8 text-center text-muted-foreground">
                      No flight quotes saved yet.
                    </td>
                  </tr>
                ) : (
                  quotes.map((quote) => (
                    <tr key={quote.quoteCode} className="border-b border-[color:var(--border)] align-top">
                      <td className="px-4 py-3 font-mono font-medium">{quote.quoteCode}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(quote.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">{quote.name || "—"}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{quote.phone}</td>
                      <td className="px-4 py-3">{quote.email || "—"}</td>
                      <td className="px-4 py-3">
                        {quote.from || "—"} → {quote.to || "—"}
                        <div className="text-xs text-muted-foreground">{quote.tripType || "—"}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {quote.departDate}
                        {quote.returnDate ? ` → ${quote.returnDate}` : ""}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {quote.adults} adult(s), {quote.children} child(ren)
                      </td>
                      <td className="px-4 py-3">{quote.cabinClass}</td>
                      <td className="px-4 py-3 font-mono text-xs">{quote.geo.ip}</td>
                      <td className="px-4 py-3">{quote.geo.city || "—"}</td>
                      <td className="px-4 py-3">{quote.geo.region || "—"}</td>
                      <td className="px-4 py-3">{quote.geo.country || "—"}</td>
                      <td className="px-4 py-3 max-w-xs whitespace-pre-wrap">{quote.notes || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
