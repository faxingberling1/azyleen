import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata = {
  title: "Korean Serums & Actives — Hyperpigmentation & Glass Glow | Azyleen",
  description:
    "Shop authentic Korean serums with Niacinamide, Tranexamic Acid, Snail Mucin, and Centella. Formulated to fade dark spots and revive tired skin.",
};

export default async function SerumsPage() {
  const allProducts = await getShopifyProducts();

  // Filter serums and active essences
  const serums = allProducts.filter(
    (p) =>
      p.category === "serums" ||
      p.handle.includes("serum") ||
      p.handle.includes("essence") ||
      p.handle.includes("ampoule") ||
      p.handle.includes("niacin") ||
      p.title.toLowerCase().includes("serum") ||
      p.title.toLowerCase().includes("essence")
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      <AnnouncementBar />
      <Navbar products={allProducts} />
      <main className="flex-grow">
        <CategoryPageLayout
          title="Korean Serums & Actives"
          subtitle="Concentrated Seoul formulations engineered to treat stubborn dark spots, melasma, uneven texture, and deep cellular dehydration."
          categorySlug="serums"
          badgeText="High-Potency Actives · Seoul Direct"
          products={serums.length > 0 ? serums : allProducts}
          routineTip={{
            title: "How to Layer Korean Serums for Maximum Absorption",
            description:
              "Korean skincare favors layering multiple targeted serums. Always start from the thinnest viscosity (water-weight essences) to the thickest (lipid ampoules).",
            steps: [
              "Dispense 2-3 drops into fingertips, never touch dropper directly to face.",
              "Press and pat gently rather than rubbing to encourage micro-absorption.",
              "Wait 60 seconds before applying moisturizer to allow active bonding.",
            ],
          }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
