import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "azyleen-demo.myshopify.com",
      },
      {
        protocol: "https",
        hostname: "azyleen.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/products/gift-card",
        destination: "/gift-vouchers",
        permanent: false,
      },
      {
        source: "/products/gift-cards",
        destination: "/gift-vouchers",
        permanent: false,
      },
      {
        source: "/products/gift-voucher",
        destination: "/gift-vouchers",
        permanent: false,
      },
      {
        source: "/products/gift-vouchers",
        destination: "/gift-vouchers",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
