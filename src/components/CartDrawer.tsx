"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, ShieldCheck, Truck } from "lucide-react";

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
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    try {
      const res = await fetch("/api/shopify/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
    } catch (err) {
      console.error("Checkout redirect error:", err);
      // Fallback
      window.location.href = "https://azyleen.com/cart";
    } finally {
      setIsCheckingOut(false);
    }
  };

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

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
    if (promoCode.trim().toUpperCase() === "GLOW15") {
      setDiscountApplied(true);
      setDiscountAmount(Math.round(subtotal * 0.15));
    } else {
      alert("Invalid code. Try GLOW15 for 15% off!");
    }
  };

  const finalTotal = subtotal - (discountApplied ? discountAmount : 0);
  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  // Generate WhatsApp Order Message
  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item) => `• ${item.product.title} (x${item.quantity}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`)
      .join("%0A");

    const message = `Salam Azyleen team! I would like to place an order via Cash on Delivery:%0A%0A${itemList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Shipping:* ${
      shippingCost === 0 ? "FREE" : "Rs. 250"
    }%0A*Estimated Total:* Rs. ${(finalTotal + shippingCost).toLocaleString()}%0A%0APlease confirm my order. Thank you!`;

    window.open(`https://wa.me/923252867992?text=${message}`, "_blank");
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

        {/* Free Shipping Progress */}
        <div className="px-6 py-3.5 bg-[#F9EEF1] border-b border-[#D4A0B0]/20">
          <div className="flex items-center justify-between text-xs font-medium text-[#5C3544] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#7A4F5C]" />
              {freeShippingRemaining === 0 ? (
                <span className="text-[#1A7A4A] font-semibold">🎉 Free Shipping Unlocked!</span>
              ) : (
                <span>Add <strong>Rs. {freeShippingRemaining.toLocaleString()}</strong> more for FREE Shipping</span>
              )}
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
              return (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-white/80 rounded-2xl border border-[#D4A0B0]/20 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F9EEF1] flex-shrink-0">
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={item.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#D4A0B0] text-xs">
                        Azyleen
                      </div>
                    )}
                  </div>

                  <div className="flex-grow min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] uppercase font-semibold text-[#D4A0B0] tracking-wider">
                          {item.product.vendor}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#7E636E] hover:text-[#D93025] transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-medium text-[#1A0E14] line-clamp-1 leading-snug">
                        {item.product.title}
                      </h4>
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
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Discount Code (e.g. GLOW15)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-grow px-3.5 py-2 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#7A4F5C] uppercase placeholder:normal-case"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium bg-[#F9EEF1] text-[#5C3544] border border-[#D4A0B0]/30 rounded-xl hover:bg-[#D4A0B0]/30 transition-colors"
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
                disabled={isCheckingOut}
                className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-75"
              >
                <span>{isCheckingOut ? "Connecting to Shopify Checkout..." : "Proceed to Checkout"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-2.5 rounded-full text-xs font-semibold text-[#128C7E] bg-[#E7F6F2] hover:bg-[#D5EFE8] border border-[#128C7E]/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-[#128C7E]/20" />
                <span>Order via WhatsApp (Instant COD)</span>
              </button>
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
      </div>
    </div>
  );
}
