export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type Product = {
  id: string;
  name: string;
  categoryId: string;
  unit: string;
  price: number;
  image: string;
  popular?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  badge: string;
  active: boolean;
  priority: number;
  categoryId: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minOrderAmount?: number;
  validTill: string;
};

export type UserProfile = {
  name: string;
  phoneNumber: string;
  email: string;
};

export type Order = {
  id: string;
  customerName: string;
  nearestLandmark: string;
  deliveryAddress: string;
  paymentMethod: string;
  items: {
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  status: string;
  totalAmount: number;
  createdAt: string;
  estimatedDelivery: string;
};

export type AppRuntimeConfig = {
  supportPhone: string;
  supportEmail: string;
  razorpayKeyId: string;
  paymentEnabled: boolean;
};

export type CartQuote = {
  items: {
    productId: string;
    name: string;
    unitPrice: number;
    quantity: number;
    totalPrice: number;
  }[];
  totalAmount: number;
};

export type CouponValidation = {
  code: string;
  description: string;
  discount: number;
  finalAmount: number;
};

export type FarmerSellOrderStatus =
  | "Requested"
  | "Pickup Scheduled"
  | "Received"
  | "Payout Done"
  | "Rejected";

export type FarmerSellOrder = {
  id: string;
  farmerName: string;
  farmerEmail?: string;
  farmerPhoneNumber?: string;
  pickupAddress: string;
  items: {
    productId: string;
    name: string;
    categoryId?: string;
    unitPrice: number;
    quantity: number;
    lineAmount: number;
  }[];
  grossAmount: number;
  platformFeeAmount: number;
  pickupChargeAmount: number;
  netPayoutAmount: number;
  status: FarmerSellOrderStatus | string;
  adminRemarks?: string;
  createdAt: string;
};

export type SellQuote = {
  items: {
    productId: string;
    name: string;
    categoryId?: string;
    unitPrice: number;
    quantity: number;
    lineAmount: number;
  }[];
  platformFeeRate: number;
  grossAmount: number;
  platformFeeAmount: number;
  pickupChargeAmount: number;
  netPayoutAmount: number;
};
