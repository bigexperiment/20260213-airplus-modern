"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { navItems } from "@/components/siteMenus";

function basePath(href: string): string {
  return href.split("#")[0] || "/";
}

function isLinkActive(pathname: string, href: string): boolean {
  if (href.startsWith("/#")) return pathname === "/";
  const path = basePath(href);
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileQuickLinks = [
    { label: "Treks", href: "/treks" },
    { label: "Tours", href: "/tours" },
    { label: "Acts", href: "/tours#paragliding-pokhara" },
    { label: "Guide", href: "/travel-guide" },
    { label: "Contact", href: "/contact" },
  ];

  const isGroupActive = (links: { href: string }[]) => links.some((l) => isLinkActive(pathname, l.href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="hidden md:block border-b border-white/10">
        <div className="container-px h-9 flex items-center justify-between text-xs text-muted-foreground">
          <div className="inline-flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5"><Phone className="size-3.5" /> +977 1 4525454</span>
            <span className="inline-flex items-center gap-1.5"><Mail className="size-3.5" /> airplusnepal@gmail.com</span>
          </div>
          <span>Licensed Nepal Trek & Tour Operator</span>
        </div>
      </div>

      <div className="container-px h-10 md:h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-sm md:text-lg">AirPlus Nepal</Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            if (!item.links) {
              const active = item.href ? isLinkActive(pathname, item.href) : false;
              return (
                <Link
                  key={item.label}
                  href={item.href || "/"}
                  className={`px-3 py-2 rounded-full text-sm transition ${
                    active ? "bg-white/12 text-foreground" : "text-muted-foreground hover:bg-white/8 hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            const active = isGroupActive(item.links);
            return (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className={`px-3 py-2 rounded-full text-sm transition inline-flex items-center gap-1 ${
                    active ? "bg-white/12 text-foreground" : "text-muted-foreground hover:bg-white/8 hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown className="size-4" />
                </button>
                <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 translate-y-1 transition duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="w-[32rem] rounded-2xl border border-white/10 bg-background/95 shadow-2xl p-4">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {item.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className="rounded-xl p-3 hover:bg-white/6 transition"
                        >
                          <div className="text-sm font-medium">{link.label}</div>
                          {link.description && <div className="mt-1 text-xs text-muted-foreground">{link.description}</div>}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="hidden md:inline-flex px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
            Plan Trip
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-7 w-7 rounded-md border border-white/15"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
          </button>
        </div>
      </div>

      <div className="lg:hidden border-t border-white/10">
        <div className="container-px py-0.5">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {mobileQuickLinks.map((link) => {
              const active = isLinkActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] leading-4 ${
                    active
                      ? "bg-white/15 text-foreground"
                      : "border border-white/15 text-foreground/90"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-background/95">
          <div className="container-px py-4 space-y-2">
            {navItems.map((item) => {
              if (!item.links) {
                return (
                  <Link
                    key={item.label}
                    href={item.href || "/"}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-white/8"
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <details key={item.label} className="rounded-lg border border-white/10 overflow-hidden">
                  <summary className="cursor-pointer list-none px-3 py-2 text-sm font-medium hover:bg-white/8">{item.label}</summary>
                  <div className="px-2 pb-2">
                    {item.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/8 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </details>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
