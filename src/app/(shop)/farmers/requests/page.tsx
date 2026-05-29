"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { RequireAuth } from "@/components/auth/require-auth";
import { ShopLayout } from "@/components/layout/shop-layout";
import { useShop } from "@/context/shop-context";
import { api } from "@/lib/api";
import type { FarmerSellOrder, FarmerSellOrderStatus } from "@/lib/types";

const SELL_TIMELINE_STEPS: FarmerSellOrderStatus[] = [
  "Requested",
  "Pickup Scheduled",
  "Received",
  "Payout Done",
];

function stepIndex(status: string) {
  if (status === "Rejected") return -1;
  const idx = SELL_TIMELINE_STEPS.indexOf(status as FarmerSellOrderStatus);
  return idx >= 0 ? idx : 0;
}

function SellRequestsContent() {
  const { userProfile } = useShop();
  const searchParams = useSearchParams();
  const justSubmitted = searchParams.get("submitted") === "1";
  const [requests, setRequests] = useState<FarmerSellOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = useCallback(async () => {
    if (!userProfile?.email && !userProfile?.phoneNumber) {
      setRequests([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await api.getSellOrders({
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
      });
      setRequests(data);
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  }, [userProfile?.email, userProfile?.phoneNumber]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-sk-brown">Pickup tracking</h1>
          <p className="mt-1 text-sm text-sk-muted">Status and payout for your sell requests.</p>
        </div>
        <Link href="/farmers" className="text-sm font-semibold text-sk-primary hover:underline">
          ← Sell more
        </Link>
      </div>

      {justSubmitted ? (
        <p className="mt-6 rounded-xl border border-sk-success/30 bg-sk-success/10 px-4 py-3 text-sm text-sk-success">
          Your sell request was submitted. We&apos;ll update you by email when the status changes.
        </p>
      ) : null}

      {loading ? (
        <p className="mt-10 text-sm text-sk-muted">Loading requests…</p>
      ) : requests.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-sk-border bg-white p-8 text-center">
          <p className="font-semibold text-sk-brown">No sell requests yet</p>
          <p className="mt-2 text-sm text-sk-muted">
            Add crops from the farmer supply page and submit your supply list.
          </p>
          <Link
            href="/farmers"
            className="mt-6 inline-block rounded-full bg-sk-primary px-6 py-2.5 text-sm font-semibold text-white"
          >
            Start selling
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {requests.map((request) => {
            const current = stepIndex(request.status);
            const rejected = request.status === "Rejected";
            return (
              <li
                key={request.id}
                className="rounded-2xl border border-sk-border bg-white p-5 shadow-sm"
              >
                <p className="font-semibold text-sk-brown">
                  Sell #{request.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="mt-1 text-sm text-sk-muted">Status: {request.status}</p>
                <p className="mt-1 text-sm text-sk-ink-soft">Pickup: {request.pickupAddress}</p>
                <p className="mt-1 text-sm font-medium text-sk-success">
                  Net payout: ₹{request.netPayoutAmount}
                </p>
                {request.adminRemarks ? (
                  <p className="mt-2 text-sm text-sk-muted">Note: {request.adminRemarks}</p>
                ) : null}
                {rejected ? (
                  <p className="mt-3 text-sm text-sk-error">This request was not accepted.</p>
                ) : (
                  <ol className="mt-4 space-y-2 border-t border-sk-border pt-4">
                    {SELL_TIMELINE_STEPS.map((step, idx) => {
                      const done = current >= idx;
                      return (
                        <li key={step} className="flex items-center gap-2 text-sm">
                          <span aria-hidden>{done ? "🟢" : "⚪"}</span>
                          <span className={done ? "font-medium text-sk-brown" : "text-sk-muted"}>
                            {step}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => loadRequests()}
        className="mt-8 text-sm font-semibold text-sk-primary hover:underline"
      >
        Refresh
      </button>
    </div>
  );
}

export default function FarmersRequestsPage() {
  return (
    <ShopLayout>
      <RequireAuth
        title="Sign in to track requests"
        description="Your sell requests are linked to your account email or phone."
      >
        <SellRequestsContent />
      </RequireAuth>
    </ShopLayout>
  );
}
