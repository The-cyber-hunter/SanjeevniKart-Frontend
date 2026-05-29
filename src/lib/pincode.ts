export function extractIndiaPincode(text: string | undefined | null): string | null {
  if (!text || typeof text !== "string") return null;
  const m = text.match(/\b(\d{6})\b/);
  return m ? m[1] : null;
}

export function normalizeIndiaPincode(pin: string | undefined | null): string | null {
  if (!pin || typeof pin !== "string") return null;
  const d = pin.replace(/\D/g, "");
  return d.length === 6 ? d : null;
}

export function isPincodeDeliverable(
  pin: string | null,
  rows: { pincode: string }[],
  enforce: boolean
): boolean {
  if (!enforce) return true;
  if (!pin || pin.length !== 6) return false;
  return rows.some((r) => r.pincode === pin);
}
