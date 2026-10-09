import React from "react";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutPageClient from "@/components/CheckoutPageClient";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Checkout — Shipping Details | Azyleen Pakistan",
  description: "Enter your delivery address for fast, authentic Korean skincare dispatch from Lahore across Pakistan.",
};

export default async function CheckoutPage() {
  const products = await getShopifyProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={products} />
      <main className="flex-grow py-8 sm:py-12">
        <CheckoutPageClient />
      </main>
      <Footer />
    </div>
  );
}
