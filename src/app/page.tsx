import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeTicker from "@/components/MarqueeTicker";
import TrustBadges from "@/components/TrustBadges";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import ProductSpotlight from "@/components/ProductSpotlight";
import CategoryShowcase from "@/components/CategoryShowcase";
import GlassSkinRoutine from "@/components/GlassSkinRoutine";
import SkinConcernGrid from "@/components/SkinConcernGrid";
import BrandStory from "@/components/BrandStory";
import ReviewsSection from "@/components/ReviewsSection";
import CommunityGrid from "@/components/CommunityGrid";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export default async function HomePage() {
  const products = await getShopifyProducts();

  // Select hero product: Anua Peach or Anua Niacinamide or first available
  const heroProduct =
    products.find((p) => p.handle.includes("anua-peach") || p.handle.includes("anua-niacinamide") || p.handle.includes("axis-y")) ||
    products[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Luxury Sticky Navbar */}
      <Navbar products={products} />

      {/* Main Homepage Flow */}
      <main className="flex-grow">
        {/* Editorial Hero Section */}
        <HeroSection heroProduct={heroProduct} />

        {/* Marquee Ribbon Banner */}
        <MarqueeTicker />

        {/* Brand Trust Bar */}
        <TrustBadges />

        {/* Flash Glow Sale Ticker */}
        <FlashSaleBanner />

        {/* Product Spotlight: 1 of 4 with Automated Sliding & Spotlight Beam */}
        <ProductSpotlight products={products} />

        {/* Curated Product Category Discovery Gateways */}
        <CategoryShowcase />

        {/* Interactive 4-Step Glass Skin Routine */}
        <GlassSkinRoutine products={products} />

        {/* Shop by Skin Concern */}
        <SkinConcernGrid />

        {/* Brand Story & Philosophy */}
        <BrandStory />

        {/* Customer Reviews & Testimonials */}
        <ReviewsSection />

        {/* Instagram Glow Community */}
        <CommunityGrid />

        {/* VIP Circle Newsletter */}
        <Newsletter />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating WhatsApp Concierge & Back to Top */}
      <WhatsAppFloat />
    </div>
  );
}
