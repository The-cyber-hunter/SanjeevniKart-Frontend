"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sprout } from "lucide-react";

import { RequireAuth } from "@/components/auth/require-auth";
import { DeliveryForm } from "@/components/checkout/delivery-form";
import { AddCropsLink } from "@/components/farmers/add-crops-link";
import { TrackRequestsLink } from "@/components/farmers/track-requests-link";
import { useShop } from "@/context/shop-context";
import { api, getApiErrorMessage } from "@/lib/api";
import { loadCheckoutDraft, saveCheckoutDraft } from "@/lib/checkout-storage";
import { normalizeIndiaPincode } from "@/lib/pincode";
import type { SellQuote } from "@/lib/types";

function SellCartForm() {
  const router = useRouter();
  const { sellCart, userProfile, updateSellQuantity, clearSellCart } = useShop();
  const [delivery, setDelivery] = useState(() => loadCheckoutDraft());
  const [addressValid, setAddressValid] = useState(false);
  const [quote, setQuote] = useState<SellQuote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sellItemsPayload = useMemo(
    () => sellCart.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
    [sellCart]
  );

  useEffect(() => {
    let active = true;
    if (sellItemsPayload.length === 0) {
      setQuote(null);
      return;
    }
    const run = async () => {
      setLoadingQuote(true);
      try {
        const response = await api.quoteSellOrder({ items: sellItemsPayload });
        if (active) setQuote(response);
      } catch {
        if (active) setQuote(null);
      } finally {
        if (active) setLoadingQuote(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [sellItemsPayload]);

  const submitSellRequest = async () => {
    if (!userProfile || sellCart.length === 0 || !addressValid) return;
    if (!userProfile.email?.trim() && !userProfile.phoneNumber?.trim()) {
      setError("Your account needs an email or phone number to submit a sell request.");
      return;
    }
    const pin = normalizeIndiaPincode(delivery.deliveryPincode);
    const pickupAddress = `${delivery.nearestLandmark.trim()}, ${delivery.deliveryAddress.trim()}, ${pin}`;
    setSubmitting(true);
    setError("");
    try {
      await api.createSellOrder({
        farmerName: userProfile.name.trim() || "Farmer",
        farmerEmail: userProfile.email?.trim() || undefined,
        farmerPhoneNumber: userProfile.phoneNumber?.trim() || undefined,
        pickupAddress,
        items: sellItemsPayload,
      });
      saveCheckoutDraft(delivery);
      clearSellCart();
      router.push("/farmers/requests?submitted=1");
    } catch (e) {
      setError(getApiErrorMessage(e, "Could not submit sell request right now."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl font-semibold text-sk-brown">Selling cart</h1>
        <TrackRequestsLink compact />
      </div>

      {sellCart.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-[#d8c9ff]/80 bg-gradient-to-b from-[#faf8ff] to-white px-6 py-12 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sk-success/10 text-sk-success">
            <Sprout size={28} strokeWidth={2} aria-hidden />
          </div>
          <p className="mt-4 font-display text-lg font-semibold text-sk-brown">No crops in your selling cart</p>
          <p className="mt-2 max-w-sm text-sm text-sk-muted">
            Browse farmer supply and add what you want to sell. We&apos;ll quote pickup and payout
            here.
          </p>
          <AddCropsLink className="mt-6" />
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          <ul className="divide-y divide-sk-border rounded-2xl border border-sk-border bg-white">
            {sellCart.map((item) => (
              <li key={item.product.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-5">
                <div className="min-w-0 flex-1">
                  <p className="font-medium break-words">{item.product.name}</p>
                  <p className="text-sm text-sk-muted">₹{item.product.price}/kg</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="h-8 w-8 rounded border font-bold"
                    onClick={() => updateSellQuantity(item.product.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="w-14 text-center text-sm font-bold">{item.quantity} kg</span>
                  <button
                    type="button"
                    className="h-8 w-8 rounded bg-sk-primary font-bold text-white"
                    onClick={() => updateSellQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <section className="rounded-2xl border border-sk-border bg-sk-page/60 p-5">
            <h2 className="font-semibold text-sk-brown">
              {loadingQuote ? "Calculating payout…" : "Payout estimate"}
            </h2>
            {quote ? (
              <ul className="mt-3 space-y-1 text-sm text-sk-ink-soft">
                <li>Raw amount: ₹{quote.grossAmount}</li>
                <li>
                  Platform fee ({Math.round(quote.platformFeeRate * 100)}%): −₹
                  {quote.platformFeeAmount}
                </li>
                <li>Pickup charge: −₹{quote.pickupChargeAmount}</li>
                <li className="pt-2 text-base font-semibold text-sk-success">
                  Estimated payout: ₹{quote.netPayoutAmount}
                </li>
              </ul>
            ) : (
              <p className="mt-2 text-sm text-sk-muted">
                {loadingQuote ? "Please wait…" : "Unable to calculate payout right now."}
              </p>
            )}
          </section>

          <section>
            <h2 className="font-semibold text-sk-brown">Pickup address</h2>
            <p className="mt-1 text-sm text-sk-muted">
              We use the same service areas as grocery delivery.
            </p>
            <div className="mt-4">
              <DeliveryForm
                value={delivery}
                onChange={setDelivery}
                onValidChange={setAddressValid}
              />
            </div>
          </section>

          {error ? <p className="text-sm font-medium text-sk-error">{error}</p> : null}

          <button
            type="button"
            disabled={submitting || !addressValid || !quote}
            onClick={submitSellRequest}
            className="w-full rounded-full bg-sk-primary py-3.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit sell request"}
          </button>

          <button
            type="button"
            onClick={clearSellCart}
            className="text-sm font-semibold text-sk-error hover:underline"
          >
            Clear selling cart
          </button>
        </div>
      )}
    </div>
  );
}

export default function FarmersCartPage() {
  return (
    <RequireAuth
      title="Sign in to submit crops"
      description="Sign in so we can contact you about pickup and payout."
    >
      <SellCartForm />
    </RequireAuth>
  );
}
