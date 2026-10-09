"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Clock, Copy, Check, ArrowRight, ShieldCheck, Tag, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import "./FlashSaleBanner.css";

// Turbopack's custom `*.css` rule in next.config disables CSS Modules,
// so classes are namespaced with an `fsb-` prefix instead.
const s = new Proxy({} as Record<string, string>, {
  get: (_, key) => `fsb-${String(key)}`,
});

const INITIAL = { hours: 5, minutes: 38, seconds: 13 };

/* Azyleen three-petal brand flower */
function BrandFlower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2c2.2 2.4 2.6 5.8 0 9.2C9.4 7.8 9.8 4.4 12 2Z" />
      <path d="M3.5 7.5c3.2-.2 6 1.8 7.4 5.6-3.8.4-6.8-1.4-7.4-5.6Z" opacity="0.85" />
      <path d="M20.5 7.5c-.6 4.2-3.6 6-7.4 5.6 1.4-3.8 4.2-5.8 7.4-5.6Z" opacity="0.85" />
      <path d="M12 13.5c1.5 2.5 1.5 5.2 0 8.5-1.5-3.3-1.5-6 0-8.5Z" opacity="0.6" />
    </svg>
  );
}

export default function FlashSaleBanner() {
  const { openCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(INITIAL);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return INITIAL;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("GLOW15");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const pad = (n: number) => String(n).padStart(2, "0");
  const units = [
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  const Badge = (
    <div className={s.badge}>
      <Zap className={s.badgeIcon} />
      <span>Limited Time Flash Promotion · 24H Exclusive</span>
    </div>
  );

  const Timer = (
    <div className={s.timer} aria-label="Offer ends in">
      {units.map((u, i) => (
        <React.Fragment key={u.label}>
          {i > 0 && <span className={s.sep} />}
          <div className={s.unit}>
            <Clock className={s.unitIcon} />
            <div className={s.unitText}>
              <span className={`${s.unitNum} font-mono`}>{pad(u.value)}</span>
              <span className={s.unitLabel}>{u.label}</span>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );

  const Code = (
    <div className={s.code}>
      <Tag className={s.codeIcon} />
      <span className={s.codeLabel}>Code:</span>
      <span className={`${s.codeValue} font-mono`}>GLOW15</span>
      <button onClick={handleCopy} className={s.copyBtn} title="Copy coupon code">
        {copied ? <Check /> : <Copy />}
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>
    </div>
  );

  return (
    <section
      aria-label="Flash sale: extra 15% off with code GLOW15"
      className="py-2 sm:py-4 px-3 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* ================= DESKTOP RIBBON ================= */}
        <div className={`${s.frame} ${s.desktop}`}>
          <Image
            src="/images/flash-ribbon-desktop.png"
            alt="Azyleen glass skin model wrapped in a plum satin ribbon"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className={s.art}
            priority
          />

          {/* Brand mark on left ribbon flag */}
          <div className={s.brand}>
            <BrandFlower className={s.brandIcon} />
            <span className={`${s.brandName} font-serif`}>Azyleen</span>
            <span className={s.brandTag}>Korean Skin Care</span>
          </div>

          {/* Main copy on the ribbon */}
          <div className={s.overlay}>
            {Badge}
            <h2 className={`${s.headline} font-serif`}>
              Unlock <span className={s.accent}>Extra 15% Off</span>
              <br />
              Your Entire Seoul Ritual
            </h2>
            <p className={s.desc}>
              Curated actives formulated to treat stubborn hyperpigmentation, soothe sensitivity, and
              hydrate deep within South Asian climates. Use code at checkout or apply directly to your bag.
            </p>
            <div className={s.row}>
              {Timer}
              {Code}
            </div>
            <div className={s.actions}>
              <a href="#products" className={s.btnPrimary}>
                <span>Shop Flash Sale</span>
                <ArrowRight />
              </a>
              <button onClick={openCart} className={s.btnGhost}>
                <Sparkles />
                <span>Apply To Glow Bag</span>
              </button>
            </div>
          </div>

          {/* Right ribbon editorial note */}
          <div className={s.note}>
            <p className={`${s.noteText} font-serif`}>
              Real, luminous <br />
              glass skin results.
            </p>
            <div className={s.noteSub}>
              <ShieldCheck />
              <span>100% Original Sealed Batch Codes</span>
            </div>
          </div>
        </div>

        {/* ================= MOBILE RIBBON ================= */}
        <div className={`${s.frame} ${s.mobile}`}>
          <Image
            src="/images/flash-ribbon-mobile.png"
            alt="Azyleen glass skin model above a plum satin ribbon"
            fill
            sizes="100vw"
            className={s.art}
            priority
          />

          <div className={s.brand}>
            <div className={s.brandInner}>
              <BrandFlower className={s.brandIcon} />
              <span className={`${s.brandName} font-serif`}>Azyleen</span>
            </div>
          </div>

          <div className={s.overlay}>
            {Badge}
            <h2 className={`${s.headline} font-serif`}>
              <span className={s.headlineSmall} style={{ marginTop: 0 }}>Unlock</span>
              <span className={`${s.headlineBig} ${s.accent}`}>Extra 15% Off</span>
              <span className={s.headlineSmall}>Your Entire Seoul Ritual</span>
            </h2>
            <p className={s.desc}>
              Curated actives for hyperpigmentation, sensitivity &amp; deep hydration.
            </p>
            <div className={s.row}>
              {Timer}
              {Code}
            </div>
            <div className={s.actions}>
              <a href="#products" className={s.btnPrimary}>
                <span>Shop Sale</span>
                <ArrowRight />
              </a>
              <button onClick={openCart} className={s.btnGhost}>
                <Sparkles />
                <span>Glow Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
