"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useCart, isGiftProduct } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, Truck, Sparkles, Gift, AlertCircle } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    totalItems,
    hasUnconfiguredGifts,
    unconfiguredGiftItems,
    openConfigModal,
    markGiftBoxBlank,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.35, x: 0.75 },
      colors: ["#BA788C", "#5C3544", "#10B981", "#D4A0B0", "#FBBF24", "#F472B6"],
      zIndex: 99999,
    });
  };

  const isFreeShipping = subtotal >= freeShippingThreshold && subtotal > 0;
  const wasFreeShippingRef = useRef(false);

  useEffect(() => {
    if (isOpen && isFreeShipping && !wasFreeShippingRef.current) {
      triggerConfetti();
    }
    wasFreeShippingRef.current = isFreeShipping;
  }, [isOpen, isFreeShipping]);

  const [showCheckoutWarning, setShowCheckoutWarning] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<"shopify" | "whatsapp" | null>(null);

  const proceedWithCheckout = () => {
    if (cart.length === 0) return;
    closeCart();
    try {
      localStorage.setItem(
        "azyleen_cart_discounts",
        JSON.stringify({
          discountApplied,
          discountAmount,
          voucherApplied,
          voucherCodeApplied,
          voucherAmount,
        })
      );
    } catch (e) {
      console.warn("Could not save discounts", e);
    }
    window.location.href = "/checkout";
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    if (hasUnconfiguredGifts) {
      setPendingCheckoutAction("shopify");
      setShowCheckoutWarning(true);
      return;
    }
    proceedWithCheckout();
  };

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherCodeApplied, setVoucherCodeApplied] = useState("");
  const [voucherAmount, setVoucherAmount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === "GLOW15") {
      setDiscountApplied(true);
      setDiscountAmount(Math.round(subtotal * 0.15));
    } else if (clean.startsWith("AZ-") || clean.includes("GLOW") || clean.includes("GIFT") || clean.includes("VOUCHER")) {
      setVoucherApplied(true);
      setVoucherCodeApplied(clean);
      const applied = Math.min(subtotal, 3500);
      setVoucherAmount(applied);
    } else {
      alert("Invalid code. Try GLOW15 for 15% off, or enter your Azyleen Gift Voucher serial number!");
    }
  };

  const finalTotal = Math.max(0, subtotal - (discountApplied ? discountAmount : 0) - (voucherApplied ? voucherAmount : 0));
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const proceedWithWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item) => {
        let titleStr = `• ${item.product.title} (x${item.quantity}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`;
        if (item.giftBoxConfig) {
          titleStr += `%0A   [To: ${item.giftBoxConfig.recipientName} | From: ${item.giftBoxConfig.senderName} | Occasion: ${item.giftBoxConfig.occasion}]`;
        }
        return titleStr;
      })
      .join("%0A");

    const message = `Salam Azyleen team! I would like to place an order via Cash on Delivery:%0A%0A${itemList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Shipping:* ${
      shippingCost === 0 ? "FREE" : "Rs. 250"
    }%0A*Estimated Total:* Rs. ${(finalTotal + shippingCost).toLocaleString()}%0A%0APlease confirm my order. Thank you!`;

    window.open(`https://wa.me/923252867992?text=${message}`, "_blank");
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    if (hasUnconfiguredGifts) {
      setPendingCheckoutAction("whatsapp");
      setShowCheckoutWarning(true);
      return;
    }
    proceedWithWhatsAppOrder();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1A0E14]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#FDF6F4] text-[#1A0E14] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-[#D4A0B0]/30">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#D4A0B0]/20 flex items-center justify-between bg-white/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#7A4F5C]" />
            <h2 className="text-lg font-serif tracking-wide text-[#5C3544] font-semibold">
              Your Glow Bag ({totalItems})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-full text-[#7A4F5C] hover:bg-[#F9EEF1] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress / Celebratory Bar */}
        {freeShippingRemaining === 0 ? (
          <div className="px-6 py-3.5 bg-gradient-to-r from-[#ECFDF5] via-[#D1FAE5] to-[#ECFDF5] border-b border-[#10B981]/30 transition-all shadow-inner">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="flex items-center gap-1.5 text-[#065F46] font-semibold">
                <span className="text-base animate-bounce">🎉</span>
                <span>Free Express Shipping Unlocked!</span>
              </span>
              <button
                onClick={triggerConfetti}
                className="text-[10.5px] font-bold text-[#047857] hover:text-[#065F46] bg-white/90 px-2.5 py-0.5 rounded-full border border-[#10B981]/30 flex items-center gap-1 shadow-xs cursor-pointer transition-transform hover:scale-105 active:scale-95"
                title="Celebrate again!"
              >
                <Sparkles className="w-3 h-3 text-[#10B981]" />
                <span>Celebrate ✨</span>
              </button>
            </div>
            <div className="w-full h-2 bg-[#A7F3D0] rounded-full overflow-hidden p-0.5 shadow-inner">
              <div className="h-full bg-gradient-to-r from-[#10B981] via-[#059669] to-[#10B981] rounded-full transition-all duration-700 w-full animate-pulse shadow-sm" />
            </div>
            <p className="text-[10px] text-[#047857] font-medium mt-1.5 flex items-center gap-1">
              <span>✓ Zero delivery charges on this order across Pakistan (Saved Rs. 250)</span>
            </p>
          </div>
        ) : (
          <div className="px-6 py-3.5 bg-[#F9EEF1] border-b border-[#D4A0B0]/20">
            <div className="flex items-center justify-between text-xs font-medium text-[#5C3544] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#7A4F5C]" />
                <span>Add <strong>Rs. {freeShippingRemaining.toLocaleString()}</strong> more for FREE Shipping</span>
              </span>
              <span className="text-[11px] text-[#7A4F5C]/80 font-mono">
                Rs. {freeShippingThreshold.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#D4A0B0]/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4A0B0] to-[#7A4F5C] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Unconfigured Gift Box Top Reminder Banner */}
        {hasUnconfiguredGifts && cart.length > 0 && (
          <div className="mx-6 mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#FFF5F2] via-[#FDF0EC] to-[#FCEAE5] border border-[#E9A7B3] shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-[#5C3544] text-[#FDF6F4] flex-shrink-0 shadow-2xs">
                <Gift className="w-4 h-4 text-[#D4A0B0]" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C]">
                    Action Required
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E57373] animate-ping" />
                </div>
                <h4 className="text-xs font-bold text-[#5C3544] mt-0.5">
                  Personalize Keepsake Gift Box
                </h4>
                <p className="text-[11px] text-[#7E636E] mt-0.5 leading-snug">
                  Add recipient names and your handwritten card message before checking out.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (unconfiguredGiftItems[0]) {
                        openConfigModal(
                          unconfiguredGiftItems[0].product,
                          unconfiguredGiftItems[0].giftBoxConfig
                        );
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-[#C59B6D]" />
                    <span>Customize in Studio</span>
                  </button>
                  <button
                    onClick={() => {
                      if (unconfiguredGiftItems[0]) {
                        markGiftBoxBlank(unconfiguredGiftItems[0].product.id);
                      }
                    }}
                    className="px-2.5 py-1.5 text-[10px] text-[#7E636E] hover:text-[#5C3544] cursor-pointer"
                  >
                    Leave blank
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-grow overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-20 h-20 rounded-full bg-[#F9EEF1] flex items-center justify-center text-[#D4A0B0] mb-4">
                <ShoppingBag className="w-10 h-10 stroke-1" />
              </div>
              <h3 className="font-serif text-xl text-[#5C3544] font-medium mb-1">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-[#7E636E] max-w-xs mb-6">
                Explore our authentic Korean skincare rituals to find your next glass-skin holy grail.
              </p>
              <button
                onClick={closeCart}
                className="bg-[#5C3544] hover:bg-[#43232F] text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const imgUrl = item.product.images?.[0]?.url;
              const isGift = isGiftProduct(item.product);
              const needsConfig = item.needsConfiguration || (isGift && !item.giftBoxConfig);

              return (
                <div
                  key={item.product.id}
                  className={`flex gap-4 p-3.5 bg-white/80 rounded-2xl border shadow-sm transition-all hover:shadow-md ${
                    needsConfig ? "border-[#F8B4B4] bg-[#FFFDFC]" : "border-[#D4A0B0]/20"
                  }`}
                >
                  {/* Clickable Product Thumbnail */}
                  <Link
                    href={`/products/${item.product.handle}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F9EEF1] flex-shrink-0 group cursor-pointer block border border-[#D4A0B0]/20"
                    title={`View ${item.product.title}`}
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#D4A0B0] text-xs">
                        Azyleen
                      </div>
                    )}
                  </Link>

                  <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase font-semibold text-[#D4A0B0] tracking-wider">
                          {item.product.vendor}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#7E636E] hover:text-[#D93025] transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Clickable Product Title */}
                      <Link
                        href={`/products/${item.product.handle}`}
                        onClick={closeCart}
                        className="text-xs font-medium text-[#1A0E14] hover:text-[#BA788C] transition-colors line-clamp-1 leading-snug cursor-pointer block mt-0.5"
                        title="Read product detail"
                      >
                        {item.product.title}
                      </Link>
                      
                      {/* Gift Box Personalization Info or Warning */}
                      {isGift && needsConfig && (
                        <div className="mt-2 p-2 rounded-xl bg-[#FFF2F0] border border-[#F8B4B4] text-[10px]">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-[#9E2A2B] flex items-center gap-1">
                              <span>⚠️</span> Needs Personalization
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                closeCart();
                                openConfigModal(item.product, item.giftBoxConfig);
                              }}
                              className="font-bold text-[#5C3544] hover:underline cursor-pointer flex items-center gap-0.5"
                            >
                              <span>Customize in Studio</span>
                              <span>→</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {isGift && !needsConfig && item.giftBoxConfig && (
                        <div className="mt-2 p-2 rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/40 text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#1A7A4A] flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-[#C59B6D]" />
                              <span>To: {item.giftBoxConfig.recipientName}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => openConfigModal(item.product, item.giftBoxConfig)}
                              className="text-[9.5px] font-semibold text-[#7A4F5C] hover:underline cursor-pointer"
                            >
                              Edit Note
                            </button>
                          </div>
                          <div className="text-[9px] text-[#7E636E] mt-0.5 truncate">
                            From {item.giftBoxConfig.senderName} • {item.giftBoxConfig.occasion}
                          </div>
                        </div>
                      )}

                      {!isGift && (
                        <Link
                          href={`/products/${item.product.handle}`}
                          onClick={closeCart}
                          className="text-[10px] text-[#7A4F5C] hover:underline font-medium inline-block mt-0.5"
                        >
                          View details →
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#D4A0B0]/40 rounded-full bg-[#FDF6F4]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5C3544] hover:bg-[#D4A0B0]/20 rounded-full transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-medium text-[#1A0E14]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5C3544] hover:bg-[#D4A0B0]/20 rounded-full transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#5C3544]">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Checkout Actions */}
        {cart.length > 0 && (
          <div className="border-t border-[#D4A0B0]/20 p-6 bg-white/90 backdrop-blur-md space-y-4">
            {/* Promo / Gift Voucher Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo / Gift Voucher Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow px-3.5 py-2 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#7A4F5C] uppercase placeholder:normal-case"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium bg-[#F9EEF1] text-[#5C3544] border border-[#D4A0B0]/30 rounded-xl hover:bg-[#D4A0B0]/30 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#7E636E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#1A0E14]">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[#1A7A4A] font-medium">
                  <span>Discount (GLOW15 15%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              {voucherApplied && (
                <div className="flex justify-between text-[#1A7A4A] font-medium">
                  <span>Gift Voucher ({voucherCodeApplied})</span>
                  <span>- Rs. {voucherAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping (Pakistan)</span>
                <span className="font-medium text-[#1A0E14]">
                  {shippingCost === 0 ? <span className="text-[#1A7A4A]">FREE</span> : `Rs. ${shippingCost}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#5C3544] pt-2 border-t border-[#D4A0B0]/20">
                <span>Total</span>
                <span>Rs. {(finalTotal + shippingCost).toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout & WhatsApp Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="flex-1 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#5C3544] hover:bg-[#F9EEF1] border border-[#D4A0B0]/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#BA788C]" />
                  <span>View Full Bag</span>
                </Link>

                <button
                  onClick={handleWhatsAppOrder}
                  className="flex-1 py-2.5 rounded-full text-[11px] font-bold text-[#128C7E] bg-[#E7F6F2] hover:bg-[#D5EFE8] border border-[#128C7E]/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-[#128C7E]/20" />
                  <span>WhatsApp COD</span>
                </button>
              </div>
            </div>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-[#7E636E] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1A7A4A]" />
                100% Authentic Korean Formula
              </span>
              <span>•</span>
              <span>Cash on Delivery</span>
            </div>
          </div>
        )}

        {/* Checkout Guard Dialog Modal */}
        {showCheckoutWarning && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-[#FDF6F4] border border-[#D4A0B0]/40 rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center space-y-4 animate-scale-up">
              <div className="w-12 h-12 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/30 flex items-center justify-center mx-auto text-[#5C3544]">
                <Gift className="w-6 h-6 text-[#BA788C]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C]">
                  Personalization Reminder
                </span>
                <h3 className="font-serif text-xl font-medium text-[#5C3544] mt-1">
                  Configure Your Gift Box
                </h3>
                <p className="text-xs text-[#7E636E] mt-1.5 leading-relaxed">
                  Your luxury keepsake box includes a handwritten card and custom packaging details that have not been personalized yet.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowCheckoutWarning(false);
                    closeCart();
                    if (unconfiguredGiftItems[0]) {
                      openConfigModal(
                        unconfiguredGiftItems[0].product,
                        unconfiguredGiftItems[0].giftBoxConfig
                      );
                    } else {
                      window.location.href = "/gift-vouchers";
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
                  <span>Customize in Gifting Studio</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (unconfiguredGiftItems[0]) {
                      markGiftBoxBlank(unconfiguredGiftItems[0].product.id);
                    }
                    setShowCheckoutWarning(false);
                    if (pendingCheckoutAction === "shopify") {
                      proceedWithCheckout();
                    } else if (pendingCheckoutAction === "whatsapp") {
                      proceedWithWhatsAppOrder();
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F9EEF1] border border-[#D4A0B0]/40 text-[#5C3544] text-xs font-medium transition-colors cursor-pointer"
                >
                  Proceed with Blank Gift Box
                </button>

                <button
                  type="button"
                  onClick={() => setShowCheckoutWarning(false)}
                  className="text-[11px] text-[#7E636E] hover:text-[#5C3544] block mx-auto pt-1 cursor-pointer"
                >
                  Return to bag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
