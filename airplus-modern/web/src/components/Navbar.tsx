"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/director" },
    { label: "Treks", href: "/treks" },
    { label: "Tours", href: "/tours" },
    { label: "Flights", href: "/flight" },
    { label: "Travel Guide", href: "/travel-guide" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Top contact strip — hidden on smallest screens */}
      <div className="hidden sm:block border-b border-[color:var(--border)] bg-[#eff6ff]">
        <div className="container-px flex h-9 items-center justify-between text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-5">
            <a href="tel:+9779851234567" className="inline-flex items-center gap-1.5 transition hover:text-primary">
              <Phone className="size-3.5" />
              +977 985-1234567
            </a>
            <a
              href="https://wa.me/9779851234567"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 transition hover:text-primary"
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
            </a>
            <a
              href="mailto:info@airplusnepal.com"
              className="hidden items-center gap-1.5 transition hover:text-primary md:inline-flex"
            >
              <Mail className="size-3.5" />
              info@airplusnepal.com
            </a>
          </div>
          <span>Thamel, Kathmandu, Nepal</span>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-[color:var(--border)] bg-[color:var(--nav-bg)] shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "border-transparent bg-white/95 backdrop-blur-md"
        }`}
      >
        <div className="container-px flex h-14 items-center justify-between md:h-16">
          <Link href="/" className="flex shrink-0 items-center">
            <BrandLogo small />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              const active = isLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-primary"
                      : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-[1.05rem] h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn-accent hidden px-5 py-2.5 md:inline-flex">
              Plan a Trip
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--border)] bg-white text-foreground transition hover:bg-muted lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="mobile-nav-overlay fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="mobile-nav-panel absolute inset-x-0 top-[calc(3.5rem+env(safe-area-inset-top))] bottom-0 overflow-y-auto bg-white sm:top-[calc(5.25rem+env(safe-area-inset-top))]">
            <div className="container-px space-y-1 py-4">
              {navItems.map((item) => {
                const active = isLinkActive(pathname, item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition ${
                      active
                        ? "bg-primary/8 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                    {active && <span className="size-2 rounded-full bg-primary" />}
                  </Link>
                );
              })}

              <div className="mt-4 space-y-3 border-t border-[color:var(--border)] pt-4">
                <a
                  href="tel:+9779851234567"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground"
                >
                  <Phone className="size-4 text-primary" />
                  +977 985-1234567
                </a>
                <a
                  href="https://wa.me/9779851234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-muted-foreground"
                >
                  <MessageCircle className="size-4 text-primary" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-accent flex w-full py-3.5"
                >
                  Plan a Trip
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
