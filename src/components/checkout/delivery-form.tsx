"use client";

import { useEffect, useState } from "react";

import { api } from "@/lib/api";
import { isPincodeDeliverable, normalizeIndiaPincode } from "@/lib/pincode";
import type { CheckoutDraft } from "@/lib/checkout-storage";

export function DeliveryForm({
  value,
  onChange,
  onValidChange,
}: {
  value: CheckoutDraft;
  onChange: (v: CheckoutDraft) => void;
  onValidChange: (valid: boolean) => void;
}) {
  const [pincodes, setPincodes] = useState<{ pincode: string }[]>([]);
  const [enforcePincode, setEnforcePincode] = useState(false);

  useEffect(() => {
    api
      .getPublicServicePincodes()
      .then((r) => {
        setPincodes(r.items);
        setEnforcePincode(Boolean(r.enforceDeliveryPincode));
      })
      .catch(() => {
        setPincodes([]);
        setEnforcePincode(false);
      });
  }, []);

  const normalizedPin = normalizeIndiaPincode(value.deliveryPincode);
  const pinOk = isPincodeDeliverable(normalizedPin, pincodes, enforcePincode);
  const landmarkOk = value.nearestLandmark.trim().length > 0;
  const addressOk = value.deliveryAddress.trim().length > 0;
  const valid = pinOk && landmarkOk && addressOk;

  useEffect(() => {
    onValidChange(valid);
  }, [valid, onValidChange]);

  return (
    <div className="space-y-3">
      <div>
        <input
          className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary"
          placeholder="Delivery pincode *"
          inputMode="numeric"
          maxLength={6}
          value={value.deliveryPincode}
          onChange={(e) =>
            onChange({
              ...value,
              deliveryPincode: e.target.value.replace(/\D/g, "").slice(0, 6),
            })
          }
        />
        {enforcePincode && value.deliveryPincode.length === 6 && !pinOk ? (
          <p className="mt-1 text-xs text-sk-error">We don&apos;t deliver to this pincode yet.</p>
        ) : null}
      </div>
      <input
        className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary disabled:bg-sk-page"
        placeholder="Nearest landmark *"
        value={value.nearestLandmark}
        disabled={!pinOk}
        onChange={(e) => onChange({ ...value, nearestLandmark: e.target.value })}
      />
      <textarea
        className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary disabled:bg-sk-page"
        placeholder="Full delivery address *"
        rows={3}
        value={value.deliveryAddress}
        disabled={!pinOk}
        onChange={(e) => onChange({ ...value, deliveryAddress: e.target.value })}
      />
      <input
        className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary"
        placeholder="Alternate phone (optional)"
        inputMode="tel"
        maxLength={10}
        value={value.alternateMobile}
        onChange={(e) =>
          onChange({
            ...value,
            alternateMobile: e.target.value.replace(/\D/g, "").slice(0, 10),
          })
        }
      />
    </div>
  );
}
