import React from "react";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartPageClient from "@/components/CartPageClient";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shopping Bag — Authentic Korean Skincare | Azyleen Pakistan",
  description: "Review your curated Korean skincare rituals and bespoke gift boxes before proceeding to checkout. Cash on delivery available across Pakistan.",
};

export default async function CartPage() {
  const products = await getShopifyProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={products} />
      <main className="flex-grow py-8 sm:py-12">
        <CartPageClient recommendedProducts={products.slice(0, 4)} />
      </main>
      <Footer />
    </div>
  );
}
