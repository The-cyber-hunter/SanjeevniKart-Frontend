import type { Promotion } from "@/lib/types";

export function getActivePromotions(promotions: Promotion[]): Promotion[] {
  const now = Date.now();
  return promotions
    .filter((p) => p.active && new Date(p.validTill).getTime() > now)
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export function formatPromotionDiscount(promotion: Promotion): string {
  return promotion.discountType === "percentage"
    ? `${promotion.discountValue}% off`
    : `₹${promotion.discountValue} off`;
}

export function getRemainingTimeLabel(validTill: string, nowMs = Date.now()): string {
  const targetTime = new Date(validTill).getTime();
  if (!Number.isFinite(targetTime)) return "Ends soon";
  const diffMs = targetTime - nowMs;
  if (diffMs <= 0) return "Expired";
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h left`;
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}
