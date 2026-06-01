"use client";

import { useState } from "react";
import { ArrowLeftRight, CalendarDays, Mail, Plane, Users } from "lucide-react";

type TripType = "round-trip" | "one-way";

const today = new Date().toISOString().slice(0, 10);

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export default function FlightQuoteForm() {
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [cabinClass, setCabinClass] = useState("economy");
  const [notes, setNotes] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  function swapAirports() {
    setFrom(to);
    setTo(from);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const phoneValue = phone.trim();
    if (phoneDigits(phoneValue).length < 7 || !departDate) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/flight-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phoneValue,
          tripType,
          from,
          to,
          departDate,
          returnDate: tripType === "round-trip" ? returnDate : "",
          adults,
          children,
          cabinClass,
          notes,
          honeypot,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok) {
        setStatus("sent");
        setPhone("");
        setName("");
        setEmail("");
        setFrom("");
        setTo("");
        setDepartDate("");
        setReturnDate("");
        setAdults("1");
        setChildren("0");
        setCabinClass("economy");
        setNotes("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="surface-card p-8 text-center md:p-10">
        <div className="mx-auto mb-4 inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="size-7" />
        </div>
        <h2 className="text-2xl font-bold">Request received</h2>
        <p className="mt-3 text-muted-foreground">
          Thanks — we&apos;ll review your flight details and get back to you with quote options, usually within 24 hours.
        </p>
        <button
          type="button"
          className="btn-primary mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="surface-card overflow-hidden">
      <div className="border-b border-[color:var(--border)] bg-[#eff6ff] px-4 py-3 md:px-6">
        <div className="inline-flex rounded-lg border border-[color:var(--border)] bg-white p-1">
          {(["round-trip", "one-way"] as TripType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                tripType === type
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {type === "round-trip" ? "Round trip" : "One way"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4 md:p-6">
        <div className="rounded-xl border border-[color:var(--border)] bg-[#f8fafc] p-4">
          <p className="mb-3 text-sm font-medium text-foreground">Your contact details</p>
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Phone / WhatsApp <span className="text-accent">*</span>
              </span>
              <input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone or WhatsApp number"
                minLength={7}
                className="field"
              />
            </label>
            <div className="grid gap-3 md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Full name <span className="text-accent">*</span>
                </span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email <span className="font-normal normal-case text-muted-foreground">(optional)</span>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                  className="field"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              From <span className="text-accent">*</span>
            </span>
            <input
              required
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="City or airport (e.g. Sydney)"
              className="field"
            />
          </label>
          <label className="relative block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              To <span className="text-accent">*</span>
            </span>
            <input
              required
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="City or airport (e.g. London, Dubai)"
              className="field pr-12"
            />
            <button
              type="button"
              onClick={swapAirports}
              className="absolute bottom-2.5 right-2 inline-flex size-9 items-center justify-center rounded-lg border border-[color:var(--border)] bg-white text-primary transition hover:bg-muted"
              aria-label="Swap airports"
            >
              <ArrowLeftRight className="size-4" />
            </button>
          </label>
        </div>

        <div className={`grid gap-3 ${tripType === "round-trip" ? "md:grid-cols-2" : ""}`}>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <CalendarDays className="size-3.5" />
              Depart <span className="text-accent">*</span>
            </span>
            <input
              required
              type="date"
              min={today}
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="field"
            />
          </label>
          {tripType === "round-trip" && (
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <CalendarDays className="size-3.5" />
                Return <span className="text-accent">*</span>
              </span>
              <input
                required
                type="date"
                value={returnDate}
                min={departDate || today}
                onChange={(e) => setReturnDate(e.target.value)}
                className="field"
              />
            </label>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Users className="size-3.5" />
              Adults
            </span>
            <select value={adults} onChange={(e) => setAdults(e.target.value)} className="field">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Children
            </span>
            <select value={children} onChange={(e) => setChildren(e.target.value)} className="field">
              {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={String(n)}>
                  {n}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Cabin
            </span>
            <select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)} className="field">
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium economy</option>
              <option value="business">Business</option>
            </select>
          </label>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any preferences? Flexible dates, preferred airline, stopovers, baggage needs..."
          className="field min-h-[96px]"
        />

        <label aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          Leave blank
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-accent inline-flex w-full px-8 py-3.5 sm:w-auto"
          >
            <Plane className="size-4" />
            {status === "sending" ? "Sending..." : "Request a quote"}
          </button>
          <p className="text-sm text-muted-foreground">
            No payment now — we&apos;ll send you options to choose from.
          </p>
        </div>

        {status === "error" && (
          <p className="text-sm text-red-600">
            Something went wrong. Please email{" "}
            <a href="mailto:airplusnepal@gmail.com" className="underline">
              airplusnepal@gmail.com
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
