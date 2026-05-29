"use client";

import Link from "next/link";
import { LogOut, MapPin, Package } from "lucide-react";

import { useShop } from "@/context/shop-context";

export default function AccountPage() {
  const { userProfile, selectedLocation, logoutUser, openLogin } = useShop();
  const name = userProfile?.name?.trim() || "Guest";
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join("") || "?";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-sk-primary font-display text-3xl font-semibold text-white">
            {initials}
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-sk-brown">{name}</h1>
            <p className="mt-1 text-sk-muted">
              {userProfile?.email || "Sign in to add items to your cart and place orders."}
            </p>
            {!userProfile ? (
              <button
                type="button"
                onClick={openLogin}
                className="mt-4 rounded-full bg-sk-primary px-5 py-2.5 text-sm font-semibold text-white"
              >
                Sign in
              </button>
            ) : null}
            {userProfile?.phoneNumber ? (
              <p className="text-sm text-sk-muted">{userProfile.phoneNumber}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/orders"
            className="flex items-center gap-4 rounded-2xl border border-sk-border bg-white p-5 transition hover:border-sk-primary"
          >
            <div className="rounded-xl bg-[#f0fdf4] p-3 text-sk-success-dark">
              <Package size={22} />
            </div>
            <div>
              <p className="font-semibold">Orders</p>
              <p className="text-sm text-sk-muted">History & tracking</p>
            </div>
          </Link>
          <div className="flex items-center gap-4 rounded-2xl border border-sk-border bg-white p-5">
            <div className="rounded-xl bg-sk-header p-3 text-sk-brown">
              <MapPin size={22} />
            </div>
            <div>
              <p className="font-semibold">Delivery area</p>
              <p className="text-sm text-sk-muted">{selectedLocation}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-sk-border bg-[#faf6f0] p-6">
          <h2 className="font-display text-lg font-semibold text-sk-brown">Why Sanjeevni Kart</h2>
          <ul className="mt-3 grid gap-2 text-sm text-sk-ink-soft sm:grid-cols-2">
            <li>• Farm-fresh vegetables and fruits</li>
            <li>• Quality grains & authentic spices</li>
            <li>• ~15 minute delivery slots</li>
            <li>• Farmer-direct sourcing</li>
          </ul>
        </div>

        {userProfile ? (
          <button
            type="button"
            onClick={() => {
              if (confirm("Log out?")) void logoutUser();
            }}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-sk-muted hover:text-sk-error"
          >
            <LogOut size={16} />
            Sign out
          </button>
        ) : null}
      </div>
  );
}
