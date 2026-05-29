"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Leaf, Shield, Truck } from "lucide-react";
import { useEffect, useMemo } from "react";

import {
  RunningOffersAnnouncement,
  RunningOffersSection,
} from "@/components/landing/running-offers-section";
import { ProductTile } from "@/components/product/product-tile";
import { PRODUCT_GRID_CLASS } from "@/components/product/product-grid";
import { BuyCartFloatingBar } from "@/components/shop/buy-cart-floating-bar";
import { CART_FLOATING_BAR_PADDING } from "@/components/shop/cart-floating-bar-padding";
import { ViewFullCatalogLink } from "@/components/shop/view-full-catalog-link";
import { useShop } from "@/context/shop-context";
import { formatPromotionDiscount, getActivePromotions } from "@/lib/promotion-utils";

export function LandingPage() {
  const { categories, products, promotions, cart, fetchInitialData, loading } = useShop();

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const featured = useMemo(
    () => products.filter((p) => p.popular).slice(0, 8),
    [products]
  );

  const activePromos = useMemo(() => getActivePromotions(promotions), [promotions]);
  const topPromo = activePromos[0];

  return (
    <>
      <RunningOffersAnnouncement promotions={promotions} />

      {/* Hero — full-bleed web layout, not mobile header */}
      <section className="relative overflow-hidden border-b border-sk-header-border bg-gradient-to-br from-sk-header via-[#faf3ea] to-sk-page sk-grain">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#ffe2bf]/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#d4e8d4]/40 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-24">
          <div className="min-w-0">
            {topPromo ? (
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sk-header-border bg-white/70 px-4 py-1.5 text-xs font-semibold text-sk-amber">
                <span className="h-1.5 w-1.5 rounded-full bg-sk-success" />
                {topPromo.title} — {formatPromotionDiscount(topPromo)}
              </p>
            ) : null}
            <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-sk-brown sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              Groceries from the farm, at your door in minutes.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-sk-ink-soft sm:mt-5 sm:text-lg">
              Sanjeevni Kart connects you to fresh vegetables, fruits, grains, and spices —
              sourced directly from local growers with quality you can taste.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sk-primary px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sk-primary-dark sm:px-7 sm:py-3.5"
              >
                Start shopping
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/farmers"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-sk-primary/30 bg-white px-6 py-3 text-sm font-semibold text-sk-brown transition hover:border-sk-primary sm:px-7 sm:py-3.5"
              >
                Sell your harvest
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full min-w-0 max-w-sm sm:max-w-md lg:max-w-none">
            <div className="relative flex aspect-square flex-col overflow-hidden rounded-3xl border border-[#ead8c4] bg-gradient-to-b from-[#faf3ea] to-[#f0e4d4] px-5 pt-4 pb-20 shadow-2xl shadow-sk-primary/10 sm:rounded-[2rem] sm:px-8 sm:pt-6 sm:pb-28">
              <div className="flex flex-1 items-center justify-center">
                <Image
                  src="/app-icon-512.png"
                  alt="Sanjeevni Kart"
                  width={280}
                  height={280}
                  className="h-auto w-[min(72%,240px)] drop-shadow-md sm:w-[min(80%,280px)]"
                  priority
                />
              </div>
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-sk-brown/95 px-4 py-3 text-[#f3e6d8] backdrop-blur sm:bottom-6 sm:left-6 sm:right-6">
                <p className="text-xs font-medium uppercase tracking-wider text-[#c9b8a8]">
                  Delivery estimate
                </p>
                <p className="font-display text-2xl font-semibold">~15 minutes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-sk-border bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {[
            { icon: Clock, label: "Fast slots", sub: "Quick doorstep delivery" },
            { icon: Leaf, label: "Farm direct", sub: "Transparent sourcing" },
            { icon: Shield, label: "Quality checked", sub: "Before it reaches you" },
            { icon: Truck, label: "Local trust", sub: "Built for your neighbourhood" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="text-center sm:text-left">
              <Icon className="mx-auto mb-2 text-sk-primary sm:mx-0" size={24} strokeWidth={1.75} />
              <p className="font-semibold text-sk-brown">{label}</p>
              <p className="mt-0.5 text-xs text-sk-muted">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <RunningOffersSection promotions={promotions} />

      {/* Categories — bento-style, not horizontal mobile chips */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-sk-brown">Shop by category</h2>
            <p className="mt-2 text-sk-muted">Choose fruits, grains, spices, and more.</p>
          </div>
          <ViewFullCatalogLink />
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/shop?category=${encodeURIComponent(c.id)}`}
              className="group flex min-h-[10.5rem] flex-col rounded-2xl border border-sk-border bg-gradient-to-b from-white to-[#faf6f0] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-sk-primary/40 hover:shadow-lg hover:shadow-sk-primary/10 sm:min-h-[11.5rem] sm:p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sk-header/80 text-3xl">
                {c.emoji}
              </span>
              <p className="mt-4 line-clamp-2 min-h-[2.75rem] text-base font-semibold leading-snug text-sk-brown">
                {c.name}
              </p>
              <span className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-sk-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition group-hover:bg-sk-primary-dark group-hover:shadow-md sm:text-sm">
                Shop now
                <ArrowRight size={15} className="shrink-0 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className={`bg-[#faf6f0] py-16 ${cart.length > 0 ? CART_FLOATING_BAR_PADDING : ""}`}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-sk-brown">Customer favourites</h2>
          <p className="mt-2 text-sk-muted">Hand-picked popular items this week.</p>
          {loading && featured.length === 0 ? (
            <p className="mt-10 text-center text-sm text-sk-muted">Loading fresh picks…</p>
          ) : featured.length === 0 ? (
            <p className="mt-10 text-center text-sm text-sk-muted">
              <Link href="/shop" className="font-semibold text-sk-primary">
                Browse the shop
              </Link>{" "}
              for everything in stock.
            </p>
          ) : (
            <div className={`mt-10 ${PRODUCT_GRID_CLASS}`}>
              {featured.map((p) => (
                <ProductTile key={p.id} product={p} compact />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dual CTA — wide bands, not mobile promo cards */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-sk-primary p-8 text-white lg:p-10">
            <h3 className="font-display text-2xl font-semibold">Ready to restock?</h3>
            <p className="mt-3 max-w-sm text-white/85">
              Search the full catalog, adjust quantities by weight, and checkout in a few clicks.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-sk-primary"
            >
              Open shop
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="rounded-3xl border-2 border-dashed border-[#d8c9ff] bg-[#f7f3ff] p-8 lg:p-10">
            <h3 className="font-display text-2xl font-semibold text-sk-brown">Grow with us</h3>
            <p className="mt-3 max-w-sm text-sk-ink-soft">
              Farmers can sell produce with scheduled pickup, clear fees, and payout tracking.
            </p>
            <Link
              href="/farmers"
              className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-sk-primary px-6 py-3 text-sm font-bold text-sk-primary transition hover:bg-sk-primary hover:text-white"
            >
              Farmer portal
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <BuyCartFloatingBar />
    </>
  );
}
