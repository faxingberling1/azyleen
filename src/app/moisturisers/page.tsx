import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata = {
  title: "Korean Barrier Moisturisers & Creams — Ceramide & Cica Repair | Azyleen",
  description:
    "Repair your skin barrier with non-comedogenic Korean moisturisers. Formulated with Ceramides, Centella, and Resveratrol for all-day glass skin hydration.",
};

export default async function MoisturisersPage() {
  const allProducts = await getShopifyProducts();

  // Filter moisturisers, barrier creams, and gels
  const moisturisers = allProducts.filter(
    (p) =>
      p.category === "moisturisers" ||
      p.category === "eye-care" ||
      p.handle.includes("cream") ||
      p.handle.includes("relief") ||
      p.handle.includes("enrich") ||
      p.title.toLowerCase().includes("cream") ||
      p.title.toLowerCase().includes("moisturiser")
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      <AnnouncementBar />
      <Navbar products={allProducts} />
      <main className="flex-grow">
        <CategoryPageLayout
          title="Barrier Creams & Moisturisers"
          subtitle="Non-comedogenic Korean moisture sealers formulated to lock in active serums, soothe redness, and restore compromised lipid barriers without heavy pore-clogging grease."
          categorySlug="moisturisers"
          badgeText="Ceramide & Cica Barrier · Lightweight Hydration"
          products={moisturisers.length > 0 ? moisturisers : allProducts}
          routineTip={{
            title: "Moisturizing in Pakistani Humidity Without Clogging Pores",
            description:
              "Heavy petroleum creams trap heat and sweat. Authentic Korean gel-creams use lipid-identical ceramides and beta-glucan to strengthen barriers while allowing skin to breathe freely.",
            steps: [
              "Apply a nickel-sized amount while skin is still slightly dewy.",
              "Warm between palms to melt ceramide micro-capsules.",
              "Sweep upwards across jawline, cheeks, and neck for a firming seal.",
            ],
          }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
