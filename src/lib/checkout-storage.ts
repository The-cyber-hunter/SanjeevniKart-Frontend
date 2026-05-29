export const APPLIED_COUPON_KEY = "applied_coupon_code";
export const DELIVERY_PINCODE_KEY = "sanjeevni_delivery_pincode";
export const NEAREST_LANDMARK_KEY = "sanjeevni_nearest_landmark";
export const DELIVERY_ADDRESS_KEY = "sanjeevni_delivery_address";
export const ALTERNATE_MOBILE_KEY = "sanjeevni_alternate_mobile";

export type CheckoutDraft = {
  nearestLandmark: string;
  deliveryAddress: string;
  alternateMobile: string;
  deliveryPincode: string;
};

export function loadCheckoutDraft(): CheckoutDraft {
  if (typeof window === "undefined") {
    return { nearestLandmark: "", deliveryAddress: "", alternateMobile: "", deliveryPincode: "" };
  }
  return {
    nearestLandmark: localStorage.getItem(NEAREST_LANDMARK_KEY) || "",
    deliveryAddress: localStorage.getItem(DELIVERY_ADDRESS_KEY) || "",
    alternateMobile: localStorage.getItem(ALTERNATE_MOBILE_KEY) || "",
    deliveryPincode: localStorage.getItem(DELIVERY_PINCODE_KEY) || "",
  };
}

export function saveCheckoutDraft(draft: CheckoutDraft) {
  if (typeof window === "undefined") return;
  localStorage.setItem(NEAREST_LANDMARK_KEY, draft.nearestLandmark.trim());
  localStorage.setItem(DELIVERY_ADDRESS_KEY, draft.deliveryAddress.trim());
  localStorage.setItem(ALTERNATE_MOBILE_KEY, draft.alternateMobile.replace(/\D/g, "").slice(0, 10));
  localStorage.setItem(DELIVERY_PINCODE_KEY, draft.deliveryPincode.replace(/\D/g, "").slice(0, 6));
}
