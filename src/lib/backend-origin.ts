/** Backend origin for server-side proxy (no `/api` suffix). */
export function getBackendOrigin(): string {
  const raw =
    process.env.API_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    "http://127.0.0.1:4000";
  return raw.replace(/\/api\/?$/, "").replace(/\/+$/, "");
}
