"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, SlidersHorizontal, ChevronRight, ShieldCheck, CheckCircle2, RotateCcw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";
import { ShopifyProduct } from "@/lib/shopify";

interface CategoryPageLayoutProps {
  title: string;
  subtitle: string;
  categorySlug: string;
  badgeText: string;
  products: ShopifyProduct[];
  routineTip?: {
    title: string;
    description: string;
    steps: string[];
  };
}

export default function CategoryPageLayout({
  title,
  subtitle,
  categorySlug,
  badgeText,
  products,
  routineTip,
}: CategoryPageLayoutProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedConcern, setSelectedConcern] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);

  // Extract unique brands and concerns from current products
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.vendor) set.add(p.vendor);
    });
    return Array.from(set);
  }, [products]);

  const concerns = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.concern) {
        // Extract key words from concern
        const parts = p.concern.split(/&|,/).map((s) => s.trim());
        parts.forEach((part) => {
          if (part.length > 3) set.add(part);
        });
      }
    });
    return Array.from(set).slice(0, 6);
  }, [products]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedBrand !== "all" && p.vendor !== selectedBrand) return false;
      if (selectedConcern !== "all" && !p.concern?.toLowerCase().includes(selectedConcern.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [products, selectedBrand, selectedConcern]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      if (sortBy === "reviews") return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSelectedBrand("all");
    setSelectedConcern("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-[#FDF6F4] text-[#1A0E14]">
      {/* Category Hero Banner */}
      <div className="relative pt-8 pb-12 sm:pb-16 bg-gradient-to-b from-[#F9EEF1]/70 via-[#FDF6F4] to-[#FDF6F4] border-b border-[#D4A0B0]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs text-[#7E636E] mb-6 select-none">
            <Link href="/" className="hover:text-[#5C3544] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#D4A0B0]" />
            <span className="text-[#5C3544] font-semibold">{title}</span>
          </nav>

          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4A0B0]/40 shadow-xs mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5C3544]">
                {badgeText}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A0E14] tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-[#5C3A46] mt-3 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 text-xs text-[#5C3544]">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#D4A0B0]/30 shadow-2xs font-medium">
                <span className="w-2 h-2 rounded-full bg-[#1A7A4A]" />
                <span>{sortedProducts.length} Formulations In Stock (Lahore)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-[#D4A0B0]/30 shadow-2xs font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#BA788C]" />
                <span>100% Direct Seoul Imports</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Filter Toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filter Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#D4A0B0]/25 shadow-xs mb-8">
          {/* Left: Brand Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-[#5C3544] uppercase tracking-wider flex-shrink-0 flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Brand:
            </span>
            <button
              onClick={() => setSelectedBrand("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedBrand === "all"
                  ? "bg-[#5C3544] text-white shadow-xs"
                  : "bg-[#FDF6F4] text-[#5C3A46] hover:bg-[#F9EEF1] border border-[#D4A0B0]/30"
              }`}
            >
              All Brands
            </button>
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedBrand === b
                    ? "bg-[#5C3544] text-white shadow-xs"
                    : "bg-[#FDF6F4] text-[#5C3A46] hover:bg-[#F9EEF1] border border-[#D4A0B0]/30"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Right: Concern Filter & Sort Select */}
          <div className="flex items-center gap-3 justify-end flex-wrap">
            {concerns.length > 0 && (
              <div className="relative">
                <select
                  value={selectedConcern}
                  onChange={(e) => setSelectedConcern(e.target.value)}
                  className="appearance-none bg-[#FDF6F4] border border-[#D4A0B0]/40 text-[#5C3A46] text-xs font-semibold rounded-full px-4 py-2 pr-8 focus:outline-none focus:border-[#BA788C] cursor-pointer shadow-2xs"
                  aria-label="Filter by concern"
                >
                  <option value="all">All Skin Concerns</option>
                  {concerns.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7E636E] text-[10px]">
                  ▼
                </div>
              </div>
            )}

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#FDF6F4] border border-[#D4A0B0]/40 text-[#5C3A46] text-xs font-semibold rounded-full px-4 py-2 pr-8 focus:outline-none focus:border-[#BA788C] cursor-pointer shadow-2xs"
                aria-label="Sort products"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#7E636E] text-[10px]">
                ▼
              </div>
            </div>

            {(selectedBrand !== "all" || selectedConcern !== "all" || sortBy !== "featured") && (
              <button
                onClick={resetFilters}
                className="p-2 rounded-full text-[#7E636E] hover:text-[#5C3544] hover:bg-[#FDF6F4] transition-colors cursor-pointer"
                title="Reset all filters"
                aria-label="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 bg-white rounded-3xl border border-[#D4A0B0]/30 my-8">
            <Sparkles className="w-8 h-8 text-[#BA788C] mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#1A0E14]">No products match these filters</h3>
            <p className="text-xs text-[#7E636E] mt-2 max-w-sm mx-auto">
              Try resetting the selected brand or concern to view all authentic Korean formulations.
            </p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2 rounded-full bg-[#5C3544] text-white text-xs font-semibold hover:bg-[#43232F] transition-all shadow-md cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Optional Category Routine Tip Callout */}
        {routineTip && (
          <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F9EEF1] via-white to-[#FDF6F4] border border-[#D4A0B0]/35 shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4A0B0]/30 text-[10px] font-bold uppercase tracking-widest text-[#5C3544] mb-3">
                <CheckCircle2 className="w-3 h-3 text-[#1A7A4A]" />
                <span>Seoul Dermatologist Guidance</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A0E14]">
                {routineTip.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C3A46] mt-2 leading-relaxed">
                {routineTip.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
                {routineTip.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/90 border border-[#D4A0B0]/25 shadow-2xs"
                  >
                    <span className="text-[10px] font-mono font-bold text-[#BA788C] block mb-1">
                      STEP 0{idx + 1}
                    </span>
                    <p className="text-xs text-[#1A0E14] font-medium leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
