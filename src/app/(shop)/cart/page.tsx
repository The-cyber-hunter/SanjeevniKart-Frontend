"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { RequireAuth } from "@/components/auth/require-auth";
import { DeliveryForm } from "@/components/checkout/delivery-form";
import { ShopLayout } from "@/components/layout/shop-layout";
import { useShop } from "@/context/shop-context";
import { api, getApiErrorMessage } from "@/lib/api";
import {
  computePayableAmount,
  getActiveAutoPromotion,
  getPromotionDiscount,
} from "@/lib/cart-pricing";
import {
  APPLIED_COUPON_KEY,
  loadCheckoutDraft,
  saveCheckoutDraft,
  type CheckoutDraft,
} from "@/lib/checkout-storage";
import { WEIGHT_STEP_GRAMS } from "@/lib/constants";

function CartContent() {
  const router = useRouter();
  const { cart, cartTotal, promotions, updateQuantity, userProfile } = useShop();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [hasPastOrders, setHasPastOrders] = useState<boolean | null>(null);
  const [delivery, setDelivery] = useState<CheckoutDraft>(() => loadCheckoutDraft());
  const [addressValid, setAddressValid] = useState(false);

  const activePromo = getActiveAutoPromotion(promotions, cart, cartTotal);
  const promotionDiscount = getPromotionDiscount(activePromo, cart, cartTotal);
  const { deliveryCharge, payableAmount } = computePayableAmount({
    cartTotal,
    couponDiscount,
    promotionDiscount,
    hasPastOrders,
  });

  useEffect(() => {
    if (!userProfile?.email && !userProfile?.phoneNumber) {
      setHasPastOrders(null);
      return;
    }
    api
      .getOrderCount({ email: userProfile.email, phoneNumber: userProfile.phoneNumber })
      .then(({ count }) => setHasPastOrders(count > 0))
      .catch(() => setHasPastOrders(null));
  }, [userProfile]);

  useEffect(() => {
    const stored = localStorage.getItem(APPLIED_COUPON_KEY)?.trim().toUpperCase();
    if (!stored || cartTotal <= 0) return;
    api
      .validateCoupon({ code: stored, cartTotal })
      .then((r) => {
        setAppliedCoupon(r.code);
        setCouponDiscount(r.discount);
      })
      .catch(() => {
        localStorage.removeItem(APPLIED_COUPON_KEY);
      });
  }, [cartTotal]);

  const applyCoupon = async () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    setApplyingCoupon(true);
    setCouponError("");
    try {
      const r = await api.validateCoupon({ code, cartTotal });
      setAppliedCoupon(r.code);
      setCouponDiscount(r.discount);
      localStorage.setItem(APPLIED_COUPON_KEY, r.code);
    } catch (e) {
      setAppliedCoupon("");
      setCouponDiscount(0);
      setCouponError(getApiErrorMessage(e, "Invalid coupon."));
    } finally {
      setApplyingCoupon(false);
    }
  };

  const goToCheckout = () => {
    if (!addressValid) return;
    saveCheckoutDraft(delivery);
    router.push("/checkout");
  };

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-sk-brown">Your bag</h1>
        <div className="mt-16 rounded-3xl border border-dashed border-sk-border bg-white py-20 text-center">
          <p className="text-lg font-medium">Nothing here yet</p>
          <Link href="/shop" className="mt-6 inline-block rounded-full bg-sk-primary px-8 py-3 text-sm font-semibold text-white">
            Browse shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-sk-brown">Your bag</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-3">
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.product.id} className="flex gap-4 rounded-2xl border border-sk-border bg-white p-4">
                <div className="relative h-20 w-20 shrink-0 rounded-xl bg-[#faf6f0]">
                  {item.product.image ? (
                    <Image src={item.product.image} alt="" fill className="object-contain p-1" unoptimized />
                  ) : (
                    <span className="flex h-full items-center justify-center text-2xl">🥬</span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between sm:flex-row sm:items-center">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-sk-muted">
                      ₹{item.product.price}/kg · {(item.quantity / 1000).toFixed(2)} kg
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-sk-border">
                      <button type="button" className="px-3 py-2 font-bold text-sk-primary" onClick={() => updateQuantity(item.product.id, item.quantity - WEIGHT_STEP_GRAMS)}>−</button>
                      <span className="min-w-[3rem] text-center text-sm font-semibold">{(item.quantity / 1000).toFixed(2)}</span>
                      <button type="button" className="px-3 py-2 font-bold text-sk-primary" onClick={() => updateQuantity(item.product.id, item.quantity + WEIGHT_STEP_GRAMS)}>+</button>
                    </div>
                    <p className="font-bold">₹{((item.product.price * item.quantity) / 1000).toFixed(0)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <section className="rounded-2xl border border-sk-border bg-white p-5">
            <h2 className="font-semibold">Delivery details</h2>
            <div className="mt-3">
              <DeliveryForm value={delivery} onChange={setDelivery} onValidChange={setAddressValid} />
            </div>
          </section>

          <section className="rounded-2xl border border-sk-border bg-white p-5">
            <h2 className="font-semibold">Coupon</h2>
            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 rounded-xl border border-sk-border px-4 py-2.5 text-sm outline-none focus:border-sk-primary"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
              <button
                type="button"
                onClick={applyCoupon}
                disabled={applyingCoupon}
                className="rounded-xl border border-sk-primary px-4 text-sm font-bold text-sk-primary disabled:opacity-50"
              >
                Apply
              </button>
            </div>
            {appliedCoupon ? (
              <p className="mt-2 text-xs font-semibold text-sk-success">Applied: {appliedCoupon}</p>
            ) : null}
            {couponError ? <p className="mt-2 text-xs text-sk-error">{couponError}</p> : null}
          </section>
        </div>

        <aside className="lg:col-span-2">
          <div className="sticky top-24 rounded-2xl border border-sk-border bg-white p-6 shadow-lg">
            <h2 className="font-display text-xl font-semibold">Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-sk-muted">Subtotal</span>
                <span className="font-semibold">₹{cartTotal.toFixed(0)}</span>
              </div>
              {promotionDiscount > 0 ? (
                <div className="flex justify-between text-sk-success">
                  <span>Offer{activePromo ? ` (${activePromo.title})` : ""}</span>
                  <span>−₹{promotionDiscount.toFixed(0)}</span>
                </div>
              ) : null}
              {couponDiscount > 0 ? (
                <div className="flex justify-between text-sk-success">
                  <span>Coupon</span>
                  <span>−₹{couponDiscount.toFixed(0)}</span>
                </div>
              ) : null}
              {deliveryCharge > 0 ? (
                <div className="flex justify-between">
                  <span className="text-sk-muted">Delivery</span>
                  <span>₹{deliveryCharge}</span>
                </div>
              ) : null}
              {hasPastOrders === false ? (
                <p className="text-xs text-sk-success">First order — free delivery</p>
              ) : null}
            </div>
            <p className="mt-4 flex justify-between border-t border-sk-border pt-4 text-lg font-bold">
              <span>Total</span>
              <span>₹{payableAmount.toFixed(0)}</span>
            </p>
            <button
              type="button"
              disabled={!addressValid}
              onClick={goToCheckout}
              className="mt-6 block w-full rounded-xl bg-sk-primary py-3.5 text-center text-sm font-semibold text-white disabled:opacity-50"
            >
              Continue to checkout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ShopLayout>
      <RequireAuth title="Sign in to view your cart" description="Your cart is available after you sign in.">
        <CartContent />
      </RequireAuth>
    </ShopLayout>
  );
}
