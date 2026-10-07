import React from "react";
import { Sparkles, Sun, Droplets, Shield, ArrowRight } from "lucide-react";

export default function SkinConcernGrid() {
  const concerns = [
    {
      title: "Dark Spots & Melasma",
      subtitle: "Stubborn PIH & Uneven Tone",
      desc: "Inhibit excess melanin transfer caused by intense sun exposure and past breakout marks.",
      icon: Sparkles,
      color: "from-[#F9EEF1] to-[#F4E2E7]",
      badge: "Niacinamide + TXA",
      targetCategory: "serums",
    },
    {
      title: "Sun Defense (No Cast)",
      subtitle: "Weightless Daily Protection",
      desc: "High SPF 50+ PA++++ formulated without white residue or pore-clogging heavy oils.",
      icon: Sun,
      color: "from-[#FDF6E2]/70 to-[#F8EDD3]/70",
      badge: "Centella Asiatica",
      targetCategory: "sunscreen",
    },
    {
      title: "Dullness & Dehydration",
      subtitle: "The Luminous Glass Glow",
      desc: "Replenish moisture deep within the epidermis with fermented peach and snail filtrate.",
      icon: Droplets,
      color: "from-[#EBF5FA] to-[#E2F0F7]",
      badge: "Fermented Actives",
      targetCategory: "serums",
    },
    {
      title: "Compromised Barrier",
      subtitle: "Redness, Flaking & Sensitivity",
      desc: "Ceramides and soothing botanicals to rebuild skin resilience against pollution.",
      icon: Shield,
      color: "from-[#EDF3EF] to-[#E3EDE6]",
      badge: "Ceramide Complex",
      targetCategory: "moisturisers",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white/70 border-b border-[#D4A0B0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C]">
            Targeted Solutions
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A0E14] font-normal tracking-tight mt-2">
            Shop by Skin Concern
          </h2>
          <p className="text-sm sm:text-base text-[#5C3A46] mt-3">
            Every skin has a distinct story. Find the exact Korean active formulated to restore your barrier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {concerns.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href="#products"
                className={`group p-6 rounded-3xl bg-gradient-to-b ${item.color} border border-[#D4A0B0]/20 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-white/80 shadow-xs flex items-center justify-center text-[#5C3544] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A4F5C] bg-white/70 px-2.5 py-1 rounded-full border border-[#D4A0B0]/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-[#1A0E14] group-hover:text-[#5C3544] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#BA788C] mt-0.5">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-[#5C3A46] mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 flex items-center text-xs font-semibold text-[#5C3544] group-hover:text-[#BA788C] transition-colors">
                  <span>Explore Formulations</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
