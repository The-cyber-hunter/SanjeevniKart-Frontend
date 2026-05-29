"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";

import { useShop } from "@/context/shop-context";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/farmers", label: "Sell to us" },
  { href: "/orders", label: "Orders" },
  { href: "/support", label: "Support" },
] as const;

function isNavActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ variant = "solid" }: { variant?: "default" | "solid" }) {
  const pathname = usePathname();
  const { cart, userProfile, openLogin } = useShop();
  const count = cart.length;

  /** Transparent header only on the home page when not forced solid. */
  const solid = variant === "solid" || pathname !== "/";

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        solid
          ? "border-sk-header-border bg-sk-header/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/app-icon-512.png"
            alt="Sanjeevni Kart"
            width={40}
            height={40}
            className="rounded-xl ring-2 ring-white/80"
          />
          <span className="font-display hidden text-lg font-semibold tracking-tight text-sk-brown sm:block">
            Sanjeevni Kart
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label }) => {
            const active = isNavActive(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-sk-primary text-white"
                    : "text-sk-ink-soft hover:bg-white/60 hover:text-sk-brown"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {!userProfile ? (
            <button
              type="button"
              onClick={openLogin}
              className="hidden rounded-full px-3 py-2 text-sm font-semibold text-sk-ink-soft transition hover:bg-white/70 sm:block"
            >
              Sign in
            </button>
          ) : null}
          <Link
            href="/account"
            className="rounded-full p-2.5 text-sk-ink-soft transition hover:bg-white/70"
            aria-label="Account"
          >
            <User size={20} strokeWidth={2} />
          </Link>
          {userProfile ? (
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-full bg-sk-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-sk-primary-dark"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Cart</span>
              {count > 0 ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[11px] font-bold text-sk-primary">
                  {count > 99 ? "99+" : count}
                </span>
              ) : null}
            </Link>
          ) : (
            <button
              type="button"
              onClick={openLogin}
              className="flex items-center gap-2 rounded-full bg-sk-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-sk-primary-dark"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Cart</span>
            </button>
          )}
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-sk-header-border/60 px-4 py-2 md:hidden">
        {links.map(({ href, label }) => {
          const active = isNavActive(href, pathname);
          return (
            <Link
              key={href}
              href={href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-sk-primary text-white"
                  : "bg-white/50 text-sk-ink-soft hover:bg-white/80"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
