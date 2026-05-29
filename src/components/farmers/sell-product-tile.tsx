"use client";

import Image from "next/image";
import { Minus, Plus, Sprout } from "lucide-react";

import { useShop } from "@/context/shop-context";
import type { Product } from "@/lib/types";

/** Compact sell card — same dimensions as shop `ProductTile compact`. */
export function SellProductTile({ product }: { product: Product }) {
  const { getSellCartQuantity, addToSellCart, updateSellQuantity, userProfile, openLogin } =
    useShop();
  const qty = getSellCartQuantity(product.id);

  const guard = (action: () => void) => {
    if (!userProfile) {
      openLogin();
      return;
    }
    action();
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-sk-border bg-white transition hover:border-sk-primary/25 hover:shadow-md">
      <div className="relative aspect-square bg-gradient-to-b from-[#faf6f0] to-white p-2">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-1 transition group-hover:scale-105"
            unoptimized
          />
        ) : (
          <span className="flex h-full items-center justify-center text-3xl">🌾</span>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-sk-border/80 p-2.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-sk-body">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-sk-muted">
          ₹{product.price}
          <span className="text-sk-muted/80"> / kg ref.</span>
        </p>
        <div className="mt-auto pt-2">
          {qty > 0 ? (
            <div className="flex w-full min-w-0 items-center justify-between gap-0.5 rounded-lg border border-sk-border bg-sk-page px-1 py-1">
              <button
                type="button"
                onClick={() => guard(() => updateSellQuantity(product.id, qty - 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md text-sk-primary hover:bg-white"
                aria-label="Decrease"
              >
                <Minus size={14} />
              </button>
              <span className="min-w-[2.5rem] text-center text-xs font-semibold">{qty} kg</span>
              <button
                type="button"
                onClick={() => guard(() => updateSellQuantity(product.id, qty + 1))}
                className="flex h-7 w-7 items-center justify-center rounded-md bg-sk-primary text-white"
                aria-label="Increase"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => guard(() => addToSellCart(product))}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-sk-primary py-2 text-xs font-semibold text-white transition hover:bg-sk-primary-dark"
            >
              <Sprout size={14} />
              {userProfile ? "Add" : "Sign in"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
