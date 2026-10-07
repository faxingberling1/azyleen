import { Sparkles, ArrowUpRight } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function CommunityGrid() {
  const posts = [
    {
      title: "Morning K-Beauty Routine",
      tag: "#GlassSkinPak",
      bg: "from-[#F9EEF1] to-[#F4E2E7]",
      desc: "Double cleansing + Centella Sunscreen test in 38°C weather.",
    },
    {
      title: "Anua 10% Niacinamide Unboxing",
      tag: "#AuthenticSeoul",
      bg: "from-[#FDF6E2]/70 to-[#F8EDD3]/70",
      desc: "Checking batch codes & texture test on Pakistani skin.",
    },
    {
      title: "Before & After 21 Days",
      tag: "#DarkSpotJourney",
      bg: "from-[#EDF3EF] to-[#E3EDE6]",
      desc: "Fading stubborn acne scars with Axis-Y and Celimax.",
    },
    {
      title: "Zero White-Cast SPF Guide",
      tag: "#SunProtection",
      bg: "from-[#EBF5FA] to-[#E2F0F7]",
      desc: "Our top 3 Korean sunscreens tested on wheatish skin tones.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F9EEF1] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A4F5C] mb-2">
              <InstagramIcon className="w-3 h-3 text-[#BA788C]" />
              <span>@official_azyleen</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1A0E14] font-normal tracking-tight">
              Join the Glow Community
            </h2>
            <p className="text-sm text-[#5C3A46] mt-2">
              Real tutorials, batch verification reels, and South Asian skincare guides.
            </p>
          </div>

          <a
            href="https://www.instagram.com/official_azyleen"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5C3544] hover:text-[#BA788C] transition-colors py-2"
          >
            <span>Follow Us on Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href="https://www.instagram.com/official_azyleen"
              target="_blank"
              rel="noreferrer"
              className={`group p-6 rounded-3xl bg-gradient-to-b ${post.bg} border border-[#D4A0B0]/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between aspect-square`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A4F5C] bg-white/80 px-2.5 py-1 rounded-full">
                  {post.tag}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#5C3544] group-hover:bg-[#5C3544] group-hover:text-white transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-medium text-[#1A0E14] group-hover:text-[#5C3544] transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-[#5C3A46] mt-1.5 leading-relaxed">
                  {post.desc}
                </p>
              </div>

              <div className="text-[11px] font-semibold text-[#BA788C] flex items-center gap-1">
                <span>Watch on Instagram</span>
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
