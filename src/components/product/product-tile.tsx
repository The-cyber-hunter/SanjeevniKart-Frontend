"use client";

import { useState } from "react";
import Image from "next/image";

import { WEIGHT_STEP_GRAMS } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { useShop } from "@/context/shop-context";

function displayKg(grams: number) {
  return String(Number((grams / 1000).toFixed(2)));
}

/** Web product tile — `compact` matches the mobile app card grid. */
export function ProductTile({
  product,
  layout = "card",
  compact = false,
}: {
  product: Product;
  layout?: "card" | "row";
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

  if (layout === "row") {
    return (
      <article className="group flex gap-4 rounded-2xl border border-sk-border bg-white p-4 transition hover:border-sk-primary/30 hover:shadow-lg">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white">
          {product.image ? (
            <Image src={product.image} alt={product.name} fill className="object-contain p-2" unoptimized />
          ) : (
            <span className="flex h-full items-center justify-center text-3xl">🥬</span>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-sk-body">{product.name}</h3>
            <p className="mt-0.5 text-sm font-bold text-sk-muted">₹{product.price}/kg</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <AppQtyControls
              qty={qty}
              manualKg={manualKg}
              setManualKg={setManualKg}
              applyManual={applyManual}
              onAdd={() => guard(() => addToCart(product))}
              onMinus={() => guard(() => updateQuantity(product.id, qty - WEIGHT_STEP_GRAMS))}
              onPlus={() => guard(() => updateQuantity(product.id, qty + WEIGHT_STEP_GRAMS))}
              onRemove={() => guard(() => updateQuantity(product.id, 0))}
              signInLabel={!userProfile}
              inline
            />
          </div>
        </div>
      </article>
    );
  }

  if (compact) {
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
            <span className="flex h-full items-center justify-center text-3xl">🥬</span>
          )}
        </div>
        <div className="mt-2 min-w-0">
          <h3 className="truncate text-sm font-bold text-sk-body">{product.name}</h3>
          <p className="mt-0.5 text-xs font-bold text-sk-muted">₹{product.price}/kg</p>
          <div className="mt-2">
            <AppQtyControls
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
        <p className="mt-1 text-sm font-bold text-sk-muted">₹{product.price}/kg</p>
        <div className="mt-auto pt-4">
          <AppQtyControls
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
      </div>
    </article>
  );
}

function AppQtyControls({
  qty,
  manualKg,
  setManualKg,
  applyManual,
  onAdd,
  onMinus,
  onPlus,
  onRemove,
  signInLabel,
  addLabel = "ADD",
  inline,
}: {
  qty: number;
  manualKg: string | null;
  setManualKg: (v: string | null) => void;
  applyManual: () => void;
  onAdd: () => void;
  onMinus: () => void;
  onPlus: () => void;
  onRemove: () => void;
  signInLabel?: boolean;
  addLabel?: string;
  inline?: boolean;
}) {
  const widthClass = inline ? "w-full max-w-xs sm:w-auto" : "w-full";

  if (qty <= 0) {
    return (
      <button
        type="button"
        onClick={onAdd}
        className={`flex h-[34px] items-center justify-center rounded-lg bg-sk-primary ${widthClass} ${
          inline ? "px-6" : ""
        }`}
      >
        <span className="text-[11px] font-extrabold tracking-wide text-white">
          {signInLabel ? "SIGN IN" : addLabel}
        </span>
      </button>
    );
  }

  return (
    <div className={widthClass}>
      <div className="flex w-full items-center justify-between">
        <button
          type="button"
          onClick={onMinus}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sk-primary bg-white text-base font-bold text-sk-primary"
          aria-label="Decrease"
        >
          −
        </button>
        <div className="flex min-w-0 flex-1 items-center justify-center px-1">
          <input
            className="h-7 w-14 rounded-md border border-slate-300 bg-white text-center text-sm font-semibold text-sk-body outline-none"
            value={manualKg ?? displayKg(qty)}
            onChange={(e) =>
              setManualKg(e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"))
            }
            onBlur={applyManual}
          />
          <span className="ml-1 text-xs font-bold text-sk-muted">kg</span>
        </div>
        <button
          type="button"
          onClick={onPlus}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sk-primary text-base font-bold text-white"
          aria-label="Increase"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="mt-1.5 w-full text-center text-[11px] font-semibold text-sk-error"
      >
        Remove
      </button>
    </div>
  );
}
