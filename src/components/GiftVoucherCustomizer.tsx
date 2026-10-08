"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gift,
  Sparkles,
  CheckCircle2,
  Send,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Search,
  Copy,
  Check,
  Heart,
  Calendar,
  Share2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

type VoucherTheme = "midnight-plum" | "rose-gold" | "pearl-cica" | "champagne-gold";

interface Denomination {
  amount: number;
  label: string;
  popular?: boolean;
  tagline: string;
}

const DENOMINATIONS: Denomination[] = [
  { amount: 2500, label: "The Glow Starter", tagline: "Perfect for 1 cult Korean active" },
  { amount: 5000, label: "Barrier Repair Duo", popular: true, tagline: "Active serum + Ceramide barrier cream" },
  { amount: 10000, label: "Seoul Ritual Suite", tagline: "Complete 4-step glass skin routine" },
  { amount: 25000, label: "Empress VIP Regimen", tagline: "Ultimate royal keepsake hamper" },
];

export default function GiftVoucherCustomizer() {
  const { addToCart } = useCart();

  // Customization state
  const [selectedTheme, setSelectedTheme] = useState<VoucherTheme>("midnight-plum");
  const [selectedAmount, setSelectedAmount] = useState<number>(2500);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmountValue, setCustomAmountValue] = useState<string>("5000");

  const [deliveryType, setDeliveryType] = useState<"digital" | "physical">("physical");
  const [recipientName, setRecipientName] = useState("Ayesha");
  const [senderName, setSenderName] = useState("Fatima");
  const [recipientContact, setRecipientContact] = useState("");
  const [occasion, setOccasion] = useState("Birthday Glow");
  const [personalMessage, setPersonalMessage] = useState(
    "Wishing you flawless glass skin and endless radiance! Treat yourself to your favorite authentic Seoul holy grails. ✨"
  );

  // Sync with URL query parameters on mount (if navigated from product page with ?amount=5000)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlAmount = params.get("amount");
      if (urlAmount) {
        const parsed = parseInt(urlAmount, 10);
        if (!isNaN(parsed) && parsed > 0) {
          if (DENOMINATIONS.some((d) => d.amount === parsed)) {
            setSelectedAmount(parsed);
          } else {
            setIsCustomAmount(true);
            setCustomAmountValue(parsed.toString());
          }
        }
      }
      const urlFormat = params.get("format");
      if (urlFormat === "digital" || urlFormat === "physical") {
        setDeliveryType(urlFormat);
      }
    }
  }, []);

  const [copiedCode, setCopiedCode] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Voucher Checker state
  const [checkCode, setCheckCode] = useState("");
  const [checkResult, setCheckResult] = useState<{
    valid: boolean;
    balance?: number;
    message?: string;
  } | null>(null);

  const finalAmount = isCustomAmount ? Math.max(1500, Number(customAmountValue) || 1500) : selectedAmount;
  const voucherCode = `AZ-GLOW-${Math.abs((recipientName + senderName).split("").reduce((acc, c) => acc + c.charCodeAt(0), 1000) * 7).toString().slice(0, 4)}-${finalAmount.toString().slice(0, 2)}`;

  // Handle Add To Cart
  const handleAddToCart = () => {
    setIsAdding(true);

    // Create a pseudo Shopify product for the gift voucher
    const voucherProduct = {
      id: `voucher-${Date.now()}`,
      title: `Azyleen ${deliveryType === "physical" ? "Luxury Keepsake Box" : "Digital"} Gift Voucher (Rs. ${finalAmount.toLocaleString()})`,
      handle: "gift-voucher",
      description: `Recipient: ${recipientName || "Valued Customer"} | From: ${senderName || "A Friend"} | Occasion: ${occasion} | Format: ${deliveryType === "physical" ? "Foil Keepsake Box with Satin Ribbon" : "Instant Digital E-Voucher"}`,
      vendor: "Azyleen Luxe Gifting",
      price: finalAmount + (deliveryType === "physical" ? 350 : 0),
      currency: "PKR",
      availableForSale: true,
      images: [
        {
          url: "/images/azyleen-luxury-gift-box.jpg",
          altText: "Azyleen Luxury Skincare Gift Box",
        },
      ],
      variants: [],
      category: "gifting",
      concern: "All Skin Types · The Gift of Radiant Skin",
      rating: 5.0,
      reviewsCount: 128,
    };

    addToCart(voucherProduct as any, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  // WhatsApp Order
  const handleWhatsAppOrder = () => {
    const text = `Salam Azyleen Gifting Team! I would like to order a Gift Voucher:%0A%0A*Type:* ${deliveryType === "physical" ? "Physical Luxury Keepsake Box (TCS)" : "Instant Digital E-Voucher"}%0A*Amount:* Rs. ${finalAmount.toLocaleString()}%0A*Occasion:* ${occasion}%0A*To:* ${recipientName}%0A*From:* ${senderName}%0A*Recipient WhatsApp/Email:* ${recipientContact || "Not provided"}%0A*Personal Note:* "${personalMessage}"%0A*Voucher Code Preview:* ${voucherCode}%0A%0APlease share payment / delivery instructions. Thank you!`;
    window.open(`https://wa.me/923252867992?text=${text}`, "_blank");
  };

  // Copy code helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText(voucherCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Balance lookup simulation
  const handleCheckVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = checkCode.trim().toUpperCase();
    if (!clean) return;

    if (clean.includes("GLOW") || clean.includes("GIFT") || clean.includes("AZ")) {
      setCheckResult({
        valid: true,
        balance: 5000,
        message: "Active & Valid! This voucher has an available balance of Rs. 5,000 applicable on all products with 12 months validity.",
      });
    } else {
      setCheckResult({
        valid: false,
        message: "Voucher code not recognized. Please double check the 8-digit code or contact Azyleen VIP Concierge on WhatsApp.",
      });
    }
  };

  // Theme styles for the card
  const themeStyles = {
    "midnight-plum": {
      cardBg: "bg-gradient-to-br from-[#2D121F] via-[#3E1A2C] to-[#1F0B15]",
      textPrimary: "text-[#FFF6F9]",
      textSecondary: "text-[#D4A0B0]",
      border: "border-[#D4A0B0]/40",
      accent: "text-[#F8E1E8]",
      badge: "bg-[#D4A0B0]/20 text-[#F8E1E8] border border-[#D4A0B0]/40",
      goldFoil: "from-[#F3E5D8] via-[#E2B98E] to-[#FAF1E8]",
    },
    "rose-gold": {
      cardBg: "bg-gradient-to-br from-[#FFF5F7] via-[#F8E4EB] to-[#F1D0DC]",
      textPrimary: "text-[#4A2030]",
      textSecondary: "text-[#874A60]",
      border: "border-[#BA788C]/40",
      accent: "text-[#5C2A3D]",
      badge: "bg-white/80 text-[#5C2A3D] border border-[#BA788C]/30",
      goldFoil: "from-[#BA788C] via-[#C88A9D] to-[#BA788C]",
    },
    "pearl-cica": {
      cardBg: "bg-gradient-to-br from-[#F4F9F6] via-[#E7F3EC] to-[#D5EADB]",
      textPrimary: "text-[#1C3D2B]",
      textSecondary: "text-[#437559]",
      border: "border-[#7CA88E]/40",
      accent: "text-[#1C3D2B]",
      badge: "bg-white/80 text-[#1C3D2B] border border-[#7CA88E]/40",
      goldFoil: "from-[#2C5D40] via-[#5C9472] to-[#2C5D40]",
    },
    "champagne-gold": {
      cardBg: "bg-gradient-to-br from-[#FAF5EC] via-[#F3E8D3] to-[#E8D6B7]",
      textPrimary: "text-[#3D2C1A]",
      textSecondary: "text-[#7A5C38]",
      border: "border-[#C59B6D]/40",
      accent: "text-[#3D2C1A]",
      badge: "bg-white/80 text-[#3D2C1A] border border-[#C59B6D]/40",
      goldFoil: "from-[#9D7747] via-[#C59B6D] to-[#9D7747]",
    },
  }[selectedTheme];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* SECTION 1: Interactive Voucher Studio */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Controls & Personalization (7 Cols) */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-9 rounded-[32px] border border-[#D4A0B0]/25 shadow-sm">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#BA788C] bg-[#FDF6F4] px-3.5 py-1.5 rounded-full border border-[#D4A0B0]/30 inline-block mb-2">
              ✦ Personalised Korean Skincare Pass
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A0E14] font-medium leading-tight">
              Craft Your Personalized Gift Voucher
            </h2>
            <p className="text-xs sm:text-sm text-[#7E636E] mt-1.5 leading-relaxed">
              Tailor every element from the metallic card theme to the personal message. Redeemable on 100% of authentic Korean serums, creams, and UV sunscreens.
            </p>
          </div>

          {/* STEP 1: Select Format */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C3544] flex items-center justify-between">
              <span>Step 1: Choose Delivery Format</span>
              <span className="text-[11px] text-[#7E636E] lowercase font-normal">Digital or Physical box</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryType("digital")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  deliveryType === "digital"
                    ? "border-[#5C3544] bg-[#FDF6F4] ring-2 ring-[#5C3544]/20 shadow-xs"
                    : "border-[#D4A0B0]/25 hover:border-[#BA788C]/40 bg-white"
                }`}
              >
                <div className={`p-2 rounded-xl ${deliveryType === "digital" ? "bg-[#5C3544] text-white" : "bg-[#F9EEF1] text-[#7A4F5C]"}`}>
                  <Send className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A0E14] flex items-center gap-2">
                    <span>Instant Digital E-Voucher</span>
                    <span className="text-[9.5px] font-bold text-[#1A7A4A] bg-[#ECFDF5] px-2 py-0.5 rounded-full">FREE</span>
                  </div>
                  <p className="text-[11px] text-[#7E636E] mt-0.5 leading-snug">
                    Instant delivery via Email or WhatsApp with printable card & serial code.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType("physical")}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3.5 ${
                  deliveryType === "physical"
                    ? "border-[#5C3544] bg-[#FDF6F4] ring-2 ring-[#5C3544]/20 shadow-xs"
                    : "border-[#D4A0B0]/25 hover:border-[#BA788C]/40 bg-white"
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#D4A0B0]/30 shadow-2xs bg-[#FDF6F4]">
                  <Image
                    src="/images/azyleen-luxury-gift-box.jpg"
                    alt="Luxury Keepsake Box"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1A0E14] flex items-center gap-2">
                    <span>Foil Keepsake Gift Box</span>
                    <span className="text-[9.5px] font-bold text-[#5C3544] bg-[#F9EEF1] px-2 py-0.5 rounded-full">+Rs. 350</span>
                  </div>
                  <p className="text-[11px] text-[#7E636E] mt-0.5 leading-snug">
                    Signature blush keepsake box with satin plum ribbon &amp; embossed rose gold lettering via TCS.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* STEP 2: Select Card Visual Theme */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C3544] flex items-center justify-between">
              <span>Step 2: Choose Card Aesthetic Theme</span>
              <span className="text-[11px] text-[#BA788C] font-semibold">{selectedTheme.replace("-", " ").toUpperCase()}</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: "midnight-plum", label: "Midnight Plum", bg: "bg-[#331422]", border: "border-[#BA788C]" },
                { id: "rose-gold", label: "Rose Petal", bg: "bg-[#F3D0DC]", border: "border-[#BA788C]" },
                { id: "pearl-cica", label: "Centella Sage", bg: "bg-[#D5EADB]", border: "border-[#7CA88E]" },
                { id: "champagne-gold", label: "Champagne Foil", bg: "bg-[#E8D6B7]", border: "border-[#C59B6D]" },
              ].map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setSelectedTheme(theme.id as VoucherTheme)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2 ${
                    selectedTheme === theme.id
                      ? "border-[#5C3544] ring-2 ring-[#5C3544]/25 shadow-xs bg-white font-bold"
                      : "border-[#D4A0B0]/25 hover:border-[#BA788C]/40 bg-white text-[#7E636E]"
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full ${theme.bg} border ${theme.border} shadow-2xs block`} />
                  <span className="text-[11px] font-medium leading-tight">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: Denomination Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C3544] flex items-center justify-between">
              <span>Step 3: Select Voucher Value (PKR)</span>
              <span className="text-xs font-bold text-[#5C3544]">
                Rs. {finalAmount.toLocaleString()}
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DENOMINATIONS.map((d) => {
                const isSelected = !isCustomAmount && selectedAmount === d.amount;
                return (
                  <button
                    key={d.amount}
                    type="button"
                    onClick={() => {
                      setIsCustomAmount(false);
                      setSelectedAmount(d.amount);
                    }}
                    className={`relative p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#5C3544] bg-[#5C3544] text-white shadow-md ring-2 ring-[#5C3544]/20"
                        : "border-[#D4A0B0]/25 hover:border-[#BA788C]/40 bg-[#FDF6F4]/60 text-[#1A0E14]"
                    }`}
                  >
                    {d.popular && (
                      <span className="absolute -top-2.5 right-2 bg-[#D93025] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    <div className="text-xs sm:text-sm font-bold">Rs. {d.amount.toLocaleString()}</div>
                    <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? "text-[#F8E1E8]" : "text-[#7E636E]"}`}>
                      {d.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Amount Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setIsCustomAmount(!isCustomAmount)}
                className="text-[11px] font-bold uppercase tracking-wider text-[#BA788C] hover:text-[#5C3544] transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{isCustomAmount ? "← Pick standard amount" : "+ Or enter custom denomination"}</span>
              </button>

              {isCustomAmount && (
                <div className="mt-2 flex items-center gap-2 max-w-xs">
                  <span className="text-xs font-bold text-[#5C3544]">Rs.</span>
                  <input
                    type="number"
                    min="1500"
                    step="500"
                    value={customAmountValue}
                    onChange={(e) => setCustomAmountValue(e.target.value)}
                    placeholder="Enter amount (min Rs. 1500)"
                    className="flex-grow px-3.5 py-2 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* STEP 4: Personalization Fields */}
          <div className="space-y-4 pt-2 border-t border-[#D4A0B0]/20">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C3544]">
              Step 4: Personalization &amp; Message
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-[#7E636E] block mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="e.g. Ayesha Khan"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#7E636E] block mb-1">
                  From (Your Name) *
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Fatima"
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#7E636E] block mb-1">
                  Occasion Tag
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                >
                  <option value="Birthday Glow">Birthday Celebration 🎂</option>
                  <option value="Bridal Glow Ritual">Bridal Skincare Prep 👰</option>
                  <option value="Eid Mubarak">Eid Mubarak 🌙</option>
                  <option value="Thank You & Radiance">Thank You Note 💖</option>
                  <option value="Just Because / Self-Care">Self-Care Glow ✦</option>
                  <option value="Anniversary Radiance">Anniversary Gift 💍</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#7E636E] block mb-1">
                  Recipient WhatsApp or Email (Optional)
                </label>
                <input
                  type="text"
                  value={recipientContact}
                  onChange={(e) => setRecipientContact(e.target.value)}
                  placeholder="0321XXXXXXX or email@..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-[#7E636E] block mb-1">
                Custom Personal Note (Max 180 chars)
              </label>
              <textarea
                value={personalMessage}
                maxLength={180}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={3}
                placeholder="Write your personal heartfelt message..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544] resize-none"
              />
              <div className="flex justify-between text-[10px] text-[#7E636E] mt-1">
                <span>Displays directly on the voucher card preview</span>
                <span>{personalMessage.length}/180</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-[#D4A0B0]/20">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-[#5C3544] hover:bg-[#43232F] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingBag className={`w-4 h-4 ${isAdding ? "animate-bounce" : ""}`} />
                <span>
                  {isAdding ? "Adding..." : `Add to Bag • Rs. ${(finalAmount + (deliveryType === "physical" ? 350 : 0)).toLocaleString()}`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex-1 bg-[#E7F6F2] hover:bg-[#D5EFE8] text-[#128C7E] border border-[#128C7E]/30 py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-[#128C7E]/20" />
                <span>Gift via WhatsApp Concierge</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[10.5px] text-[#7E636E] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A7A4A]" />
                12-Month Validity
              </span>
              <span>•</span>
              <span>Valid on All 19 Korean Formulations</span>
              <span>•</span>
              <span>COD Eligible for Physical Box</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Live Voucher Card Preview (5 Cols Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BA788C]">
              ✦ Real-time Visual Preview
            </span>
            <h3 className="font-serif text-xl text-[#1A0E14] font-medium mt-0.5">
              The Recipient&rsquo;s Keepsake Card
            </h3>
          </div>

          {/* THE LUXURY VOUCHER CARD */}
          <div
            className={`relative rounded-[28px] p-6 sm:p-7 transition-all duration-500 shadow-2xl overflow-hidden border ${themeStyles.cardBg} ${themeStyles.border}`}
          >
            {/* Background Korean Motif / Watermark */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-36 h-36 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Gift className={`w-3.5 h-3.5 ${themeStyles.accent}`} />
                </div>
                <div>
                  <span className={`font-serif text-base tracking-[0.25em] font-medium uppercase leading-none block ${themeStyles.textPrimary}`}>
                    AZYLEEN
                  </span>
                  <span className={`text-[7.5px] uppercase tracking-[0.28em] block font-mono ${themeStyles.textSecondary}`}>
                    Seoul Skincare Pass
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${themeStyles.badge}`}>
                {occasion}
              </span>
            </div>

            {/* Card Body & Amount Display */}
            <div className="relative z-10 my-7 space-y-3">
              <div>
                <span className={`text-[9.5px] uppercase font-bold tracking-[0.2em] block ${themeStyles.textSecondary}`}>
                  Gift Value
                </span>
                <div className={`font-serif text-3xl sm:text-4xl font-bold tracking-tight ${themeStyles.textPrimary}`}>
                  Rs. {finalAmount.toLocaleString()}{" "}
                  <span className="text-xs font-sans font-normal tracking-normal opacity-80">PKR</span>
                </div>
              </div>

              {/* To / From Block */}
              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className={`text-[9px] uppercase tracking-wider block font-medium ${themeStyles.textSecondary}`}>
                    For:
                  </span>
                  <span className={`font-serif text-sm font-semibold block truncate ${themeStyles.textPrimary}`}>
                    {recipientName || "Beloved Friend"}
                  </span>
                </div>
                <div>
                  <span className={`text-[9px] uppercase tracking-wider block font-medium ${themeStyles.textSecondary}`}>
                    From:
                  </span>
                  <span className={`font-serif text-sm font-semibold block truncate ${themeStyles.textPrimary}`}>
                    {senderName || "Azyleen Gifting"}
                  </span>
                </div>
              </div>

              {/* Personal Note Box */}
              <div className="p-3 rounded-xl bg-black/10 backdrop-blur-xs border border-white/10 text-[11px] leading-relaxed italic">
                <p className={themeStyles.textPrimary}>&ldquo;{personalMessage}&rdquo;</p>
              </div>
            </div>

            {/* Card Footer with Serial & Hologram */}
            <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className={`text-[8px] font-mono tracking-widest uppercase block ${themeStyles.textSecondary}`}>
                  Voucher Serial No.
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`font-mono text-xs font-bold tracking-wider ${themeStyles.textPrimary}`}>
                    {voucherCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Copy voucher code"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className={`text-[8px] font-mono tracking-widest uppercase block ${themeStyles.textSecondary}`}>
                  Expires In
                </span>
                <span className={`text-[10px] font-medium ${themeStyles.textPrimary}`}>
                  365 Days
                </span>
              </div>
            </div>
          </div>

          {/* Physical Keepsake Box Preview */}
          {deliveryType === "physical" && (
            <div className="rounded-[24px] overflow-hidden border border-[#D4A0B0]/30 bg-white shadow-md p-3.5 space-y-2.5 animate-in fade-in duration-300">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#FDF6F4] border border-[#D4A0B0]/20">
                <Image
                  src="/images/azyleen-luxury-gift-box.jpg"
                  alt="Azyleen Signature Luxury Keepsake Gift Box"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#5C3544]/90 backdrop-blur-xs text-white text-[9.5px] font-bold uppercase tracking-wider shadow-xs">
                  ✦ Signature Gift Box Included
                </div>
              </div>
              <div className="flex items-center justify-between text-xs px-1 text-[#5C3544]">
                <span className="font-serif font-medium">Blush Pink Rigid Box · Plum Satin Bow · Embossed Rose Gold</span>
                <span className="text-[#1A7A4A] font-bold text-[11px] bg-[#ECFDF5] px-2 py-0.5 rounded-full">+Rs. 350 TCS</span>
              </div>
            </div>
          )}

          {/* Quick Perks Pill */}
          <div className="p-4 rounded-2xl bg-white border border-[#D4A0B0]/25 shadow-2xs space-y-2 text-xs text-[#7E636E]">
            <div className="flex items-center gap-2 font-semibold text-[#5C3544]">
              <Sparkles className="w-4 h-4 text-[#BA788C]" />
              <span>How your recipient redeems this:</span>
            </div>
            <ul className="space-y-1.5 text-[11px] pl-5 list-disc marker:text-[#BA788C]">
              <li>They browse Azyleen and add their curated Seoul products to bag.</li>
              <li>At bag checkout or on WhatsApp, they enter code <strong>{voucherCode}</strong>.</li>
              <li>The balance of <strong>Rs. {finalAmount.toLocaleString()}</strong> instantly settles their cart.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 2: Voucher Balance Checker */}
      <section className="bg-gradient-to-br from-[#FDF6F4] via-white to-[#F9EEF1] p-8 sm:p-12 rounded-[36px] border border-[#D4A0B0]/30 shadow-sm">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#BA788C] bg-white px-3.5 py-1.5 rounded-full border border-[#D4A0B0]/30 inline-block shadow-2xs">
            Already Have a Voucher?
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1A0E14] font-medium">
            Check Voucher Balance &amp; Status
          </h3>
          <p className="text-xs sm:text-sm text-[#7E636E]">
            Received a digital card or physical keepsake box? Enter your 8-digit serial number below to view your remaining balance and expiration.
          </p>

          <form onSubmit={handleCheckVoucher} className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-md mx-auto">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-[#BA788C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={checkCode}
                onChange={(e) => setCheckCode(e.target.value)}
                placeholder="e.g. AZ-GLOW-8492 or GLOW15"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#D4A0B0]/40 text-xs font-mono uppercase focus:outline-none focus:border-[#5C3544] shadow-2xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Check Balance
            </button>
          </form>

          {checkResult && (
            <div
              className={`p-4 rounded-2xl text-xs max-w-md mx-auto mt-4 text-left border animate-in fade-in duration-300 ${
                checkResult.valid
                  ? "bg-[#ECFDF5] border-[#10B981]/30 text-[#065F46]"
                  : "bg-[#FEF2F2] border-[#EF4444]/30 text-[#991B1B]"
              }`}
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${checkResult.valid ? "text-[#10B981]" : "text-[#EF4444]"}`} />
                <div>
                  <p className="font-semibold leading-relaxed">{checkResult.message}</p>
                  {checkResult.valid && (
                    <Link
                      href="/bestsellers"
                      className="inline-block mt-2 font-bold uppercase tracking-wider text-[10px] text-[#047857] hover:underline"
                    >
                      Browse Bestsellers to Redeem &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 3: 4 Pillars of Azyleen Luxury Gifting */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Sparkles,
            title: "Never Guess Skin Concerns",
            desc: "Korean skincare is deeply personal. A voucher allows them to pick the exact Niacinamide, Snail Mucin, or SPF 50+ formulated for their unique barrier.",
          },
          {
            icon: Send,
            title: "Instant Same-Minute Gifting",
            desc: "Forgot a birthday or wedding anniversary? Create and transmit a personalized luxury e-voucher in under 60 seconds directly via WhatsApp.",
          },
          {
            icon: Truck,
            title: "Physical Keepsake Foil Box",
            desc: "Prefer hand delivery? We pack an embossed metallic card into a hardcover satin sleeve with TCS express tracking across Pakistan.",
          },
          {
            icon: ShieldCheck,
            title: "365-Day Validity Guarantee",
            desc: "Zero rush. Your recipient has a full year to explore Seoul imports, clinical updates, and seasonal barrier healing additions.",
          },
        ].map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#D4A0B0]/25 shadow-xs space-y-3 transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#F9EEF1] text-[#7A4F5C] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#1A0E14] font-medium">{pillar.title}</h4>
              <p className="text-xs text-[#7E636E] leading-relaxed">{pillar.desc}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
}
