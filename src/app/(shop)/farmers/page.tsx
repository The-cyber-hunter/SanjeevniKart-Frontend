"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Sprout } from "lucide-react";

import { SellCartFloatingBar } from "@/components/farmers/sell-cart-floating-bar";
import { CART_FLOATING_BAR_PADDING } from "@/components/shop/cart-floating-bar-padding";
import { TrackRequestsLink } from "@/components/farmers/track-requests-link";
import { ShopLayout } from "@/components/layout/shop-layout";
import { useShop } from "@/context/shop-context";

export default function FarmersPage() {
  const {
    categories,
    products,
    addToSellCart,
    updateSellQuantity,
    getSellCartQuantity,
    sellCart,
    userProfile,
    openLogin,
  } = useShop();

  const handleAdd = (product: (typeof products)[0]) => {
    if (!userProfile) {
      openLogin();
      return;
    }
    addToSellCart(product);
  };

  const handleQty = (productId: string, qty: number) => {
    if (!userProfile) {
      openLogin();
      return;
    }
    updateSellQuantity(productId, qty);
  };
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!categoryId) return products;
    return products.filter((p) => p.categoryId === categoryId);
  }, [products, categoryId]);

  return (
    <ShopLayout>
      <section className="border-b border-[#d8c9ff]/50 bg-gradient-to-r from-[#f7f3ff] to-sk-page">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow">
            <Sprout className="text-sk-success" size={28} />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-3xl font-semibold text-sk-brown">Farmer supply</h1>
            <p className="mt-2 max-w-2xl text-sk-ink-soft">
              List what you&apos;re harvesting. We coordinate pickup, transparent fees, and payout
              tracking — same program as our mobile farmer flow.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <TrackRequestsLink />
          </div>
        </div>
      </section>

      <div
        className={`mx-auto max-w-6xl px-4 py-8 sm:px-6 ${sellCart.length > 0 ? CART_FLOATING_BAR_PADDING : ""}`}
      >
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoryId(null)}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              !categoryId ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
            }`}
          >
            All crops
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategoryId(c.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                categoryId === c.id ? "bg-sk-primary text-white" : "border border-sk-border bg-white"
              }`}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => {
            const qty = getSellCartQuantity(product.id);
            return (
              <article
                key={product.id}
                className="flex flex-col rounded-2xl border border-[#e8e0f5] bg-white p-4"
              >
                <div className="relative mx-auto h-28 w-full max-w-[140px]">
                  {product.image ? (
                    <Image src={product.image} alt="" fill className="object-contain" unoptimized />
                  ) : (
                    <span className="flex h-full items-center justify-center text-4xl">🌾</span>
                  )}
                </div>
                <p className="mt-3 text-center font-semibold">{product.name}</p>
                <p className="text-center text-sm text-sk-muted">₹{product.price}/kg reference</p>
                <div className="mt-4 flex justify-center gap-2">
                  {qty > 0 ? (
                    <>
                      <button
                        type="button"
                        className="h-9 w-9 rounded-lg border font-bold"
                        onClick={() => handleQty(product.id, qty - 1)}
                      >
                        −
                      </button>
                      <span className="flex min-w-[4rem] items-center justify-center text-sm font-bold">
                        {qty} kg
                      </span>
                      <button
                        type="button"
                        className="h-9 w-9 rounded-lg bg-sk-primary font-bold text-white"
                        onClick={() => handleQty(product.id, qty + 1)}
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAdd(product)}
                      className="rounded-lg bg-sk-success px-5 py-2 text-sm font-semibold text-white"
                    >
                      Add to supply list
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <SellCartFloatingBar />
    </ShopLayout>
  );
}
