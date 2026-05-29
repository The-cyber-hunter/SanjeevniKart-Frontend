import Link from "next/link";

import { LegalSubnav } from "@/components/legal/legal-subnav";

export function LegalPageShell({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="mx-auto max-w-3xl min-w-0 px-4 py-10 break-words sm:px-6">
        <nav className="text-sm text-sk-muted" aria-label="Breadcrumb">
          <Link href="/" className="font-medium hover:text-sk-primary">
            Home
          </Link>
          <span className="mx-2 text-sk-border">/</span>
          <span className="text-sk-ink-soft">Legal</span>
        </nav>

        <h1 className="mt-4 font-display text-3xl font-semibold text-sk-brown sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-sk-muted">Last updated: {lastUpdated}</p>

        <LegalSubnav />

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-sk-ink-soft">{children}</div>

        <p className="mt-12 border-t border-sk-border pt-8 text-sm text-sk-muted">
          Questions?{" "}
          <Link href="/support" className="font-semibold text-sk-primary hover:underline">
            Contact support
          </Link>
          .
        </p>
      </article>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-sk-brown">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}
