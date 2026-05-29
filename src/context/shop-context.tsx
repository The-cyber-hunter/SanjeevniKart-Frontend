"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { isAxiosError } from "axios";

import { api, getApiErrorMessage, resolveAppConfigFromEnv } from "@/lib/api";
import { DEFAULT_LOCATION, WEIGHT_STEP_GRAMS } from "@/lib/constants";
import type {
  AppRuntimeConfig,
  CartItem,
  Category,
  Order,
  Product,
  Promotion,
  UserProfile,
} from "@/lib/types";

const AUTH_KEY = "sanjeevni_user_profile";
const CART_KEY = "sanjeevni_cart_v1";
const SELL_CART_KEY = "sanjeevni_sell_cart_v1";
const LOCATION_KEY = "sanjeevni_guest_location";
const FETCH_RETRIES = 3;

const DEFAULT_APP_CONFIG: AppRuntimeConfig = {
  supportPhone: "6206895209",
  supportEmail: "sanjeevnikart@gmail.com",
  razorpayKeyId: "",
  paymentEnabled: false,
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as CartItem).quantity === "number" &&
        (item as CartItem).quantity > 0 &&
        typeof (item as CartItem).product?.id === "string"
    );
  } catch {
    return [];
  }
}

type ShopContextValue = {
  categories: Category[];
  products: Product[];
  promotions: Promotion[];
  userProfile: UserProfile | null;
  authReady: boolean;
  cart: CartItem[];
  sellCart: CartItem[];
  orders: Order[];
  selectedLocation: string;
  appConfig: AppRuntimeConfig;
  loading: boolean;
  catalogError: string | null;
  cartTotal: number;
  loginUser: (payload: UserProfile) => Promise<void>;
  requestLoginOtp: (payload: Pick<UserProfile, "email">) => Promise<{
    expiresInMinutes: number;
    emailSent: boolean;
    otpDisabled?: boolean;
  }>;
  verifyLoginOtp: (payload: UserProfile & { otp: string }) => Promise<void>;
  logoutUser: () => Promise<void>;
  fetchInitialData: () => Promise<void>;
  refreshOrders: () => Promise<void>;
  placeOrder: (payload: {
    customerName: string;
    nearestLandmark: string;
    deliveryAddress: string;
    alternatePhoneNumber?: string;
    paymentMethod: string;
    paymentProvider?: string;
    paymentOrderId?: string;
    paymentPaymentId?: string;
  }) => Promise<Order>;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartQuantity: (productId: string) => number;
  clearCart: () => void;
  addToSellCart: (product: Product) => void;
  updateSellQuantity: (productId: string, quantity: number) => void;
  getSellCartQuantity: (productId: string) => number;
  clearSellCart: () => void;
  loginModalOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
};

