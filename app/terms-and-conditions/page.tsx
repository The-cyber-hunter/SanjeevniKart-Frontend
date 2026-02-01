"use client";

import Head from "next/head";

export default function TermsAndConditionsPage() {
    return (
        <>
            <Head>
                <title>Terms and Conditions | Sanjeevni Kart</title>
                <meta
                    name="description"
                    content="Read the Terms and Conditions for using Sanjeevni Kart services, including buying and selling vegetables."
                />
            </Head>

            <main className="min-h-screen w-full bg-[#2B2024] text-white font-sans flex justify-center px-6 py-20">


                <section className="space-y-6 text-white/90 text-sm md:text-base text-justify">
                    <h1 className="text-4xl font-bold mb-8 text-[#FD0053] text-center">Terms and Conditions</h1>
                    <p>
                        Welcome to Sanjeevni Kart! By using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully.
                    </p>

                    <p>
                        <strong>1. Use of Platform:</strong> You must use Sanjeevni Kart for lawful purposes only. Any misuse or fraudulent activity may result in suspension of your account.
                    </p>

                    <p>
                        <strong>2. Buying and Selling:</strong> Prices are displayed clearly for wholesale, retail, and customer categories. All transactions are completed through WhatsApp confirmation.
                    </p>

                    <p>
                        <strong>3. Delivery:</strong> Sanjeevni Kart is responsible for coordinating the delivery but cannot be held liable for delays caused due to unforeseen circumstances.
                    </p>

                    <p>
                        <strong>4. Payments:</strong> Payment terms are agreed upon at the time of order submission. Sanjeevni Kart ensures secure handling of all transactions.
                    </p>

                    <p>
                        <strong>5. Liability:</strong> We are not liable for any loss or damage arising from the use of the platform beyond the responsibilities mentioned here.
                    </p>

                    <p>
                        <strong>6. Amendments:</strong> Sanjeevni Kart reserves the right to update these terms at any time. Users are advised to check regularly.
                    </p>

                    <p>
                        For any questions regarding these Terms & Conditions, please contact us at <a href="mailto:sanjeevnikart@gmail.com" className="text-[#FD0053] underline">sanjeevnikart@gmail.com</a>.
                    </p>

                    <p>
                        By using Sanjeevni Kart, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
                    </p>

                    <p>
                        Also check our <a href="/privacy-policy" className="text-[#FD0053] underline">Privacy Policy</a> for more details on how we handle your personal information.
                    </p>
                </section>
            </main>
        </>
    );
}
