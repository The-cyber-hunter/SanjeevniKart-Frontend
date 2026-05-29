"use client";

import { useEffect } from "react";

import { RequireAuth } from "@/components/auth/require-auth";
import { ShopLayout } from "@/components/layout/shop-layout";
import { useShop } from "@/context/shop-context";

function OrdersList() {
  const { orders, refreshOrders } = useShop();

  useEffect(() => {
    refreshOrders().catch(() => {});
  }, [refreshOrders]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-sk-brown">Your orders</h1>
      <p className="mt-2 text-sk-muted">Track status and past deliveries.</p>

      {orders.length === 0 ? (
        <p className="mt-12 text-center text-sk-muted">No orders yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="overflow-hidden rounded-2xl border border-sk-border bg-white"
            >
              <div className="flex items-center justify-between border-b border-sk-border bg-sk-page px-5 py-3">
                <span className="font-mono text-sm font-semibold">
                  #{order.id.slice(-8).toUpperCase()}
                </span>
                <span className="rounded-full bg-sk-header px-3 py-1 text-xs font-bold text-sk-primary">
                  {order.status}
                </span>
              </div>
              <div className="p-5">
                <p className="text-xs text-sk-muted">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
                <p className="mt-2 text-sm">{order.deliveryAddress}</p>
                <ul className="mt-3 space-y-1 border-t border-sk-border pt-3 text-sm text-sk-muted">
                  {order.items.map((item) => (
                    <li key={item.productId} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₹{item.totalPrice.toFixed(0)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-right text-xl font-bold text-sk-brown">
                  ₹{order.totalAmount.toFixed(0)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return (
    <ShopLayout>
      <RequireAuth
        title="Sign in to view orders"
        description="Order history is available for signed-in customers only."
      >
        <OrdersList />
      </RequireAuth>
    </ShopLayout>
  );
}
