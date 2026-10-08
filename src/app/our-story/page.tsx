import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ShieldCheck, Heart, ArrowRight, CheckCircle2, Globe, Truck, Award } from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { getShopifyProducts } from "@/lib/shopify";

export const metadata = {
  title: "Our Story — Born in Seoul, Curated for Pakistan | Azyleen",
  description:
    "Learn how Azyleen was founded to bring 100% genuine, batch-coded Korean skincare directly from Seoul to Pakistan, replacing harmful bleaching creams with restorative barrier science.",
};

export default async function OurStoryPage() {
  const products = await getShopifyProducts();

  const milestones = [
    { number: "100%", label: "Direct Seoul Imports", sub: "Verified sealed batch codes with zero middlemen" },
    { number: "2,000+", label: "Glowing Vanities", sub: "Delivered to Lahore, Karachi, Islamabad & nationwide" },
    { number: "0%", label: "Bleaching Chemicals", sub: "No mercury, steroids, or harmful lightening fillers" },
    { number: "24-48h", label: "Nationwide Dispatch", sub: "Express transit directly from our Lahore fulfillment hub" },
  ];

  const pillars = [
    {
      title: "100% Authentic Direct Sourcing",
      desc: "Every single bottle in our warehouse is sourced directly through certified distributor channels in Seoul, South Korea. Each item carries its authentic factory batch code, allowing instant verification.",
      icon: ShieldCheck,
      badge: "Zero Dupes Guarantee",
    },
    {
      title: "Engineered for South Asian Climates",
      desc: "Pakistan’s sweltering summer heat and winter smog demand specific skincare formulations. We exclusively curate weightless ferments, Centella, and air-fit sunscreens that never melt or trigger breakouts.",
      icon: Globe,
      badge: "Climate Compatible",
    },
    {
      title: "Barrier Healing Over Harmful Bleaches",
      desc: "For decades, South Asian beauty has suffered from the toxic epidemic of steroid-loaded bleaching creams. Azyleen champions gentle barrier restoration, niacinamide, and deep cellular hydration for authentic glass skin.",
      icon: Award,
      badge: "Dermatologist Approved",
    },
    {
      title: "Temperature-Controlled Lahore Hub",
      desc: "Active skincare formulations like Vitamin C, Retinol, and Peptides degrade under extreme heat. Our Lahore warehouse maintains climate-controlled storage so every drop arrives at peak clinical potency.",
      icon: Truck,
      badge: "Potency Protected",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={products} />

      <main className="flex-grow">
        {/* Editorial Story Hero */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-[#D4A0B0]/20">
          {/* Subtle abstract background */}
          <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply">
            <Image
              src="/images/hero-abstract-bg.jpg"
              alt="Azyleen Silk Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4A0B0]/40 shadow-xs mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5C3544]">
                  The Azyleen Philosophy · Seoul Direct
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1A0E14] tracking-tight leading-[1.1]">
                Born in Seoul. <br />
                <span className="italic font-serif text-[#7A4F5C]">Curated for Pakistani Skin.</span>
              </h1>

              <p className="text-base sm:text-xl text-[#5C3A46] mt-6 leading-relaxed max-w-2xl mx-auto font-light">
                We started Azyleen with a single urgent mission: to end the epidemic of counterfeit skincare and harmful chemical bleaches in Pakistan by delivering pure, authentic Korean clinical formulations directly to your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem We Are Solving (Editorial Split) */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#D4A0B0]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Image Collage */}
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] rounded-[36px] overflow-hidden shadow-2xl border-4 border-[#FDF6F4] bg-[#F9EEF1]">
                  <Image
                    src="/images/promo-beauty-banner.jpg"
                    alt="Radiant Korean Glass Skin"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4A0B0]/30 shadow-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#BA788C] block">
                        Our Ethical Promise
                      </span>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-[#1A0E14]">
                        Zero Mercury. Zero Steroids. Pure Actives.
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-[#1A7A4A] bg-[#ECFDF5] px-3 py-1 rounded-full border border-[#A7F3D0]">
                      100% Safe
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: The Founding Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C] block">
                  The Genesis
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A0E14] leading-tight">
                  Why Pakistani skin was suffering, and how we changed it.
                </h2>
                <p className="text-sm sm:text-base text-[#5C3A46] leading-relaxed">
                  For years, skincare shopping in Pakistan was a gamble. Local markets were flooded with hazardous fairness creams laced with mercury and potent steroids that temporarily stripped melanin while permanently thinning the skin barrier.
                </p>
                <p className="text-sm sm:text-base text-[#7E636E] leading-relaxed">
                  Meanwhile, women who sought genuine Korean skincare faced predatory 300% markups, months of uncertain shipping, or worst of all — convincing Chinese replicas that caused irreversible flare-ups and breakouts.
                </p>
                <p className="text-sm sm:text-base text-[#5C3A46] font-medium leading-relaxed">
                  Azyleen changed that paradigm forever. We established direct procurement channels in Seoul, bypassed every sketchy middleman, and built a climate-controlled fulfillment hub in Lahore to bring you the freshest, 100% genuine K-beauty formulations at honest prices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Milestones Grid */}
        <section className="py-16 sm:py-20 bg-[#FDF6F4] border-b border-[#D4A0B0]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {milestones.map((m, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4A0B0]/30 shadow-xs text-center group hover:shadow-md transition-shadow"
                >
                  <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5C3544] mb-2 group-hover:scale-105 transition-transform">
                    {m.number}
                  </div>
                  <h3 className="text-sm font-bold text-[#1A0E14] uppercase tracking-wide">
                    {m.label}
                  </h3>
                  <p className="text-xs text-[#7E636E] mt-1.5 leading-relaxed">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The 4 Pillars of Azyleen */}
        <section className="py-20 lg:py-28 bg-white border-b border-[#D4A0B0]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C] block mb-2">
                Our Standards
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#1A0E14]">
                The Four Pillars of Azyleen
              </h2>
              <p className="text-xs sm:text-sm text-[#7E636E] mt-3">
                Every formulation we introduce must pass our rigorous 4-stage quality check before reaching your vanity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-8 sm:p-10 rounded-[32px] bg-[#FDF6F4] border border-[#D4A0B0]/30 shadow-xs hover:border-[#BA788C]/60 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#D4A0B0]/30 flex items-center justify-center text-[#BA788C] shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C3544] bg-white px-3 py-1 rounded-full border border-[#D4A0B0]/30">
                        {p.badge}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-normal text-[#1A0E14] mb-3">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5C3A46] leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder Letter / Team Note */}
        <section className="py-20 lg:py-28 bg-[#FDF6F4]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="p-8 sm:p-12 lg:p-16 rounded-[40px] bg-white border border-[#D4A0B0]/35 shadow-xl relative">
              <div className="w-12 h-12 rounded-full bg-[#F9EEF1] text-[#BA788C] flex items-center justify-center mx-auto mb-6 shadow-xs">
                <Heart className="w-6 h-6 fill-current text-[#BA788C]" />
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#1A0E14] leading-relaxed italic">
                &ldquo;Skincare is not about erasing who you are or seeking unnatural lightness. It is about honoring your skin, feeding it pure botanical actives, and restoring the natural glass glow that was already yours.&rdquo;
              </blockquote>

              <div className="mt-8 pt-8 border-t border-[#D4A0B0]/20 flex flex-col items-center">
                <span className="font-serif text-lg font-bold text-[#5C3544]">
                  The Azyleen Curation Team
                </span>
                <span className="text-xs text-[#7E636E] mt-0.5">
                  Gulberg III, Lahore · Seoul Direct Logistics
                </span>

                <div className="flex items-center gap-3 mt-8">
                  <Link
                    href="/bestsellers"
                    className="px-6 py-3 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                  >
                    <span>Explore Bestsellers</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/support"
                    className="px-6 py-3 rounded-full bg-[#FDF6F4] hover:bg-[#F9EEF1] text-[#5C3544] border border-[#D4A0B0]/40 text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer"
                  >
                    <span>Contact Concierge</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
