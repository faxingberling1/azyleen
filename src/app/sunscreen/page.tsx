import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryPageLayout from "@/components/CategoryPageLayout";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata = {
  title: "Korean Sunscreens SPF 50+ — Zero White Cast & Air-Fit Finish | Azyleen",
  description:
    "Discover viral Korean sunscreens formulated for South Asian skin tones. SPF 50+ PA++++ with Centella Asiatica, leaving zero white cast and no greasy residue.",
};

export default async function SunscreenPage() {
  const allProducts = await getShopifyProducts();

  // Filter sunscreens
  const sunscreens = allProducts.filter(
    (p) =>
      p.category === "sunscreen" ||
      p.handle.includes("sun") ||
      p.handle.includes("water-fit") ||
      p.title.toLowerCase().includes("sun") ||
      p.title.toLowerCase().includes("spf")
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      <AnnouncementBar />
      <Navbar products={allProducts} />
      <main className="flex-grow">
        <CategoryPageLayout
          title="Korean Sunscreens & SPF"
          subtitle="Viral chemical & mineral Seoul sun formulations clinically certified SPF 50+ PA++++. Formulated specifically to leave zero chalky white-cast on medium to deep South Asian skin tones."
          categorySlug="sunscreen"
          badgeText="SPF 50+ PA++++ · Zero White Cast Certified"
          products={sunscreens.length > 0 ? sunscreens : allProducts}
          routineTip={{
            title: "The Golden 2-Finger Rule for Real Sun Protection",
            description:
              "Korean sunscreens feel like light hydration serums, meaning you can easily apply the full dermatologically recommended quantity without heaviness or shine.",
            steps: [
              "Dispense two full strips along your index and middle fingers.",
              "Dot evenly over forehead, nose, cheeks, chin, and neck.",
              "Blend outwards — absorbs within 60 seconds with an invisible glass-skin glow.",
            ],
          }}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
