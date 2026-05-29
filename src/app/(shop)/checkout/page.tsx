"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

import { RequireAuth } from "@/components/auth/require-auth";
import { BackToCartLink } from "@/components/shop/back-to-cart-link";
import { DeliveryForm } from "@/components/checkout/delivery-form";
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

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

function CheckoutForm() {
  const router = useRouter();
  const { cart, cartTotal, promotions, userProfile, appConfig, placeOrder } = useShop();
  const [delivery, setDelivery] = useState<CheckoutDraft>(() => loadCheckoutDraft());
  const [addressValid, setAddressValid] = useState(false);
  const [method, setMethod] = useState<"cod" | "online">("cod");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [hasPastOrders, setHasPastOrders] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const activePromo = getActiveAutoPromotion(promotions, cart, cartTotal);
  const promotionDiscount = getPromotionDiscount(activePromo, cart, cartTotal);
  const { payableAmount } = computePayableAmount({
    cartTotal,
    couponDiscount,
    promotionDiscount,
    hasPastOrders,
  });

  const onlineAvailable =
    appConfig.paymentEnabled && Boolean(appConfig.razorpayKeyId?.trim());

  useEffect(() => {
    if (!cart.length) router.replace("/cart");
  }, [cart.length, router]);

  useEffect(() => {
    if (!userProfile) return;
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
      .then((r) => setCouponDiscount(r.discount))
      .catch(() => setCouponDiscount(0));
  }, [cartTotal]);

  const finishSuccess = (orderId: string, total: number) => {
    sessionStorage.setItem(
      "sanjeevni_last_order",
      JSON.stringify({ id: orderId, shortId: orderId.slice(-8).toUpperCase(), total })
    );
    router.push(`/checkout/success?id=${encodeURIComponent(orderId)}`);
  };

  const submitCod = async () => {
    if (!userProfile || !addressValid) return;
    saveCheckoutDraft(delivery);
    setBusy(true);
    setError("");
    try {
      const order = await placeOrder({
        customerName: userProfile.name,
        nearestLandmark: delivery.nearestLandmark.trim(),
        deliveryAddress: delivery.deliveryAddress.trim(),
        alternatePhoneNumber: delivery.alternateMobile.trim() || undefined,
        paymentMethod: "Cash on Delivery",
      });
      finishSuccess(order.id, order.totalAmount);
    } catch (e) {
      setError(getApiErrorMessage(e, "Could not place order."));
    } finally {
      setBusy(false);
    }
  };

  const submitOnline = async () => {
    if (!userProfile || !addressValid) return;
    const keyId = appConfig.razorpayKeyId?.trim();
    if (!keyId || !window.Razorpay) {
      setError("Online payment is not available. Use cash on delivery.");
      return;
    }
    saveCheckoutDraft(delivery);
    setBusy(true);
    setError("");
    try {
      const rpOrder = await api.createRazorpayOrder({
        amountInRupees: Number(payableAmount.toFixed(2)),
      });
      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay!({
          key: keyId,
          amount: rpOrder.amount,
          currency: rpOrder.currency,
          name: "Sanjeevni Kart",
          description: "Order payment",
          order_id: rpOrder.orderId,
          prefill: {
            name: userProfile.name,
            email: userProfile.email,
            contact: userProfile.phoneNumber,
          },
          theme: { color: "#2f7d4b" },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              await api.verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });
              const order = await placeOrder({
                customerName: userProfile.name,
                nearestLandmark: delivery.nearestLandmark.trim(),
                deliveryAddress: delivery.deliveryAddress.trim(),
                alternatePhoneNumber: delivery.alternateMobile.trim() || undefined,
                paymentMethod: "Online",
                paymentProvider: "razorpay",
                paymentOrderId: response.razorpay_order_id,
                paymentPaymentId: response.razorpay_payment_id,
              });
              resolve();
              finishSuccess(order.id, order.totalAmount);
            } catch (e) {
              reject(e);
            }
          },
          modal: {
            ondismiss: () => reject(new Error("Payment cancelled.")),
          },
        });
        rzp.open();
      });
    } catch (e) {
      setError(getApiErrorMessage(e, "Payment failed."));
    } finally {
      setBusy(false);
    }
  };

  if (!userProfile || !cart.length) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-sk-brown">Checkout</h1>
        <p className="mt-2 text-sm text-sk-muted">
          {userProfile.name} · {userProfile.phoneNumber}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl border border-sk-border bg-white p-6">
            <h2 className="font-semibold">Confirm delivery</h2>
            <div className="mt-4">
              <DeliveryForm value={delivery} onChange={setDelivery} onValidChange={setAddressValid} />
            </div>
          </section>

          <aside className="h-fit rounded-2xl border border-sk-border bg-white p-6 shadow-md lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-semibold">Pay ₹{payableAmount.toFixed(0)}</h2>
            <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`rounded-xl border-2 py-3 text-sm font-semibold ${
                  method === "cod" ? "border-sk-primary bg-sk-header" : "border-sk-border"
                }`}
              >
                Cash on delivery
              </button>
              <button
                type="button"
                onClick={() => setMethod("online")}
                disabled={!onlineAvailable}
                className={`rounded-xl border-2 py-3 text-sm font-semibold disabled:opacity-40 ${
                  method === "online" ? "border-sk-primary bg-sk-header" : "border-sk-border"
                }`}
              >
                Pay online
              </button>
            </div>
            {!onlineAvailable ? (
              <p className="mt-3 text-xs leading-relaxed text-sk-muted">
                Add the same Razorpay public key as the mobile app to{" "}
                <code className="rounded bg-sk-page px-1">website/.env.local</code> as{" "}
                <code className="rounded bg-sk-page px-1">NEXT_PUBLIC_RAZORPAY_KEY_ID</code>, then
                restart the dev server.
              </p>
            ) : null}
            {error ? <p className="mt-3 text-sm text-sk-error">{error}</p> : null}
            <button
              type="button"
              disabled={busy || !addressValid}
              onClick={method === "cod" ? submitCod : submitOnline}
              className="mt-6 w-full rounded-xl bg-sk-primary py-3.5 font-semibold text-white disabled:opacity-60"
            >
              {busy ? "Please wait…" : method === "cod" ? "Place order" : "Pay with Razorpay"}
            </button>
            <BackToCartLink className="mt-4" />
          </aside>
        </div>
      </div>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <RequireAuth title="Sign in to checkout" description="You must be signed in to place an order.">
      <CheckoutForm />
    </RequireAuth>
  );
}
