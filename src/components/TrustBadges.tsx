import React from "react";
import { Truck, ShieldCheck, CreditCard, Sparkles } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: Truck,
      title: "Free Express Shipping",
      desc: "Free nationwide delivery on orders over Rs 3,999. Dispatched in 24 hours.",
    },
    {
      icon: ShieldCheck,
      title: "100% Guaranteed Original",
      desc: "Authentic batch-coded imports directly from Seoul, Korea. Zero dupes.",
    },
    {
      icon: CreditCard,
      title: "COD & Digital Wallets",
      desc: "Cash on Delivery, EasyPaisa, JazzCash, or Visa/Mastercard at checkout.",
    },
    {
      icon: Sparkles,
      title: "Glow Routine Consultation",
      desc: "Complimentary South Asian skin analysis & tips via WhatsApp support.",
    },
  ];

  return (
    <section className="py-12 bg-white/60 border-b border-[#D4A0B0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-[#FDF6F4] border border-[#D4A0B0]/25 transition-all duration-300 hover:shadow-md hover:border-[#7A4F5C]/40 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F9EEF1] flex items-center justify-center text-[#7A4F5C] group-hover:bg-[#7A4F5C] group-hover:text-[#FDF6F4] transition-colors flex-shrink-0">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#1A0E14] mb-1 tracking-tight font-serif">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-[#7E636E] leading-relaxed">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
