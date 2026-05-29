"use client";

import { Mail, Phone } from "lucide-react";

import { useShop } from "@/context/shop-context";

export default function SupportPage() {
  const { appConfig } = useShop();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-semibold text-sk-brown">We&apos;re here to help</h1>
        <p className="mt-2 max-w-xl text-sk-muted">
          Questions about orders, delivery, or selling produce — reach us directly.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <a
            href={`tel:${appConfig.supportPhone}`}
            className="group rounded-2xl border border-sk-border bg-white p-8 transition hover:border-sk-primary hover:shadow-lg"
          >
            <Phone className="text-sk-primary" size={28} />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-sk-muted">Call</p>
            <p className="mt-1 font-display text-2xl font-semibold text-sk-brown group-hover:text-sk-primary">
              {appConfig.supportPhone}
            </p>
          </a>
          <a
            href={`mailto:${appConfig.supportEmail}`}
            className="group rounded-2xl border border-sk-border bg-white p-8 transition hover:border-sk-primary hover:shadow-lg"
          >
            <Mail className="text-sk-primary" size={28} />
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-sk-muted">Email</p>
            <p className="mt-1 break-all font-display text-xl font-semibold text-sk-brown group-hover:text-sk-primary">
              {appConfig.supportEmail}
            </p>
          </a>
        </div>
      </div>
  );
}
