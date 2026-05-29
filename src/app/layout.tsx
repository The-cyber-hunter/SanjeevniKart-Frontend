import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { ShopProvider } from "@/context/shop-context";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "Sanjeevni Kart — Farm fresh groceries delivered",
  description:
    "Premium groceries, farmer-direct sourcing, and quick doorstep delivery.",
  icons: { icon: "/app-icon-512.png", apple: "/app-icon-512.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${fraunces.variable} h-full`}>
      <body className="min-h-full antialiased">
        <ShopProvider>{children}</ShopProvider>
      </body>
    </html>
  );
}
