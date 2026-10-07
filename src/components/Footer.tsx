import React from "react";
import Link from "next/link";
import { MessageCircle, Phone, Mail, ShieldCheck, Heart } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1A0E14] text-[#FDF6F4] pt-16 pb-12 border-t border-[#D4A0B0]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#BA788C]" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
                <ellipse cx="16" cy="10" rx="3" ry="5.5" fill="#D4A0B0" />
                <ellipse cx="16" cy="22" rx="3" ry="5.5" fill="#D4A0B0" />
                <ellipse cx="10" cy="16" rx="5.5" ry="3" fill="#D4A0B0" />
                <ellipse cx="22" cy="16" rx="5.5" ry="3" fill="#D4A0B0" />
                <circle cx="16" cy="16" r="3" fill="#FDF6F4" />
              </svg>
              <span className="font-serif text-2xl tracking-[0.2em] font-medium text-[#FDF6F4] uppercase">
                AZYLEEN
              </span>
            </div>
            <p className="text-xs text-[#FDF6F4]/70 max-w-sm leading-relaxed">
              Pakistan&rsquo;s most trusted destination for authentic Korean skincare. Direct batch-coded imports from Seoul, curated for Pakistani skin tones and climates.
            </p>

            {/* Direct Contact Links */}
            <div className="space-y-2 pt-2 text-xs text-[#FDF6F4]/80">
              <a
                href="https://wa.me/923252867992"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#D4A0B0] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4A0B0]" />
                <span>+92 325 2867992</span>
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4A0B0]" />
                <span>support@azyleen.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/official_azyleen"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FDF6F4] hover:bg-[#D4A0B0] hover:text-[#5C3544] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923252867992"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FDF6F4] hover:bg-[#128C7E] hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4A0B0] mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FDF6F4]/70">
              <li><a href="#products" className="hover:text-white transition-colors">Bestsellers</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Korean Serums</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Barrier Creams</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Sunscreen &amp; SPF 50+</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Eye Care &amp; Retinal</a></li>
              <li><a href="#routine" className="hover:text-white transition-colors">4-Step Glass Routine</a></li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4A0B0] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FDF6F4]/70">
              <li><a href="#routine" className="hover:text-white transition-colors">Free Routine Consultation</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cash on Delivery (COD)</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="https://wa.me/923252867992" className="hover:text-white transition-colors">Track Order via WhatsApp</a></li>
              <li><span className="text-[#FDF6F4]/50">7-Day Hassle-Free Returns</span></li>
            </ul>
          </div>

          {/* Brand & Security */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#D4A0B0] mb-4">
              Trust &amp; Quality
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FDF6F4]/70">
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A7A4A]" />
                <span>100% Original Seoul Imports</span>
              </li>
              <li><span>Free Shipping &gt; Rs 3,999</span></li>
              <li><span>Batch-Code Verified</span></li>
              <li><span>Dermatologist Tested</span></li>
              <li><span>Zero Bleaching Agents</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payment Options & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FDF6F4]/60">
          <div className="flex items-center gap-2">
            <span>© 2026 Azyleen. All rights reserved. Made with</span>
            <Heart className="w-3.5 h-3.5 text-[#D4A0B0] fill-current" />
            <span>in Pakistan.</span>
          </div>

          {/* Supported payment badges */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#FDF6F4]/70">
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Cash on Delivery</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">EasyPaisa</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">JazzCash</span>
            <span className="px-2.5 py-1 rounded-md bg-white/10 border border-white/10">Visa / Mastercard</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
