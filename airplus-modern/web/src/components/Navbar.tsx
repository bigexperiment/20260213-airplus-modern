"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Facebook, Instagram, Mail, Menu, Phone, Twitter, MapPin, X, Youtube, MessageCircle } from "lucide-react";
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
        <div className="container-px flex h-8 items-center justify-between text-[13px]">
          <div className="inline-flex min-w-0 items-center gap-4">
            <a href="tel:+9779851234567" className="inline-flex items-center gap-1.5 whitespace-nowrap text-white/90 hover:text-white">
              <Phone className="size-4" />
              +977 985-1234567
            </a>
            <a
              href="https://wa.me/9779851234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 whitespace-nowrap text-white/90 hover:text-white"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
            <a
              href="mailto:info@airplusnepal.com"
              className="hidden items-center gap-1.5 whitespace-nowrap text-white/90 hover:text-white sm:inline-flex"
            >
              <Mail className="size-4" />
              info@airplusnepal.com
            </a>
            <span className="hidden items-center gap-1.5 whitespace-nowrap md:inline-flex text-white/90">
              <MapPin className="size-4" />
              Thamel, Kathmandu, Nepal
            </span>
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
        <div className="container-px flex h-14 items-center justify-between md:h-16">
          <Link href="/" className="flex items-center">
            <BrandLogo small />
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
