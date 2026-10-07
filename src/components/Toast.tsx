"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Check, X } from "lucide-react";

export default function Toast() {
  const { toastMessage, dismissToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
      <div className="flex items-center gap-3 bg-[#5C3544] text-[#FDF6F4] px-4 py-3.5 rounded-2xl shadow-2xl border border-[#D4A0B0]/30 backdrop-blur-md">
        <div className="w-7 h-7 rounded-full bg-[#D4A0B0]/20 flex items-center justify-center text-[#D4A0B0] flex-shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <p className="text-xs font-medium tracking-wide flex-grow">{toastMessage}</p>
        <button
          onClick={dismissToast}
          className="text-[#FDF6F4]/60 hover:text-[#FDF6F4] transition-colors p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
