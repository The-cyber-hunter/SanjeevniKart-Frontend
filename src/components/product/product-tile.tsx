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
}: {
  product: Product;
  layout?: "card" | "row";
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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-sk-border bg-white transition hover:-translate-y-0.5 hover:border-sk-primary/25 hover:shadow-xl">
      <div className="relative aspect-[4/3] bg-gradient-to-b from-[#faf6f0] to-white p-4">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition group-hover:scale-105"
            unoptimized
          />
        ) : (
          <span className="flex h-full items-center justify-center text-5xl">🥬</span>
        )}
        {product.popular ? (
          <span className="absolute left-3 top-3 rounded-full bg-sk-amber px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Popular
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col border-t border-sk-border/80 p-4">
        <h3 className="font-semibold leading-snug text-sk-body">{product.name}</h3>
        <p className="mt-1 text-sm text-sk-muted">
          ₹{product.price}
          <span className="text-sk-muted/80"> / kg</span>
        </p>
        <div className="mt-auto pt-4">
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sk-primary py-2.5 text-sm font-semibold text-white transition hover:bg-sk-primary-dark"
            >
              <ShoppingBag size={16} />
              {userProfile ? "Add to bag" : "Sign in to add"}
            </button>
          )}
        </div>
        {qty > 0 ? (
          <p className="mt-2 text-right text-xs font-medium text-sk-muted">≈ ₹{lineTotal}</p>
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
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-sk-primary py-2.5 text-sm font-semibold text-white"
      >
        <ShoppingBag size={16} />
        {signInLabel ? "Sign in to add" : "Add to bag"}
      </button>
    );
  }

  return (
    <div className={compact ? "space-y-2" : "flex flex-col gap-2 sm:items-end"}>
      <div className="flex items-center justify-between gap-2 rounded-xl border border-sk-border bg-sk-page px-2 py-1.5">
        <button
          type="button"
          onClick={onMinus}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-sk-primary hover:bg-white"
          aria-label="Decrease"
        >
          <Minus size={16} />
        </button>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <input
            className="w-12 bg-transparent text-center outline-none"
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
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-sk-primary text-white"
          aria-label="Increase"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-xs font-medium text-sk-error hover:underline"
      >
        Remove
      </button>
    </div>
  );
}
