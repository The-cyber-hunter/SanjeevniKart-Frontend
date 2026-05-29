import type { Metadata } from "next";

import { LegalPageShell, LegalSection } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Terms of Service | Sanjeevni Kart",
  description: "Terms and conditions for using Sanjeevni Kart.",
};

export default function TermsPage() {
  return (
    <LegalPageShell title="Terms of Service" lastUpdated="29 May 2026">
      <LegalSection title="1. Agreement">
        <p>
          By accessing or using Sanjeevni Kart (website, app, or related services), you agree to these
          Terms of Service. If you do not agree, please do not use the platform.
        </p>
      </LegalSection>

      <LegalSection title="2. Services">
        <p>
          We provide an online marketplace for ordering groceries and fresh produce by weight, and a
          separate farmer program to list produce for pickup and payout. Product availability, prices, and
          delivery areas may change without notice. Displayed prices are indicative until confirmed at
          checkout or quote.
        </p>
      </LegalSection>

      <LegalSection title="3. Accounts">
        <p>
          You must provide accurate registration details and keep your account secure. You are responsible
          for activity under your account. We may suspend or terminate accounts that violate these terms or
          misuse the service.
        </p>
      </LegalSection>

      <LegalSection title="4. Orders & payment">
        <p>
          Placing an order constitutes an offer to purchase. We may accept or cancel orders (for example,
          due to stock, service area, or pricing errors). Cash on delivery and online payment options are
          offered where available. You agree to pay the amount shown at checkout, including applicable
          delivery charges and discounts.
        </p>
      </LegalSection>

      <LegalSection title="5. Delivery">
        <p>
          Estimated delivery times are approximate, not guaranteed. You must provide a correct, accessible
          delivery address within our serviceable pincodes. Risk of loss for goods passes to you upon
          delivery to the address provided.
        </p>
      </LegalSection>

      <LegalSection title="6. Farmer sell program">
        <p>
          Sell requests are subject to verification, pickup scheduling, quality checks, and fee deductions
          (including platform and pickup charges) as shown in your quote. Payout amounts are estimates until
          confirmed after receipt and processing. We may reject produce that does not meet quality or
          listing standards.
        </p>
      </LegalSection>

      <LegalSection title="7. Prohibited conduct">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the service for unlawful purposes or submit false information.</li>
          <li>Interfere with platform security or other users&apos; access.</li>
          <li>Resell or commercially exploit the service without our written consent.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Limitation of liability">
        <p>
          To the fullest extent permitted by law, Sanjeevni Kart is not liable for indirect, incidental, or
          consequential damages arising from use of the service. Our total liability for any claim related
          to an order or sell request is limited to the amount you paid or were quoted for that transaction,
          except where law requires otherwise.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes">
        <p>
          We may update these terms from time to time. Continued use after changes are posted constitutes
          acceptance of the revised terms.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact">
        <p>
          For questions about these terms, reach us via{" "}
          <a href="/support" className="font-semibold text-sk-primary hover:underline">
            support
          </a>{" "}
          or email{" "}
          <a href="mailto:sanjeevnikart@gmail.com" className="font-semibold text-sk-primary hover:underline">
            sanjeevnikart@gmail.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
