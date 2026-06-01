import type { Metadata } from "next";

import { NotFoundPage } from "@/components/errors/not-found-page";

export const metadata: Metadata = {
  title: "Page not found | Sanjeevni Kart",
  description: "The page you requested could not be found on Sanjeevni Kart.",
  robots: { index: false, follow: true },
};

/** Standalone 404 — no site header or footer (root layout only). */
export default function NotFound() {
  return <NotFoundPage />;
}
