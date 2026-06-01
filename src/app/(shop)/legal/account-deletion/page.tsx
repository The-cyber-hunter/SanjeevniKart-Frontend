import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageShell, LegalSection } from "@/components/legal/legal-page-shell";

const DELETION_EMAIL = "sanjeevnikart@gmail.com";
const DELETION_MAILTO = `mailto:${DELETION_EMAIL}?subject=${encodeURIComponent("Account deletion request — Sanjeevni Kart")}`;

export const metadata: Metadata = {
  title: "Delete Your Account | Sanjeevni Kart",
  description:
    "Request deletion of your Sanjeevni Kart account and associated personal data from our mobile app or website.",
};

export default function AccountDeletionPage() {
  return (
    <LegalPageShell title="Delete your Sanjeevni Kart account" lastUpdated="1 June 2026">
      <div className="rounded-xl border-2 border-sk-primary/30 bg-sk-header p-5 sm:p-6">
        <p className="text-base font-semibold text-sk-brown">
          Sanjeevni Kart — account &amp; data deletion
        </p>
        <p className="mt-2 text-sm leading-relaxed text-sk-ink-soft">
          If you created an account in the <strong className="text-sk-brown">Sanjeevni Kart</strong>{" "}
          mobile app (Google Play) or on this website, you can request deletion of your account and
          associated personal data here. You do <strong className="text-sk-brown">not</strong> need to
          log in to the app to submit a request.
        </p>
        <a
          href={DELETION_MAILTO}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-sk-primary px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sk-primary-dark"
        >
          Email us to delete my account
        </a>
        <p className="mt-3 text-xs text-sk-muted">
          Opens your email app to {DELETION_EMAIL} with the subject &quot;Account deletion request —
          Sanjeevni Kart&quot;.
        </p>
      </div>

      <LegalSection title="How to request account deletion">
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Send an email to{" "}
            <a href={DELETION_MAILTO} className="font-semibold text-sk-primary hover:underline">
              {DELETION_EMAIL}
            </a>{" "}
            with the subject line <strong className="text-sk-brown">Account deletion request</strong> (or
            use the button above).
          </li>
          <li>
            In the message, include the <strong className="text-sk-brown">email address</strong> and{" "}
            <strong className="text-sk-brown">phone number</strong> registered on your Sanjeevni Kart
            account.
          </li>
          <li>
            State clearly that you want your <strong className="text-sk-brown">Sanjeevni Kart</strong>{" "}
            account and associated personal data deleted.
          </li>
          <li>
            We may send a short follow-up email to confirm you control the account before we complete
            deletion.
          </li>
        </ol>
        <p className="text-sm text-sk-muted">
          You can also contact us by phone at{" "}
          <a href="tel:6206895209" className="font-semibold text-sk-primary hover:underline">
            6206895209
          </a>{" "}
          if you cannot use email.
        </p>
      </LegalSection>

      <LegalSection title="What we delete">
        <p>
          After we verify your request, we delete or anonymize personal data linked to your Sanjeevni
          Kart account, including where applicable:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Profile name, email, and phone number</li>
          <li>Saved delivery addresses</li>
          <li>Cart contents and order history tied to your account</li>
          <li>Farmer sell-program listings and pickup details linked to your account</li>
          <li>Login/session data for the mobile app and website</li>
        </ul>
        <p>
          Temporary deactivation or &quot;freezing&quot; an account does not count as deletion; we remove
          or anonymize the data above when deletion is completed.
        </p>
      </LegalSection>

      <LegalSection title="What we may keep">
        <p>
          We may retain limited information when required for legal, tax, or accounting obligations, to
          resolve disputes, enforce our terms, or prevent fraud. Such data is kept only as long as needed
          for those purposes, then deleted or anonymized.
        </p>
      </LegalSection>

      <LegalSection title="Processing time">
        <p>
          We process verified deletion requests within a reasonable period, usually within{" "}
          <strong className="text-sk-brown">30 days</strong>, unless a longer period is required by law.
        </p>
      </LegalSection>

      <LegalSection title="Before you delete">
        <p>
          If you have an active order in progress, contact support first so we can help with delivery or
          refunds. Cancel any recurring actions in the app if applicable. Deleting your account does not
          automatically reverse completed payments handled by third-party providers (for example, Razorpay).
        </p>
        <p>
          <Link href="/support" className="font-semibold text-sk-primary hover:underline">
            Contact support
          </Link>
        </p>
      </LegalSection>

      <p className="text-sm text-sk-muted">
        For full details on data collection and use, see our{" "}
        <Link href="/legal/privacy#account-deletion" className="font-semibold text-sk-primary hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </LegalPageShell>
  );
}
