"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Gift, Check, ArrowRight, X, Heart } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";

interface GiftBoxDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mainProduct: ShopifyProduct;
  giftProduct: ShopifyProduct;
  onConfigureNow: () => void;
  onContinueShopping: () => void;
}

export default function GiftBoxDecisionModal({
  isOpen,
  onClose,
  mainProduct,
  giftProduct,
  onConfigureNow,
  onContinueShopping,
}: GiftBoxDecisionModalProps) {
  if (!isOpen) return null;

  const mainImg = mainProduct.images?.[0]?.url || "";
  const giftImg = giftProduct.images?.[0]?.url || "/images/azyleen-luxury-gift-box.jpg";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg bg-[#FDF6F4] text-[#1A0E14] rounded-3xl shadow-2xl border border-[#D4A0B0]/40 overflow-hidden transform transition-all animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#D4A0B0] via-[#5C3544] to-[#C59B6D]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-[#7E636E] hover:text-[#5C3544] transition-colors border border-[#D4A0B0]/30 shadow-xs cursor-pointer z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Badge */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/40 text-[#5C3544] text-[11px] font-bold uppercase tracking-widest">
              <Gift className="w-3.5 h-3.5 text-[#BA788C]" />
              Luxury Duo Bundle
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl sm:text-3xl text-center text-[#5C3544] font-medium leading-tight">
            Personalize Your Gift Box
          </h3>

          <p className="text-xs sm:text-sm text-center text-[#7E636E] mt-2 max-w-sm mx-auto leading-relaxed">
            <span className="text-[#1A7A4A] font-semibold flex items-center justify-center gap-1 inline-flex">
              <Check className="w-3.5 h-3.5" /> {mainProduct.title} added to bag!
            </span>
            <br />
            Your bundle includes the <strong>{giftProduct.title}</strong>. How would you like to proceed?
          </p>

          {/* Bundle Pair Visual Card */}
          <div className="my-5 p-4 rounded-2xl bg-white/90 border border-[#D4A0B0]/30 shadow-sm flex items-center justify-between gap-3">
            {/* Primary Product */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-14 h-14 rounded-xl bg-[#FDF6F4] p-1 border border-[#D4A0B0]/30 flex-shrink-0 overflow-hidden">
                {mainImg ? (
                  <Image src={mainImg} alt={mainProduct.title} fill className="object-contain p-1" sizes="56px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#D4A0B0]">Azyleen</div>
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#1A7A4A] tracking-wider block">Added to bag</span>
                <p className="text-xs font-semibold text-[#1A0E14] truncate max-w-[120px] sm:max-w-[140px]">
                  {mainProduct.title}
                </p>
              </div>
            </div>

            <span className="text-lg font-serif font-bold text-[#C59B6D] flex-shrink-0">+</span>

            {/* Gift Box */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-14 h-14 rounded-xl bg-[#FDF6F4] p-1 border border-[#D4A0B0]/30 flex-shrink-0 overflow-hidden">
                {giftImg ? (
                  <Image src={giftImg} alt={giftProduct.title} fill className="object-contain p-1" sizes="56px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[#D4A0B0]">Gift Box</div>
                )}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#C59B6D] tracking-wider block">Requires Note</span>
                <p className="text-xs font-semibold text-[#5C3544] truncate max-w-[120px] sm:max-w-[140px]">
                  {giftProduct.title}
                </p>
              </div>
            </div>
          </div>

          {/* Luxury Keepsake Highlights */}
          <div className="bg-[#FAF3F0] rounded-xl p-3 border border-[#D4A0B0]/25 text-[11px] text-[#5C3A46] space-y-1.5 mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B6D] flex-shrink-0" />
              <span>Includes satin ribbon keepsake packaging and authentic Seoul formulation certificate.</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-[#BA788C] flex-shrink-0" />
              <span>Complimentary handwritten or gold-foil stamped personalized message card.</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            {/* Primary: Redirect to Gifting Studio */}
            <button
              onClick={onConfigureNow}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              <span>Customize in Gifting Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary: Continue Shopping (Configure Later) */}
            <button
              onClick={onContinueShopping}
              className="w-full py-3 px-5 rounded-2xl bg-white hover:bg-[#F9EEF1] text-[#5C3544] border border-[#D4A0B0]/40 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Continue Shopping</span>
              <span className="text-[11px] text-[#7E636E] font-normal">(I&apos;ll configure before checkout)</span>
            </button>
          </div>

          {/* Gentle reminder notice */}
          <p className="text-[10px] text-center text-[#7E636E] mt-4">
            Don&apos;t worry — we&apos;ll remind you in your bag before checkout so your gift isn&apos;t sent blank!
          </p>
        </div>
      </div>
    </div>
  );
}
