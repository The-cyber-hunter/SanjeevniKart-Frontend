"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, Sprout, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

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

function navLinkClass(active: boolean, mobile = false) {
  if (mobile) {
    return active
      ? "bg-sk-primary/95 text-white shadow-md backdrop-blur-sm"
      : "bg-white/50 text-sk-brown shadow-sm backdrop-blur-sm hover:bg-white/70";
  }
  return active
    ? "bg-sk-primary text-white"
    : "text-sk-ink-soft hover:bg-white/60 hover:text-sk-brown";
}

export function SiteHeader({ variant = "solid" }: { variant?: "default" | "solid" }) {
  const pathname = usePathname();
  const { cart, sellCart, userProfile, openLogin } = useShop();
  const count = cart.length;
  const sellCount = sellCart.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /** Transparent header only on the home page when not forced solid. */
  const solid = variant === "solid" || pathname !== "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const mobileMenu =
    menuOpen && mounted ? (
      <div
        className="fixed inset-0 z-[90] flex flex-col md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        <button
          type="button"
          className="absolute inset-0 bg-sk-brown/15 backdrop-blur-xl backdrop-saturate-150"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-white/25 px-4 py-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/app-icon-512.png"
                alt=""
                width={36}
                height={36}
                className="rounded-xl ring-2 ring-white/80"
              />
              <span className="font-display text-lg font-semibold text-sk-brown drop-shadow-sm">
                Sanjeevni Kart
              </span>
            </Link>
            <button
              type="button"
              className="rounded-full bg-white/50 p-2.5 text-sk-brown shadow-sm backdrop-blur-sm transition hover:bg-white/70"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={24} strokeWidth={2} />
            </button>
          </div>

          <nav id="mobile-nav" className="min-h-0 flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-3">
              {links.map(({ href, label }) => {
                const active = isNavActive(href, pathname);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`block rounded-2xl px-5 py-4 text-center font-display text-2xl font-semibold transition-all ${navLinkClass(active, true)}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="shrink-0 space-y-2 border-t border-white/25 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {!userProfile ? (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openLogin();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-sk-primary/95 py-3.5 text-base font-semibold text-white shadow-lg backdrop-blur-sm"
              >
                Sign in
              </button>
            ) : (
              <>
                <Link
                  href="/cart"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-sk-primary/95 py-3.5 text-base font-semibold text-white shadow-lg backdrop-blur-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <ShoppingBag size={20} />
                  Shopping cart
                  {count > 0 ? (
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-sk-primary">
                      {count > 99 ? "99+" : count}
                    </span>
                  ) : null}
                </Link>
                <Link
                  href="/farmers/cart"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-sk-primary/40 bg-white/60 py-3.5 text-base font-semibold text-sk-brown shadow-sm backdrop-blur-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  <Sprout size={20} className="text-sk-success" />
                  Selling cart
                  {sellCount > 0 ? (
                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-sk-primary px-1.5 text-xs font-bold text-white">
                      {sellCount > 99 ? "99+" : sellCount}
                    </span>
                  ) : null}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    ) : null;

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors ${
        solid
          ? "border-sk-header-border bg-sk-header/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl min-w-0 items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 md:gap-6">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-2">
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

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(({ href, label }) => {
            const active = isNavActive(href, pathname);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${navLinkClass(active)}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2">
          {!userProfile ? (
            <button
              type="button"
              onClick={openLogin}
              className="hidden rounded-full px-2.5 py-2 text-xs font-semibold text-sk-ink-soft transition hover:bg-white/70 sm:block sm:px-3 sm:text-sm"
            >
              Sign in
            </button>
          ) : null}
          <Link
            href="/account"
            className="rounded-full p-2 text-sk-ink-soft transition hover:bg-white/70 sm:p-2.5"
            aria-label="Account"
          >
            <User size={20} strokeWidth={2} />
          </Link>
          {userProfile ? (
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 rounded-full bg-sk-primary px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sk-primary-dark sm:gap-2 sm:px-4 sm:py-2.5"
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
              className="flex items-center gap-1.5 rounded-full bg-sk-primary px-3 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-sk-primary-dark sm:gap-2 sm:px-4 sm:py-2.5"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Cart</span>
            </button>
          )}
          <button
            type="button"
            className="rounded-full p-2 text-sk-ink-soft transition hover:bg-white/70 md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </header>
  );
}
