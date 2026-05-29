"use client";

import { useEffect, useMemo, useState } from "react";
import { SellProductTile } from "@/components/farmers/sell-product-tile";
import { SellCartFloatingBar } from "@/components/farmers/sell-cart-floating-bar";
import { TrackRequestsLink } from "@/components/farmers/track-requests-link";
import { CART_FLOATING_BAR_PADDING } from "@/components/shop/cart-floating-bar-padding";
import { useShop } from "@/context/shop-context";

const categoryChipClass = (active: boolean) =>
  `shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
    active
      ? "bg-sk-primary text-white shadow-sm"
      : "border border-sk-border bg-white text-sk-ink-soft"
  }`;

export default function FarmersPage() {
  const {
    categories,
    products,
    sellCart,
    fetchInitialData,
  } = useShop();
  const [categoryId, setCategoryId] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const filtered = useMemo(() => {
    if (!categoryId) return products;
    return products.filter((p) => (p.categoryId ?? "").trim() === categoryId.trim());
  }, [products, categoryId]);

  const activeCategory = categories.find((c) => c.id === categoryId);

  return (
    <>
      <div className="border-b border-sk-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h1 className="font-display text-2xl font-semibold text-sk-brown sm:text-3xl md:text-4xl">
                {activeCategory ? `${activeCategory.emoji} ${activeCategory.name}` : "Sell to us"}
              </h1>
              <p className="mt-1.5 text-sm text-sk-muted sm:mt-2 sm:text-base">
                {filtered.length} crop{filtered.length === 1 ? "" : "s"} · reference ₹/kg · add to your
                selling cart
              </p>
            </div>
            <TrackRequestsLink compact className="shrink-0 self-start sm:self-auto" />
          </div>
        </div>

        <div className="border-t border-sk-border/70 bg-[#faf8f5] lg:hidden">
          <p className="mx-auto max-w-6xl px-4 pt-3 text-[11px] font-bold uppercase tracking-wider text-sk-muted sm:px-6">
            Categories
          </p>
          <div
            className="mx-auto flex max-w-6xl touch-pan-x flex-nowrap gap-2 overflow-x-auto overscroll-x-contain px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory sm:px-6"
            role="tablist"
            aria-label="Crop categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!categoryId}
              onClick={() => setCategoryId(null)}
              className={categoryChipClass(!categoryId)}
            >
              All crops
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={categoryId === c.id}
                onClick={() => setCategoryId(c.id)}
                className={categoryChipClass(categoryId === c.id)}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-8 ${sellCart.length > 0 ? CART_FLOATING_BAR_PADDING : ""}`}
      >
        <div className="flex gap-8">
          <aside className="hidden w-52 shrink-0 lg:block">
            <p className="text-xs font-bold uppercase tracking-wider text-sk-muted">Categories</p>
            <ul className="mt-3 space-y-1">
              <li>
                <button
                  type="button"
                  onClick={() => setCategoryId(null)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                    !categoryId ? "bg-sk-header text-sk-brown" : "text-sk-ink-soft hover:bg-white"
                  }`}
                >
                  All crops
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setCategoryId(c.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium ${
                      categoryId === c.id
                        ? "bg-sk-header text-sk-brown"
                        : "text-sk-ink-soft hover:bg-white"
                    }`}
                  >
                    {c.emoji} {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-w-0 flex-1">
            {filtered.length === 0 ? (
              <p className="py-16 text-center text-sm text-sk-muted sm:py-20">
                No crops match this category.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
                {filtered.map((product) => (
                  <SellProductTile key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <SellCartFloatingBar />
    </>
  );
}
