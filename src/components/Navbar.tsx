"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, Menu, X, Sparkles, MessageCircle, ArrowRight, User, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import SearchModal from "./SearchModal";
import { ShopifyProduct } from "@/lib/shopify";

interface NavbarProps {
  products: ShopifyProduct[];
}

export default function Navbar({ products }: NavbarProps) {
  const pathname = usePathname();
  const { openCart, totalItems, subtotal } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Bestsellers", href: "/bestsellers" },
    { label: "Serums", href: "/serums" },
    { label: "Moisturisers", href: "/moisturisers" },
    { label: "Sunscreen", href: "/sunscreen" },
    { label: "Ritual", href: "/ritual" },
    { label: "Our Story", href: "/our-story" },
    { label: "Support", href: "/support" },
  ];

  return (
    <>
      {/* Floating Pill-Shaped Luxury Header with Perfectly Balanced Spacing */}
      <header
        className={`sticky z-40 w-full px-3 sm:px-5 lg:px-7 pointer-events-none transition-all duration-300 ${
          isScrolled
            ? "top-2 sm:top-2.5 pt-0.5 pb-1.5"
            : "top-0 pt-3 pb-2 sm:pt-4 sm:pb-2.5"
        }`}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          <nav
            className={`rounded-full transition-all duration-300 flex items-center justify-between gap-2 sm:gap-4 lg:gap-5 border ${
              isScrolled
                ? "bg-white/95 backdrop-blur-2xl border-[#D4A0B0]/45 shadow-xl shadow-[#5C3544]/15 px-4 sm:px-6 lg:px-7 py-2 sm:py-2.5"
                : "bg-white/90 backdrop-blur-xl border-[#D4A0B0]/35 shadow-lg shadow-[#5C3544]/8 px-4 sm:px-6 lg:px-7 py-2.5 sm:py-3"
            }`}
          >
            {/* Mobile Controls (Menu & Search) */}
            <div className="flex items-center lg:hidden gap-1">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Left: Brand Monogram Logo */}
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none flex-shrink-0">
              {/* Azyleen Floral Petal SVG Icon */}
              <div className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-[#F9EEF1] flex items-center justify-center border border-[#D4A0B0]/30 shadow-xs flex-shrink-0">
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
                <span className="text-[7.5px] sm:text-[8px] tracking-[0.3em] uppercase text-[#7E636E] font-sans font-semibold hidden sm:inline mt-0.5">
                  Korean Skin Care
                </span>
              </div>
            </Link>

            {/* Center: Desktop Navigation Pills with Balanced Spacing */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 bg-[#FDF6F4]/90 px-2.5 py-1 rounded-full border border-[#D4A0B0]/25 shadow-2xs">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-2.5 xl:px-3.5 py-1.5 rounded-full text-[11px] xl:text-xs font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                      active
                        ? "bg-[#5C3544] text-white shadow-xs font-bold"
                        : "text-[#5C3544] hover:text-[#5C3544] hover:bg-white hover:shadow-2xs"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right: Search, Wishlist & Pill Shopping Bag */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center justify-center w-8.5 h-8.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors cursor-pointer"
                aria-label="Search formulations"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Customer Account / Demo Login */}
              <Link
                href={isAuthenticated ? "/account" : "/login"}
                className="flex items-center justify-center w-8.5 h-8.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors cursor-pointer"
                aria-label="Customer Account"
                title={isAuthenticated ? `Account (${user?.firstName})` : "Sign In / Demo Login"}
              >
                {isAuthenticated && user ? (
                  <span className="w-6 h-6 rounded-full bg-[#5C3544] text-white text-[9.5px] font-bold flex items-center justify-center shadow-xs">
                    {user.firstName[0]}
                  </span>
                ) : (
                  <User className="w-4 h-4" />
                )}
              </Link>

              {/* Gift Vouchers Link */}
              <Link
                href="/gift-vouchers"
                className={`flex items-center justify-center w-8.5 h-8.5 rounded-full transition-colors cursor-pointer ${
                  pathname === "/gift-vouchers"
                    ? "bg-[#5C3544] text-white shadow-xs"
                    : "text-[#5C3544] hover:bg-[#F9EEF1]"
                }`}
                aria-label="Gift Vouchers"
                title="Gift Vouchers & Luxury Keepsake Boxes"
              >
                <Gift className={`w-4 h-4 ${pathname === "/gift-vouchers" ? "text-white" : "text-[#BA788C]"}`} />
              </Link>

              {/* Wishlist Button */}
              <a
                href="#products"
                className="relative flex items-center justify-center w-8.5 h-8.5 rounded-full text-[#5C3544] hover:bg-[#F9EEF1] transition-colors cursor-pointer"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4" />
                {totalWishlist > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#BA788C] text-white text-[8.5px] font-bold flex items-center justify-center animate-pulse">
                    {totalWishlist}
                  </span>
                )}
              </a>

              {/* Pill-Shaped Bag Trigger */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white transition-all shadow-md hover:shadow-lg cursor-pointer group flex-shrink-0"
                aria-label="Shopping Bag"
              >
                <div className="relative">
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4A0B0] group-hover:scale-105 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-3.5 h-3.5 px-0.5 rounded-full bg-white text-[#5C3544] text-[8.5px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold tracking-wide whitespace-nowrap">
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

              <nav className="py-6 space-y-2">
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between text-base font-serif py-2 px-3.5 rounded-xl transition-all duration-200 ${
                        active
                          ? "bg-[#5C3544] text-white font-semibold shadow-xs"
                          : "text-[#5C3544] hover:text-[#BA788C] hover:bg-[#F9EEF1]/60"
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />}
                    </Link>
                  );
                })}

                <Link
                  href="/gift-vouchers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-base font-serif py-2.5 px-3.5 rounded-2xl border transition-all mt-3 ${
                    pathname === "/gift-vouchers"
                      ? "bg-[#5C3544] text-white border-[#5C3544] shadow-xs"
                      : "text-[#5C3544] hover:text-[#BA788C] bg-[#F9EEF1] border-[#D4A0B0]/30"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Gift className={`w-4 h-4 ${pathname === "/gift-vouchers" ? "text-white" : "text-[#BA788C]"}`} />
                    <span>Gift Vouchers</span>
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      pathname === "/gift-vouchers"
                        ? "bg-white text-[#5C3544]"
                        : "text-white bg-[#5C3544]"
                    }`}
                  >
                    Gifting
                  </span>
                </Link>
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
