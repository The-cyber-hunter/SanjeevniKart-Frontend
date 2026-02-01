"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2B2024] border-t border-[#FD0053]/30 text-white">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col md:flex-row gap-12 md:items-start">
        {/* BRAND */}
        <div className="flex-1">
          <h3 className="text-2xl font-extrabold mb-4">
            Sanjeevni<span className="text-[#FD0053]">Kart</span>
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            Sanjeevni Kart connects farmers directly with wholesalers, retailers, and customers, ensuring fresh vegetables, fair pricing, and fast delivery.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[#FD0053] mb-5">For Buyers</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-[#FD0053]">Home</Link></li>
            <li><Link href="/wholesale" className="hover:text-[#FD0053]">Wholesale</Link></li>
            <li><Link href="/retail" className="hover:text-[#FD0053]">Retail</Link></li>
            <li><Link href="/customer" className="hover:text-[#FD0053]">Customer</Link></li>
          </ul>
        </div>

        {/* FOR FARMERS */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[#FD0053] mb-5">For Farmers</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/farmer-sell" className="hover:text-[#FD0053]">Sell Vegetables</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-[#FD0053] mb-5">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-[#FD0053] transition">
              <Phone size={16} />
              <a href="tel:+916206895209">+91 6206 895209</a>
            </li>
            <li className="flex items-center gap-2 hover:text-[#FD0053] transition">
              <Mail size={16} />
              <a href="mailto:sanjeevnikart@gmail.com">sanjeevnikart@gmail.com</a>
            </li>
            <li className="flex items-center gap-2 hover:text-[#FD0053] transition">
              <MapPin size={18} aria-label="Address" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=bks+consultancy+building,Dhanpurva,Sasaram,Rohtas,Bihar"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                BKS Consultancy Building, Dhanpurva, Sasaram, Rohtas, Bihar
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#FD0053]/30 py-6 text-center text-sm text-white/70">
        <div className="flex justify-center items-center gap-2 mb-2 flex-wrap">
          <Link href="/privacy-policy" className="hover:text-[#FD0053] underline">
            Privacy Policy
          </Link>
          <span className=" md:inline">|</span>
          <Link href="/terms-and-conditions" className="hover:text-[#FD0053] underline">
            Terms & Conditions
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Sanjeevni Kart. All rights reserved.</p>
      </div>

    </footer>
  );
}
