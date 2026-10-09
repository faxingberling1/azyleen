import React, { Suspense } from "react";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThankYouPageClient from "@/components/ThankYouPageClient";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Order Confirmed — Thank You | Azyleen Pakistan",
  description: "Your order for authentic Korean skincare has been confirmed. View order tracking and dispatch details.",
};

export default async function ThankYouPage() {
  const products = await getShopifyProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={products} />
      <main className="flex-grow py-8 sm:py-14">
        <Suspense fallback={<div className="text-center py-20 text-xs text-[#7E636E]">Loading order confirmation...</div>}>
          <ThankYouPageClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
