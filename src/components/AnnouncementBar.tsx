"use client";

import React from "react";
import { Sparkles, Truck, ShieldCheck, Smartphone, RotateCcw, Gift } from "lucide-react";

export default function AnnouncementBar() {
  const announcements = [
    { text: "The Gift of Glass Skin: Digital & Keepsake Gift Vouchers Now Live", icon: Gift },
    { text: "Free shipping across Pakistan on orders above Rs 3,999", icon: Truck },
    { text: "100% Guaranteed Authentic Korean Skincare", icon: ShieldCheck },
    { text: "Cash on Delivery (COD) · EasyPaisa · JazzCash Available", icon: Smartphone },
    { text: "7-Day Easy Returns & WhatsApp Glow Support", icon: RotateCcw },
    { text: "Flash Deal: Use code GLOW15 for extra 15% OFF", icon: Sparkles },
  ];

  return (
    <div className="bg-[#5C3544] text-[#FDF6F4] text-xs font-medium tracking-wider uppercase overflow-hidden py-2.5 border-b border-[#D4A0B0]/25 select-none relative z-50">
      <style>{`
        @keyframes annSlide {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ann-marquee-track {
          display: inline-flex !important;
          width: max-content !important;
          white-space: nowrap !important;
          animation: annSlide 55s linear infinite !important;
          will-change: transform;
        }
        .ann-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="ann-marquee-track flex items-center whitespace-nowrap">
        {[...announcements, ...announcements, ...announcements, ...announcements].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-3 px-8 text-[11px] text-[#FDF6F4] flex-shrink-0">
              <Icon className="w-3.5 h-3.5 text-[#D4A0B0] flex-shrink-0" />
              <span className="font-medium tracking-wider">{item.text}</span>
              <span className="text-[#D4A0B0] mx-4 font-serif">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
