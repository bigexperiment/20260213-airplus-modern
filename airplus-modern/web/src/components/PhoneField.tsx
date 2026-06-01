"use client";

import { useEffect, useRef, useState } from "react";
import {
  PHONE_COUNTRIES,
  type PhoneCountry,
  countryFlag,
  filterCountries,
  getLocalPhoneLength,
  localPhoneDigits,
  phoneLengthHint,
} from "@/lib/phone-countries";

type PhoneFieldProps = {
  country: PhoneCountry | null;
  onCountryChange: (country: PhoneCountry | null) => void;
  number: string;
  onNumberChange: (value: string) => void;
  required?: boolean;
};

export default function PhoneField({
  country,
  onCountryChange,
  number,
  onNumberChange,
  required = true,
}: PhoneFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const results = filterCountries(query).slice(0, 8);
  const { max: maxDigits } = getLocalPhoneLength(country);
  const hint = phoneLengthHint(country);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function pick(selected: PhoneCountry) {
    onCountryChange(selected);
    const trimmed = localPhoneDigits(number).slice(0, getLocalPhoneLength(selected).max);
    if (trimmed !== number) onNumberChange(trimmed);
    setQuery("");
    setOpen(false);
  }

  function openSearch() {
    setOpen(true);
    setQuery("");
  }

  function onNumberInput(value: string) {
    const digits = localPhoneDigits(value).slice(0, maxDigits);
    onNumberChange(digits);
  }

  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Phone / WhatsApp {required && <span className="text-accent">*</span>}
      </span>
      <div className="flex gap-2">
        <div ref={rootRef} className="relative w-[11.5rem] shrink-0 sm:w-[13rem]">
          {country && !open ? (
            <button
              type="button"
              onClick={openSearch}
              className="field flex w-full items-center gap-2 px-3 text-left"
            >
              <span className="text-lg leading-none">{countryFlag(country.code)}</span>
              <span className="truncate text-sm">{country.dial}</span>
            </button>
          ) : (
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
                if (!e.target.value.trim()) onCountryChange(null);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Country"
              className="field w-full"
              autoComplete="off"
            />
          )}

          {open && (
            <ul className="absolute z-20 mt-1 max-h-52 w-[min(18rem,calc(100vw-2rem))] overflow-auto rounded-xl border border-[color:var(--border)] bg-white py-1 shadow-lg">
              {(query ? results : PHONE_COUNTRIES.slice(0, 8)).map((item) => (
                <li key={item.code}>
                  <button
                    type="button"
                    onClick={() => pick(item)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    <span className="text-lg leading-none">{countryFlag(item.code)}</span>
                    <span className="min-w-0 flex-1 truncate">{item.name}</span>
                    <span className="shrink-0 text-muted-foreground">{item.dial}</span>
                  </button>
                </li>
              ))}
              {query && results.length === 0 && (
                <li className="px-3 py-2 text-sm text-muted-foreground">No matches</li>
              )}
            </ul>
          )}

          <input
            tabIndex={-1}
            required={required}
            value={country?.code ?? ""}
            readOnly
            className="pointer-events-none absolute h-0 w-0 opacity-0"
            aria-hidden
          />
        </div>

        <input
          required={required}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={number}
          onChange={(e) => onNumberInput(e.target.value)}
          placeholder={hint ? `Phone number (${hint})` : "Phone number"}
          maxLength={maxDigits}
          className="field min-w-0 flex-1"
        />
      </div>
      {hint && (
        <p className="mt-1 text-xs text-muted-foreground">Local number only — {hint}</p>
      )}
    </label>
  );
}
