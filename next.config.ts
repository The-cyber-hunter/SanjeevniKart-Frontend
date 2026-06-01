import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: false },
      { source: "/categories", destination: "/shop", permanent: false },
      { source: "/profile", destination: "/account", permanent: false },
      { source: "/payment", destination: "/checkout", permanent: false },
      { source: "/sell", destination: "/farmers", permanent: false },
      { source: "/sell/cart", destination: "/farmers/cart", permanent: false },
      { source: "/sell/requests", destination: "/farmers/requests", permanent: false },
      { source: "/privacy", destination: "/legal/account-deletion", permanent: false },
      { source: "/privacy-policy", destination: "/legal/privacy", permanent: false },
      { source: "/account-deletion", destination: "/legal/account-deletion", permanent: false },
      { source: "/delete-account", destination: "/legal/account-deletion", permanent: false },
    ];
  },
};

export default nextConfig;
