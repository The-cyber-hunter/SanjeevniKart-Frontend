"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag } from "lucide-react";

import { WEIGHT_STEP_GRAMS } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { useShop } from "@/context/shop-context";

function displayKg(grams: number) {
  return String(Number((grams / 1000).toFixed(2)));
}

/** Web-native product tile — horizontal layout option via `layout` */
export function ProductTile({
  product,
  layout = "card",
  compact = false,
}: {
  product: Product;
  layout?: "card" | "row";
  /** Denser card for 2-column mobile shop grids */
  compact?: boolean;
}) {
  const { getCartQuantity, addToCart, updateQuantity, userProfile, openLogin } = useShop();
  const qty = userProfile ? getCartQuantity(product.id) : 0;

  const guard = (action: () => void) => {
    if (!userProfile) {
      openLogin();
      return;
    }
    action();
  };
  const [manualKg, setManualKg] = useState<string | null>(null);

  const applyManual = () => {
    if (manualKg === null) return;
    const parsed = Number(manualKg);
    const next = parsed * 1000;
    if (Number.isFinite(next) && next > 0) updateQuantity(product.id, next);
    setManualKg(null);
  };

  const lineTotal = ((product.price * (qty || WEIGHT_STEP_GRAMS)) / 1000).toFixed(0);

  if (layout === "row") {
    return (
      <article className="group flex gap-4 rounded-2xl border border-sk-border bg-white p-4 transition hover:border-sk-primary/30 hover:shadow-lg">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-[#faf6f0]">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-3xl">🥬</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-sk-body">{product.name}</h3>
            <p className="mt-0.5 text-sm text-sk-muted">₹{product.price} / kg</p>
          </div>
          <QtyControls
            qty={qty}
            manualKg={manualKg}
            setManualKg={setManualKg}
            applyManual={applyManual}
            onAdd={() => guard(() => addToCart(product))}
            onMinus={() => guard(() => updateQuantity(product.id, qty - WEIGHT_STEP_GRAMS))}
            onPlus={() => guard(() => updateQuantity(product.id, qty + WEIGHT_STEP_GRAMS))}
            onRemove={() => guard(() => updateQuantity(product.id, 0))}
            signInLabel={!userProfile}
          />
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col overflow-hidden border border-sk-border bg-white transition hover:border-sk-primary/25 hover:shadow-lg ${
        compact ? "rounded-xl hover:shadow-md" : "rounded-2xl hover:-translate-y-0.5 hover:shadow-xl"
      }`}
    >
      <div
        className={`relative bg-gradient-to-b from-[#faf6f0] to-white ${
          compact ? "aspect-square p-2" : "aspect-[4/3] p-4"
        }`}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-contain transition group-hover:scale-105 ${compact ? "p-1" : "p-4"}`}
            unoptimized
          />
        ) : (
          <span className={`flex h-full items-center justify-center ${compact ? "text-3xl" : "text-5xl"}`}>
            🥬
          </span>
        )}
        {product.popular ? (
          <span
            className={`absolute rounded-full bg-sk-amber font-bold uppercase tracking-wide text-white ${
              compact ? "left-1.5 top-1.5 px-1.5 py-0.5 text-[8px]" : "left-3 top-3 px-2.5 py-0.5 text-[10px]"
            }`}
          >
            Popular
          </span>
        ) : null}
      </div>
      <div className={`flex flex-1 flex-col border-t border-sk-border/80 ${compact ? "p-2.5" : "p-4"}`}>
        <h3
          className={`font-semibold leading-snug text-sk-body ${compact ? "line-clamp-2 text-sm" : ""}`}
        >
          {product.name}
        </h3>
        <p className={`text-sk-muted ${compact ? "mt-0.5 text-xs" : "mt-1 text-sm"}`}>
          ₹{product.price}
          <span className="text-sk-muted/80"> / kg</span>
        </p>
        <div className={compact ? "mt-auto pt-2" : "mt-auto pt-4"}>
          {qty > 0 ? (
            <QtyControls
              qty={qty}
              manualKg={manualKg}
              setManualKg={setManualKg}
              applyManual={applyManual}
              compact
              onAdd={() => guard(() => addToCart(product))}
              onMinus={() => guard(() => updateQuantity(product.id, qty - WEIGHT_STEP_GRAMS))}
              onPlus={() => guard(() => updateQuantity(product.id, qty + WEIGHT_STEP_GRAMS))}
              onRemove={() => guard(() => updateQuantity(product.id, 0))}
            />
          ) : (
            <button
              type="button"
              onClick={() => guard(() => addToCart(product))}
              className={`flex w-full items-center justify-center gap-1.5 rounded-lg bg-sk-primary font-semibold text-white transition hover:bg-sk-primary-dark ${
                compact ? "py-2 text-xs" : "gap-2 rounded-xl py-2.5 text-sm"
              }`}
            >
              <ShoppingBag size={compact ? 14 : 16} />
              {userProfile ? (compact ? "Add" : "Add to bag") : compact ? "Sign in" : "Sign in to add"}
            </button>
          )}
        </div>
        {qty > 0 ? (
          <p className={`text-right font-medium text-sk-muted ${compact ? "mt-1 text-[10px]" : "mt-2 text-xs"}`}>
            ≈ ₹{lineTotal}
          </p>
        ) : null}
      </div>
    </article>
  );
}

