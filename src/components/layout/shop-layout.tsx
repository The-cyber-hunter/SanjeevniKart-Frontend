"use client";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ApiStatusBanner } from "./api-status-banner";
import { LoginModal } from "@/components/auth/login-modal";

export function ShopLayout({
  children,
  header = "solid",
}: {
  children: React.ReactNode;
  /** Use `"default"` only on the home page (transparent over hero). */
  header?: "default" | "solid";
}) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col">
      <SiteHeader variant={header} />
      <ApiStatusBanner />
      <main className="min-w-0 flex-1 overflow-x-clip">{children}</main>
      <SiteFooter />
      <LoginModal />
    </div>
  );
}
