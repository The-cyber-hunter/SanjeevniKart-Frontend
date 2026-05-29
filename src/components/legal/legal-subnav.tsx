"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LEGAL_PAGES = [
  { href: "/legal/privacy", label: "Privacy policy" },
  { href: "/legal/terms", label: "Terms of service" },
  { href: "/legal/refunds", label: "Refunds" },
] as const;

export function LegalSubnav() {
  const pathname = usePathname();

  return (
    <nav
      className="mt-6 inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-sk-border bg-sk-page p-1"
      aria-label="Legal documents"
    >
      {LEGAL_PAGES.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
              active
                ? "bg-sk-primary text-white shadow-sm"
                : "text-sk-ink-soft hover:bg-white hover:text-sk-brown"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
