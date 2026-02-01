"use client";

import Link from "next/link";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Phone, Mail, ChevronUp, Sprout, Leaf, Truck, Handshake, Plus, Minus, MapPin } from "lucide-react";

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <Head>
        <title>Sanjeevni Kart | Fresh Vegetables from Farmers</title>
        <meta
          name="description"
          content="Sanjeevni Kart connects farmers with buyers directly – wholesalers, retailers, and households. Fresh vegetables, fair pricing, and fast delivery."
        />
        <link rel="canonical" href="https://www.sanjeevnikart.in/" />

        {/* ================= FAQ SCHEMA ================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How do I place an order?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Select your category (Wholesale, Retail, Customer), choose vegetables and quantity, and confirm via WhatsApp. Our team will deliver directly to you."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I buy in small quantities?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Customers can buy per kg, retailers per 10kg, and wholesalers in larger volumes."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How is pricing determined?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Pricing is transparent and fair, based on quantity, season, and current market rates. No hidden charges."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do farmers sell their produce?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Farmers fill out the form, select vegetables and quantity, and submit. They are then redirected to WhatsApp for confirmation."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you deliver to my location?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We deliver across our operational regions. Delivery details are confirmed when placing your order."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is the produce fresh?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! All vegetables are sourced directly from verified farmers and delivered fresh daily."
                  }
                }
              ]
            })
          }}
        />

        {/* ================= HOW TO TRACK SCHEMA ================= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Track Your Sanjeevni Kart Order",
              "step": [
                {
                  "@type": "HowToStep",
                  "name": "Place Your Order",
                  "text": "Submit your order via Wholesale, Retail, Customer, or Farmer Sell page with your details."
                },
                {
                  "@type": "HowToStep",
                  "name": "Delivery Starts",
                  "text": "Once the delivery agent starts, the order status is updated."
                },
                {
                  "@type": "HowToStep",
                  "name": "Live Location on WhatsApp",
                  "text": "Track the delivery in real-time via the WhatsApp link sent to the chat where you placed your order."
                }
              ]
            })
          }}
        />
      </Head>
      
      <main className="bg-[#2B2024] text-[#FFFFFF] font-sans w-full overflow-x-hidden">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-[#2B2024]">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left text */}
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                Fresh Vegetables <br />Direct from Farmers
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white">
                Sanjeevni Kart connects farmers directly with wholesalers, retailers, and households.
                Enjoy fresh produce with transparent pricing and fast delivery.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="#categories">
                  <button className="bg-gradient-to-r from-[#A80139] to-[#FD0053] text-white px-8 py-4 rounded-xl font-bold shadow-xl transform transition hover:scale-105 hover:shadow-2xl">
                    Start Buying
                  </button>
                </Link>
                <Link href="/farmer-sell">
                  <button className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-gradient-to-r hover:from-[#A80139] hover:to-[#FD0053] hover:text-white transition transform shadow-xl hover:scale-105">
                    Sell Vegetables
                  </button>
                </Link>
              </div>
            </div>

            {/* Right hero image */}
            <div className="flex-1 relative animate-fadeInRight">
              <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl h-[350px] md:h-[400px] lg:h-[450px] flex">
                <img
                  src="/hero.png"
                  alt="Fresh Vegetables"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2024]/80 to-transparent"></div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= BUYING CATEGORIES ================= */}
        <section id="categories" className="py-24 bg-[#2B2024]">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-[#FD0053] mb-16">
              Buying Options
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  title: "Wholesale",
                  desc: "Perfect for restaurants, and institutions needing large volumes at fair prices.",
                  features: ["Pricing per 25kg", "High-volume discounts", "Flexible delivery"],
                },
                {
                  title: "Retail",
                  desc: "Shop owners and vendors can buy medium quantities for consistent supply.",
                  features: ["Pricing per 10kg", "Regular restock", "Balanced margins"],
                },
                {
                  title: "Customer",
                  desc: "Households receive fresh vegetables delivered daily at affordable prices.",
                  features: ["Pricing per kg", "Daily fresh stock", "Home delivery"],
                },
              ].map((cat, idx) => (
                <Link key={cat.title} href={`/${cat.title.toLowerCase()}`}>
                  <div className="relative p-[4px] rounded-3xl bg-gradient-to-r from-[#A80139] to-[#FD0053] transform transition hover:scale-105">
                    <div className="bg-[#2B2024] rounded-3xl p-10 text-center shadow-2xl">
                      <h3 className="text-2xl font-bold mb-4 text-[#FD0053]">{cat.title}</h3>
                      <p className="mb-6">{cat.desc}</p>
                      <ul className="space-y-2 text-sm">
                        {cat.features.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Link>

              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how" className="py-24 bg-[#A80139] text-[#FFFFFF]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center  text-[#FFFFFF] mb-16">
              How Sanjeevni Kart Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { icon: <Sprout size={36} />, title: "Choose Category", desc: "Pick Wholesale, Retail, or Customer based on your need." },
                { icon: <Leaf size={36} />, title: "Select Vegetables", desc: "Choose products, quantity, and check pricing." },
                { icon: <Truck size={36} />, title: "Confirm & Delivery", desc: "Confirm order on WhatsApp and receive fast delivery." },
              ].map((step, idx) => (
                <div key={step.title} className={`bg-[#FD0053] p-10 rounded-3xl shadow-2xl text-center transform transition hover:scale-105 hover:shadow-3xl animate-fadeInUp delay-${idx * 100}`}>
                  <div className="text-[#FFFFFF] mx-auto mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SELLING SYSTEM ================= */}
        <section id="selling" className="py-28 bg-[#2B2024] text-white">
          <div className="max-w-7xl mx-auto px-6">

            {/* Heading */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
                Selling System for <span className="text-[#FD0053]">Farmers</span>
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Sell your vegetables easily without searching for buyers.
                Sanjeevni Kart handles pricing, collection, and payment — end to end.
              </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

              {/* STEP 1 */}
              <div className="bg-[#1F171A] border border-[#FD0053]/30 rounded-2xl p-8 hover:border-[#FD0053] transition">
                <div className="text-[#FD0053] text-3xl font-bold mb-4">01</div>
                <h3 className="text-xl font-semibold mb-3">
                  Select Vegetables
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Farmers choose vegetables from a predefined list available on the platform.
                </p>
              </div>

              {/* STEP 2 */}
              <div className="bg-[#1F171A] border border-[#FD0053]/30 rounded-2xl p-8 hover:border-[#FD0053] transition">
                <div className="text-[#FD0053] text-3xl font-bold mb-4">02</div>
                <h3 className="text-xl font-semibold mb-3">
                  Select Quantity
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Enter the quantity available for each selected vegetable.
                </p>
              </div>

              {/* STEP 3 */}
              <div className="bg-[#1F171A] border border-[#FD0053]/30 rounded-2xl p-8 hover:border-[#FD0053] transition">
                <div className="text-[#FD0053] text-3xl font-bold mb-4">03</div>
                <h3 className="text-xl font-semibold mb-3">
                  Fill Farmer Details
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  A form appears where farmers provide name, location, and contact details.
                </p>
              </div>

              {/* STEP 4 */}
              <div className="bg-[#1F171A] border border-[#FD0053]/30 rounded-2xl p-8 hover:border-[#FD0053] transition">
                <div className="text-[#FD0053] text-3xl font-bold mb-4">04</div>
                <h3 className="text-xl font-semibold mb-3">
                  Submit the Form
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  After reviewing the details, farmers submit the form securely.
                </p>
              </div>

              {/* STEP 5 */}
              <div className="bg-[#1F171A] border border-[#FD0053]/30 rounded-2xl p-8 hover:border-[#FD0053] transition">
                <div className="text-[#FD0053] text-3xl font-bold mb-4">05</div>
                <h3 className="text-xl font-semibold mb-3">
                  Auto WhatsApp Redirect
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Farmers are redirected to WhatsApp with an auto-generated message containing all details.
                </p>
              </div>

              {/* STEP 6 */}
              <div className="bg-[#1F171A] border border-[#FD0053]/30 rounded-2xl p-8 hover:border-[#FD0053] transition">
                <div className="text-[#FD0053] text-3xl font-bold mb-4">06</div>
                <h3 className="text-xl font-semibold mb-3">
                  Collection & Payment
                </h3>
                <p className="text-sm leading-relaxed">
                  Sanjeevni Kart confirms the request, collects vegetables, and ensures timely payment.
                </p>
              </div>

            </div>

            {/* CTA */}
            <div className="text-center mt-20">
              <Link href="/farmer-sell">
                <button className="bg-gradient-to-r from-[#A80139] to-[#FD0053] px-10 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition">
                  Start Selling Vegetables
                </button>
              </Link>
            </div>

          </div>
        </section>


        {/* ================= WHY CHOOSE US ================= */}
        <section className="py-24 bg-[#A80139] text-[#FFFFFF]">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">
              Why Choose Sanjeevni Kart
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-[#2B2024] p-6 rounded-3xl shadow-2xl text-center hover:scale-105 transition transform">
                <Leaf size={32} className="text-[#FD0053] mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Fresh Vegetables</h4>
                <p className="text-sm">Daily fresh produce delivered directly from farms.</p>
              </div>
              <div className="bg-[#2B2024] p-6 rounded-3xl shadow-2xl text-center hover:scale-105 transition transform">
                <Handshake size={32} className="text-[#FD0053] mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Transparent Pricing</h4>
                <p className="text-sm">No hidden charges, complete clarity for buyers and sellers.</p>
              </div>
              <div className="bg-[#2B2024] p-6 rounded-3xl shadow-2xl text-center hover:scale-105 transition transform">
                <Sprout size={32} className="text-[#FD0053] mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Direct Farmers</h4>
                <p className="text-sm">We connect you with verified and trusted local farmers.</p>
              </div>
              <div className="bg-[#2B2024] p-6 rounded-3xl shadow-2xl text-center hover:scale-105 transition transform">
                <Truck size={32} className="text-[#FD0053] mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Fast Delivery</h4>
                <p className="text-sm">Reliable delivery service to your doorstep on time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" className="py-24 bg-[#2B2024] text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-[#FD0053] mb-16">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: "How do I place an order?",
                  answer:
                    "Select your category (Wholesale, Retail, Customer), choose vegetables and quantity, and confirm via WhatsApp. Our team will deliver directly to you.",
                },
                {
                  question: "Can I buy in small quantities?",
                  answer:
                    "Yes! Customers can buy per kg, retailers per 10kg, and wholesalers in larger volumes.",
                },
                {
                  question: "How is pricing determined?",
                  answer:
                    "Pricing is transparent and fair, based on quantity, season, and current market rates. No hidden charges.",
                },
                {
                  question: "How do farmers sell their produce?",
                  answer:
                    "Farmers fill out the form, select vegetables and quantity, and submit. They are then redirected to WhatsApp for confirmation.",
                },
                {
                  question: "Do you deliver to my location?",
                  answer:
                    "We deliver across our operational regions. Delivery details are confirmed when placing your order.",
                },
                {
                  question: "Is the produce fresh?",
                  answer:
                    "Absolutely! All vegetables are sourced directly from verified farmers and delivered fresh daily.",
                },
              ].map((faq, idx) => {
                const [open, setOpen] = useState(false);
                return (
                  <div
                    key={idx}
                    className="bg-[#1F171A] p-6 rounded-3xl shadow-2xl hover:scale-105 transform transition"
                  >
                    <button
                      onClick={() => setOpen(!open)}
                      className="w-full flex justify-between items-center text-left"
                    >
                      <h3 className="text-lg font-semibold mb-0 text-[#FD0053]">
                        {faq.question}
                      </h3>
                      {open ? (
                        <Minus size={20} className="text-[#FD0053]" />
                      ) : (
                        <Plus size={20} className="text-[#FD0053]" />
                      )}
                    </button>
                    {open && (
                      <p className="mt-4 text-white/80 text-sm">{faq.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= HOW TO TRACK ================= */}
        <section id="tracking" className="py-24 bg-[#A80139] text-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-16">
              How to Track Your Order
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* STEP 1 */}
              <div className="bg-[#2B2024] p-10 rounded-3xl shadow-2xl text-center transform transition hover:scale-105">
                <Phone size={36} className="text-[#FD0053] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Place Your Order</h3>
                <p className="text-sm">
                  Submit your order via Wholesale, Retail, Customer, or Farmer Sell page.
                  Include your details so we can contact you.
                </p>
              </div>

              {/* STEP 2 */}
              <div className="bg-[#2B2024] p-10 rounded-3xl shadow-2xl text-center transform transition hover:scale-105">
                <Truck size={36} className="text-[#FD0053] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Delivery Starts</h3>
                <p className="text-sm">
                  Once the delivery agent starts from the farm or warehouse, the order status is updated.
                </p>
              </div>

              {/* STEP 3 */}
              <div className="bg-[#2B2024] p-10 rounded-3xl shadow-2xl text-center transform transition hover:scale-105">
                <MapPin size={36} className="text-[#FD0053] mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Live Location on WhatsApp</h3>
                <p className="text-sm">
                  Track the delivery in real-time! We send a live location link directly in the WhatsApp chat where you placed your order.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* ================= FLOATING BUTTONS ================= */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
          <a
            href="tel:+916206895209"
            className="bg-[#A80139] hover:bg-[#FD0053] text-[#FFFFFF] w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-2 ring-[#FD0053] transition hover:scale-110"
          >
            <Phone size={26} />
          </a>
          <a
            href="mailto:sanjeevnikart@gmail.com"
            className="bg-[#FD0053] hover:bg-[#A80139] text-[#FFFFFF] w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-2 ring-[#FFFFFF] transition hover:scale-110"
          >
            <Mail size={26} />
          </a>
          {showScroll && (
            <button
              onClick={scrollToTop}
              className="bg-[#2B2024] hover:bg-[#A80139] text-[#FFFFFF] w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-2 ring-[#FD0053] transition hover:scale-110"
            >
              <ChevronUp size={26} />
            </button>
          )}
        </div>
      </main>
    </>
  );
}
