import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-sk-header-border bg-sk-brown text-[#f3e6d8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2">
            <Image src="/app-icon-512.png" alt="" width={36} height={36} className="rounded-lg" />
            <span className="font-display text-lg font-semibold">Sanjeevni Kart</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#c9b8a8]">
            From farm to home, with care. Fresh produce and staples delivered to your doorstep.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#e7cfb8]">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-white">
                Browse products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white">
                Your cart
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-white">
                Order history
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#e7cfb8]">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/farmers" className="hover:text-white">
                Sell produce
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-white">
                Contact support
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-white">
                My account
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#e7cfb8]">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/legal/privacy" className="hover:text-white">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/legal/account-deletion" className="hover:text-white">
                Delete account
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-white">
                Terms of service
              </Link>
            </li>
            <li>
              <Link href="/legal/refunds" className="hover:text-white">
                Refund & cancellation
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-[#a8907e] sm:flex-row">
          <p>© {new Date().getFullYear()} Sanjeevni Kart. All rights reserved.</p>
          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/legal/privacy" className="hover:text-[#f3e6d8]">
              Privacy
            </Link>
            <Link href="/legal/terms" className="hover:text-[#f3e6d8]">
              Terms
            </Link>
            <Link href="/legal/refunds" className="hover:text-[#f3e6d8]">
              Refunds
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
