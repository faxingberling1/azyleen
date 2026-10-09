"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowRight,
  Clock,
  Plus,
  Minus,
  Check,
  Gift,
  Flame,
} from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart, isGiftProduct } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import GiftBoxDecisionModal from "@/components/GiftBoxDecisionModal";

interface ProductPageClientProps {
  product: ShopifyProduct;
  relatedProducts: ShopifyProduct[];
}

export default function ProductPageClient({ product, relatedProducts }: ProductPageClientProps) {
  const { addToCart, openCart, openConfigModal } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isGiftDecisionOpen, setIsGiftDecisionOpen] = useState(false);

  // Gallery state
  const images = product.images.length > 0 ? product.images : [{ url: "", altText: product.title }];
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const thumbnailScrollRef = React.useRef<HTMLDivElement>(null);

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailScrollRef.current) {
      thumbnailScrollRef.current.scrollBy({
        left: direction === "left" ? -140 : 140,
        behavior: "smooth",
      });
    }
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  // Quantity & Volume Tier Upsell state
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3>(1);
  const [customQty, setCustomQty] = useState(1);

  // Frequently Bought Together Upsell state
  const upsellProduct = relatedProducts[0] || null;
  const [includeUpsell, setIncludeUpsell] = useState(true);

  // City Delivery checker
  const [selectedCity, setSelectedCity] = useState("Lahore");

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState<string>("benefits");

  // Sticky buy bar visibility on scroll
  const [showStickyBar, setShowStickyBar] = useState(false);

  const isFavorited = isInWishlist(product.id);

  // Variants state (Options / Customizations / Denominations, filtered to PKR only)
  const variants = (product.variants || []).filter((v) => !v.title.includes("$"));
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    variants[0]?.id || ""
  );

  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0] || null;

  // Base unit pricing from selected variant or product
  const baseUnitPrice = selectedVariant
    ? parseFloat(selectedVariant.price.amount)
    : product.price;

  const baseCompareUnitPrice = selectedVariant?.compareAtPrice
    ? parseFloat(selectedVariant.compareAtPrice.amount)
    : product.compareAtPrice;

  // Volume Tier calculations (Upsell 1)
  const tierDiscounts = {
    1: 0,
    2: 0.1, // 10% off
    3: 0.15, // 15% off
  };

  const getTierPrice = (tier: 1 | 2 | 3) => {
    const rawTotal = baseUnitPrice * tier;
    const discount = rawTotal * tierDiscounts[tier];
    return Math.round(rawTotal - discount);
  };

  const getTierSavings = (tier: 1 | 2 | 3) => {
    if (tier === 1) return 0;
    const rawTotal = baseUnitPrice * tier;
    return Math.round(rawTotal * tierDiscounts[tier]);
  };

  // Dynamically updating active price for display & checkout
  const activePrice = getTierPrice(selectedTier);
  const activeComparePrice = baseCompareUnitPrice
    ? Math.round(baseCompareUnitPrice * selectedTier)
    : Math.round(baseUnitPrice * 1.4 * selectedTier);
  const activeSavings = activeComparePrice > activePrice ? activeComparePrice - activePrice : null;
  const activeSavingsPercent = activeComparePrice > activePrice
    ? Math.round(((activeComparePrice - activePrice) / activeComparePrice) * 100)
    : (selectedTier > 1 ? (selectedTier === 2 ? 10 : 15) : 40);

  const isVoucher = product.handle.includes("gift") || product.category === "gift-vouchers";
  const unitLabel = isVoucher ? "Voucher" : (product.category === "masks" ? "Sheet" : "Bottle");
  const unitLabelPlural = isVoucher ? "Vouchers" : (product.category === "masks" ? "Sheets" : "Bottles");

  // Scroll listener for sticky buy bar
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Primary Add to Bag handler
  const handleAddToCart = () => {
    const productToAdd = selectedVariant
      ? {
          ...product,
          price: parseFloat(selectedVariant.price.amount),
          title: selectedVariant.title !== "Default Title" ? `${product.title} - ${selectedVariant.title}` : product.title,
        }
      : product;
    addToCart(productToAdd, selectedTier);
  };

  // Bundle Add to Bag handler (Upsell 2)
  const handleAddBundle = () => {
    const productToAdd = selectedVariant
      ? {
          ...product,
          price: parseFloat(selectedVariant.price.amount),
          title: selectedVariant.title !== "Default Title" ? `${product.title} - ${selectedVariant.title}` : product.title,
        }
      : product;
    addToCart(productToAdd, 1);
    if (includeUpsell && upsellProduct) {
      if (isGiftProduct(upsellProduct)) {
        setIsGiftDecisionOpen(true);
      } else {
        addToCart(upsellProduct, 1);
      }
    }
  };

  const handleConfigureGiftNow = () => {
    setIsGiftDecisionOpen(false);
    window.location.href = "/gift-vouchers";
  };

  const handleContinueShoppingGift = () => {
    setIsGiftDecisionOpen(false);
    if (upsellProduct) {
      addToCart(upsellProduct, 1, undefined, { needsConfiguration: true });
    }
  };

  // WhatsApp Order
  const handleWhatsApp = () => {
    const variantNote = selectedVariant && selectedVariant.title !== "Default Title" ? ` [${selectedVariant.title}]` : "";
    const msg = `Salam Azyleen! I would like to order the ${product.title}${variantNote} (${selectedTier} ${selectedTier > 1 ? unitLabelPlural : unitLabel}) for Rs. ${activePrice.toLocaleString()} to ${selectedCity} via Cash on Delivery.`;
    window.open(`https://wa.me/923252867992?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const bundleRawTotal = baseUnitPrice + (upsellProduct ? upsellProduct.price : 0);
  const bundleDiscountedTotal = Math.round(bundleRawTotal * 0.9); // 10% bundle saving
  const bundleSavings = bundleRawTotal - bundleDiscountedTotal;

  return (
    <div className="bg-[#FDF6F4] text-[#1A0E14] pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs text-[#7E636E]">
          <Link href="/" className="hover:text-[#5C3544] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-[#5C3544] transition-colors capitalize">
            {product.category || "Skincare"}
          </Link>
          <span>/</span>
          <span className="text-[#1A0E14] font-medium truncate max-w-xs">{product.title}</span>
        </nav>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Multi-Image Interactive Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-square w-full rounded-[32px] overflow-hidden bg-white shadow-xl border border-[#D4A0B0]/30 p-8 flex items-center justify-center group">
              {images[activeImageIdx]?.url ? (
                <Image
                  src={images[activeImageIdx].url}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              ) : (
                <div className="font-serif text-3xl text-[#BA788C]">Azyleen</div>
              )}

              {/* Floating Navigation Arrows on Main Stage */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 z-10 w-9.5 h-9.5 rounded-full bg-white/90 hover:bg-[#5C3544] text-[#5C3544] hover:text-white backdrop-blur-md shadow-md border border-[#D4A0B0]/40 flex items-center justify-center transition-all duration-200 cursor-pointer opacity-80 group-hover:opacity-100 hover:scale-105"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10 w-9.5 h-9.5 rounded-full bg-white/90 hover:bg-[#5C3544] text-[#5C3544] hover:text-white backdrop-blur-md shadow-md border border-[#D4A0B0]/40 flex items-center justify-center transition-all duration-200 cursor-pointer opacity-80 group-hover:opacity-100 hover:scale-105"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                </>
              )}

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                <span className="bg-[#D93025] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Save{" "}
                  {product.compareAtPrice
                    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
                    : 35}
                  % OFF
                </span>
                <span className="bg-[#5C3544] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A0B0]" />
                  <span>Batch-Coded Seoul</span>
                </span>
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
                  isFavorited ? "bg-[#D93025] text-white" : "bg-white/90 text-[#5C3544] hover:bg-white"
                }`}
                aria-label="Wishlist toggle"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
              </button>

              {/* Live Viewer Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#5C3544] border border-[#D4A0B0]/30 shadow-sm flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#D93025] animate-pulse" />
                <span>{product.viewingNow || 38} people viewing now</span>
              </div>

              {/* Photo Counter Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono font-bold text-[#5C3544] border border-[#D4A0B0]/30 shadow-xs">
                  0{activeImageIdx + 1} / 0{images.length}
                </div>
              )}
            </div>

            {/* Theme-Based Thumbnail Scroller Strip */}
            {images.length > 1 && (
              <div className="relative bg-[#F9EEF1]/70 p-2 sm:p-2.5 rounded-2xl border border-[#D4A0B0]/35 shadow-xs flex items-center gap-2">
                {images.length > 4 && (
                  <button
                    onClick={() => scrollThumbnails("left")}
                    className="w-7 h-7 rounded-xl bg-white hover:bg-[#5C3544] text-[#5C3544] hover:text-white border border-[#D4A0B0]/40 shadow-xs flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                    aria-label="Scroll thumbnails left"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                )}

                <div
                  ref={thumbnailScrollRef}
                  className="flex gap-2.5 overflow-x-auto py-1 scroll-smooth scrollbar-none flex-grow"
                >
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-white p-1.5 transition-all flex-shrink-0 cursor-pointer ${
                        activeImageIdx === idx
                          ? "border-2 border-[#5C3544] ring-2 ring-[#BA788C]/35 shadow-md scale-105"
                          : "border border-[#D4A0B0]/35 opacity-70 hover:opacity-100 hover:border-[#BA788C] bg-white/80"
                      }`}
                      aria-label={`View formulation image ${idx + 1}`}
                    >
                      <Image src={img.url} alt="" fill className="object-contain p-1" sizes="72px" />
                    </button>
                  ))}
                </div>

                {images.length > 4 && (
                  <button
                    onClick={() => scrollThumbnails("right")}
                    className="w-7 h-7 rounded-xl bg-white hover:bg-[#5C3544] text-[#5C3544] hover:text-white border border-[#D4A0B0]/40 shadow-xs flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                    aria-label="Scroll thumbnails right"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information & High-Converting Upsell Suite */}
          <div className="lg:col-span-6 space-y-6">
            {/* Brand, Title & Rating */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C]">
                  {product.vendor}
                </span>
                <span className="bg-[#EDF7F1] text-[#1A7A4A] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  ✓ 100% Guaranteed Authentic
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A0E14] font-medium leading-tight mt-1.5">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mt-2 text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C59B6D] text-[#C59B6D]" />
                  ))}
                  <span className="font-bold text-[#1A0E14] ml-1">{product.rating || 4.9}</span>
                  <span className="text-[#7E636E]">({product.reviewsCount || 42} reviews)</span>
                </div>
                <span className="text-[#D4A0B0]">•</span>
                <span className="text-[#5C3544] font-semibold bg-[#F9EEF1] px-3 py-0.5 rounded-full">
                  {product.concern || "All Skin Types"}
                </span>
              </div>
            </div>

            {/* Dynamic Pricing Section */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4A0B0]/30 shadow-xs flex items-baseline justify-between transition-all duration-300">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-[#5C3544] transition-all">
                    Rs. {activePrice.toLocaleString()}
                  </span>
                  {activeComparePrice && activeComparePrice > activePrice && (
                    <span className="text-base line-through text-[#7E636E]">
                      Rs. {activeComparePrice.toLocaleString()}
                    </span>
                  )}
                  {selectedTier > 1 && (
                    <span className="text-[11px] font-bold text-[#1A7A4A] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                      {selectedTier}x Bundle Applied
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#1A7A4A] font-semibold mt-0.5">
                  ✓ Includes all taxes. Free shipping on orders Rs. 3,999+
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block bg-[#FDF2F2] text-[#D93025] px-2.5 py-1 rounded-lg text-xs font-bold">
                  SAVE{" "}
                  {activeSavings
                    ? `Rs. ${activeSavings.toLocaleString()}`
                    : `${activeSavingsPercent}%`}
                </span>
              </div>
            </div>

            {/* Urgency & Stock Counter */}
            {isVoucher ? (
              <div className="p-3.5 rounded-2xl bg-[#F9EEF1]/80 border border-[#D4A0B0]/40 flex items-center gap-3">
                <Gift className="w-4 h-4 text-[#7A4F5C] flex-shrink-0" />
                <div className="text-xs text-[#5C3544]">
                  <strong className="font-bold">Azyleen Gifting Guarantee:</strong> Instant digital voucher code or luxury keepsake foil box with satin plum ribbon.
                </div>
              </div>
            ) : product.availableForSale ? (
              <div className="p-3.5 rounded-2xl bg-[#FFF9E6] border border-[#F4E2B8] flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#C59B6D] flex-shrink-0 animate-spin" />
                <div className="text-xs text-[#8C6D23]">
                  <strong className="font-bold">High Demand in Pakistan:</strong> Only 7 bottles remaining in Lahore warehouse at this promo price.
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-[#F9EEF1] border border-[#D4A0B0]/40 flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#7A4F5C] flex-shrink-0" />
                <div className="text-xs text-[#5C3544]">
                  <strong className="font-bold">Sold Out in Lahore:</strong> Next air cargo batch from Seoul is currently en route. Contact us on WhatsApp for reservation.
                </div>
              </div>
            )}

            {/* Dedicated Gift Voucher Studio Banner (For gift vouchers) */}
            {isVoucher && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F9EEF1] via-[#FDF6F4] to-[#F9EEF1] border border-[#BA788C]/40 shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#5C3544] text-white">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#5C3544]">Bespoke Voucher Studio</h4>
                    <p className="text-[11px] text-[#7E636E]">
                      Customize recipient name, custom message, and luxury keepsake box with ribbon.
                    </p>
                  </div>
                </div>
                <Link
                  href="/gift-vouchers"
                  className="px-3.5 py-2 rounded-xl bg-[#5C3544] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#43232F] transition-all flex-shrink-0 whitespace-nowrap shadow-xs"
                >
                  Custom Studio →
                </Link>
              </div>
            )}

            {/* VARIANT / OPTION CUSTOMIZATION SELECTOR */}
            {variants.length > 1 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5C3544] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
                    <span>Select {isVoucher ? "Voucher Denomination" : "Option / Size"}:</span>
                  </span>
                  <span className="text-[11px] font-semibold text-[#BA788C]">
                    {selectedVariant?.title}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {variants.map((v) => {
                    const vPrice = parseFloat(v.price.amount);
                    const isSelected = v.id === selectedVariantId;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariantId(v.id)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                          isSelected
                            ? "border-[#5C3544] bg-[#FDF6F4] shadow-md ring-2 ring-[#5C3544]/25"
                            : "border-[#D4A0B0]/30 bg-white hover:bg-[#FDF6F4]/50"
                        }`}
                      >
                        <div className="text-xs font-bold text-[#1A0E14] line-clamp-1">
                          {v.title.startsWith("$") ? `Rs. ${vPrice.toLocaleString()} Gift Voucher` : v.title}
                        </div>
                        <div className="text-xs font-bold text-[#5C3544] mt-1">
                          Rs. {vPrice.toLocaleString()}
                        </div>
                        {isSelected && (
                          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#5C3544]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VOUCHER MANDATORY STUDIO CONFIGURATION PANEL */}
            {isVoucher ? (
              <div className="p-6 rounded-[28px] bg-gradient-to-br from-[#F9EEF1] via-white to-[#FDF6F4] border-2 border-[#5C3544]/25 shadow-md space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-3 rounded-2xl bg-[#5C3544] text-white flex-shrink-0 shadow-sm">
                    <Gift className="w-5 h-5 text-[#D4A0B0]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BA788C] block">
                      ✦ Mandatory Studio Step
                    </span>
                    <h3 className="font-serif text-lg text-[#1A0E14] font-medium leading-snug mt-0.5">
                      Configure Voucher &amp; Keepsake Gift Box
                    </h3>
                    <p className="text-xs text-[#7E636E] mt-1.5 leading-relaxed">
                      To ensure your voucher or keepsake gift box includes the recipient&rsquo;s name, personal note, aesthetic card theme, and optional luxury foil packaging, all orders must be configured inside our Bespoke Studio before being added to bag.
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#D4A0B0]/25">
                  <Link
                    href={`/gift-vouchers?amount=${baseUnitPrice}&format=physical`}
                    className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Gift className="w-4 h-4 text-[#D4A0B0]" />
                    <span>Open Bespoke Studio &amp; Personalize Box →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* UPSELL MECHANISM 1: Multi-Buy Volume Tier Discounts */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5C3544] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
                      <span>Select Quantity &amp; Unlock Extra Savings:</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {/* 1 Unit */}
                    <button
                      type="button"
                      onClick={() => setSelectedTier(1)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        selectedTier === 1
                          ? "border-[#5C3544] bg-white shadow-md ring-2 ring-[#5C3544]/20"
                          : "border-[#D4A0B0]/30 bg-white/70 hover:bg-white"
                      }`}
                    >
                      <div className="text-xs font-bold text-[#1A0E14]">1 {unitLabel}</div>
                      <div className="text-xs font-bold text-[#5C3544] mt-0.5">
                        Rs. {getTierPrice(1).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#7E636E]">Standard</div>
                    </button>

                    {/* 2 Units (Best Value) */}
                    <button
                      type="button"
                      onClick={() => setSelectedTier(2)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        selectedTier === 2
                          ? "border-[#5C3544] bg-white shadow-md ring-2 ring-[#5C3544]/20"
                          : "border-[#D4A0B0]/30 bg-white/70 hover:bg-white"
                      }`}
                    >
                      <span className="absolute -top-2.5 right-2 bg-[#5C3544] text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        ★ Most Popular
                      </span>
                      <div className="text-xs font-bold text-[#1A0E14]">2 {unitLabelPlural}</div>
                      <div className="text-xs font-bold text-[#5C3544] mt-0.5">
                        Rs. {getTierPrice(2).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#1A7A4A] font-bold">
                        Save extra 10%
                      </div>
                    </button>

                    {/* 3 Units (Glow Trio) */}
                    <button
                      type="button"
                      onClick={() => setSelectedTier(3)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        selectedTier === 3
                          ? "border-[#5C3544] bg-white shadow-md ring-2 ring-[#5C3544]/20"
                          : "border-[#D4A0B0]/30 bg-white/70 hover:bg-white"
                      }`}
                    >
                      <span className="absolute -top-2.5 right-2 bg-[#1A7A4A] text-white text-[8.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Best Deal
                      </span>
                      <div className="text-xs font-bold text-[#1A0E14]">3 {unitLabelPlural}</div>
                      <div className="text-xs font-bold text-[#5C3544] mt-0.5">
                        Rs. {getTierPrice(3).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-[#1A7A4A] font-bold">
                        Save extra 15%
                      </div>
                    </button>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.availableForSale}
                    className={`w-full font-bold text-sm uppercase tracking-wider py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2.5 ${
                      product.availableForSale
                        ? "bg-[#5C3544] hover:bg-[#43232F] text-white shadow-[#5C3544]/25 hover:shadow-2xl cursor-pointer transform hover:-translate-y-0.5"
                        : "bg-[#EAD9DE] text-[#7E636E] cursor-not-allowed"
                    }`}
                  >
                    <ShoppingBag className={`w-4 h-4 ${product.availableForSale ? "text-[#D4A0B0]" : "text-[#7E636E]"}`} />
                    <span>
                      {product.availableForSale
                        ? `Add ${selectedTier} ${selectedTier > 1 ? unitLabelPlural : unitLabel} to Bag • Rs. ${activePrice.toLocaleString()}`
                        : "Currently Sold Out"}
                    </span>
                    {product.availableForSale && selectedTier > 1 && (
                      <span className="bg-[#1A7A4A] text-white text-[10px] px-2 py-0.5 rounded-full font-bold ml-1">
                        Saved Rs. {getTierSavings(selectedTier).toLocaleString()}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#E7F6F2] hover:bg-[#D5EFE8] text-[#128C7E] font-bold text-xs uppercase tracking-wider py-3.5 rounded-full border border-[#128C7E]/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-[#128C7E]/20" />
                    <span>{product.availableForSale ? "Order via WhatsApp (Instant COD)" : "Inquire Restock / Pre-order via WhatsApp"}</span>
                  </button>
                </div>
              </>
            )}

            {/* City Delivery & COD Checker */}
            <div className="p-4 rounded-2xl bg-white border border-[#D4A0B0]/25 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#5C3544] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#BA788C]" />
                  <span>Check Delivery Time &amp; COD:</span>
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-[#FDF6F4] text-xs font-semibold text-[#5C3544] px-3 py-1 rounded-lg border border-[#D4A0B0]/30 focus:outline-none"
                >
                  <option value="Lahore">Lahore (1-2 Days)</option>
                  <option value="Karachi">Karachi (2-3 Days)</option>
                  <option value="Islamabad">Islamabad (2 Days)</option>
                  <option value="Rawalpindi">Rawalpindi (2 Days)</option>
                  <option value="Faisalabad">Faisalabad (2-3 Days)</option>
                  <option value="Multan">Multan (2-3 Days)</option>
                  <option value="Peshawar">Peshawar (3 Days)</option>
                  <option value="Quetta">Quetta (3-4 Days)</option>
                </select>
              </div>
              <p className="text-[11px] text-[#5C3A46]">
                🚚 Express shipping to <strong>{selectedCity}</strong> via TCS / Leopards. Cash on Delivery (COD) available with parcel tracking.
              </p>
            </div>

            {/* UPSELL MECHANISM 2: Frequently Bought Together Bundle */}
            {upsellProduct && (
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#F9EEF1] to-white border border-[#D4A0B0]/40 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5C3544] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
                    <span>Frequently Bought Together: Glass Skin Duo</span>
                  </span>
                  <span className="bg-[#D93025] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Save 10% Bundle
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  {/* Item 1 */}
                  <div className="relative w-14 h-14 rounded-xl bg-white p-1 border border-[#D4A0B0]/30 flex-shrink-0">
                    {product.images?.[0]?.url && (
                      <Image src={product.images[0].url} alt="" fill className="object-contain p-1" sizes="56px" />
                    )}
                  </div>
                  <span className="text-lg font-bold text-[#5C3544]">+</span>
                  {/* Item 2 */}
                  <div className="relative w-14 h-14 rounded-xl bg-white p-1 border border-[#D4A0B0]/30 flex-shrink-0">
                    {upsellProduct.images?.[0]?.url && (
                      <Image src={upsellProduct.images[0].url} alt="" fill className="object-contain p-1" sizes="56px" />
                    )}
                  </div>

                  <div className="flex-grow min-w-0 text-xs">
                    <p className="font-semibold text-[#1A0E14] line-clamp-1">
                      {product.title} + {upsellProduct.title}
                    </p>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-bold text-[#5C3544]">
                        Rs. {bundleDiscountedTotal.toLocaleString()}
                      </span>
                      <span className="text-[11px] line-through text-[#7E636E]">
                        Rs. {bundleRawTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-[#5C3A46] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeUpsell}
                      onChange={(e) => setIncludeUpsell(e.target.checked)}
                      className="accent-[#5C3544] rounded"
                    />
                    <span>Add {upsellProduct.title} to order</span>
                  </label>

                  <button
                    onClick={handleAddBundle}
                    className="bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    Add Duo to Bag
                  </button>
                </div>
              </div>
            )}

            {/* Accordion Tabs for Clinical Formulations, Ritual & Authenticity */}
            <div className="space-y-2 pt-2 border-t border-[#D4A0B0]/20">
              {/* Accordion 1: Benefits & Actives */}
              <div className="rounded-2xl bg-white border border-[#D4A0B0]/25 overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "benefits" ? "" : "benefits")}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-[#5C3544] uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#BA788C]" />
                    <span>Clinical Actives &amp; Proven Benefits</span>
                  </span>
                  {openAccordion === "benefits" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === "benefits" && (
                  <div className="px-4 pb-4 text-xs text-[#5C3A46] space-y-2 border-t border-[#D4A0B0]/15 pt-3">
                    <p>{product.description}</p>
                    {product.benefits && (
                      <ul className="space-y-1.5 pt-1">
                        {product.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1A7A4A] flex-shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: How to Layer */}
              <div className="rounded-2xl bg-white border border-[#D4A0B0]/25 overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "usage" ? "" : "usage")}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-[#5C3544] uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#BA788C]" />
                    <span>How to Layer in Your Ritual (AM / PM)</span>
                  </span>
                  {openAccordion === "usage" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === "usage" && (
                  <div className="px-4 pb-4 text-xs text-[#5C3A46] space-y-2 border-t border-[#D4A0B0]/15 pt-3">
                    <p>{product.howToUse || "Apply 2-3 drops after toning, gently tapping until fully absorbed into the skin."}</p>
                    <div className="p-3 bg-[#F9EEF1] rounded-xl text-[11px] text-[#5C3544]">
                      <strong>Layering Rule:</strong> Apply from thinnest liquid consistency to thickest cream. Always follow with SPF 50+ in your morning routine.
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 3: Authenticity & Batch Code */}
              <div className="rounded-2xl bg-white border border-[#D4A0B0]/25 overflow-hidden">
                <button
                  onClick={() => setOpenAccordion(openAccordion === "authenticity" ? "" : "authenticity")}
                  className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-[#5C3544] uppercase tracking-wider"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1A7A4A]" />
                    <span>Authenticity Guarantee &amp; Batch Code</span>
                  </span>
                  {openAccordion === "authenticity" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordion === "authenticity" && (
                  <div className="px-4 pb-4 text-xs text-[#5C3A46] space-y-2 border-t border-[#D4A0B0]/15 pt-3">
                    <p>
                      Every single bottle is directly imported from authorized beauty labs in Seoul, South Korea. Each item features an authentic batch code embossed on the bottle base and box that can be verified against the official manufacturer databases.
                    </p>
                    <p className="text-[#1A7A4A] font-semibold">
                      ✓ 100% Money-Back Guarantee if you receive anything other than the genuine product.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* UPSELL MECHANISM 3: "Complete Your 4-Step Routine" */}
        <section className="mt-20 pt-14 border-t border-[#D4A0B0]/30">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C]">
              Synergistic Ritual
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A0E14] font-normal tracking-tight mt-1">
              Complete Your Glass Skin Ritual
            </h2>
            <p className="text-xs sm:text-sm text-[#5C3A46] mt-2">
              Korean skincare works synergistically. Pair this active with our top recommended steps:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl p-4 border border-[#D4A0B0]/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-2xl bg-[#FDF6F4] p-3 overflow-hidden flex items-center justify-center">
                    {rel.images?.[0]?.url && (
                      <Image src={rel.images[0].url} alt={rel.title} fill className="object-contain p-3" sizes="200px" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase text-[#BA788C] mt-3 block">
                    {rel.vendor}
                  </span>
                  <Link
                    href={`/products/${rel.handle}`}
                    className="font-serif text-sm font-semibold text-[#1A0E14] hover:text-[#5C3544] line-clamp-1 mt-0.5 block"
                  >
                    {rel.title}
                  </Link>
                  <div className="text-xs font-bold text-[#5C3544] mt-1">
                    Rs. {rel.price.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(rel, 1)}
                  className="mt-4 w-full bg-[#F9EEF1] hover:bg-[#5C3544] text-[#5C3544] hover:text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Bag</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* STICKY BOTTOM BUY BAR (Appears on scroll) */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#D4A0B0]/30 shadow-2xl py-3 px-4 sm:px-8 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-[#FDF6F4] p-1 border border-[#D4A0B0]/30 flex-shrink-0 hidden sm:block">
                {product.images?.[0]?.url && (
                  <Image src={product.images[0].url} alt="" fill className="object-contain p-1" sizes="48px" />
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A0E14] line-clamp-1">{product.title}</h4>
                <div className="text-sm font-bold text-[#5C3544]">
                  Rs. {getTierPrice(selectedTier).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isVoucher ? (
                <Link
                  href="/gift-vouchers"
                  className="font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Gift className="w-4 h-4 text-[#D4A0B0]" />
                  <span>Configure in Studio →</span>
                </Link>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!product.availableForSale}
                  className={`font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full shadow-lg transition-all flex items-center gap-2 ${
                    product.availableForSale
                      ? "bg-[#5C3544] hover:bg-[#43232F] text-white cursor-pointer"
                      : "bg-[#EAD9DE] text-[#7E636E] cursor-not-allowed"
                  }`}
                >
                  <ShoppingBag className={`w-4 h-4 ${product.availableForSale ? "text-[#D4A0B0]" : "text-[#7E636E]"}`} />
                  <span>{product.availableForSale ? "Add to Bag" : "Sold Out"}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {upsellProduct && (
        <GiftBoxDecisionModal
          isOpen={isGiftDecisionOpen}
          onClose={handleContinueShoppingGift}
          mainProduct={product}
          giftProduct={upsellProduct}
          onConfigureNow={handleConfigureGiftNow}
          onContinueShopping={handleContinueShoppingGift}
        />
      )}
    </div>
  );
}
