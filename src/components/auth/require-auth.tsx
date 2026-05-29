"use client";

import { useEffect } from "react";
import { Lock } from "lucide-react";

import { useShop } from "@/context/shop-context";

export function RequireAuth({
  children,
  title = "Sign in required",
  description = "Please sign in to continue.",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  const { authReady, userProfile, openLogin } = useShop();

  useEffect(() => {
    if (authReady && !userProfile) {
      openLogin();
    }
  }, [authReady, userProfile, openLogin]);

  if (!authReady) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-sk-muted">Loading…</p>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
        <div className="rounded-2xl bg-sk-header p-4 text-sk-primary">
          <Lock size={32} />
        </div>
        <h2 className="mt-6 font-display text-2xl font-semibold text-sk-brown">{title}</h2>
        <p className="mt-2 text-sm text-sk-muted">{description}</p>
        <button
          type="button"
          onClick={openLogin}
          className="mt-8 rounded-full bg-sk-primary px-8 py-3 text-sm font-semibold text-white"
        >
          Sign in
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
