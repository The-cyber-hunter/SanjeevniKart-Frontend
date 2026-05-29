import type { Metadata } from "next";

import { LegalPageShell, LegalSection } from "@/components/legal/legal-page-shell";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Sanjeevni Kart",
  description: "Refund, return, and cancellation policy for Sanjeevni Kart orders.",
};

export default function RefundsPage() {
  return (
    <LegalPageShell title="Refund & Cancellation Policy" lastUpdated="29 May 2026">
      <LegalSection title="1. Customer orders">
        <p>
          Because we sell fresh and perishable goods by weight, most items cannot be returned once
          delivered except where required by law or as described below.
        </p>
      </LegalSection>

      <LegalSection title="2. Cancellations">
        <p>
          You may cancel an order before it is packed or dispatched by contacting support as soon as
          possible. Once preparation or delivery has started, cancellation may not be possible and a
          cancellation fee may apply for costs already incurred.
        </p>
      </LegalSection>

      <LegalSection title="3. Quality issues">
        <p>
          If you receive damaged, spoiled, or incorrect items, notify us within 24 hours of delivery with
          your order ID and, where possible, photos. After verification, we may offer a replacement,
          credit, or refund for the affected portion of your order.
        </p>
      </LegalSection>

      <LegalSection title="4. Refund method & timing">
        <p>
          Approved refunds for online payments are processed to the original payment method where feasible.
          Cash-on-delivery refunds may be issued as account credit or via an agreed transfer method.
          Processing typically takes 5–10 business days depending on your bank or payment provider.
        </p>
      </LegalSection>

      <LegalSection title="5. Promotions & coupons">
        <p>
          Discount codes and promotions cannot be combined unless stated. If an order using a promotion is
          cancelled or refunded, the promotional benefit may be forfeited or adjusted.
        </p>
      </LegalSection>

      <LegalSection title="6. Farmer sell requests">
        <p>
          Cancelling a sell request before pickup may be allowed by contacting support. After pickup or
          receipt, payouts are based on verified weight and quality; rejected produce may not qualify for
          the quoted payout. Platform and pickup fees shown in your quote apply as stated at submission.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          To request a cancellation or report a delivery issue, use{" "}
          <a href="/support" className="font-semibold text-sk-primary hover:underline">
            support
          </a>
          , call{" "}
          <a href="tel:6206895209" className="font-semibold text-sk-primary hover:underline">
            6206895209
          </a>
          , or email{" "}
          <a href="mailto:sanjeevnikart@gmail.com" className="font-semibold text-sk-primary hover:underline">
            sanjeevnikart@gmail.com
          </a>{" "}
          with your order or sell request reference.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