function QtyControls({
  qty,
  manualKg,
  setManualKg,
  applyManual,
  onAdd,
  onMinus,
  onPlus,
  onRemove,
  compact,
  signInLabel,
}: {
  qty: number;
  manualKg: string | null;
  setManualKg: (v: string | null) => void;
  applyManual: () => void;
  onAdd: () => void;
  onMinus: () => void;
  onPlus: () => void;
  onRemove: () => void;
  compact?: boolean;
  signInLabel?: boolean;
}) {
  if (qty <= 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`flex w-full items-center justify-center gap-1.5 rounded-lg bg-sk-primary font-semibold text-white ${
          compact ? "py-2 text-xs" : "gap-2 rounded-xl py-2.5 text-sm"
        }`}
      >
        <ShoppingBag size={compact ? 14 : 16} />
        {signInLabel ? (compact ? "Sign in" : "Sign in to add") : compact ? "Add" : "Add to bag"}
      </button>
    );
  }

  return (
    <div className={compact ? "space-y-1.5" : "flex w-full min-w-0 flex-col gap-2 sm:items-end"}>
      <div
        className={`flex w-full min-w-0 items-center justify-between rounded-lg border border-sk-border bg-sk-page ${
          compact ? "gap-0.5 px-1 py-1" : "gap-1 rounded-xl px-1.5 py-1.5 sm:gap-2 sm:px-2"
        }`}
      >
        <button
          type="button"
          onClick={onMinus}
          className={`flex items-center justify-center rounded-md text-sk-primary hover:bg-white ${
            compact ? "h-7 w-7" : "h-9 w-9 rounded-lg"
          }`}
          aria-label="Decrease"
        >
          <Minus size={compact ? 14 : 16} />
        </button>
        <div className={`flex items-center gap-0.5 font-semibold ${compact ? "text-xs" : "gap-1 text-sm"}`}>
          <input
            className={`bg-transparent text-center outline-none ${compact ? "w-9" : "w-12"}`}
            value={manualKg ?? displayKg(qty)}
            onChange={(e) =>
              setManualKg(e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))
            }
            onBlur={applyManual}
          />
          <span className="text-sk-muted">kg</span>
        </div>
        <button
          type="button"
          onClick={onPlus}
          className={`flex items-center justify-center rounded-md bg-sk-primary text-white ${
            compact ? "h-7 w-7" : "h-9 w-9 rounded-lg"
          }`}
          aria-label="Increase"
        >
          <Plus size={compact ? 14 : 16} />
        </button>
      </div>
      {!compact ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-medium text-sk-error hover:underline"
        >
          Remove
        </button>
      ) : null}
    </div>
  );
}
