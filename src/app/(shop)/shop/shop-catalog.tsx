"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";

import { ShopLayout } from "@/components/layout/shop-layout";
import { ProductTile } from "@/components/product/product-tile";
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

  return (
    <ShopLayout>
      <div className="border-b border-sk-border bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-sk-brown sm:text-4xl">
            {activeCategory ? `${activeCategory.emoji} ${activeCategory.name}` : "Shop"}
          </h1>
          <p className="mt-2 text-sk-muted">
            {filtered.length} product{filtered.length === 1 ? "" : "s"} · sold by weight (kg)
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-sk-muted" size={18} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search produce, grains, spices…"
                className="w-full rounded-2xl border border-sk-border bg-sk-page py-3.5 pl-11 pr-4 text-sm outline-none ring-sk-primary/20 focus:ring-2"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                  view === "grid" ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                  view === "list" ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
                }`}
              >
                <SlidersHorizontal size={16} />
                List
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto flex max-w-6xl gap-8 px-4 py-8 sm:px-6 ${cart.length > 0 ? CART_FLOATING_BAR_PADDING : ""}`}
      >
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
          <div className="mb-4 flex gap-2 overflow-x-auto lg:hidden">
            <button
              type="button"
              onClick={() => setCategoryId(null)}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                !categoryId ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryId(c.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold ${
                  categoryId === c.id
                    ? "bg-sk-primary text-white"
                    : "border border-sk-border bg-white"
                }`}
              >
                {c.emoji} {c.name}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="py-20 text-center text-sk-muted">No products match your filters.</p>
          ) : view === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductTile key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => (
                <ProductTile key={p.id} product={p} layout="row" />
              ))}
            </div>
          )}
        </div>
      </div>
      <BuyCartFloatingBar />
    </ShopLayout>
  );
}
