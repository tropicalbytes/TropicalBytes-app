import Link from "next/link";
import { business, nav } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream/90">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-cream">{business.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/70">
            {business.description}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-cream/75 hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li>{business.phoneDisplay}</li>
            <li>{business.email}</li>
            <li>{business.address}</li>
            <li>{business.hours}</li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-copper-light">Service Areas</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {business.serviceAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 text-center text-xs text-cream/50 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-cream/80">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-cream/80">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
