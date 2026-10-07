"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ShoppingBag, ArrowRight } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ShopifyProduct[];
}

export default function SearchModal({ isOpen, onClose, products }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  const popularSearches = [
    "Anua Niacinamide",
    "Centella Sunscreen",
    "COSRX Snail",
    "Axis-Y Dark Spot",
    "Dr Althea Relief Cream",
    "Glass Skin",
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.vendor.toLowerCase().includes(q) ||
          p.concern?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A0E14]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FDF6F4] rounded-3xl shadow-2xl border border-[#D4A0B0]/30 overflow-hidden z-10 animate-in fade-in-50 zoom-in-95 duration-200">
        {/* Search Header */}
        <div className="p-5 border-b border-[#D4A0B0]/20 flex items-center gap-3 bg-white/70">
          <Search className="w-5 h-5 text-[#7A4F5C]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search serums, sunscreens, or skin concerns..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent text-base text-[#1A0E14] placeholder-[#7E636E]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full text-[#7E636E] hover:text-[#1A0E14]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-[#7A4F5C] hover:text-[#5C3544] px-2"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {!query.trim() ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7E636E] mb-3">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full text-xs bg-[#F9EEF1] text-[#5C3544] border border-[#D4A0B0]/30 hover:border-[#7A4F5C] hover:bg-[#D4A0B0]/20 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-serif text-lg text-[#5C3544]">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-[#7E636E] mt-1">
                Try searching for brands like Anua, Skin1004, Axis-Y, or concerns like &ldquo;Dark Spots&rdquo;
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#7E636E]">
                Matching Formulations ({filteredProducts.length})
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filteredProducts.map((p) => {
                  const img = p.images?.[0]?.url;
                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-3 p-3 bg-white/90 rounded-2xl border border-[#D4A0B0]/20 hover:border-[#7A4F5C] transition-all hover:shadow-md"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F9EEF1] flex-shrink-0">
                        {img && (
                          <Image
                            src={img}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        )}
                      </div>
                      <Link
                        href={`/products/${p.handle}`}
                        onClick={onClose}
                        className="flex-grow min-w-0 block hover:opacity-80 transition-opacity"
                      >
                        <span className="text-[10px] uppercase font-bold text-[#BA788C] block">
                          {p.vendor}
                        </span>
                        <h4 className="text-xs font-semibold text-[#1A0E14] line-clamp-1">
                          {p.title}
                        </h4>
                        <div className="text-xs font-bold text-[#5C3544] mt-0.5">
                          Rs. {p.price.toLocaleString()}
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          addToCart(p);
                          onClose();
                        }}
                        className="p-2 rounded-full bg-[#F9EEF1] text-[#7A4F5C] hover:bg-[#7A4F5C] hover:text-[#FDF6F4] transition-colors flex-shrink-0"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
