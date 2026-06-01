export type PhoneCountry = {
  code: string;
  name: string;
  dial: string;
};

export const PHONE_COUNTRIES: PhoneCountry[] = [
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "CZ", name: "Czech Republic", dial: "+420" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "HK", name: "Hong Kong", dial: "+852" },
  { code: "HU", name: "Hungary", dial: "+36" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "NP", name: "Nepal", dial: "+977" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "RO", name: "Romania", dial: "+40" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "TW", name: "Taiwan", dial: "+886" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "AE", name: "UAE", dial: "+971" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "VN", name: "Vietnam", dial: "+84" },
];

export function countryFlag(iso: string | undefined): string {
  if (!iso || iso.length !== 2) return "🌐";
  return iso
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}

export function filterCountries(query: string): PhoneCountry[] {
  const q = query.trim().toLowerCase();
  if (!q) return PHONE_COUNTRIES;

  const dialDigits = q.replace(/[^\d+]/g, "");
  const dialQuery = dialDigits.startsWith("+")
    ? dialDigits
    : dialDigits
      ? `+${dialDigits}`
      : "";

  return PHONE_COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(q) ||
      country.code.toLowerCase().includes(q) ||
      (dialQuery && country.dial.startsWith(dialQuery)),
  );
}

export function formatFullPhone(country: PhoneCountry | null, number: string): string {
  if (!country) return "";
  const local = number.replace(/\D/g, "");
  if (!local) return "";
  return `${country.dial} ${local}`;
}

/** Local number length (without country code), by ISO code. */
const LOCAL_PHONE_LENGTH: Partial<Record<string, { min: number; max: number }>> = {
  AU: { min: 9, max: 9 },
  CA: { min: 10, max: 10 },
  GB: { min: 10, max: 10 },
  IN: { min: 10, max: 10 },
  NP: { min: 10, max: 10 },
  NZ: { min: 9, max: 10 },
  SG: { min: 8, max: 8 },
  US: { min: 10, max: 10 },
};

const DEFAULT_PHONE_LENGTH = { min: 7, max: 15 };

export function getLocalPhoneLength(country: PhoneCountry | null) {
  if (!country) return DEFAULT_PHONE_LENGTH;
  return LOCAL_PHONE_LENGTH[country.code] ?? DEFAULT_PHONE_LENGTH;
}

export function localPhoneDigits(number: string): string {
  return number.replace(/\D/g, "");
}

export function isValidLocalPhone(country: PhoneCountry | null, number: string): boolean {
  const digits = localPhoneDigits(number);
  const { min, max } = getLocalPhoneLength(country);
  return digits.length >= min && digits.length <= max;
}

export function phoneLengthHint(country: PhoneCountry | null): string | null {
  if (!country) return null;
  const { min, max } = getLocalPhoneLength(country);
  if (min === max) return `${min} digits`;
  return `${min}-${max} digits`;
}
