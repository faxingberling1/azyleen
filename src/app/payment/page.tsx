import React from "react";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentPageClient from "@/components/PaymentPageClient";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Payment — Secure Checkout | Azyleen Pakistan",
  description: "Select Cash on Delivery (COD), Direct Bank Transfer, or Card for your Korean skincare order.",
};

export default async function PaymentPage() {
  const products = await getShopifyProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={products} />
      <main className="flex-grow py-8 sm:py-12">
        <PaymentPageClient />
      </main>
      <Footer />
    </div>
  );
}
