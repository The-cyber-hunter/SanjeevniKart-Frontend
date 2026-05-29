"use client";

import { FloatingActionBar } from "@/components/shop/floating-action-bar";
import { useShop } from "@/context/shop-context";

/** Bottom bar when items are in the buy cart — matches mobile Buy Now / Move to Cart. */
export function BuyCartFloatingBar() {
  const { cart } = useShop();
  const count = cart.length;

  if (count === 0) return null;

  if (count === 1) {
    return (
      <FloatingActionBar href="/checkout" label="Buy now" ariaLabel="Proceed to checkout" />
    );
  }

  return (
    <FloatingActionBar
      href="/cart"
      label={`Move to cart (${count})`}
      ariaLabel="Open shopping cart"
    />
  );
}
