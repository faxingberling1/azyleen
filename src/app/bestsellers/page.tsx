import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata = {
  title: "Bestsellers — Most-Loved Korean Skincare Formulations | Azyleen",
  description:
    "Discover Pakistan's most-reviewed authentic Korean skincare bestsellers. Clinically proven actives for glass skin, pigmentation, and barrier healing.",
};

export default async function BestsellersPage() {
  const allProducts = await getShopifyProducts();

  // Curate bestsellers: products with rating >= 4.8 or top reviews/sales (excluding vouchers)
  const bestsellers = allProducts.filter(
    (p) =>
      p.handle !== "gift-card" &&
      !p.handle.includes("gift") &&
      ((p.rating && p.rating >= 4.8) ||
        (p.reviewsCount && p.reviewsCount >= 40) ||
        p.handle.includes("peach") ||
        p.handle.includes("axis-y") ||
        p.handle.includes("ordinary") ||
        p.handle.includes("water-fit"))
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      <AnnouncementBar />
      <Navbar products={allProducts} />
      <main className="flex-grow">
        <CategoryPageLayout
          title="Curated Bestsellers"
          subtitle="Pakistan's most loved Korean formulations. Clinically proven Seoul actives trusted by over 2,000+ skincare enthusiasts across Lahore, Karachi, and Islamabad."
          categorySlug="bestsellers"
          badgeText="Verified Customer Favorites · Top Rated"
          products={bestsellers.length > 0 ? bestsellers : allProducts}
          routineTip={{
            title: "Why These Formulations Go Viral in Pakistan",
            description:
              "Unlike heavy Western creams that clog pores in humid weather, authentic Korean bestsellers use weightless micro-ferments and Centella to treat pigmentation without triggering breakouts.",
            steps: [
              "Apply lightest water-based essence first onto damp skin.",
              "Layer concentrated active serums (Niacinamide / Tranexamic Acid).",
              "Seal with ceramide barrier cream and daily SPF50+.",
            ],
          }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
