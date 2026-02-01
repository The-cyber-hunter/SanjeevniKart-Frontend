"use client";

import Head from "next/head";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Sanjeevni Kart</title>
        <meta
          name="description"
          content="Learn how Sanjeevni Kart collects, stores, and protects your personal information when using our services."
        />
      </Head>

      <main className="min-h-screen w-full bg-[#2B2024] text-white font-sans flex justify-center px-6 py-20">
        <section className="space-y-6 text-white/90 text-sm md:text-base text-justify">
          <h1 className="text-4xl font-bold mb-8 text-[#FD0053] text-center">Privacy Policy</h1>
          <p>
            Sanjeevni Kart is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <p>
            <strong>1. Information Collection:</strong> We collect only the information necessary to process orders and communicate with you via WhatsApp and email.
          </p>

          <p>
            <strong>2. Use of Information:</strong> Information is used to confirm orders, provide customer support, and improve our services.
          </p>

          <p>
            <strong>3. Data Sharing:</strong> We do not sell or share your personal data with third parties except when required to fulfill your orders.
          </p>

          <p>
            <strong>4. Security:</strong> We take reasonable precautions to protect your information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <p>
            <strong>5. Cookies:</strong> Our platform may use cookies to enhance user experience. You can choose to disable cookies in your browser.
          </p>

          <p>
            <strong>6. Policy Updates:</strong> We may update this Privacy Policy from time to time. Updates will be posted on this page.
          </p>

          <p>
            For any privacy concerns, please contact us at <a href="mailto:sanjeevnikart@gmail.com" className="text-[#FD0053] underline">sanjeevnikart@gmail.com</a>.
          </p>

          <p>
            you acknowledge that by using Sanjeevni Kart, you agree to the terms outlined in this Privacy Policy.
          </p>
          <p>
            Also check our <a href="/terms-and-conditions" className="text-[#FD0053] underline">Terms and Conditions</a> for more details on using our services.
          </p>
        </section>
      </main>
    </>
  );
}
