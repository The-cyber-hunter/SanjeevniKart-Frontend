import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

type BackToCartLinkProps = {
  className?: string;
};

/** Checkout / order flow — return to shopping cart. */
export function BackToCartLink({ className = "" }: BackToCartLinkProps) {
  return (
    <Link
      href="/cart"
      className={`group inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#e8dfd4] bg-gradient-to-r from-white to-sk-page px-4 py-2.5 text-sm font-semibold text-sk-brown shadow-sm ring-1 ring-sk-header-border/60 transition hover:border-sk-primary/35 hover:shadow-md ${className}`}
    >
      <ArrowLeft
        size={16}
        className="text-sk-primary/80 transition group-hover:-translate-x-0.5 group-hover:text-sk-primary"
        aria-hidden
      />
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-header text-sk-primary ring-1 ring-sk-header-border/80">
        <ShoppingCart size={16} strokeWidth={2.25} aria-hidden />
      </span>
      <span>Back to cart</span>
    </Link>
  );
}
