import { ShopLayout } from "@/components/layout/shop-layout";
import { LandingPage } from "@/components/landing/landing-page";

export default function HomePage() {
  return (
    <ShopLayout header="default">
      <LandingPage />
    </ShopLayout>
  );
}
