import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Droplets, ShieldCheck, Sun, Heart, Flame } from "lucide-react";

export default function CategoryShowcase() {
  const categories = [
    {
      title: "Bestsellers",
      subtitle: "Verified Seoul Favorites",
      desc: "Top-rated formulations loved by 2,000+ Pakistani skincare vanities.",
      href: "/bestsellers",
      badge: "Top Rated",
      icon: Flame,
      tag: "Seoul Bestsellers",
      gradient: "from-[#FDF6F4] via-white to-[#F9EEF1]",
      accent: "#5C3544",
    },
    {
      title: "Korean Serums",
      subtitle: "Potent Clinical Actives",
      desc: "Niacinamide, Tranexamic Acid, and Snail Mucin to fade stubborn dark spots.",
      href: "/serums",
      badge: "Targeted Glow",
      icon: Droplets,
      tag: "High Potency",
      gradient: "from-[#F9EEF1] via-white to-[#FDF6F4]",
      accent: "#BA788C",
    },
    {
      title: "Barrier Moisturisers",
      subtitle: "Ceramide & Cica Repair",
      desc: "Non-greasy soothing gel-creams engineered for Pakistani humidity.",
      href: "/moisturisers",
      badge: "Barrier Science",
      icon: ShieldCheck,
      tag: "Non-Comedogenic",
      gradient: "from-white via-[#FDF6F4] to-[#F9EEF1]",
      accent: "#7A4F5C",
    },
    {
      title: "Korean Sunscreens",
      subtitle: "SPF 50+ PA++++ Shields",
      desc: "Air-fit featherlight sun protection guaranteed zero white cast.",
      href: "/sunscreen",
      badge: "Zero White Cast",
      icon: Sun,
      tag: "Daily Essential",
      gradient: "from-[#FDF6F4] via-white to-[#F9EEF1]",
      accent: "#1A7A4A",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FDF6F4] border-b border-[#D4A0B0]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4A0B0]/40 shadow-xs mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5C3544]">
                Curated Categories · Direct From Seoul
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A0E14] tracking-tight">
              Explore By <span className="italic font-serif text-[#7A4F5C]">Formulation</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#7E636E] mt-2 max-w-xl">
              Select your targeted routine category to browse authentic, batch-coded formulations in stock for express dispatch.
            </p>
          </div>

          <Link
            href="/bestsellers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5C3544] hover:text-[#BA788C] transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                href={cat.href}
                className="group relative p-6 sm:p-7 rounded-[32px] bg-white border border-[#D4A0B0]/30 shadow-xs hover:shadow-xl hover:border-[#BA788C]/60 transition-all duration-300 flex flex-col justify-between block cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#F9EEF1] text-[#5C3544] flex items-center justify-center border border-[#D4A0B0]/25 shadow-2xs group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5 text-[#BA788C]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C3544] bg-[#FDF6F4] px-3 py-1 rounded-full border border-[#D4A0B0]/30">
                      {cat.badge}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#BA788C] block mb-1">
                    {cat.tag}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#1A0E14] group-hover:text-[#7A4F5C] transition-colors mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#7E636E] leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D4A0B0]/20 flex items-center justify-between text-xs font-bold text-[#5C3544] group-hover:text-[#BA788C] transition-colors">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
