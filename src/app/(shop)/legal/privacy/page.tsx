import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell, LegalSection } from "@/components/legal/legal-page-shell";

const DELETION_EMAIL = "sanjeevnikart@gmail.com";
const DELETION_MAILTO = `mailto:${DELETION_EMAIL}?subject=${encodeURIComponent("Account deletion request — Sanjeevni Kart")}`;

export const metadata: Metadata = {
  title: "Privacy Policy | Sanjeevni Kart",
  description: "How Sanjeevni Kart collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="Privacy Policy" lastUpdated="20 April 2026">
      <p>
        Sanjeevni Kart (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This
        Privacy Policy explains how we collect, use, and protect your information when you use our
        mobile application and website.
      </p>

      <LegalSection title="1. Information We Collect">
        <p>We may collect the following information:</p>
        <p className="font-semibold text-sk-brown">Account Information</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Name</li>
          <li>Phone number</li>
          <li>Email address</li>
        </ul>
        <p className="font-semibold text-sk-brown">Delivery Information</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Delivery address entered by you</li>
          <li>City pincode</li>
          <li>
            Approximate/current location (only when you use &quot;Use Current Location&quot;)
          </li>
        </ul>
        <p className="font-semibold text-sk-brown">Order Information</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Products added to cart</li>
          <li>Quantities</li>
          <li>Order history</li>
          <li>Payment method and payment status metadata</li>
        </ul>
        <p className="font-semibold text-sk-brown">Farmer sell program</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Pickup address and contact details for sell requests</li>
          <li>Crop listings, quantities, and payout-related amounts</li>
        </ul>
        <p className="font-semibold text-sk-brown">Admin Features (for authorized admin users only)</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Product images captured from camera or selected from gallery</li>
          <li>Category/product/coupon/pincode/order management data</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Permissions We Use">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-sk-brown">Camera (android.permission.CAMERA):</strong> Used only for
            admin product image capture/upload.
          </li>
          <li>
            <strong className="text-sk-brown">Location:</strong> Used only to help users fill delivery
            location when explicitly requested.
          </li>
          <li>
            <strong className="text-sk-brown">Storage / Media Access:</strong> Used for selecting product
            images (admin feature) and generating/share export files where applicable.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Information">
        <p>We use collected information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Create and manage user accounts</li>
          <li>Send and verify login OTP</li>
          <li>Process and deliver orders</li>
          <li>Validate delivery availability (serviceable pincodes)</li>
          <li>Coordinate farmer pickups, quotes, and payouts for sell requests</li>
          <li>Provide customer support</li>
          <li>Manage catalog and orders in admin panel</li>
          <li>Improve app and website reliability and user experience</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Payments">
        <p>
          Online payments are processed through third-party payment providers (for example, Razorpay). We
          do not store full card or UPI credentials on our servers.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Sharing">
        <p>We do not sell personal data. We may share limited data with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Delivery/operations systems for order fulfillment</li>
          <li>Payment providers for transaction processing</li>
          <li>Service providers required to operate the app and website</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          We retain data for as long as required to provide services, maintain records, resolve disputes,
          and comply with legal obligations.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Security">
        <p>
          We apply reasonable technical and organizational safeguards to protect data from unauthorized
          access, misuse, or disclosure.
        </p>
      </LegalSection>

      <LegalSection title="8. Your Choices">
        <p>You may:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Update profile details in the app or website</li>
          <li>Deny location/camera permissions from device settings</li>
          <li>
            Request account and associated data deletion (see{" "}
            <Link href="/legal/account-deletion" className="font-semibold text-sk-primary hover:underline">
              Delete your account
            </Link>{" "}
            or &quot;Account and data deletion&quot; below)
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Account and data deletion (Sanjeevni Kart)" id="account-deletion">
        <div className="rounded-xl border border-sk-border bg-sk-page p-4">
          <p className="font-semibold text-sk-brown">
            Delete your Sanjeevni Kart account (mobile app or website)
          </p>
          <p className="mt-2">
            You do not need to log in to request deletion. Use our dedicated page or email us directly:
          </p>
          <Link
            href="/legal/account-deletion"
            className="mt-3 inline-flex rounded-lg bg-sk-primary px-4 py-2 text-sm font-semibold text-white hover:bg-sk-primary-dark"
          >
            Go to account deletion page
          </Link>
        </div>

        <p className="mt-4">
          <strong className="text-sk-brown">How to request deletion:</strong> Email{" "}
          <a href={DELETION_MAILTO} className="font-semibold text-sk-primary hover:underline">
            {DELETION_EMAIL}
          </a>{" "}
          with the subject line &quot;Account deletion request&quot;. In the message, include the email
          address and phone number registered on your Sanjeevni Kart account, and state that you want your
          account and associated personal data deleted. We may ask a short follow-up to confirm you control
          the account before we delete it.
        </p>
        <p>
          <strong className="text-sk-brown">What we delete:</strong> After we verify your request, we delete
          or anonymize personal data tied to your account (for example: profile name, email, phone, saved
          addresses, order or cart data, and farmer sell-program data linked to you), except where the law
          or a legitimate need requires retention as described next.
        </p>
        <p>
          <strong className="text-sk-brown">What we may keep, and for how long:</strong> We may keep limited
          information where required for legal, tax, or accounting reasons, to resolve disputes, enforce our
          terms, or prevent fraud. That information is kept only as long as needed for those purposes, then
          deleted or anonymized when no longer required.
        </p>
        <p>
          <strong className="text-sk-brown">Timeframe:</strong> We process verified requests within a
          reasonable period, usually within 30 days, unless a longer period is required by law.
        </p>
      </LegalSection>

      <LegalSection title="9. Children's Privacy">
        <p>
          Our services are not directed to children under 13, and we do not knowingly collect personal
          information from children under 13.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Updated versions will be posted with a
          revised effective date.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>For privacy questions or requests, contact:</p>
        <ul className="mt-2 space-y-1">
          <li>
            Email:{" "}
            <a href="mailto:sanjeevnikart@gmail.com" className="font-semibold text-sk-primary hover:underline">
              sanjeevnikart@gmail.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:6206895209" className="font-semibold text-sk-primary hover:underline">
              6206895209
            </a>
          </li>
        </ul>
      </LegalSection>
    </LegalPageShell>
  );
}
