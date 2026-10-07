import React from "react";
import Image from "next/image";
import { Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

export default function BrandStory() {
  const stats = [
    { value: "18+", label: "Seoul Formulations", sub: "Imported direct & batch-coded" },
    { value: "2,000+", label: "Happy Customers", sub: "Across Lahore, Karachi, Islamabad" },
    { value: "4.9 ★", label: "Average Rating", sub: "Verified real buyer reviews" },
    { value: "100%", label: "Authentic Original", sub: "Guaranteed or full refund" },
  ];

  return (
    <section id="story" className="py-20 sm:py-28 bg-[#FDF6F4] relative overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/30 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7A4F5C]">
              <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
              <span>Born in Lahore · Crafted for You</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1A0E14] font-normal leading-[1.12]">
              Born from a love for <br />
              <span className="italic text-[#7A4F5C] font-serif">real skin rituals.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#5C3A46] leading-relaxed">
              Azyleen was founded in Lahore with a single conviction: Pakistani skin deserves authentic, gentle, and scientifically proven Korean skincare without the fear of counterfeits or exorbitant markups.
            </p>

            <p className="text-sm sm:text-base text-[#7E636E] leading-relaxed">
              South Asian skin behaves uniquely under harsh sunlight and humidity. We deliberately curate K-beauty products enriched with Centella Asiatica, gentle Niacinamide, fermented botanicals, and high-SPF shields that leave <em>zero chalky white cast</em>.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                "100% Direct From Seoul",
                "Cruelty-Free & Dermatologist Tested",
                "Safe on Melanin-Rich Skin",
                "No Harmful Bleaching Fillers",
              ].map((val, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#5C3544]">
                  <div className="w-4 h-4 rounded-full bg-[#BA788C]/20 text-[#BA788C] flex items-center justify-center text-[10px]">
                    ✓
                  </div>
                  <span>{val}</span>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#D4A0B0]/25 shadow-xs text-center"
                >
                  <div className="font-serif text-2xl font-bold text-[#5C3544]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-bold text-[#1A0E14] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Aesthetic Korean Skincare Flatlay Image with Glowing Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden shadow-2xl border-2 border-white bg-white group">
              <Image
                src="/images/skincare-bottles.jpg"
                alt="Aesthetic Korean Skincare Formulations"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#D4A0B0]/30 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C]">
                    Authentic Sourcing
                  </span>
                  <h4 className="font-serif text-base font-semibold text-[#1A0E14]">
                    Seoul Labs to Your Vanity
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 bg-[#EDF7F1] text-[#1A7A4A] px-3 py-1 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified 100% Original</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
