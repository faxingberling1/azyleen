"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import SearchModal from "./SearchModal";
import { ShopifyProduct } from "@/lib/shopify";

interface NavbarProps {
  products: ShopifyProduct[];
}

export default function Navbar({ products }: NavbarProps) {
  const { openCart, totalItems, subtotal } = useCart();
  const { totalWishlist } = useWishlist();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Bestsellers", href: "#products" },
    { label: "Serums", href: "#products" },
    { label: "Moisturisers", href: "#products" },
    { label: "Sunscreen", href: "#products" },
    { label: "Ritual", href: "#routine" },
    { label: "Our Story", href: "#story" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <>
      {/* Floating Pill-Shaped Luxury Header */}
      <header className="sticky top-2 sm:top-4 z-40 w-full px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="max-w-6xl mx-auto pointer-events-auto">
          <nav
            className={`rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border ${
              isScrolled
                ? "bg-white/95 backdrop-blur-2xl border-[#D4A0B0]/45 shadow-2xl shadow-[#5C3544]/15 py-2 sm:py-2.5"
                : "bg-white/90 backdrop-blur-xl border-[#D4A0B0]/35 shadow-xl shadow-[#5C3544]/8"
            }`}
          >
            {/* Mobile Controls (Menu & Search) */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors ml-1"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Left: Brand Monogram Logo */}
            <Link href="/" className="flex items-center gap-2 group select-none">
              {/* Azyleen Floral Petal SVG Icon */}
              <div className="w-7 h-7 rounded-full bg-[#F9EEF1] flex items-center justify-center border border-[#D4A0B0]/30 shadow-xs flex-shrink-0">
                <svg
                  className="w-4 h-4 text-[#BA788C] transition-transform duration-500 group-hover:rotate-45"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
                  <ellipse cx="16" cy="10" rx="3" ry="5.5" fill="#D4A0B0" />
                  <ellipse cx="16" cy="22" rx="3" ry="5.5" fill="#D4A0B0" />
                  <ellipse cx="10" cy="16" rx="5.5" ry="3" fill="#D4A0B0" />
                  <ellipse cx="22" cy="16" rx="5.5" ry="3" fill="#D4A0B0" />
                  <circle cx="16" cy="16" r="3" fill="#5C3544" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl tracking-[0.2em] font-medium text-[#5C3544] group-hover:text-[#7A4F5C] transition-colors uppercase leading-none">
                  AZYLEEN
                </span>
                <span className="text-[7.5px] tracking-[0.3em] uppercase text-[#7E636E] font-sans font-semibold hidden sm:inline -mt-0.5">
                  Korean Skin Care
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Pills */}
            <div className="hidden lg:flex items-center gap-1 bg-[#FDF6F4]/90 p-1 rounded-full border border-[#D4A0B0]/25">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#5C3544] hover:text-[#5C3544] hover:bg-white transition-all duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Search, Wishlist & Pill Shopping Bag */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors"
                aria-label="Search formulations"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Button */}
              <a
                href="#products"
                className="relative flex items-center justify-center w-8 h-8 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {totalWishlist > 0 && (
                  <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#BA788C] text-white text-[8.5px] font-bold flex items-center justify-center animate-pulse">
                    {totalWishlist}
                  </span>
                )}
              </a>

              {/* Pill-Shaped Bag Trigger */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white transition-all shadow-md hover:shadow-lg cursor-pointer group"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#D4A0B0] group-hover:scale-105 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-white text-[#5C3544] text-[8.5px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold tracking-wide">
                  {subtotal > 0 ? `Rs. ${subtotal.toLocaleString()}` : "Bag"}
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#1A0E14]/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm h-full bg-[#FDF6F4] shadow-2xl p-6 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D4A0B0]/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#F9EEF1] flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#BA788C]" viewBox="0 0 32 32" fill="none">
                      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
                      <circle cx="16" cy="16" r="3" fill="#5C3544" />
                    </svg>
                  </div>
                  <span className="font-serif text-xl font-medium tracking-widest text-[#5C3544]">
                    AZYLEEN
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#5C3544]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="py-6 space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-base font-serif text-[#5C3544] hover:text-[#BA788C] transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#D4A0B0]/20 space-y-3">
              <a
                href="https://wa.me/923252867992?text=Salam%20Azyleen!%20I%20have%20a%20skincare%20inquiry"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-[#E7F6F2] text-[#128C7E] text-xs font-semibold border border-[#128C7E]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+92-3252867992)</span>
              </a>
              <div className="text-[11px] text-center text-[#7E636E]">
                🇵🇰 Delivery Across Pakistan · Cash on Delivery
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Predictive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
      />
    </>
  );
}
