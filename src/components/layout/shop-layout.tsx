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
    <div className="flex min-h-screen flex-col">
      <SiteHeader variant={header} />
      <ApiStatusBanner />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <LoginModal />
    </div>
  );
}
