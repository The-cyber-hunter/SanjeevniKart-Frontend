import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  description: "Order fresh vegetables wholesale, retail, or per kg via Sanjeevni Kart.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sanjeevni Kart - Fresh Vegetables Online",
    description: "Order fresh vegetables wholesale, retail, or per kg via Sanjeevni Kart.",
    url: "https://sanjeevnikart.com",
    siteName: "Sanjeevni Kart",
    images: ["/images/og-image.png"], // optional: create a social image
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjeevni Kart - Fresh Vegetables Online",
    description: "Order fresh vegetables wholesale, retail, or per kg via Sanjeevni Kart.",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
