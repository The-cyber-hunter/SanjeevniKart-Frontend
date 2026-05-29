import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";

type TrackRequestsLinkProps = {
  /** Tighter layout for page headers (e.g. supply cart). */
  compact?: boolean;
  className?: string;
};

export function TrackRequestsLink({ compact = false, className = "" }: TrackRequestsLinkProps) {
  if (compact) {
    return (
      <Link
        href="/farmers/requests"
        className={`group inline-flex items-center gap-2 rounded-full border border-[#d4c4f5] bg-white/90 px-3.5 py-2 text-sm font-semibold text-sk-brown shadow-sm ring-1 ring-[#ede5ff]/80 transition hover:border-sk-primary/35 hover:bg-[#faf7ff] hover:shadow-md ${className}`}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eef8f0] text-sk-success">
          <ClipboardList size={14} strokeWidth={2.25} aria-hidden />
        </span>
        <span>Track requests</span>
        <ArrowRight
          size={15}
          className="text-sk-primary/80 transition group-hover:translate-x-0.5 group-hover:text-sk-primary"
          aria-hidden
        />
      </Link>
    );
  }

  return (
    <Link
      href="/farmers/requests"
      className={`group inline-flex items-center gap-3 rounded-2xl border border-[#d8c9ff] bg-gradient-to-br from-white to-[#f5f0ff] px-4 py-3 shadow-sm transition hover:border-sk-primary/30 hover:shadow-md ${className}`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sk-success/12 text-sk-success ring-1 ring-sk-success/15">
        <ClipboardList size={18} strokeWidth={2.25} aria-hidden />
      </span>
      <span className="min-w-0 text-left">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-sk-muted">
          Pickup & payout
        </span>
        <span className="block text-sm font-semibold text-sk-brown">Track requests</span>
      </span>
      <ArrowRight
        size={18}
        className="shrink-0 text-sk-primary/70 transition group-hover:translate-x-0.5 group-hover:text-sk-primary"
        aria-hidden
      />
    </Link>
  );
}
