import React from "react";

export default function MarqueeTicker() {
  const items = [
    "Glass Skin Rituals",
    "Formulated for South Asian Climates",
    "100% Authentic Korean Actives",
    "Gentle On Sensitive Skin",
    "Cruelty-Free & Dermatologist Tested",
    "Direct from Seoul to Pakistan",
    "No Heavy White-Cast Formulations",
    "Lahore · Karachi · Islamabad · Nationwide COD",
  ];

  return (
    <div className="py-4 bg-[#F9EEF1] border-y border-[#D4A0B0]/30 overflow-hidden select-none relative shadow-xs">
      <style>{`
        @keyframes ribbonMarqueeSlide {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ribbon-marquee-track {
          display: inline-flex !important;
          width: max-content !important;
          white-space: nowrap !important;
          animation: ribbonMarqueeSlide 30s linear infinite !important;
          will-change: transform;
        }
        .ribbon-marquee-track:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="ribbon-marquee-track flex items-center whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div
            key={idx}
            className="flex items-center gap-6 px-6 text-xs sm:text-sm font-serif tracking-[0.2em] text-[#5C3544] uppercase font-semibold flex-shrink-0"
          >
            <span>{text}</span>
            <span className="text-[#BA788C] text-base">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
