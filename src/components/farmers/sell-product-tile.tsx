"use client";

import Image from "next/image";

import { useShop } from "@/context/shop-context";
import type { Product } from "@/lib/types";

function SellActions({
  product,
  qty,
  inline,
}: {
  product: Product;
  qty: number;
  inline?: boolean;
}) {
  const { addToSellCart, updateSellQuantity, userProfile, openLogin } = useShop();

  const guard = (action: () => void) => {
    if (!userProfile) {
      openLogin();
      return;
    }
    action();
  };

  if (qty > 0) {
    return (
      <div className={`flex items-center justify-between ${inline ? "w-full max-w-xs sm:w-auto" : "w-full"}`}>
        <button
          type="button"
          onClick={() => guard(() => updateSellQuantity(product.id, qty - 1))}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sk-primary bg-white text-base font-bold text-sk-primary"
          aria-label="Decrease"
        >
          −
        </button>
        <span className="min-w-[3rem] text-center text-xs font-bold text-sk-body">{qty} kg</span>
        <button
          type="button"
          onClick={() => guard(() => updateSellQuantity(product.id, qty + 1))}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sk-primary text-base font-bold text-white"
          aria-label="Increase"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => guard(() => addToSellCart(product))}
      className={`flex h-[34px] items-center justify-center rounded-lg bg-sk-primary ${
        inline ? "w-full max-w-xs px-6 sm:w-auto" : "w-full"
      }`}
    >
      <span className="text-[11px] font-extrabold tracking-wide text-white">
        {userProfile ? "ADD TO SELL" : "SIGN IN"}
      </span>
    </button>
  );
}

/** Sell card — grid matches mobile app; `layout="row"` for list view. */
export function SellProductTile({
  product,
  layout = "card",
}: {
  product: Product;
  layout?: "card" | "row";
}) {
  const { getSellCartQuantity } = useShop();
  const qty = getSellCartQuantity(product.id);

  if (layout === "row") {
    return (
      <article className="flex gap-4 rounded-2xl border border-sk-border bg-white p-4 transition hover:border-sk-primary/30 hover:shadow-lg">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-3xl">🌾</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-sk-body">{product.name}</h3>
            <p className="mt-0.5 text-sm font-bold text-sk-muted">₹{product.price}/kg</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <SellActions product={product} qty={qty} inline />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col rounded-[14px] border border-sk-border bg-white p-[11px] shadow-[0_3px_8px_rgba(139,94,60,0.06)]">
      <div className="relative h-[108px] w-full overflow-hidden rounded-[10px] bg-white">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain"
            unoptimized
          />
        ) : (
          <span className="flex h-full items-center justify-center text-3xl">🌾</span>
        )}
      </div>
      <div className="mt-2 min-w-0">
        <h3 className="truncate text-sm font-bold text-sk-body">{product.name}</h3>
        <p className="mt-0.5 text-xs font-bold text-sk-muted">₹{product.price}/kg</p>
        <div className="mt-2">
          <SellActions product={product} qty={qty} />
        </div>
      </div>
    </article>
  );
}
