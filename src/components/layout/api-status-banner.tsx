"use client";

import { useShop } from "@/context/shop-context";
import { getApiBaseUrl } from "@/lib/api";

export function ApiStatusBanner() {
  const { catalogError, loading, fetchInitialData } = useShop();

  if (!catalogError || loading) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950">
      <p className="font-semibold">Could not load store data from the server</p>
      <p className="mt-1 text-xs opacity-90">{catalogError}</p>
      <p className="mt-1 text-xs opacity-75">
        Requests go to <code className="rounded bg-white/60 px-1">{getApiBaseUrl()}</code> and are
        proxied via <code className="rounded bg-white/60 px-1">API_URL</code> in{" "}
        <code className="rounded bg-white/60 px-1">.env.local</code>. For a local backend, set{" "}
        <code className="rounded bg-white/60 px-1">API_URL=http://127.0.0.1:4000</code> and run{" "}
        <code className="rounded bg-white/60 px-1">cd backend && npm run dev</code>.
      </p>
      <button
        type="button"
        onClick={() => fetchInitialData()}
        className="mt-2 font-semibold text-sk-primary underline"
      >
        Retry
      </button>
    </div>
  );
}
