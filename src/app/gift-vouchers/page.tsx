import React from "react";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import GiftVoucherCustomizer from "@/components/GiftVoucherCustomizer";
import { getShopifyProducts } from "@/lib/shopify";
import {
  Gift,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Heart,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Luxury Gift Vouchers — The Gift of Korean Glass Skin | Azyleen Pakistan",
  description:
    "Delight someone with an Azyleen luxury skincare gift voucher. Available as instant digital E-Vouchers or handcrafted foil keepsake gift boxes delivered across Pakistan. 100% authentic Seoul imports.",
};

const GIFTING_FAQS = [
  {
    q: "How does my recipient redeem their digital or physical voucher?",
    a: "Every voucher carries an exclusive serial code (e.g., AZ-GLOW-XXXX-XX). The recipient simply enters this code at checkout on Azyleen, or quotes it via our WhatsApp VIP Concierge (+92 325 2867992) to deduct the balance instantly from their order.",
  },
  {
    q: "How quickly is the Digital E-Voucher delivered?",
    a: "Digital vouchers are generated immediately upon order confirmation and can be shared instantly via WhatsApp, Email, or SMS with an interactive animated voucher card and printable certificate.",
  },
  {
    q: "How does the Physical Foil Gift Box delivery work?",
    a: "If you select the Luxury Foil Gift Box (+Rs. 350), we handcraft a metallic gold-foil embossed voucher card enclosed inside a velvet sleeve tied with Azyleen's signature plum satin ribbon. It is dispatched via TCS Express across Pakistan with parcel tracking.",
  },
  {
    q: "Can the recipient use the voucher during flash sales or with promotions?",
    a: "Yes! Azyleen gift vouchers function like real currency and can be applied during seasonal flash sales, holiday glow events, and combined with promotional offers.",
  },
  {
    q: "What if the order total is less than or greater than the voucher value?",
    a: "If the order total exceeds the voucher amount, the recipient simply pays the difference via Cash on Delivery (COD) or bank transfer. If it is less, any remaining balance stays active on their voucher serial number for their next order.",
  },
  {
    q: "How long is the gift voucher valid for?",
    a: "All Azyleen gift vouchers are valid for a full 365 days (1 year) from the date of issuance, giving your recipient complete freedom to choose formulations according to their seasonal skin barrier needs.",
  },
];

export default async function GiftVouchersPage() {
  const products = await getShopifyProducts();

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Navbar */}
      <Navbar products={products} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Editorial Hero Header */}
        <div className="pt-10 sm:pt-14 pb-8 sm:pb-12 text-center max-w-4xl mx-auto px-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#BA788C] bg-white px-4 py-1.5 rounded-full border border-[#D4A0B0]/30 shadow-2xs inline-flex items-center gap-2 mb-4">
            <Gift className="w-3.5 h-3.5 text-[#BA788C]" />
            <span>The Gift of Authentic Korean Glass Skin · 빛나는 선물</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A0E14] tracking-tight leading-tight">
            Give the Glow of <span className="italic text-[#7A4F5C]">Pure Seoul</span> Skincare
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-[#7E636E] mt-3.5 max-w-2xl mx-auto leading-relaxed">
            Skincare is deeply intimate. Rather than guessing their skin type or active tolerance, invite someone you cherish to discover their own holy-grail Korean ritual.
          </p>
        </div>

        {/* Interactive Customizer Studio */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <GiftVoucherCustomizer />
        </div>

        {/* Gifting FAQ Section */}
        <section className="bg-white border-t border-[#D4A0B0]/20 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BA788C]">
                ✦ Frequently Asked Questions
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#1A0E14] font-medium">
                Everything You Need to Know About Gifting
              </h2>
            </div>

            <div className="space-y-4">
              {GIFTING_FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group p-5 rounded-2xl bg-[#FDF6F4]/60 border border-[#D4A0B0]/25 transition-all hover:bg-[#FDF6F4] open:bg-white open:shadow-xs"
                >
                  <summary className="font-serif text-base sm:text-lg text-[#1A0E14] font-medium flex items-center justify-between cursor-pointer list-none select-none">
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full text-[#7A4F5C] group-open:rotate-180 transition-transform duration-200">
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-[#7E636E] mt-3 pt-3 border-t border-[#D4A0B0]/20 leading-relaxed font-sans font-normal">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-12 text-center p-6 rounded-3xl bg-[#F9EEF1] border border-[#D4A0B0]/30 max-w-xl mx-auto">
              <h3 className="font-serif text-lg text-[#5C3544] font-medium">Need Corporate or Bulk Wedding Gifting?</h3>
              <p className="text-xs text-[#7E636E] mt-1">
                We curate custom bespoke bridal glow boxes and corporate vouchers for events across Pakistan.
              </p>
              <a
                href="https://wa.me/923252867992?text=Salam%20Azyleen!%20I%20would%20like%20to%20inquire%20about%20corporate/bridal%20bulk%20gift%20vouchers."
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 px-5 py-2 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
              >
                Inquire on VIP WhatsApp Concierge
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
