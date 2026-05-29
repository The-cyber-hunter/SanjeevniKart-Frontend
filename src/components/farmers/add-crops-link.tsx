import Link from "next/link";
import { ArrowLeft, Sprout } from "lucide-react";

type AddCropsLinkProps = {
  compact?: boolean;
  className?: string;
};

export function AddCropsLink({ compact = false, className = "" }: AddCropsLinkProps) {
  if (compact) {
    return (
      <Link
        href="/farmers"
        className={`group inline-flex items-center gap-2 rounded-full border border-[#c8e6d0] bg-white/90 px-3.5 py-2 text-sm font-semibold text-sk-brown shadow-sm ring-1 ring-[#e8f5ea]/90 transition hover:border-sk-success/40 hover:bg-[#f6fbf7] hover:shadow-md ${className}`}
      >
        <ArrowLeft
          size={15}
          className="text-sk-success/90 transition group-hover:-translate-x-0.5 group-hover:text-sk-success"
          aria-hidden
        />
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sk-success/15 text-sk-success">
          <Sprout size={14} strokeWidth={2.25} aria-hidden />
        </span>
        <span>Add crops to sell</span>
      </Link>
    );
  }

  return (
    <Link
      href="/farmers"
      className={`group inline-flex items-center gap-3 rounded-2xl border border-[#c8e6d0] bg-gradient-to-br from-white to-[#f3faf4] px-4 py-3 shadow-sm transition hover:border-sk-success/35 hover:shadow-md ${className}`}
    >
      <ArrowLeft
        size={18}
        className="shrink-0 text-sk-success/80 transition group-hover:-translate-x-0.5 group-hover:text-sk-success"
        aria-hidden
      />
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sk-success/12 text-sk-success ring-1 ring-sk-success/15">
        <Sprout size={18} strokeWidth={2.25} aria-hidden />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-sk-muted">
          Farmer supply
        </span>
        <span className="block text-sm font-semibold text-sk-brown">Add crops to sell</span>
      </span>
    </Link>
  );
}
