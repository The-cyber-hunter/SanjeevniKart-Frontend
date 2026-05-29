import axios, { isAxiosError } from "axios";

import type {
  AppRuntimeConfig,
  CartQuote,
  Category,
  CouponValidation,
  FarmerSellOrder,
  Order,
  Product,
  Promotion,
  SellQuote,
  UserProfile,
} from "./types";
import { API_PORT } from "./constants";

function normalizeOrigin(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/** Same rules as mobile: origin only in env; `/api` is appended here. */
export function withApiPath(origin: string): string {
  const u = normalizeOrigin(origin);
  if (u.endsWith("/api")) return u;
  return `${u}/api`;
}

/**
 * Browser: always same-origin `/api` (Next route handler proxies to API_URL without
 * forwarding Origin — avoids Render CORS rejections on login and other client calls).
 * SSR: `API_URL` or localhost.
 */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return "/api";
  }
  const serverUrl =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    `http://localhost:${API_PORT}`;
  return withApiPath(serverUrl);
}

const client = axios.create({
  timeout: 45_000,
  headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
});

client.interceptors.request.use((config) => {
  config.baseURL = getApiBaseUrl();
  return config;
});

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  console.log("[api] base URL →", getApiBaseUrl());
}

const DEFAULT_APP_CONFIG: AppRuntimeConfig = {
  supportPhone: "6206895209",
  supportEmail: "sanjeevnikart@gmail.com",
  razorpayKeyId: "",
  paymentEnabled: false,
};

export function resolveAppConfigFromEnv(): AppRuntimeConfig {
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.trim() || "";
  return {
    ...DEFAULT_APP_CONFIG,
    razorpayKeyId,
    paymentEnabled: Boolean(razorpayKeyId),
  };
}

export function getApiErrorMessage(err: unknown, fallback = "Something went wrong. Please try again."): string {
  if (isAxiosError(err)) {
    if (!err.response) {
      return "Could not reach the server. Check that the backend is running and API_URL is correct.";
    }
    const data = err.response.data;
    if (data && typeof data === "object" && "message" in data) {
      const msg = (data as { message?: string }).message;
      if (typeof msg === "string" && msg.trim()) return msg.trim();
    }
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}

export const api = {
  getCategories: () => client.get<Category[]>("/categories").then((r) => r.data),
  getProducts: (categoryId?: string) =>
    client
      .get<Product[]>("/products", { params: categoryId ? { categoryId } : undefined })
      .then((r) => r.data),
  getPromotions: () => client.get<Promotion[]>("/promotions").then((r) => r.data),
  /** Public Razorpay key from NEXT_PUBLIC_RAZORPAY_KEY_ID (same pattern as mobile EXPO_PUBLIC_*). */
  getAppConfig: () => Promise.resolve(resolveAppConfigFromEnv()),
  getOrders: (params?: { email?: string; phoneNumber?: string }) =>
    client
      .get<Order[]>("/orders", {
        params: params?.email || params?.phoneNumber ? params : undefined,
      })
      .then((r) => r.data),
  getOrderCount: (params: { email?: string; phoneNumber?: string }) =>
    client.get<{ count: number }>("/orders/count", { params }).then((r) => r.data),
  getCartQuote: (payload: { items: { productId: string; quantity: number }[] }) =>
    client.post<CartQuote>("/cart/quote", payload).then((r) => r.data),
  validateCoupon: (payload: { code: string; cartTotal: number }) =>
    client.post<CouponValidation>("/coupons/validate", payload).then((r) => r.data),
  loginUser: (payload: UserProfile) =>
    client.post<UserProfile>("/users/login", payload).then((r) => r.data),
  requestLoginOtp: (payload: { email: string; pincode?: string }) =>
    client
      .post<{
        ok?: boolean;
        expiresInMinutes: number;
        emailSent: boolean;
        otpDisabled?: boolean;
        debugOtp?: string;
      }>("/users/login/request-otp", payload)
      .then((r) => r.data),
  verifyLoginOtp: (payload: UserProfile & { otp: string }) =>
    client.post<UserProfile>("/users/login/verify-otp", payload).then((r) => r.data),
  createOrder: (payload: {
    customerName: string;
    userEmail?: string;
    userPhoneNumber?: string;
    alternatePhoneNumber?: string;
    nearestLandmark: string;
    deliveryAddress: string;
    paymentMethod: string;
    paymentProvider?: string;
    paymentOrderId?: string;
    paymentPaymentId?: string;
    items: { productId: string; quantity: number }[];
  }) => client.post<Order>("/orders", payload).then((r) => r.data),
  requestOrderCancellation: (
    orderId: string,
    payload: { email?: string; phoneNumber?: string; upiId: string }
  ) => client.patch<Order>(`/orders/${orderId}/cancel-request`, payload).then((r) => r.data),
  getPublicServicePincodes: () =>
    client
      .get<{ items: { id: string; pincode: string }[]; enforceDeliveryPincode: boolean }>(
        "/service-pincodes"
      )
      .then((r) => r.data),
  createRazorpayOrder: (payload: { amountInRupees: number }) =>
    client
      .post<{
        orderId: string;
        amount: number;
        currency: string;
        checkoutConfigId?: string;
      }>("/payments/razorpay/order", payload)
      .then((r) => r.data),
  verifyRazorpayPayment: (payload: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => client.post<{ ok: boolean }>("/payments/razorpay/verify", payload).then((r) => r.data),
  getSellOrders: (params?: { email?: string; phoneNumber?: string }) =>
    client
      .get<FarmerSellOrder[]>("/sell-orders", {
        params: params?.email || params?.phoneNumber ? params : undefined,
      })
      .then((r) => r.data),
  quoteSellOrder: (payload: { items: { productId: string; quantity: number }[] }) =>
    client.post<SellQuote>("/sell-orders/quote", payload).then((r) => r.data),
  createSellOrder: (payload: {
    farmerName: string;
    farmerEmail?: string;
    farmerPhoneNumber?: string;
    pickupAddress: string;
    items: { productId: string; quantity: number }[];
  }) => client.post<FarmerSellOrder>("/sell-orders", payload).then((r) => r.data),
};
