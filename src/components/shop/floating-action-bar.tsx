import Link from "next/link";
import { ChevronRight } from "lucide-react";

type FloatingActionBarProps = {
  href: string;
  label: string;
  ariaLabel: string;
};

export function FloatingActionBar({ href, label, ariaLabel }: FloatingActionBarProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      role="region"
      aria-label={ariaLabel}
    >
      <Link
        href={href}
        className="mx-auto flex h-12 max-w-2xl items-center justify-center gap-2 rounded-xl bg-sk-primary px-6 text-sm font-extrabold tracking-wide text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] transition hover:bg-sk-primary-dark active:scale-[0.99]"
      >
        <span>{label}</span>
        <ChevronRight size={18} strokeWidth={2.5} aria-hidden />
      </Link>
    </div>
  );
}
