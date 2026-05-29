"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

import { ProductTile } from "@/components/product/product-tile";
import { PRODUCT_GRID_CLASS } from "@/components/product/product-grid";
import { BuyCartFloatingBar } from "@/components/shop/buy-cart-floating-bar";
import { CART_FLOATING_BAR_PADDING } from "@/components/shop/cart-floating-bar-padding";
import { useShop } from "@/context/shop-context";

export function ShopCatalog() {
  const searchParams = useSearchParams();
  const { categories, products, cart, fetchInitialData } = useShop();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) setCategoryId(fromUrl);
    fetchInitialData();
  }, [searchParams, fetchInitialData]);

  const filtered = useMemo(() => {
    let list = products;
    if (categoryId) {
      list = list.filter((p) => (p.categoryId ?? "").trim() === categoryId.trim());
    }
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => {
      const cat =
        categories.find((c) => c.id === p.categoryId)?.name.toLowerCase() ?? "";
      return (
        p.name.toLowerCase().includes(q) ||
        p.unit.toLowerCase().includes(q) ||
        cat.includes(q)
      );
    });
  }, [products, categories, categoryId, query]);

  const activeCategory = categories.find((c) => c.id === categoryId);

  const categoryChipClass = (active: boolean) =>
    `shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
      active
        ? "bg-sk-primary text-white shadow-sm"
        : "border border-sk-border bg-white text-sk-ink-soft"
    }`;

  return (
    <>
      <div className="border-b border-sk-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
          <h1 className="font-display text-2xl font-semibold text-sk-brown sm:text-3xl md:text-4xl">
            {activeCategory ? `${activeCategory.emoji} ${activeCategory.name}` : "Shop"}
          </h1>
          <p className="mt-1.5 text-sm text-sk-muted sm:mt-2 sm:text-base">
            {filtered.length} product{filtered.length === 1 ? "" : "s"} · sold by weight (kg)
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:mt-6 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sk-muted sm:left-4" size={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search produce, grains, spices…"
                className="w-full rounded-2xl border border-sk-border bg-sk-page py-3 pl-10 pr-3 text-sm outline-none ring-sk-primary/20 focus:ring-2 sm:py-3.5 sm:pl-11 sm:pr-4"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold sm:px-4 sm:py-3 ${
                  view === "grid" ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold sm:px-4 sm:py-3 ${
                  view === "list" ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
                }`}
              >
                <SlidersHorizontal size={16} />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: horizontal category strip (full-bleed scroll) */}
        <div className="border-t border-sk-border/70 bg-[#faf8f5] lg:hidden">
          <p className="mx-auto max-w-6xl px-4 pt-3 text-[11px] font-bold uppercase tracking-wider text-sk-muted sm:px-6">
            Categories
          </p>
          <div
            className="mx-auto flex max-w-6xl touch-pan-x flex-nowrap gap-2 overflow-x-auto overscroll-x-contain px-4 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory sm:px-6"
            role="tablist"
            aria-label="Product categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!categoryId}
              onClick={() => setCategoryId(null)}
              className={categoryChipClass(!categoryId)}
            >
              All products
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
        className={`mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-6 sm:py-8 ${cart.length > 0 ? CART_FLOATING_BAR_PADDING : ""}`}
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
                  All products
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
              <p className="py-16 text-center text-sm text-sk-muted sm:py-20">No products match your filters.</p>
            ) : view === "grid" ? (
              <div className={PRODUCT_GRID_CLASS}>
                {filtered.map((p) => (
                  <ProductTile key={p.id} product={p} compact />
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filtered.map((p) => (
                  <ProductTile key={p.id} product={p} layout="row" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <BuyCartFloatingBar />
    </>
  );
}
