"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Heart,
  Pause,
  Play,
} from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductSpotlightProps {
  products: ShopifyProduct[];
}

export default function ProductSpotlight({ products }: ProductSpotlightProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Top 4 curated bestsellers with dedicated transparent spotlight photography
  const SPOTLIGHT_HANDLES = [
    "anua-peach-serum",
    "axis-y-dark-spot-correcting-serum",
    "ordinary-glycolic-exfoliating-toner",
    "celimex-noni-eye-cream",
    "celimax-noni-eye-cream",
    "anua-peach-70-niacin",
  ];
  const matchedCurated = SPOTLIGHT_HANDLES
    .map((h) => products.find((p) => p.handle === h))
    .filter(Boolean) as ShopifyProduct[];
  const curatedProducts = matchedCurated.length >= 2 ? matchedCurated.slice(0, 4) : products.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per transition

  useEffect(() => {
    if (curatedProducts.length <= 2) return;
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % curatedProducts.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isPaused, curatedProducts.length]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % curatedProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + curatedProducts.length) % curatedProducts.length);
  };

  if (!curatedProducts || curatedProducts.length === 0) return null;

  // Active pair of products
  const productA = curatedProducts[currentIndex];
  const productB = curatedProducts[(currentIndex + 1) % curatedProducts.length];
  const activePair = [
    { product: productA, index: currentIndex },
    { product: productB, index: (currentIndex + 1) % curatedProducts.length },
  ];

  const handleAdd = (product: ShopifyProduct) => {
    setAddingId(product.id);
    addToCart(product);
    setTimeout(() => setAddingId(null), 900);
  };

  // Map transparent PNG cut-outs for clean background-free spotlight display
  const TRANSPARENT_IMAGE_MAP: Record<string, string> = {
    "anua-peach-serum": "/images/transparent/anua-peach-user.png",
    "anua-peach-70-niacin": "/images/transparent/anua-peach-user.png",
    "axis-y-dark-spot-correcting-serum": "/images/transparent/axis-y-clean.png",
    "ordinary-glycolic-exfoliating-toner": "/images/transparent/ordinary-glycolic-clean.png",
    "celimex-noni-eye-cream": "/images/transparent/celimax-noni-user.png",
    "celimax-noni-eye-cream": "/images/transparent/celimax-noni-user.png",
  };

  return (
    <section
      id="featured-curation"
      className="relative py-12 sm:py-16 scroll-mt-28 overflow-hidden bg-[#FDF6F4] border-y border-[#D4A0B0]/25 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4A0B0]/40 shadow-xs backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C3544]">
                Curated Bestsellers · Seoul Direct
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#1A0E14] tracking-tight">
              Signature Formulations <span className="italic font-normal text-[#7A4F5C]">In Focus</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#7E636E] mt-1 max-w-xl">
              Clinically formulated Korean actives to treat hyperpigmentation, quench dehydration, and strengthen your skin barrier.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#D4A0B0]/30 shadow-xs text-xs font-medium text-[#5C3544]">
              <span className="w-2 h-2 rounded-full bg-[#1A7A4A] animate-pulse" />
              <span className="text-[11px] font-mono font-bold text-[#5C3544]">
                0{currentIndex + 1} & 0{((currentIndex + 1) % curatedProducts.length) + 1}
              </span>
              <span className="text-[#D4A0B0]">/</span>
              <span className="text-[11px] font-mono text-[#7E636E]">
                0{curatedProducts.length}
              </span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="ml-1 text-[#7E636E] hover:text-[#5C3544] transition-colors p-0.5 cursor-pointer"
                title={isPaused ? "Resume auto-sliding" : "Pause auto-sliding"}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#5C3544] hover:text-white text-[#5C3544] border border-[#D4A0B0]/40 shadow-xs flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Previous formulations"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#5C3544] hover:text-white text-[#5C3544] border border-[#D4A0B0]/40 shadow-xs flex items-center justify-center transition-all duration-300 cursor-pointer"
                aria-label="Next formulations"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Master Showcase Box Housing the Two Spotlight Stages - Compact & Balanced */}
        <div className="max-w-[880px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {activePair.map(({ product, index }) => {
            const displayImage = TRANSPARENT_IMAGE_MAP[product.handle] || product.images?.[0]?.url;
            const isFavorited = isInWishlist(product.id);
            const isThisAdding = addingId === product.id;

            const discountPercent =
              product.compareAtPrice && product.compareAtPrice > product.price
                ? Math.round(
                    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
                  )
                : null;

            return (
              <div
                key={product.id}
                className="relative bg-white rounded-[26px] sm:rounded-[30px] border border-[#D4A0B0]/30 shadow-md hover:shadow-xl overflow-hidden p-5 sm:p-5.5 flex flex-col justify-between group transition-all duration-500"
              >
                {/* Architectural Spotlight Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  {/* Recessed Ceiling Downlight Fixture */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-16 h-2 bg-[#42242E] rounded-b-md border-b border-[#FBBF24]/70 shadow-2xs" />
                    <div className="w-7 h-1.5 bg-[#FEF08A] rounded-full blur-[1px] shadow-[0_0_12px_4px_rgba(251,191,36,0.90)]" />
                  </div>

                  {/* Volumetric Studio Spotlight Light Beam Streaming Down */}
                  <div
                    className="absolute top-1 left-1/2 -translate-x-1/2 w-[220px] sm:w-[260px] h-[210px] opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(254, 240, 138, 0.40) 0%, rgba(251, 191, 36, 0.18) 35%, rgba(245, 158, 11, 0.04) 60%, transparent 80%)",
                      filter: "blur(18px)",
                    }}
                  />

                  {/* Secondary soft focused conical light ray */}
                  <div
                    className="absolute top-1 left-1/2 -translate-x-1/2 w-[180px] sm:w-[210px] h-[190px] opacity-40 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(254, 240, 138, 0.50) 0%, rgba(251, 191, 36, 0.12) 45%, transparent 90%)",
                      clipPath: "polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)",
                      filter: "blur(18px)",
                    }}
                  />

                  {/* Ambient illumination */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-[radial-gradient(circle_at_center,_rgba(254,240,138,0.25)_0%,_rgba(251,191,36,0.08)_40%,_transparent_70%)] blur-xl opacity-60 group-hover:scale-105 transition-transform duration-700" />
                </div>

                {/* Top Row: Brand & Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2.5 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-[#5C3544] bg-[#FDF6F4] px-2.5 py-0.5 rounded-full border border-[#D4A0B0]/30 shadow-2xs">
                      {product.vendor}
                    </span>
                    <span className="text-[9.5px] text-[#7E636E] uppercase tracking-wider font-semibold">
                      Authentic Import
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {discountPercent && (
                      <span className="bg-[#D93025] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                        -{discountPercent}% OFF
                      </span>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                        isFavorited
                          ? "bg-[#D93025] text-white border-[#D93025]"
                          : "bg-white text-[#5C3544] border-[#D4A0B0]/40 hover:bg-[#FDF6F4] hover:text-[#D93025]"
                      }`}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Center Stage: Proportioned Product Bottle with Studio Drop Shadow */}
                <div className="relative z-10 my-2 sm:my-3 flex items-center justify-center min-h-[180px] sm:min-h-[200px]">
                  <Link
                    href={`/products/${product.handle}`}
                    className="relative w-full max-w-[160px] sm:max-w-[185px] h-[160px] sm:h-[185px] flex items-center justify-center group/bottle cursor-pointer block"
                    title={`View ${product.title} details`}
                  >
                    {displayImage ? (
                      <Image
                        src={displayImage}
                        alt={product.title}
                        fill
                        className="object-contain p-0.5 group-hover/bottle:scale-106 transition-transform duration-500 ease-out"
                        style={{
                          filter: "drop-shadow(0 10px 16px rgba(0, 0, 0, 0.20)) drop-shadow(0 3px 6px rgba(0, 0, 0, 0.12))",
                        }}
                        sizes="(max-width: 768px) 50vw, 220px"
                        priority
                      />
                    ) : (
                      <div className="text-center font-serif text-xl text-[#5C3544]">Azyleen</div>
                    )}
                  </Link>
                </div>

                {/* Bottom Details & Actions */}
                <div className="relative z-10 space-y-2 pt-2.5 border-t border-[#D4A0B0]/20">
                  {/* Rating & Stock Status */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C59B6D] text-[#C59B6D]" />
                        ))}
                      </div>
                      <span className="font-bold text-[11px] text-[#1A0E14]">{product.rating || 4.9}</span>
                      <span className="text-[10.5px] text-[#7E636E]">({product.reviewsCount || 42})</span>
                    </div>

                    <div className={`flex items-center gap-1 text-[10.5px] font-semibold ${product.availableForSale ? "text-[#1A7A4A]" : "text-[#7E636E]"}`}>
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{product.availableForSale ? "In Stock (Lahore)" : "Sold Out"}</span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link
                    href={`/products/${product.handle}`}
                    className="font-serif text-base sm:text-lg font-normal text-[#1A0E14] hover:text-[#7A4F5C] transition-colors block line-clamp-1 leading-snug"
                    title="Read complete details"
                  >
                    {product.title}
                  </Link>

                  {/* Target Concern */}
                  <p className="text-[11px] text-[#5C3A46] line-clamp-1 font-normal">
                    {product.concern || product.description}
                  </p>

                  {/* Pricing Row */}
                  <div className="flex items-baseline justify-between pt-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#5C3544]">
                        Rs. {product.price.toLocaleString()}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-[11px] line-through text-[#7E636E]">
                          Rs. {product.compareAtPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-[9.5px] font-semibold text-[#1A7A4A] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      Free Delivery Eligible
                    </span>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleAdd(product)}
                      disabled={isThisAdding || !product.availableForSale}
                      className={`flex-1 font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl shadow-xs transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        product.availableForSale
                          ? "bg-[#5C3544] hover:bg-[#43232F] text-white cursor-pointer transform hover:-translate-y-0.5"
                          : "bg-[#EAD9DE] text-[#7E636E] cursor-not-allowed"
                      }`}
                    >
                      <ShoppingBag className={`w-3.5 h-3.5 ${isThisAdding ? "animate-bounce" : ""}`} />
                      <span>
                        {!product.availableForSale ? "Sold Out" : isThisAdding ? "Added!" : "Quick Add"}
                      </span>
                    </button>

                    <Link
                      href={`/products/${product.handle}`}
                      className="flex-1 bg-white hover:bg-[#FDF6F4] text-[#5C3544] font-bold text-xs uppercase tracking-wider py-2.5 rounded-xl border border-[#D4A0B0] shadow-2xs hover:shadow-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Read full formulation details"
                    >
                      <span>Read Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#BA788C]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 4 Interactive Selector Tabs below */}
        <div className="max-w-[880px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-6">
          {curatedProducts.map((p, idx) => {
            const isShownInPair =
              idx === currentIndex || idx === (currentIndex + 1) % curatedProducts.length;
            const thumbImg = p.images?.[0]?.url;

            return (
              <button
                key={p.id}
                onClick={() => goToSlide(idx)}
                className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                  isShownInPair
                    ? "bg-white border-[#5C3544] shadow-md ring-2 ring-[#5C3544]/15 transform -translate-y-0.5"
                    : "bg-white/60 hover:bg-white border-[#D4A0B0]/25 shadow-2xs"
                }`}
              >
                <div className="relative w-11 h-11 rounded-xl bg-[#FDF6F4] overflow-hidden flex-shrink-0 border border-[#D4A0B0]/20">
                  {thumbImg ? (
                    <Image
                      src={thumbImg}
                      alt={p.title}
                      fill
                      className="object-contain p-1 mix-blend-multiply"
                      sizes="44px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-[#BA788C]">
                      AZ
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-grow">
                  <span className="text-[9px] uppercase font-bold text-[#BA788C] tracking-wider block">
                    {p.vendor}
                  </span>
                  <p className="text-xs font-semibold text-[#1A0E14] truncate leading-tight">
                    {p.title}
                  </p>
                  <p className="text-[11px] font-bold text-[#5C3544] mt-0.5">
                    Rs. {p.price.toLocaleString()}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
