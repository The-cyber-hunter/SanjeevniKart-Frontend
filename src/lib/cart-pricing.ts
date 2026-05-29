import type { CartItem, Promotion } from "./types";

export function getPromotionBaseAmount(
  promotion: Promotion,
  cart: CartItem[],
  cartTotal: number
): number {
  if (!promotion.categoryId || promotion.categoryId === "all") {
    return cartTotal;
  }
  return cart.reduce((sum, item) => {
    if (item.product.categoryId !== promotion.categoryId) return sum;
    return sum + (item.product.price * item.quantity) / 1000;
  }, 0);
}

export function getActiveAutoPromotion(
  promotions: Promotion[],
  cart: CartItem[],
  cartTotal: number
): Promotion | undefined {
  return promotions
    .filter((p) => p.active && new Date(p.validTill).getTime() >= Date.now())
    .find((p) => {
      const base = getPromotionBaseAmount(p, cart, cartTotal);
      return base >= Number(p.minOrderAmount || 0) && Number(p.discountValue || 0) > 0;
    });
}

export function getPromotionDiscount(
  promotion: Promotion | undefined,
  cart: CartItem[],
  cartTotal: number
): number {
  if (!promotion) return 0;
  const base = getPromotionBaseAmount(promotion, cart, cartTotal);
  const raw =
    promotion.discountType === "flat"
      ? Number(promotion.discountValue || 0)
      : (base * Number(promotion.discountValue || 0)) / 100;
  return Math.max(0, Number(raw.toFixed(2)));
}

export function computePayableAmount({
  cartTotal,
  couponDiscount,
  promotionDiscount,
  hasPastOrders,
}: {
  cartTotal: number;
  couponDiscount: number;
  promotionDiscount: number;
  hasPastOrders: boolean | null;
}): { combinedDiscount: number; discountedSubtotal: number; deliveryCharge: number; payableAmount: number } {
  const combinedDiscount = Math.min(cartTotal, couponDiscount + promotionDiscount);
  const discountedSubtotal = Math.max(0, cartTotal - combinedDiscount);
  const isFirstOrder = hasPastOrders === false;
  const deliveryCharge =
    discountedSubtotal > 0 && discountedSubtotal < 100 && !isFirstOrder ? 15 : 0;
  const payableAmount = discountedSubtotal + deliveryCharge;
  return { combinedDiscount, discountedSubtotal, deliveryCharge, payableAmount };
}
