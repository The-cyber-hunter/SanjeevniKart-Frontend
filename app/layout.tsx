import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default metadata for the site
export const metadata: Metadata = {
  title: "Sanjeevni Kart - Fresh Vegetables Online",
  description:
    "Order fresh vegetables wholesale, retail, or per kg via Sanjeevni Kart.",
  metadataBase: new URL("https://www.sanjeevnikart.in"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sanjeevni Kart - Fresh Vegetables Online",
    description:
      "Order fresh vegetables wholesale, retail, or per kg via Sanjeevni Kart.",
    url: "https://www.sanjeevnikart.in",
    siteName: "Sanjeevni Kart",
    images: ["/images/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjeevni Kart - Fresh Vegetables Online",
    description:
      "Order fresh vegetables wholesale, retail, or per kg via Sanjeevni Kart.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sanjeevni Kart",
    url: "https://www.sanjeevnikart.in",
    logo: "https://www.sanjeevnikart.in/favicon.ico",
    sameAs: [
      "https://www.facebook.com/sanjeevnikart",
      "https://www.instagram.com/sanjeevnikart",
      "https://www.linkedin.com/company/sanjeevnikart"
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91 6206 895209",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"]
      }
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#2B2024] text-white w-full overflow-x-hidden`}
      >
        {/* Global Navbar */}
        <Navbar />

        {/* JSON-LD Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        {/* Page Content */}
        <main className="pt-20 min-h-screen w-full overflow-x-hidden">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />
      </body>
    </html>
  );
}
