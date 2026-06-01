import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Home, ShoppingBasket } from "lucide-react";

const QUICK_LINKS = [
  { href: "/support", label: "Contact support" },
  { href: "/account", label: "My account" },
  { href: "/legal/privacy", label: "Privacy policy" },
] as const;

export function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-sk-header via-[#faf3ea] to-sk-page px-4 py-16 sk-grain">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-[#ffe2bf]/60 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#d4e8d4]/50 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-sk-primary/10 blur-2xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-lg text-center">
        <Link
          href="/"
          className="mx-auto mb-10 inline-flex items-center gap-2.5 rounded-2xl border border-sk-border/80 bg-white/60 px-4 py-2.5 shadow-sm backdrop-blur-sm transition hover:border-sk-primary/40 hover:bg-white"
        >
          <Image
            src="/app-icon-512.png"
            alt=""
            width={40}
            height={40}
            className="rounded-xl"
          />
          <span className="font-display text-lg font-semibold text-sk-brown">Sanjeevni Kart</span>
        </Link>

        <p
          className="font-display text-[7rem] font-semibold leading-none tracking-tighter text-sk-brown/15 sm:text-[9rem]"
          aria-hidden
        >
          404
        </p>

        <h1 className="-mt-12 font-display text-3xl font-semibold tracking-tight text-sk-brown sm:-mt-16 sm:text-4xl">
          This aisle is empty
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-sk-ink-soft">
          The page you&apos;re looking for doesn&apos;t exist, was moved, or the link may be
          outdated. Let&apos;s get you back to fresh groceries.
        </p>

        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sk-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-sk-primary-dark"
          >
            <Home className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-sk-border bg-white/80 px-6 py-3.5 text-sm font-semibold text-sk-brown shadow-sm backdrop-blur-sm transition hover:border-sk-primary/30 hover:bg-white"
          >
            <ShoppingBasket className="h-4 w-4" aria-hidden />
            Browse products
          </Link>
        </div>

        <nav
          className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-sk-muted"
          aria-label="Helpful links"
        >
          {QUICK_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="font-medium hover:text-sk-primary">
              {label}
            </Link>
          ))}
        </nav>

        <p className="mt-14 text-xs text-sk-muted">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-sk-primary">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Return to Sanjeevni Kart
          </Link>
        </p>
      </div>
    </div>
  );
}
