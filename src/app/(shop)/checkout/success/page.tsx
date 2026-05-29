"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { RequireAuth } from "@/components/auth/require-auth";

function SuccessContent() {
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState<{ shortId: string; total: number } | null>(null);

  useEffect(() => {
    const id = searchParams.get("id");
    try {
      const raw = sessionStorage.getItem("sanjeevni_last_order");
      if (raw) {
        const parsed = JSON.parse(raw) as { id: string; shortId: string; total: number };
        if (!id || parsed.id === id) {
          setSummary({ shortId: parsed.shortId, total: parsed.total });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    if (id) {
      setSummary({ shortId: id.slice(-8).toUpperCase(), total: 0 });
    }
  }, [searchParams]);

  const shortId = summary?.shortId ?? "—";

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <CheckCircle2 className="mx-auto text-sk-success" size={56} strokeWidth={1.5} />
      <h1 className="mt-6 font-display text-3xl font-semibold text-sk-brown">Order placed</h1>
      <p className="mt-3 text-sk-muted">
        Thank you! Your order <span className="font-mono font-bold text-sk-brown">#{shortId}</span>{" "}
        has been received.
        {summary && summary.total > 0 ? <> Total: ₹{summary.total.toFixed(0)}.</> : null}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/shop"
          className="rounded-full bg-sk-primary px-8 py-3 text-sm font-semibold text-white"
        >
          Continue shopping
        </Link>
        <Link
          href="/orders"
          className="rounded-full border border-sk-border bg-white px-8 py-3 text-sm font-semibold text-sk-brown"
        >
          View orders
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <RequireAuth>
      <Suspense fallback={<p className="py-20 text-center text-sk-muted">Loading…</p>}>
        <SuccessContent />
      </Suspense>
    </RequireAuth>
  );
}
