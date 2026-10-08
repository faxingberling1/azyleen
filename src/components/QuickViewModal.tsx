"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Star, ShoppingBag, Heart, ShieldCheck, Sparkles, MessageCircle, Check } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface QuickViewModalProps {
  product: ShopifyProduct | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);
  const images = product.images.length > 0 ? product.images : [{ url: "", altText: product.title }];
  const currentImg = images[selectedImageIdx]?.url || "";

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  const handleWhatsApp = () => {
    const text = `Salam Azyleen! I have a question about the ${product.title} (Rs. ${product.price.toLocaleString()}). Could you share if it suits my skin type?`;
    window.open(`https://wa.me/923252867992?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A0E14]/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-[#FDF6F4] rounded-3xl shadow-2xl border border-[#D4A0B0]/30 overflow-hidden z-10 animate-in fade-in-50 zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#5C3544] hover:bg-[#F9EEF1] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Product Images */}
        <div className="w-full md:w-1/2 p-6 bg-white/70 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D4A0B0]/20">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#F9EEF1] flex items-center justify-center">
            {currentImg ? (
              <Image
                src={currentImg}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            ) : (
              <span className="font-serif text-2xl text-[#BA788C]">Azyleen</span>
            )}
          </div>

          {/* Thumbnail gallery */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    selectedImageIdx === idx ? "border-[#7A4F5C] shadow-sm" : "border-transparent opacity-60"
                  }`}
                >
                  <Image src={img.url} alt="" fill className="object-cover" sizes="56px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4A0B0]">
                  {product.vendor}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-1.5 rounded-full transition-colors ${
                    isFavorited ? "text-[#D93025] fill-[#D93025]" : "text-[#7E636E] hover:text-[#5C3544]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                </button>
              </div>

              <h2 className="font-serif text-2xl text-[#1A0E14] font-medium leading-tight mt-1">
                {product.title}
              </h2>

              {/* Rating & Concern */}
              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C59B6D] text-[#C59B6D]" />
                  ))}
                  <span className="font-semibold text-[#1A0E14] ml-1">{product.rating || 4.9}</span>
                  <span className="text-[#7E636E]">({product.reviewsCount || 42})</span>
                </div>
                <span className="text-[#D4A0B0]">•</span>
                <span className="text-[#7A4F5C] font-medium bg-[#F9EEF1] px-2.5 py-0.5 rounded-full text-[10.5px]">
                  {product.concern}
                </span>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-[#5C3544]">
                Rs. {(product.price * quantity).toLocaleString()}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm line-through text-[#7E636E]">
                  Rs. {(product.compareAtPrice * quantity).toLocaleString()}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="text-xs font-bold text-[#D93025] bg-[#FDF2F2] px-2 py-0.5 rounded-md">
                  {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Key Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E]">
                  Formulation Highlights:
                </p>
                <ul className="space-y-1 text-xs text-[#5C3A46]">
                  {product.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#BA788C] flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How to use */}
            {product.howToUse && (
              <div className="p-3 bg-[#F9EEF1]/60 rounded-xl border border-[#D4A0B0]/20 text-xs text-[#5C3A46]">
                <strong className="text-[#5C3544] block mb-0.5 font-serif text-[13px]">
                  Daily Ritual Application:
                </strong>
                {product.howToUse}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-4 border-t border-[#D4A0B0]/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D4A0B0]/40 rounded-full bg-white px-2 py-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 flex items-center justify-center text-[#5C3544] hover:bg-[#F9EEF1] rounded-full text-base font-medium"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-semibold text-[#1A0E14]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#5C3544] hover:bg-[#F9EEF1] rounded-full text-base font-medium"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!product.availableForSale}
                className={`flex-grow py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  product.availableForSale
                    ? "bg-[#5C3544] hover:bg-[#43232F] text-white cursor-pointer hover:shadow-xl"
                    : "bg-[#EAD9DE] text-[#7E636E] cursor-not-allowed"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {product.availableForSale
                    ? `Add to Bag • Rs. ${(product.price * quantity).toLocaleString()}`
                    : "Sold Out in Lahore"}
                </span>
              </button>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full py-2 rounded-full text-[11px] font-semibold text-[#128C7E] bg-[#E7F6F2] hover:bg-[#D5EFE8] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask Skincare Question on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