const ShopContext = createContext<ShopContextValue | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sellCart, setSellCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedLocation] = useState(DEFAULT_LOCATION);
  const [loading, setLoading] = useState(false);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [appConfig, setAppConfig] = useState(DEFAULT_APP_CONFIG);
  const [cartPersistReady, setCartPersistReady] = useState(false);
  const [catalogLoaded, setCatalogLoaded] = useState(false);
  const [serverCartTotal, setServerCartTotal] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const openLogin = useCallback(() => setLoginModalOpen(true), []);
  const closeLogin = useCallback(() => setLoginModalOpen(false), []);

  const fetchGeneration = useRef(0);

  const refreshOrders = useCallback(async () => {
    if (!userProfile?.email && !userProfile?.phoneNumber) {
      setOrders([]);
      return;
    }
    try {
      const data = await api.getOrders({
        email: userProfile.email,
        phoneNumber: userProfile.phoneNumber,
      });
      setOrders(data);
    } catch {
      setOrders([]);
    }
  }, [userProfile]);

  const fetchInitialData = useCallback(async () => {
    const generation = ++fetchGeneration.current;
    setLoading(true);
    setCatalogError(null);
    let lastError: unknown;

    for (let attempt = 0; attempt < FETCH_RETRIES; attempt++) {
      try {
        const [catsResult, prodsResult, promosResult] = await Promise.allSettled([
          api.getCategories(),
          api.getProducts(),
          api.getPromotions(),
        ]);

        if (generation !== fetchGeneration.current) return;

        if (catsResult.status !== "fulfilled" || prodsResult.status !== "fulfilled") {
          lastError =
            catsResult.status === "rejected"
              ? catsResult.reason
              : prodsResult.status === "rejected"
                ? prodsResult.reason
                : new Error("Catalog request failed");
          if (attempt < FETCH_RETRIES - 1) {
            await sleep(400 * (attempt + 1));
            continue;
          }
          break;
        }

        setCategories(catsResult.value);
        setProducts(prodsResult.value);
        setPromotions(promosResult.status === "fulfilled" ? promosResult.value : []);
        setAppConfig(resolveAppConfigFromEnv());
        setCatalogLoaded(true);
        setCatalogError(null);
        setLoading(false);
        return;
      } catch (error) {
        lastError = error;
        if (attempt < FETCH_RETRIES - 1) {
          await sleep(400 * (attempt + 1));
        }
      }
    }

    if (generation !== fetchGeneration.current) return;
    setCatalogError(
      getApiErrorMessage(
        lastError,
        "Could not load catalog. Check API_URL in .env.local and try again."
      )
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedProfile = localStorage.getItem(AUTH_KEY);
    const storedCart = localStorage.getItem(CART_KEY);
    const storedSellCart = localStorage.getItem(SELL_CART_KEY);
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile) as UserProfile);
      } catch {
        /* ignore */
      }
    }
    const restored = parseStoredCart(storedCart);
    if (restored.length) setCart(restored);
    const restoredSell = parseStoredCart(storedSellCart);
    if (restoredSell.length) setSellCart(restoredSell);
    setAuthReady(true);
    setCartPersistReady(true);
  }, []);

  useEffect(() => {
    if (!cartPersistReady) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, cartPersistReady]);

  useEffect(() => {
    if (!cartPersistReady) return;
    localStorage.setItem(SELL_CART_KEY, JSON.stringify(sellCart));
  }, [sellCart, cartPersistReady]);

  useEffect(() => {
    if (!catalogLoaded) return;
    setCart((prev) => {
      if (!prev.length) return prev;
      return prev
        .map((item) => {
          const fresh = products.find((p) => p.id === item.product.id);
          return fresh ? { product: fresh, quantity: item.quantity } : null;
        })
        .filter((x): x is CartItem => x !== null);
    });
    setSellCart((prev) => {
      if (!prev.length) return prev;
      return prev
        .map((item) => {
          const fresh = products.find((p) => p.id === item.product.id);
          return fresh ? { product: fresh, quantity: item.quantity } : null;
        })
        .filter((x): x is CartItem => x !== null);
    });
  }, [products, catalogLoaded]);

  useEffect(() => {
    if (!authReady) return;
    void fetchInitialData();
  }, [authReady, fetchInitialData]);

  useEffect(() => {
    if (!authReady) return;
    void refreshOrders();
  }, [authReady, refreshOrders]);

  useEffect(() => {
    if (!cart.length) {
      setServerCartTotal(0);
      return;
    }
    let active = true;
    api
      .getCartQuote({
        items: cart.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
      })
      .then((q) => {
        if (active) setServerCartTotal(q.totalAmount);
      })
      .catch(() => {
        if (active) {
          setServerCartTotal(
            cart.reduce((sum, i) => sum + (i.product.price * i.quantity) / 1000, 0)
          );
        }
      });
    return () => {
      active = false;
    };
  }, [cart]);

  const loginUser = useCallback(async (payload: UserProfile) => {
    try {
      const saved = await api.loginUser(payload);
      setUserProfile(saved);
      localStorage.setItem(AUTH_KEY, JSON.stringify(saved));
      setLoginModalOpen(false);
      await fetchInitialData();
    } catch (err) {
      throw new Error(getLoginError(err));
    }
  }, [fetchInitialData]);

  const requestLoginOtp = useCallback(async (payload: Pick<UserProfile, "email">) => {
    return api.requestLoginOtp({ email: payload.email.trim() });
  }, []);

  const verifyLoginOtp = useCallback(async (payload: UserProfile & { otp: string }) => {
    try {
      const saved = await api.verifyLoginOtp(payload);
      setUserProfile(saved);
      localStorage.setItem(AUTH_KEY, JSON.stringify(saved));
      setLoginModalOpen(false);
      await fetchInitialData();
    } catch (err) {
      throw new Error(getLoginError(err));
    }
  }, [fetchInitialData]);

  const logoutUser = useCallback(async () => {
    setUserProfile(null);
    setOrders([]);
    localStorage.removeItem(AUTH_KEY);
    localStorage.setItem(LOCATION_KEY, selectedLocation);
  }, [selectedLocation]);

  const placeOrder = useCallback(
    async (payload: {
      customerName: string;
      nearestLandmark: string;
      deliveryAddress: string;
      alternatePhoneNumber?: string;
      paymentMethod: string;
      paymentProvider?: string;
      paymentOrderId?: string;
      paymentPaymentId?: string;
    }) => {
      if (!cart.length) {
        throw new Error("Your cart is empty.");
      }
      const order = await api.createOrder({
        ...payload,
        userEmail: userProfile?.email,
        userPhoneNumber: userProfile?.phoneNumber,
        items: cart.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });
      setCart([]);
      setServerCartTotal(0);
      await refreshOrders();
      return order;
    },
    [cart, refreshOrders, userProfile?.email, userProfile?.phoneNumber]
  );

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (!existing) return [...prev, { product, quantity: WEIGHT_STEP_GRAMS }];
      return prev.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + WEIGHT_STEP_GRAMS }
          : i
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.product.id !== productId);
      const normalized = Math.max(
        WEIGHT_STEP_GRAMS,
        Math.round(quantity / WEIGHT_STEP_GRAMS) * WEIGHT_STEP_GRAMS
      );
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: normalized } : i
      );
    });
  }, []);

  const getCartQuantity = useCallback(
    (productId: string) => cart.find((i) => i.product.id === productId)?.quantity ?? 0,
    [cart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setServerCartTotal(0);
  }, []);

  const addToSellCart = useCallback((product: Product) => {
    setSellCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (!existing) return [...prev, { product, quantity: 1 }];
      return prev.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    });
  }, []);

  const updateSellQuantity = useCallback((productId: string, quantity: number) => {
    setSellCart((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.product.id !== productId);
      const normalized = Math.max(1, Math.round(quantity));
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: normalized } : i
      );
    });
  }, []);

  const getSellCartQuantity = useCallback(
    (productId: string) => sellCart.find((i) => i.product.id === productId)?.quantity ?? 0,
    [sellCart]
  );

  const clearSellCart = useCallback(() => setSellCart([]), []);

  const value = useMemo(
    () => ({
      categories,
      products,
      promotions,
      userProfile,
      authReady,
      cart,
      sellCart,
      orders,
      selectedLocation,
      appConfig,
      loading,
      catalogError,
      cartTotal: serverCartTotal,
      loginUser,
      requestLoginOtp,
      verifyLoginOtp,
      logoutUser,
      fetchInitialData,
      refreshOrders,
      placeOrder,
      addToCart,
      updateQuantity,
      getCartQuantity,
      clearCart,
      addToSellCart,
      updateSellQuantity,
      getSellCartQuantity,
      clearSellCart,
      loginModalOpen,
      openLogin,
      closeLogin,
    }),
    [
      categories,
      products,
      promotions,
      userProfile,
      authReady,
      cart,
      sellCart,
      orders,
      selectedLocation,
      appConfig,
      loading,
      catalogError,
      serverCartTotal,
      loginUser,
      requestLoginOtp,
      verifyLoginOtp,
      logoutUser,
      fetchInitialData,
      refreshOrders,
      placeOrder,
      addToCart,
      updateQuantity,
      getCartQuantity,
      clearCart,
      addToSellCart,
      updateSellQuantity,
      getSellCartQuantity,
      clearSellCart,
      loginModalOpen,
      openLogin,
      closeLogin,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export function getLoginError(err: unknown): string {
  if (isAxiosError(err) && err.response?.data && typeof err.response.data === "object") {
    const msg = (err.response.data as { message?: string }).message;
    if (typeof msg === "string" && msg.trim()) return msg.trim();
  }
  if (isAxiosError(err) && err.response?.status === 403) {
    return getApiErrorMessage(err, "No delivery in your city or area.");
  }
  if (isAxiosError(err) && err.response?.status === 400) {
    return getApiErrorMessage(err, "Please check your login details and try again.");
  }
  return getApiErrorMessage(err);
}
