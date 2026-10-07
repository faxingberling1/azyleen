import React from "react";
import { Star, ShieldCheck, MapPin, Quote } from "lucide-react";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "Zara Ansari",
      initials: "ZA",
      location: "Lahore",
      product: "Anua Niacinamide 10% + TXA Serum",
      rating: 5,
      review:
        "The Anua Niacinamide Serum completely changed my skin in 3 weeks. The stubborn acne marks on my cheeks have faded noticeably. People keep asking what clinic I went to!",
      verified: true,
    },
    {
      name: "Sara Hussain",
      initials: "SH",
      location: "Karachi",
      product: "Centella Water-Fit Sun Serum SPF 50+",
      rating: 5,
      review:
        "Finally found a Korean SPF with zero white cast in Karachi's intense heat and humidity. Sinks right in like water and doesn't melt off when I step outside.",
      verified: true,
    },
    {
      name: "Mahnoor Khan",
      initials: "MK",
      location: "Islamabad",
      product: "Dr. Althea 345 Relief Cream",
      rating: 5,
      review:
        "Azyleen packaging is so luxurious and authentic. You can immediately tell it's original from the batch code and formula texture. My skin barrier has never felt this calm.",
      verified: true,
    },
    {
      name: "Amna Riaz",
      initials: "AR",
      location: "Rawalpindi",
      product: "COSRX Snail 96 Power Essence",
      rating: 5,
      review:
        "Reduced my post-acne redness in just two weeks. It gives that exact bouncy Korean glass glow without feeling greasy. Already ordering my second bottle on COD!",
      verified: true,
    },
    {
      name: "Hira Butt",
      initials: "HB",
      location: "Faisalabad",
      product: "AXIS-Y Dark Spot Correcting Serum",
      rating: 5,
      review:
        "I was skeptical about K-beauty on Pakistani skin tone, but Axis-Y is pure magic. It faded my post-inflammatory hyperpigmentation gently without any irritation.",
      verified: true,
    },
    {
      name: "Nida Malik",
      initials: "NM",
      location: "Multan",
      product: "Celimax Pore + Dark Spot Cream",
      rating: 5,
      review:
        "Super fast 2-day delivery to Multan. Everything was securely wrapped and 100% original. The Celimax cream is now my permanent holy grail.",
      verified: true,
    },
  ];

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#F9EEF1]/40 border-b border-[#D4A0B0]/20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#D4A0B0]/30 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A4F5C] mb-3">
            <Star className="w-3.5 h-3.5 fill-[#C59B6D] text-[#C59B6D]" />
            <span>Real Results · Verified Purchases</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1A0E14] font-normal tracking-tight">
            Loved Across Pakistan
          </h2>
          <p className="text-sm sm:text-base text-[#5C3A46] mt-3">
            Real customer transformations from Lahore to Karachi. 100% verified authentic orders.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#D4A0B0]/20 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C59B6D] text-[#C59B6D]" />
                    ))}
                  </div>
                  {r.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-[#1A7A4A] bg-[#EDF7F1] px-2 py-0.5 rounded-full">
                      <ShieldCheck className="w-3 h-3" />
                      Verified Buyer
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[#1A0E14] leading-relaxed italic mb-4">
                  &ldquo;{r.review}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#D4A0B0]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#5C3544] text-[#FDF6F4] flex items-center justify-center text-xs font-bold font-serif">
                    {r.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1A0E14]">{r.name}</h4>
                    <p className="text-[10px] text-[#BA788C] font-medium line-clamp-1">
                      {r.product}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10.5px] text-[#7E636E]">
                  <MapPin className="w-3 h-3 text-[#BA788C]" />
                  <span>{r.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
