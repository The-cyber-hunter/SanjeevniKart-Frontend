"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Phone, Mail, ChevronUp, Sprout, Leaf, Truck, Handshake } from "lucide-react";

export default function HomePage() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="bg-[#f6faf7] text-gray-800">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-700 to-green-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Sanjeevni Kart
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              A smart vegetable supply platform connecting farmers directly with wholesalers, retailers, and households.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="#categories">
                <button className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-100 transition">
                  Start Buying
                </button>
              </Link>

              {/* Selling button */}
              <Link href="/farmer-sell">
                <button className="border border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
                  Sell Your Vegetables
                </button>
              </Link>

              <Link href="#how">
                <button className="border border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
                  How It Works
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-white/10 p-10 rounded-2xl backdrop-blur">
              <p className="text-xl font-semibold mb-4">Fresh • Transparent • Reliable</p>
              <p className="text-green-100">
                Optimized pricing for bulk buyers, shop owners, and home customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BUYING CATEGORIES ================= */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-16">
            Choose Your Buying Option
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Wholesale */}
            <Link href="/wholesale">
              <div className="bg-blue-50 p-10 rounded-2xl shadow border border-blue-100 hover:border-blue-600 hover:shadow-xl transition transform duration-300 hover:-translate-y-2 text-center cursor-pointer">
                <h3 className="text-2xl font-bold mb-4 text-blue-700">Wholesale</h3>
                <p className="mb-6 text-gray-600">Best for bulk buyers & institutions.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Pricing per 25kg</li>
                  <li>• Lowest cost per kg</li>
                  <li>• High volume orders</li>
                </ul>
              </div>
            </Link>

            {/* Retail */}
            <Link href="/retail">
              <div className="bg-orange-50 p-10 rounded-2xl shadow border border-orange-100 hover:border-orange-600 hover:shadow-xl transition transform duration-300 hover:-translate-y-2 text-center cursor-pointer">
                <h3 className="text-2xl font-bold mb-4 text-orange-700">Retail</h3>
                <p className="mb-6 text-gray-600">Designed for shop owners & vendors.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Pricing per 10kg</li>
                  <li>• Balanced margins</li>
                  <li>• Medium quantity</li>
                </ul>
              </div>
            </Link>

            {/* Customer */}
            <Link href="/customer">
              <div className="bg-green-50 p-10 rounded-2xl shadow border border-green-100 hover:border-green-600 hover:shadow-xl transition transform duration-300 hover:-translate-y-2 text-center cursor-pointer">
                <h3 className="text-2xl font-bold mb-4 text-green-700">Customer</h3>
                <p className="mb-6 text-gray-600">Ideal for households & daily needs.</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Pricing per kg</li>
                  <li>• Fresh daily stock</li>
                  <li>• Home delivery</li>
                </ul>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS (Buying) ================= */}
      <section id="how" className="py-24 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-16">
            How Sanjeevni Kart Works for Buyers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <Sprout size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Choose Category</h3>
              <p className="text-gray-600">Select Wholesale, Retail, or Customer based on your needs.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">
              <Leaf size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Select Vegetables</h3>
              <p className="text-gray-600">Choose vegetables, quantities, and review pricing.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">
              <Truck size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Confirm on WhatsApp</h3>
              <p className="text-gray-600">Order details are shared for confirmation and delivery.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* ================= SELLING SYSTEM DESCRIPTION ================= */}
      <section id="selling" className="py-24 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Selling System for Farmers
          </h2>

          <p className="text-center text-lg text-gray-700 mb-12">
            Farmers can sell their fresh vegetables directly to Sanjeevni Kart. We purchase vegetables from farmers at fair prices, store them in our storage,
            and then distribute them to wholesalers, retailers, and customers. Farmers do not need to contact buyers directly – we handle the entire sales process
            to ensure convenience and timely payments.
          </p>

          <h3 className="text-3xl font-semibold text-green-700 mb-8 text-center">
            How It Works for Selling
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <Sprout size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Register & List Vegetables</h3>
              <p className="text-gray-600">
                Farmers register on the platform and submit details of the vegetables they want to sell.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">
              <Handshake size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">We Purchase & Store</h3>
              <p className="text-gray-600">
                Sanjeevni Kart reviews the listing, confirms the purchase, and collects the vegetables for storage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow text-center">
              <Truck size={36} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Timely Payment</h3>
              <p className="text-gray-600">
                Farmers receive payment directly from us after the vegetables are collected and verified.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-16">
            Why Choose Sanjeevni Kart
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-green-50 p-6 rounded-xl shadow text-center">
              <Leaf size={32} className="text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Fresh Vegetables</h4>
              <p className="text-sm text-gray-600">Farm fresh vegetables delivered daily.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow text-center">
              <Handshake size={32} className="text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Transparent Pricing</h4>
              <p className="text-sm text-gray-600">No hidden charges, clear pricing.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow text-center">
              <Sprout size={32} className="text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Direct Farmers</h4>
              <p className="text-sm text-gray-600">Connected with trusted farmers.</p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow text-center">
              <Truck size={32} className="text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Reliable delivery at your doorstep.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-green-800 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold mb-4">Sanjeevni Kart</h3>
            <p className="text-gray-300 text-sm">Connecting farmers directly with buyers.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><a href="/wholesale">Wholesale</a></li>
              <li><a href="/retail">Retail</a></li>
              <li><a href="/customer">Customer</a></li>
              <li><a href="/farmer-sell">Sell Vegetables</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">Email: sanjeevnikart@gmail.com</p>
            <p className="text-gray-300 text-sm">Phone: +91 6206895209</p>
          </div>
        </div>

        <div className="mt-10 border-t border-green-700 pt-6 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Sanjeevni Kart. All rights reserved.
        </div>
      </footer>

      {/* ================= FLOATING BUTTONS ================= */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <a
          href="tel:+916206895209"
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-2 ring-green-300 transition hover:scale-110"
        >
          <Phone size={26} />
        </a>

        <a
          href="mailto:sanjeevnikart@gmail.com"
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-2 ring-blue-300 transition hover:scale-110"
        >
          <Mail size={26} />
        </a>

        {showScroll && (
          <button
            onClick={scrollToTop}
            className="bg-purple-600 hover:bg-purple-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl ring-2 ring-purple-300 transition hover:scale-110"
          >
            <ChevronUp size={26} />
          </button>
        )}
      </div>
    </main>
  );
}
