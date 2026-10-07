"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, CheckCircle2, ShoppingBag, Droplets, Sun, Sparkle } from "lucide-react";
import { ShopifyProduct } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

interface GlassSkinRoutineProps {
  products: ShopifyProduct[];
}

export default function GlassSkinRoutine({ products }: GlassSkinRoutineProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { addToCart } = useCart();

  const stepProducts = [
    products.find((p) => p.handle.includes("cleansing")) || products[0],
    products.find((p) => p.handle.includes("toner")) || products[1],
    products.find((p) => p.handle.includes("niacinamide") || p.handle.includes("peach")) || products[2],
    products.find((p) => p.handle.includes("suncream") || p.handle.includes("sun-serum")) || products[3],
  ];

  const steps = [
    {
      number: "01",
      name: "Double Cleanse",
      subtitle: "Melt SPF & Clear Clogged Pores",
      icon: Droplets,
      product: stepProducts[0],
      whyItWorks:
        "South Asian climates produce high sebum and trap dust. Korean oil cleansers bind to water-resistant SPF and impurities without stripping your natural lipids.",
      tips: "Massage onto dry face for 60 seconds, then emulsify with warm water.",
    },
    {
      number: "02",
      name: "Prep & Exfoliate",
      subtitle: "Smooth Texture & Prime Skin",
      icon: Sparkle,
      product: stepProducts[1],
      whyItWorks:
        "Gently dissolve dead surface cells and balance pH levels so follow-up serums can penetrate 3x deeper into the dermis.",
      tips: "Apply with a soft cotton pad 3 times weekly in your evening ritual.",
    },
    {
      number: "03",
      name: "Targeted Actives",
      subtitle: "Fade Pigmentation & Dark Spots",
      icon: Sparkles,
      product: stepProducts[2],
      whyItWorks:
        "Korean Niacinamide + Tranexamic Acid formulations inhibit melanin transfer, fading persistent acne marks and sun spots safely on Melanin-rich skin.",
      tips: "Pat 3-4 drops gently until the luminous glass glow emerges.",
    },
    {
      number: "04",
      name: "Seal & Shield",
      subtitle: "Zero White-Cast SPF 50+ Protection",
      icon: Sun,
      product: stepProducts[3],
      whyItWorks:
        "Harmful UV exposure in Pakistan triggers melasma. Our featherlight Centella sunscreens provide broad-spectrum SPF 50+ PA++++ with zero ghosting or greasy residue.",
      tips: "Apply two finger lengths every morning, even when indoors.",
    },
  ];

  const current = steps[activeStep];

  const handleAddBundle = () => {
    stepProducts.forEach((p) => {
      if (p) addToCart(p);
    });
  };

  return (
    <section id="routine" className="py-20 sm:py-28 bg-[#F9EEF1]/60 relative overflow-hidden scroll-mt-20">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4A0B0]/20 rounded-full blur-3xl glow-aura pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#7A4F5C]/15 rounded-full blur-3xl glow-aura pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Headline */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-[#D4A0B0]/30 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5C3544] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
            <span>The Azyleen Ritual</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A0E14] font-normal tracking-tight">
            Your 4-Step Path to Glass Skin
          </h2>
          <p className="text-sm sm:text-base text-[#5C3A46] mt-3">
            Simple, science-backed Korean layering designed to thrive in Pakistani heat and humidity.
          </p>
        </div>

        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                  isActive
                    ? "bg-[#5C3544] text-white border-[#5C3544] shadow-xl scale-[1.02]"
                    : "bg-white/90 text-[#1A0E14] border-[#D4A0B0]/30 hover:bg-white hover:border-[#BA788C]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-serif text-lg font-bold ${
                      isActive ? "text-[#D4A0B0]" : "text-[#7A4F5C]"
                    }`}
                  >
                    {step.number}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center ${
                      isActive ? "bg-white/20 text-[#D4A0B0]" : "bg-[#F9EEF1] text-[#7A4F5C]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-tight">{step.name}</h4>
                  <p
                    className={`text-[11px] line-clamp-1 mt-0.5 ${
                      isActive ? "text-white/80" : "text-[#7E636E]"
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Showcase Card with Beauty Application Image */}
        <div className="bg-white rounded-[32px] p-6 sm:p-10 border border-[#D4A0B0]/30 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Dual Imagery (Product & Serum Application Shot) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 items-center">
            {/* Beauty Editorial Shot */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md border border-[#D4A0B0]/20 bg-[#FDF6F4]">
              <Image
                src="/images/serum-application.jpg"
                alt="Dewy Korean Skincare Application"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 300px"
              />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-[#5C3544] text-center border border-[#D4A0B0]/20">
                Luminous Dewy Application
              </div>
            </div>

            {/* Step Product Showcase */}
            <div className="flex flex-col justify-between h-full bg-[#FDF6F4] p-4 rounded-2xl border border-[#D4A0B0]/20">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white p-3 flex items-center justify-center shadow-xs">
                {current.product?.images?.[0]?.url ? (
                  <Image
                    src={current.product.images[0].url}
                    alt={current.product.title}
                    fill
                    className="object-contain p-2 hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                ) : (
                  <div className="font-serif text-lg text-[#BA788C]">Step {current.number}</div>
                )}
                <div className="absolute top-2 left-2 bg-[#5C3544] text-white px-2 py-0.5 rounded-full text-[9px] font-bold uppercase">
                  Step {current.number}
                </div>
              </div>

              {current.product && (
                <div className="mt-3 space-y-1.5">
                  <span className="text-[9.5px] font-bold uppercase text-[#BA788C]">
                    {current.product.vendor}
                  </span>
                  <p className="text-xs font-semibold text-[#1A0E14] line-clamp-1">
                    {current.product.title}
                  </p>
                  <p className="text-sm font-bold text-[#5C3544]">
                    Rs. {current.product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => addToCart(current.product)}
                    className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Why it works & Pro-Tips */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#BA788C]">
                Why Step {current.number} Is Essential
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-[#1A0E14] font-medium mt-1 leading-tight">
                {current.name}: {current.subtitle}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-[#5C3A46] leading-relaxed">
              {current.whyItWorks}
            </p>

            <div className="p-4 rounded-2xl bg-[#FDF6F4] border border-[#D4A0B0]/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#1A7A4A] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs font-bold text-[#5C3544] block">
                  Pro-Tip for South Asian Skin:
                </strong>
                <p className="text-xs text-[#5C3A46] mt-0.5">{current.tips}</p>
              </div>
            </div>

            {/* High-Contrast Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleAddBundle}
                className="w-full sm:w-auto bg-[#5C3544] hover:bg-[#43232F] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#5C3544]/25 hover:shadow-xl transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#D4A0B0]" />
                <span>Add Full 4-Step Routine to Bag</span>
              </button>

              <a
                href="https://wa.me/923252867992?text=Salam%20Azyleen!%20Can%20you%20help%20me%20customize%20my%20skincare%20routine?"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-xs font-bold text-[#128C7E] hover:text-[#075E54] flex items-center justify-center gap-1.5 py-3 transition-colors"
              >
                <span>Ask Skincare Specialist on WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
