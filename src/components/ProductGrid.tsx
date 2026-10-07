"use client";

import React, { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { ShopifyProduct } from "@/lib/shopify";
import { Filter, SlidersHorizontal, Sparkles } from "lucide-react";

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedConcern, setSelectedConcern] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<ShopifyProduct | null>(null);

  const categories = [
    { id: "all", label: "All Formulations" },
    { id: "bestsellers", label: "Top Bestsellers" },
    { id: "serums", label: "Targeted Serums" },
    { id: "moisturisers", label: "Barrier Creams" },
    { id: "sunscreen", label: "SPF & Sun Protection" },
    { id: "eye-care", label: "Eye Care & Retinal" },
  ];

  const concerns = [
    { id: "all", label: "All Skin Concerns" },
    { id: "Dark Spots", label: "Dark Spots & Melasma" },
    { id: "Dull Skin", label: "Dullness & Glow" },
    { id: "Barrier Repair", label: "Damaged Barrier" },
    { id: "Sun Protection", label: "Sun Protection (Zero Cast)" },
    { id: "Anti-Aging", label: "Pores & Anti-Aging" },
  ];

  const filtered = products.filter((p) => {
    // Tab filter
    if (activeTab === "bestsellers") {
      if ((p.rating || 0) < 4.8 && (p.reviewsCount || 0) < 40) return false;
    } else if (activeTab !== "all" && p.category !== activeTab) {
      return false;
    }

    // Concern filter
    if (selectedConcern !== "all") {
      if (!p.concern?.toLowerCase().includes(selectedConcern.toLowerCase())) {
        return false;
      }
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#FDF6F4] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/30 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A4F5C] mb-3">
            <Sparkles className="w-3 h-3 text-[#BA788C]" />
            <span>Direct Imports · 100% Original</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A0E14] font-normal tracking-tight">
            Curated Korean Skincare
          </h2>
          <p className="text-sm sm:text-base text-[#5C3A46] mt-3">
            Clinically formulated actives to treat hyperpigmentation, quench dehydration, and strengthen your skin barrier.
          </p>
        </div>

        {/* Tab Filter Pills & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-[#D4A0B0]/20">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#5C3544] text-[#FDF6F4] shadow-md"
                    : "bg-white/80 text-[#5C3A46] hover:bg-[#F9EEF1] border border-[#D4A0B0]/25"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter Dropdowns (Concern & Sort) */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Concern dropdown */}
            <div className="relative">
              <select
                value={selectedConcern}
                onChange={(e) => setSelectedConcern(e.target.value)}
                className="appearance-none bg-white text-xs font-medium text-[#5C3544] px-4 py-2 pr-8 rounded-full border border-[#D4A0B0]/30 focus:outline-none focus:border-[#7A4F5C] cursor-pointer"
              >
                {concerns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 text-[#7A4F5C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white text-xs font-medium text-[#5C3544] px-4 py-2 pr-8 rounded-full border border-[#D4A0B0]/30 focus:outline-none focus:border-[#7A4F5C] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A4F5C] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {sorted.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-3xl border border-[#D4A0B0]/20 p-8">
            <p className="font-serif text-2xl text-[#5C3544]">No formulations match this filter.</p>
            <p className="text-xs text-[#7E636E] mt-2">
              Try selecting &ldquo;All Skin Concerns&rdquo; or reset the category.
            </p>
            <button
              onClick={() => {
                setActiveTab("all");
                setSelectedConcern("all");
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sorted.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
