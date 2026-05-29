import Link from "next/link";
import { ArrowRight, LayoutGrid } from "lucide-react";

type ViewFullCatalogLinkProps = {
  className?: string;
};

export function ViewFullCatalogLink({ className = "" }: ViewFullCatalogLinkProps) {
  return (
    <Link
      href="/shop"
      className={`group inline-flex items-center gap-2.5 rounded-full border border-[#e8dfd4] bg-white/90 px-4 py-2.5 text-sm font-semibold text-sk-brown shadow-sm ring-1 ring-sk-header-border/70 transition hover:border-sk-primary/35 hover:bg-gradient-to-r hover:from-white hover:to-sk-page hover:shadow-md ${className}`}
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-header text-sk-primary ring-1 ring-sk-header-border/80">
        <LayoutGrid size={16} strokeWidth={2.25} aria-hidden />
      </span>
      <span>View full catalog</span>
      <ArrowRight
        size={16}
        className="text-sk-primary/80 transition group-hover:translate-x-0.5 group-hover:text-sk-primary"
        aria-hidden
      />
    </Link>
  );
}
