"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

export default function WhatsAppFloat() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2.5">
      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-white text-[#5C3544] shadow-xl border border-[#D4A0B0]/30 flex items-center justify-center hover:bg-[#F9EEF1] transition-all cursor-pointer animate-in fade-in zoom-in"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* WhatsApp Glow Concierge */}
      <a
        href="https://wa.me/923252867992?text=Salam%20Azyleen!%20I%20would%20like%20some%20help%20choosing%20the%20right%20Korean%20skincare%20product%20for%20my%20skin."
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#128C7E] text-white shadow-2xl hover:bg-[#075E54] transition-all cursor-pointer hover:scale-105"
        title="Chat with Skincare Specialist"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-white animate-ping" />
        </div>
        <span className="hidden sm:inline text-xs font-semibold tracking-wide pr-1">
          Glow Advice 💬
        </span>
      </a>
    </div>
  );
}
