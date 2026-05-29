import { Suspense } from "react";

import { ShopCatalog } from "./shop-catalog";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sk-muted">Loading shop…</div>}>
      <ShopCatalog />
    </Suspense>
  );
}
