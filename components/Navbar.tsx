"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, business } from "@/lib/config";
import { LinkButton } from "./Button";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "border-sand/70 shadow-[0_4px_20px_-8px_rgba(31,58,46,0.15)]" : "border-sand/0"
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold text-forest">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream transition-transform duration-300 hover:rotate-6">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 3v9a4 4 0 0 0 4 4v5M4 3h2M4 3H2M8 3v6M8 3h2M8 3H6M18 3c-2 3-2 7 0 10 1 1.5 1 4 1 8M18 3c2 3 2 7 0 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {business.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={pathname === item.href}
              className={`nav-underline text-sm font-medium tracking-wide transition-colors ${
                pathname === item.href ? "text-copper" : "text-forest/80 hover:text-forest"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <LinkButton href="/plans" className="!px-5 !py-2.5 text-xs">
            Explore Meal Plans
          </LinkButton>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-full border border-forest/20 transition-colors hover:bg-sand/60 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="#1F3A2E"
              strokeWidth="2"
              strokeLinecap="round"
              className={`origin-center transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
              style={{ display: open ? "inline" : "none" }}
            />
            {!open && <path d="M4 7h16M4 12h16M4 17h16" stroke="#1F3A2E" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </div>

      <div
        className="grid overflow-hidden border-t border-sand/60 bg-cream transition-[grid-template-rows] duration-300 ease-out md:hidden"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", borderTopWidth: open ? 1 : 0 }}
      >
        <div className="min-h-0">
          <nav className="flex flex-col gap-1 px-5 pb-5 pt-3">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
                className={`rounded-lg px-3 py-3 text-base font-medium transition-all duration-200 ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                } ${pathname === item.href ? "bg-sand text-forest" : "text-forest/80"}`}
              >
                {item.label}
              </Link>
            ))}
            <LinkButton href="/plans" className="mt-2 justify-center">
              Explore Meal Plans
            </LinkButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
