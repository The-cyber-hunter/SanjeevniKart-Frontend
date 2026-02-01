"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Wholesale", href: "/wholesale" },
    { name: "Retail", href: "/retail" },
    { name: "Customer", href: "/customer" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#2B2024]/90 backdrop-blur-md border-b border-[#FD0053]/30">
      {/* MAIN BAR */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-white">
            Sanjeevni<span className="text-[#FD0053]">Kart</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition relative
                  ${
                    pathname === link.href
                      ? "text-[#FD0053]"
                      : "text-white hover:text-[#FD0053]"
                  }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#FD0053]" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/farmer-sell"
            className="hidden md:inline-block bg-gradient-to-r from-[#A80139] to-[#FD0053] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
          >
            Sell Vegetables
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden absolute top-20 inset-x-0 bg-[#2B2024] border-t border-[#FD0053]/30">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block text-lg font-semibold
                  ${
                    pathname === link.href
                      ? "text-[#FD0053]"
                      : "text-white"
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <Link
              href="/farmer-sell"
              onClick={() => setOpen(false)}
              className="block text-center bg-gradient-to-r from-[#A80139] to-[#FD0053] text-white px-6 py-3 rounded-xl font-bold shadow-lg"
            >
              Sell Vegetables
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
