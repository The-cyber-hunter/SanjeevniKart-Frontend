"use client";

import Link from "next/link";
import { Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  formatPromotionDiscount,
  getActivePromotions,
  getRemainingTimeLabel,
} from "@/lib/promotion-utils";
import type { Promotion } from "@/lib/types";

function OfferCard({ promotion }: { promotion: Promotion }) {
  const [timeLeft, setTimeLeft] = useState(() => getRemainingTimeLabel(promotion.validTill));

  useEffect(() => {
    const tick = () => setTimeLeft(getRemainingTimeLabel(promotion.validTill));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [promotion.validTill]);

  return (
    <Link
      href="/shop"
      className="group flex w-[min(100%,280px)] shrink-0 flex-col rounded-2xl border border-[#eadfce] bg-gradient-to-b from-white to-[#fffdf9] p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sk-primary/35 hover:shadow-md sm:w-[300px]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-sk-header px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-sk-amber">
          {promotion.badge || "Offer"}
        </span>
        <span className="text-sm font-extrabold text-sk-success">
          {promotion.discountType === "percentage"
            ? `${promotion.discountValue}% OFF`
            : `₹${promotion.discountValue} OFF`}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-sk-brown group-hover:text-sk-primary">
        {promotion.title}
      </h3>
      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-sk-muted">
        {promotion.description}
      </p>
      {promotion.minOrderAmount ? (
        <p className="mt-2 text-xs font-medium text-sk-ink-soft">
          Min. order ₹{promotion.minOrderAmount}
        </p>
      ) : null}
      <p className="mt-3 text-xs font-semibold text-sk-primary">{timeLeft}</p>
    </Link>
  );
}

export function RunningOffersSection({ promotions }: { promotions: Promotion[] }) {
  const active = useMemo(() => getActivePromotions(promotions), [promotions]);

  if (active.length === 0) {
    return (
      <section className="border-b border-sk-border bg-[#fffdf9]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex items-center gap-2">
            <Tag className="text-sk-primary" size={20} />
            <h2 className="font-display text-2xl font-semibold text-sk-brown">Running offers</h2>
          </div>
          <p className="mt-4 rounded-2xl border border-dashed border-sk-border bg-white px-5 py-8 text-center text-sm text-sk-muted">
            No active offers right now. New deals will appear here soon — check back or browse the
            shop for everyday prices.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-sk-border bg-[#fffdf9]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Tag className="text-sk-primary" size={20} />
              <h2 className="font-display text-2xl font-semibold text-sk-brown">Running offers</h2>
            </div>
            <p className="mt-1 text-sm text-sk-muted">
              {active.length} active deal{active.length === 1 ? "" : "s"} — auto-applied at checkout
              when eligible.
            </p>
          </div>
          <Link href="/shop" className="text-sm font-semibold text-sk-primary hover:underline">
            Shop all →
          </Link>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active.map((promotion) => (
            <OfferCard key={promotion.id} promotion={promotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function RunningOffersAnnouncement({ promotions }: { promotions: Promotion[] }) {
  const active = useMemo(() => getActivePromotions(promotions), [promotions]);
  const top = active[0];
  if (!top) {
    return (
      <div className="border-b border-sk-header-border bg-sk-header/80 py-2.5 text-center text-xs font-semibold text-sk-amber">
        Fresh offers launching soon on Sanjeevni Kart
      </div>
    );
  }
  return (
    <div className="border-b border-sk-header-border bg-sk-header px-4 py-2.5 text-center text-xs font-semibold break-words text-sk-amber sm:text-sm">
      Running offer: {top.title} • {formatPromotionDiscount(top).replace(" off", " OFF")}
    </div>
  );
}
