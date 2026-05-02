"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Facebook, Instagram, Mail, Menu, Phone, Twitter, MapPin, X, Youtube } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

function basePath(href: string): string {
  return href.split("#")[0] || "/";
}

function isLinkActive(pathname: string, href: string): boolean {
  const path = basePath(href);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/director" },
    { label: "Treks", href: "/treks", hasMenu: true },
    { label: "Expeditions", href: "/contact", hasMenu: true },
    { label: "Tour Packages", href: "/tours" },
    { label: "Travel Guide", href: "/travel-guide", hasMenu: true },
    { label: "Blog", href: "/travel-guide" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#0f3468] text-white">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <div className="inline-flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5"><Mail className="size-3.5" /> info@airplusnepal.com</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="size-3.5" /> +977 985-1234567</span>
            <span className="hidden items-center gap-1.5 md:inline-flex"><MapPin className="size-3.5" /> Thamel, Kathmandu, Nepal</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>EN</span>
            <Facebook className="size-3.5" />
            <Instagram className="size-3.5" />
            <Youtube className="size-3.5" />
            <Twitter className="size-3.5" />
          </div>
        </div>
      </div>

      <div className="border-b border-[color:var(--border)] bg-white shadow-[0_1px_0_rgba(21,89,198,0.03)]">
        <div className="container-px flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center">
            <BrandLogo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  active ? "text-primary border-b-2 border-accent rounded-none" : "text-foreground hover:text-primary"
                }`}
              >
                {item.label}
                  {item.hasMenu && <ChevronDown className="size-3.5" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground md:inline-flex">
            Enquiry Now
          </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[color:var(--border)] bg-white lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-[color:var(--border)] bg-white lg:hidden">
            <div className="container-px space-y-1 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
            >
              Enquiry Now
            </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
