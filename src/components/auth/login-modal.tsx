"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useShop, getLoginError } from "@/context/shop-context";

export function LoginModal() {
  const {
    userProfile,
    loginModalOpen,
    closeLogin,
    loginUser,
    requestLoginOtp,
    verifyLoginOtp,
  } = useShop();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otpOpen, setOtpOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState<{
    name: string;
    phoneNumber: string;
    email: string;
  } | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (userProfile) {
      closeLogin();
      setOtpOpen(false);
      setPending(null);
      setOtp("");
      setError("");
    }
  }, [userProfile, closeLogin]);

  useEffect(() => {
    if (!loginModalOpen) {
      setOtpOpen(false);
      setPending(null);
      setOtp("");
      setError("");
    }
  }, [loginModalOpen]);

  if (!loginModalOpen || userProfile) return null;

  const handleLogin = async () => {
    const payload = { name: name.trim(), phoneNumber: phone.trim(), email: email.trim() };
    setError("");
    if (!payload.name || !payload.phoneNumber || !payload.email) {
      setError("Please fill all fields.");
      return;
    }
    setBusy(true);
    try {
      const info = await requestLoginOtp({ email: payload.email });
      if (info.otpDisabled) {
        await loginUser(payload);
        return;
      }
      setPending(payload);
      setOtpOpen(true);
    } catch (err) {
      setError(getLoginError(err));
    } finally {
      setBusy(false);
    }
  };

  const handleVerify = async () => {
    if (!pending || !otp.trim()) {
      setError("Enter the OTP.");
      return;
    }
    setBusy(true);
    try {
      await verifyLoginOtp({ ...pending, otp: otp.trim() });
    } catch (err) {
      setError(getLoginError(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close sign in"
        onClick={closeLogin}
      />
      <div className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl sm:rounded-l-3xl">
        <div className="flex items-start justify-between border-b border-sk-border px-6 py-4">
          <div>
            <h2 id="login-title" className="font-display text-xl font-semibold text-sk-brown">
              {otpOpen ? "Verify email" : "Sign in"}
            </h2>
            <p className="mt-0.5 text-xs text-sk-muted">Required to shop & place orders</p>
          </div>
          <button
            type="button"
            onClick={closeLogin}
            className="rounded-lg p-2 text-sk-muted hover:bg-sk-page"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-sk-muted">
            {otpOpen
              ? `Code sent to ${pending?.email}`
              : "Sign in to add items to your cart and place orders."}
          </p>
          {otpOpen ? (
            <input
              className="mt-4 w-full rounded-xl border border-sk-border px-4 py-3 text-lg tracking-widest outline-none focus:border-sk-primary"
              placeholder="000000"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
          ) : (
            <div className="mt-4 space-y-3">
              <input
                className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="w-full rounded-xl border border-sk-border px-4 py-3 text-sm outline-none focus:border-sk-primary"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          {error ? <p className="mt-3 text-sm text-sk-error">{error}</p> : null}
        </div>
        <div className="border-t border-sk-border p-6">
          <button
            type="button"
            disabled={busy}
            onClick={otpOpen ? handleVerify : handleLogin}
            className="w-full rounded-xl bg-sk-primary py-3.5 font-semibold text-white disabled:opacity-60"
          >
            {busy ? "Please wait…" : otpOpen ? "Verify" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
