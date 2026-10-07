"use client";

import React, { useState } from "react";
import { Sparkles, Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#5C3544] text-[#FDF6F4] relative overflow-hidden">
      {/* Decorative floral glow rings */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4A0B0]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#C59B6D]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4A0B0]/30 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A0B0] mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive VIP Perks</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FDF6F4] leading-tight">
          Join the Azyleen Glow Circle
        </h2>

        <p className="text-sm sm:text-base text-[#FDF6F4]/80 max-w-xl mx-auto mt-4 leading-relaxed">
          Be the first to access limited Korean restocks, secret flash discounts, and our comprehensive South Asian skin guide.
        </p>

        {submitted ? (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-[#D4A0B0]/30 max-w-md mx-auto space-y-3 animate-in fade-in duration-300">
            <div className="w-12 h-12 rounded-full bg-[#1A7A4A]/20 text-[#1A7A4A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-[#D4A0B0]" />
            </div>
            <h3 className="font-serif text-xl font-medium text-[#FDF6F4]">
              Welcome to the Glow Circle!
            </h3>
            <p className="text-xs text-[#FDF6F4]/80">
              Here is your exclusive voucher for your first order:
            </p>
            <div className="p-3 bg-black/30 rounded-xl font-mono text-base font-bold text-[#D4A0B0] tracking-widest border border-[#D4A0B0]/30">
              WELCOME500
            </div>
            <p className="text-[11px] text-[#FDF6F4]/60">
              Enjoy Rs. 500 off when ordering above Rs. 4,000.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-1.5 rounded-full border border-[#D4A0B0]/30 backdrop-blur-md">
              <div className="flex items-center gap-2 px-4 py-2 flex-grow">
                <Mail className="w-4 h-4 text-[#D4A0B0]" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-xs text-[#FDF6F4] placeholder-[#FDF6F4]/60 focus:outline-none w-full"
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3 rounded-full bg-[#D4A0B0] hover:bg-white text-[#5C3544] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Join Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[11px] text-[#FDF6F4]/60 mt-3">
              🔒 No spam ever. Unsubscribe with a single click at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
