"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart, Eye } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: ShopifyProduct;
  onQuickView: (product: ShopifyProduct) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images?.[0]?.url;
  const secondaryImage = product.images?.[1]?.url || primaryImage;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null;

  return (
    <div
      className="group relative flex flex-col bg-white rounded-[28px] p-3.5 sm:p-4 border border-[#D4A0B0]/25 shadow-xs hover:shadow-xl transition-all duration-300 hover:border-[#BA788C]/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <div
        onClick={() => onQuickView(product)}
        className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FDF6F4] flex items-center justify-center cursor-pointer"
      >
        {primaryImage ? (
          <>
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              className={`object-contain p-4 transition-all duration-700 ${
                isHovered && secondaryImage ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={`${product.title} view 2`}
                fill
                className={`object-contain p-4 transition-all duration-700 absolute inset-0 ${
                  isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )}
          </>
        ) : (
          <div className="text-center font-serif text-lg text-[#BA788C]">Azyleen</div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {discountPercent && (
            <span className="bg-[#D93025] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              -{discountPercent}% OFF
            </span>
          )}
          {product.viewingNow && product.viewingNow > 22 && (
            <span className="bg-[#5C3544] text-[#FDF6F4] text-[9.5px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A0B0] animate-ping" />
              {product.viewingNow} viewing
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all shadow-sm ${
            isFavorited
              ? "bg-[#D93025] text-white"
              : "bg-white/90 text-[#5C3544] hover:bg-white hover:text-[#D93025]"
          }`}
          aria-label="Wishlist toggle"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorited ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 rounded-xl bg-white/95 text-[#5C3544] hover:bg-[#5C3544] hover:text-white text-[11px] font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-col flex-grow justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold uppercase tracking-[0.16em] text-[#BA788C]">
              {product.vendor}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-[#7E636E]">
              <Star className="w-3 h-3 fill-[#C59B6D] text-[#C59B6D]" />
              <span className="font-bold text-[#1A0E14]">{product.rating || 4.9}</span>
              <span>({product.reviewsCount || 42})</span>
            </div>
          </div>

          <Link
            href={`/products/${product.handle}`}
            className="font-serif text-base sm:text-lg text-[#1A0E14] font-medium leading-snug mt-1 block hover:text-[#7A4F5C] transition-colors line-clamp-1"
          >
            {product.title}
          </Link>

          <p className="text-xs text-[#7E636E] line-clamp-1 mt-0.5 font-normal">
            {product.concern || product.description}
          </p>
        </div>

        {/* Pricing & Add to Bag */}
        <div className="pt-2 border-t border-[#D4A0B0]/15 flex items-center justify-between">
          <div>
            <div className="text-base sm:text-lg font-bold text-[#5C3544]">
              Rs. {product.price.toLocaleString()}
            </div>
            {product.compareAtPrice && (
              <div className="text-xs line-through text-[#7E636E]">
                Rs. {product.compareAtPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdding}
            className="px-3.5 py-2 rounded-xl bg-[#5C3544] text-white hover:bg-[#43232F] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
            title="Add to Bag"
          >
            <ShoppingBag className={`w-3.5 h-3.5 ${isAdding ? "animate-bounce" : ""}`} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
