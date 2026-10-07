"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Clock, Copy, Check } from "lucide-react";

export default function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 19,
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
        return { hours: 5, minutes: 0, seconds: 0 };
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
    <section className="py-6 bg-[#5C3544] text-[#FDF6F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left: Offer and Timer */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4A0B0]/20 flex items-center justify-center text-[#D4A0B0] flex-shrink-0">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#D4A0B0]">
                  Limited Time Glow Offer
                </span>
                <span className="bg-[#D93025] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  15% OFF
                </span>
              </div>
              <p className="text-sm sm:text-base font-serif text-[#FDF6F4] mt-0.5">
                Flash Sale Ends in{" "}
                <span className="font-mono font-bold text-[#D4A0B0]">
                  {String(timeLeft.hours).padStart(2, "0")}h :{" "}
                  {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </p>
            </div>
          </div>

          {/* Right: Coupon Code & Copy Action */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-black/30 border border-[#D4A0B0]/30 rounded-xl flex items-center gap-2 font-mono text-xs tracking-wider">
              <span className="text-[#FDF6F4]/60">Use Code:</span>
              <span className="font-bold text-[#D4A0B0] text-sm tracking-widest">GLOW15</span>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-[#D4A0B0] hover:bg-[#BA788C] text-[#5C3544] font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
