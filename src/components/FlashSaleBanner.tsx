"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Clock, Copy, Check, ArrowRight, ShieldCheck, Tag, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function FlashSaleBanner() {
  const { openCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 38,
    seconds: 25,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 38, seconds: 25 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("GLOW15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 select-none">
      <div className="relative max-w-7xl mx-auto rounded-[36px] sm:rounded-[44px] overflow-hidden bg-gradient-to-r from-[#3D1E2B] via-[#4A2635] to-[#2B141E] text-[#FDF6F4] border border-[#D4A0B0]/40 shadow-2xl shadow-[#3D1E2B]/20">
        {/* Layer 1: Abstract Ambient Light Beams & Silk Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4A0B0]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#C59B6D]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-[#BA788C]/15 rounded-full blur-3xl pointer-events-none" />
          {/* Subtle diagonal texture lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4A0B0_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center px-6 sm:px-12 lg:px-16 py-10 sm:py-14">
          {/* Left Column: Promotion Copy, Countdown Timer & Coupon Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4A0B0]/30 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4A0B0]">
                Limited Time Flash Promotion · 24H Exclusive
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[52px] leading-[1.1] font-normal tracking-tight text-[#FDF6F4]">
              Unlock <span className="italic font-normal text-[#D4A0B0]">Extra 15% Off</span> <br className="hidden sm:inline" />
              Your Entire Seoul Ritual
            </h2>

            {/* Editorial Description */}
            <p className="text-sm sm:text-base text-[#FDF6F4]/80 font-normal max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Curated actives formulated to treat stubborn hyperpigmentation, soothe sensitivity, and hydrate deep within South Asian climates. Use code at checkout or apply directly to your bag.
            </p>

            {/* Luxury Countdown Timer Grid */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-2.5">
                {/* Hours Box */}
                <div className="flex flex-col items-center justify-center w-16 sm:w-20 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4A0B0]/30 shadow-inner">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-wider">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#D4A0B0] font-semibold mt-0.5">
                    Hours
                  </span>
                </div>
                <span className="text-2xl font-bold text-[#D4A0B0] -mt-3 animate-pulse">:</span>

                {/* Minutes Box */}
                <div className="flex flex-col items-center justify-center w-16 sm:w-20 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4A0B0]/30 shadow-inner">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-wider">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#D4A0B0] font-semibold mt-0.5">
                    Mins
                  </span>
                </div>
                <span className="text-2xl font-bold text-[#D4A0B0] -mt-3 animate-pulse">:</span>

                {/* Seconds Box */}
                <div className="flex flex-col items-center justify-center w-16 sm:w-20 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4A0B0]/30 shadow-inner">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D4A0B0] tracking-wider">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#D4A0B0] font-semibold mt-0.5">
                    Secs
                  </span>
                </div>
              </div>

              {/* Coupon Box with Copy Action */}
              <div className="flex items-center gap-2 bg-black/45 backdrop-blur-md p-1.5 pl-3.5 rounded-2xl border border-[#D4A0B0]/40 shadow-sm">
                <div className="flex items-center gap-1.5 font-mono">
                  <Tag className="w-3.5 h-3.5 text-[#D4A0B0]" />
                  <span className="text-xs text-[#FDF6F4]/60 uppercase">Code:</span>
                  <span className="font-bold text-white text-sm tracking-widest px-1">
                    GLOW15
                  </span>
                </div>
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-xl bg-[#D4A0B0] hover:bg-white text-[#5C3544] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md transform hover:scale-105"
                  title="Copy coupon code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1A7A4A]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Action Buttons & Trust Highlights */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#products"
                className="w-full sm:w-auto bg-white hover:bg-[#FDF6F4] text-[#5C3544] font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Shop Flash Sale</span>
                <ArrowRight className="w-4 h-4 text-[#BA788C]" />
              </a>

              <button
                onClick={openCart}
                className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-full border border-white/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4A0B0]" />
                <span>Apply To Glow Bag</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Radiant Beauty Model & Silk Abstract Layers */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[4/4.5] rounded-[32px] overflow-hidden border-2 border-white/30 shadow-2xl group">
              {/* Background Model Image with Silk Veil */}
              <Image
                src="/images/promo-beauty-banner.jpg"
                alt="Azyleen Korean Glass Skin Beauty Campaign"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 450px"
                priority
              />

              {/* Gradient Vignette Overlays for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D1E2B]/50 via-transparent to-transparent hidden lg:block" />

              {/* Top Floating Badge */}
              <div className="absolute top-4 left-4 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#1A7A4A] animate-ping" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Seoul Direct Import
                </span>
              </div>

              {/* Top-Right Discount Badge */}
              <div className="absolute top-4 right-4 bg-[#D93025] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                <span>15% OFF</span>
              </div>

              {/* Bottom Editorial Caption on Model */}
              <div className="absolute bottom-5 inset-x-5 text-white space-y-1">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#D4A0B0]">
                  Targeted For South Asian Complexions
                </p>
                <h4 className="font-serif text-xl sm:text-2xl font-normal leading-snug">
                  Real, luminous glass skin results.
                </h4>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-white/80 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4A0B0]" />
                  <span>100% Original Sealed Batch Codes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
