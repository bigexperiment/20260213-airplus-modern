import type { Metadata } from "next";
import FlightQuoteForm from "@/components/FlightQuoteForm";

export const metadata: Metadata = {
  title: "Book a Flight | AirPlus Nepal",
  description:
    "Request a flight quote for any route. Share your dates and details — we'll send options by email.",
};

export default function FlightPage() {
  return (
    <div className="container-px section">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold md:text-4xl">Book a Flight</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Tell us where you&apos;re flying from and to, your dates, and how many people are traveling.
          We&apos;ll send quote options by email — no booking engine, no payment on this page.
        </p>

        <div className="mt-8">
          <FlightQuoteForm />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Share your route and dates"],
            ["2", "We find options for you"],
            ["3", "You pick — we help book"],
          ].map(([step, text]) => (
            <div key={step} className="surface-card p-4 text-center">
              <div className="mx-auto mb-2 inline-flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {step}
              </div>
              <p className="text-sm text-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
