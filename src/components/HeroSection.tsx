"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Star, CheckCircle2, Heart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

interface HeroSectionProps {
  heroProduct?: ShopifyProduct;
}

export default function HeroSection({ heroProduct }: HeroSectionProps) {
  const { addToCart } = useCart();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#FDF6F4]">
      {/* Abstract Beauty Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="/images/hero-abstract-bg.jpg"
          alt="Azyleen Korean Skincare Abstract Beauty Background"
          fill
          priority
          quality={90}
          className="object-cover object-center opacity-40 mix-blend-multiply scale-105"
        />
        {/* Soft elegant gradient overlays for text readability and seamless edge blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDF6F4]/92 via-[#FDF6F4]/75 to-[#FDF6F4]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDF6F4]/60 via-transparent to-[#FDF6F4]" />
      </div>

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-12 left-10 w-96 h-96 bg-[#D4A0B0]/20 rounded-full blur-3xl glow-aura pointer-events-none z-0" />
      <div className="absolute bottom-12 right-12 w-[500px] h-[500px] bg-[#C59B6D]/15 rounded-full blur-3xl glow-aura pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Editorial Headline, Story & High-Contrast CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4A0B0]/40 shadow-xs backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5C3544]">
                Authentic Korean Skincare Destination
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] leading-[1.08] font-normal tracking-tight text-[#1A0E14]">
              Your skin, <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#7A4F5C] font-serif">softly</span>{" "}
              transformed.
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-base sm:text-lg text-[#5C3A46] font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Curated in Lahore, sourced directly from Seoul. Potent K-Beauty actives formulated to soothe, fade stubborn dark spots, and hydrate deep within South Asian climates.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-[#42242E] pt-1">
              <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#D4A0B0]/25 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#1A7A4A] flex-shrink-0" />
                <span>Cash on Delivery (COD)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#D4A0B0]/25 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#1A7A4A] flex-shrink-0" />
                <span>Free Shipping Rs 3,999+</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#D4A0B0]/25 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#7A4F5C] flex-shrink-0" />
                <span>100% Original Batch Coded</span>
              </div>
            </div>

            {/* High-Contrast Luxury Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#products"
                className="w-full sm:w-auto bg-[#5C3544] hover:bg-[#43232F] text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-xl shadow-[#5C3544]/25 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer border border-[#5C3544]"
              >
                <span>Shop Bestsellers</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#routine"
                className="w-full sm:w-auto bg-white hover:bg-[#5C3544] text-[#5C3544] hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full border-2 border-[#5C3544] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#BA788C]" />
                <span>Discover 4-Step Routine</span>
              </a>
            </div>

            {/* Social Proof */}
            <div className="pt-3 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#D4A0B0] flex items-center justify-center text-[10px] font-bold text-white shadow-xs">ZA</div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#7A4F5C] flex items-center justify-center text-[10px] font-bold text-white shadow-xs">SH</div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-[#C59B6D] flex items-center justify-center text-[10px] font-bold text-white shadow-xs">MK</div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C59B6D] text-[#C59B6D]" />
                  ))}
                  <span className="text-xs font-bold text-[#1A0E14] ml-1">4.9 / 5</span>
                </div>
                <p className="text-[11px] text-[#5C3A46] font-medium">
                  Loved by <strong>2,000+</strong> skincare enthusiasts across Pakistan
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Dual Beauty Visual (Model & Product) */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg grid grid-cols-12 gap-4 items-center">
              {/* Card 1: Korean Glass-Skin Beauty Editorial Model */}
              <div className="col-span-7 relative aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-2 border-white bg-white group">
                <Image
                  src="/images/glass-skin-model.jpg"
                  alt="Radiant Korean Glass Skin by Azyleen"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 60vw, 350px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating pill on model */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 border border-[#D4A0B0]/30">
                  <span className="w-2 h-2 rounded-full bg-[#1A7A4A] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C3544]">
                    Glass Skin Glow
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-[11px] font-medium text-white/80 uppercase tracking-wider">
                    Targeted For South Asian Skin
                  </p>
                  <h3 className="font-serif text-lg font-normal leading-tight text-white mt-0.5">
                    Real, dewy luminous glow.
                  </h3>
                </div>
              </div>

              {/* Card 2: Authentic Product Bottle Showcase */}
              <div className="col-span-5 relative flex flex-col gap-3">
                {heroProduct ? (
                  <Link
                    href={`/products/${heroProduct.handle}`}
                    className="relative aspect-square rounded-[28px] overflow-hidden bg-white p-4 shadow-xl border border-[#D4A0B0]/30 flex items-center justify-center group cursor-pointer block"
                    title={`View ${heroProduct.title}`}
                  >
                    {heroProduct.images?.[0]?.url || heroProduct.handle?.includes("anua-peach") ? (
                      <Image
                        src={
                          heroProduct.handle?.includes("anua-peach")
                            ? "/images/transparent/anua-peach-user.png"
                            : heroProduct.images[0].url
                        }
                        alt={heroProduct.title}
                        fill
                        className="object-contain p-2 group-hover:scale-108 transition-transform duration-500 drop-shadow-sm"
                        sizes="(max-width: 768px) 40vw, 250px"
                      />
                    ) : (
                      <div className="text-center font-serif text-xl text-[#5C3544]">Azyleen</div>
                    )}

                    <div className="absolute top-2.5 right-2.5 bg-[#5C3544] text-[#FDF6F4] px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-xs">
                      ★ #1 Bestseller
                    </div>
                  </Link>
                ) : (
                  <div className="relative aspect-square rounded-[28px] overflow-hidden bg-white p-4 shadow-xl border border-[#D4A0B0]/30 flex items-center justify-center">
                    <div className="text-center font-serif text-xl text-[#5C3544]">Azyleen</div>
                  </div>
                )}

                {/* Floating Product Action Card */}
                {heroProduct && (
                  <div className="bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-[#D4A0B0]/40 shadow-xl space-y-2">
                    <div>
                      <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#BA788C] block">
                        {heroProduct.vendor}
                      </span>
                      <Link
                        href={`/products/${heroProduct.handle}`}
                        className="text-xs font-semibold text-[#1A0E14] hover:text-[#BA788C] transition-colors line-clamp-1 block cursor-pointer"
                        title="Read product detail"
                      >
                        {heroProduct.title}
                      </Link>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-sm font-bold text-[#5C3544]">
                          Rs. {heroProduct.price.toLocaleString()}
                        </span>
                        {heroProduct.compareAtPrice && (
                          <span className="text-[11px] line-through text-[#7E636E]">
                            Rs. {heroProduct.compareAtPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(heroProduct)}
                      className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white font-bold text-xs uppercase tracking-wider py-2 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Quick Add</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
