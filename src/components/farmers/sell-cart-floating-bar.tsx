"use client";

import { FloatingActionBar } from "@/components/shop/floating-action-bar";
import { useShop } from "@/context/shop-context";

/** Bottom bar when crops are in the sell cart — matches mobile “Go to Sell Cart”. */
export function SellCartFloatingBar() {
  const { sellCart } = useShop();
  const count = sellCart.length;

  if (count === 0) return null;

  return (
    <FloatingActionBar
      href="/farmers/cart"
      label={`Go to selling cart (${count})`}
      ariaLabel="Open selling cart"
    />
  );
}