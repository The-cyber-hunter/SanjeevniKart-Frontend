import { ShopLayout } from "@/components/layout/shop-layout";

/** Shared site header, footer, and login modal for all shop routes. */
export default function ShopGroupLayout({ children }: { children: React.ReactNode }) {
  return <ShopLayout header="solid">{children}</ShopLayout>;
}
