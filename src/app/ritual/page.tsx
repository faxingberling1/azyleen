import React from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlassSkinRoutine from "@/components/GlassSkinRoutine";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata = {
  title: "The 4-Step Korean Glass Skin Ritual — Morning & Night Routine | Azyleen",
  description:
    "Master the viral 4-step Korean Glass Skin ritual tailored for Pakistani skin tones and climates. Cleanse, Prep, Treat with Niacinamide, and Protect with SPF 50+.",
};

export default async function RitualPage() {
  const products = await getShopifyProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      <AnnouncementBar />
      <Navbar products={products} />
      <main className="flex-grow">
        {/* Editorial Ritual Header */}
        <div className="pt-10 pb-8 text-center max-w-3xl mx-auto px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#BA788C] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A0B0]/30 shadow-2xs inline-block mb-3">
            Holistic Korean Philosophy · Seoul Science
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A0E14] tracking-tight">
            The 4-Step <span className="italic text-[#7A4F5C]">Glass Skin</span> Ritual
          </h1>
          <p className="text-xs sm:text-sm text-[#7E636E] mt-3 max-w-xl mx-auto leading-relaxed">
            In South Korea, glowing glass skin isn&rsquo;t achieved through harsh chemical bleaches, but through consistent, restorative micro-layering. Here is the curated 4-step daily ritual engineered for Pakistani humidity.
          </p>
        </div>

        {/* Interactive Routine Component */}
        <GlassSkinRoutine products={products} />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
