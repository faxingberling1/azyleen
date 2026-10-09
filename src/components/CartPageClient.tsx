"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  Gift,
  ArrowRight,
  ShieldCheck,
  Truck,
  MessageCircle,
  Tag,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useCart, isGiftProduct } from "@/context/CartContext";
import { ShopifyProduct } from "@/lib/shopify";

interface CartPageClientProps {
  recommendedProducts: ShopifyProduct[];
}

export default function CartPageClient({ recommendedProducts }: CartPageClientProps) {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingRemaining,
    totalItems,
    hasUnconfiguredGifts,
    unconfiguredGiftItems,
    markGiftBoxBlank,
    addToCart,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherCodeApplied, setVoucherCodeApplied] = useState("");
  const [voucherAmount, setVoucherAmount] = useState(0);

  const [showCheckoutWarning, setShowCheckoutWarning] = useState(false);

  const shippingCost = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 250;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const finalTotal = Math.max(
    0,
    subtotal - (discountApplied ? discountAmount : 0) - (voucherApplied ? voucherAmount : 0)
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (clean === "GLOW15") {
      setDiscountApplied(true);
      setDiscountAmount(Math.round(subtotal * 0.15));
    } else if (
      clean.startsWith("AZ-") ||
      clean.includes("GLOW") ||
      clean.includes("GIFT") ||
      clean.includes("VOUCHER")
    ) {
      setVoucherApplied(true);
      setVoucherCodeApplied(clean);
      const applied = Math.min(subtotal, 3500);
      setVoucherAmount(applied);
    } else {
      alert("Invalid code. Try GLOW15 for 15% off, or enter your Azyleen Gift Voucher serial number!");
    }
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    if (hasUnconfiguredGifts) {
      setShowCheckoutWarning(true);
      return;
    }
    // Save current discount/voucher info for checkout
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
      console.warn("Could not save discounts to localStorage", e);
    }
    router.push("/checkout");
  };

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;
    const itemList = cart
      .map((item) => {
        let titleStr = `• ${item.product.title} (x${item.quantity}) - Rs. ${(
          item.product.price * item.quantity
        ).toLocaleString()}`;
        if (item.giftBoxConfig) {
          titleStr += `%0A   [To: ${item.giftBoxConfig.recipientName} | From: ${item.giftBoxConfig.senderName} | Occasion: ${item.giftBoxConfig.occasion}]`;
        }
        return titleStr;
      })
      .join("%0A");

    const message = `Salam Azyleen team! I would like to place an order via Cash on Delivery:%0A%0A${itemList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Shipping:* ${
      shippingCost === 0 ? "FREE" : "Rs. 250"
    }%0A*Estimated Total:* Rs. ${(
      finalTotal + shippingCost
    ).toLocaleString()}%0A%0APlease confirm my order. Thank you!`;

    window.open(`https://wa.me/923252867992?text=${message}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
        <div className="w-24 h-24 rounded-full bg-[#F9EEF1] flex items-center justify-center text-[#D4A0B0] mx-auto mb-6 shadow-sm">
          <ShoppingBag className="w-12 h-12 stroke-1" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#5C3544] font-medium mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#7E636E] max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven&apos;t added any Seoul holy grails yet. Explore our authentic Korean formulations curated for glowing glass skin.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/bestsellers"
            className="px-8 py-3.5 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
          >
            Explore Bestsellers
          </Link>
          <Link
            href="/gift-vouchers"
            className="px-8 py-3.5 rounded-full bg-white hover:bg-[#F9EEF1] text-[#5C3544] border border-[#D4A0B0]/40 text-xs font-bold uppercase tracking-wider transition-all"
          >
            Gift Vouchers &amp; Keepsake Boxes
          </Link>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#D4A0B0]/20 text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-[#1A0E14] mb-6 text-center">
              Trending Seoul Holy Grails
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recommendedProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#D4A0B0]/20 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <Link href={`/products/${p.handle}`} className="block relative aspect-square rounded-xl bg-[#FDF6F4] mb-2.5 overflow-hidden">
                    {p.images?.[0]?.url && (
                      <Image src={p.images[0].url} alt={p.title} fill className="object-contain p-2 hover:scale-105 transition-transform" sizes="160px" />
                    )}
                  </Link>
                  <div>
                    <span className="text-[9.5px] uppercase font-semibold text-[#BA788C] tracking-wider block">
                      {p.vendor}
                    </span>
                    <h4 className="text-xs font-medium text-[#1A0E14] line-clamp-1 mt-0.5">
                      {p.title}
                    </h4>
                    <p className="text-xs font-bold text-[#5C3544] mt-1">
                      Rs. {p.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="mt-3 w-full py-2 rounded-xl bg-[#F9EEF1] hover:bg-[#5C3544] text-[#5C3544] hover:text-white text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Checkout Progress Stepper */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2 text-[#5C3544]">
            <span className="w-6 h-6 rounded-full bg-[#5C3544] text-white flex items-center justify-center text-[11px] font-bold">
              1
            </span>
            <span>Shopping Bag</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#D4A0B0]" />
          <div className="flex items-center gap-2 text-[#7E636E]">
            <span className="w-6 h-6 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/40 text-[#7E636E] flex items-center justify-center text-[11px]">
              2
            </span>
            <span>Shipping</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#D4A0B0]" />
          <div className="flex items-center gap-2 text-[#7E636E]">
            <span className="w-6 h-6 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/40 text-[#7E636E] flex items-center justify-center text-[11px]">
              3
            </span>
            <span>Payment</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#D4A0B0]" />
          <div className="flex items-center gap-2 text-[#7E636E]">
            <span className="w-6 h-6 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/40 text-[#7E636E] flex items-center justify-center text-[11px]">
              4
            </span>
            <span>Success</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Items List, Right Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column (8 cols): Free shipping bar, alerts, item list */}
        <div className="lg:col-span-8 space-y-6">
          {/* Free Shipping Progress Card */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#D4A0B0]/25 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium text-[#5C3544] mb-2">
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#BA788C]" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#1A7A4A] font-bold">
                    ✓ You unlocked FREE Express Delivery anywhere in Pakistan!
                  </span>
                ) : (
                  <span>
                    Add <strong>Rs. {freeShippingRemaining.toLocaleString()}</strong> more for FREE Shipping
                  </span>
                )}
              </span>
              <span className="text-[11px] font-mono text-[#7E636E]">
                Rs. {freeShippingThreshold.toLocaleString()} Goal
              </span>
            </div>
            <div className="w-full h-2 bg-[#F9EEF1] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D4A0B0] via-[#BA788C] to-[#5C3544] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Unconfigured Gift Box Warning Banner */}
          {hasUnconfiguredGifts && (
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#FFF5F2] via-[#FDF0EC] to-[#FCEAE5] border border-[#E9A7B3] shadow-sm flex items-start gap-4">
              <div className="p-2.5 rounded-2xl bg-[#5C3544] text-[#FDF6F4] flex-shrink-0 shadow-2xs">
                <Gift className="w-5 h-5 text-[#D4A0B0]" />
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C]">
                    Personalization Needed
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#E57373] animate-ping" />
                </div>
                <h4 className="text-sm font-bold text-[#5C3544] mt-0.5">
                  Your Keepsake Gift Box has not been personalized yet!
                </h4>
                <p className="text-xs text-[#7E636E] mt-1 leading-relaxed">
                  Add recipient details, occasion, and your personal handwritten message in our Bespoke Gifting Studio before proceeding to checkout.
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <Link
                    href="/gift-vouchers"
                    className="px-4 py-2 rounded-xl bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
                    <span>Customize in Gifting Studio →</span>
                  </Link>
                  <button
                    onClick={() => {
                      if (unconfiguredGiftItems[0]) {
                        markGiftBoxBlank(unconfiguredGiftItems[0].product.id);
                      }
                    }}
                    className="text-xs text-[#7E636E] hover:text-[#5C3544] underline cursor-pointer"
                  >
                    Ship with blank gift card
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Items Container */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#D4A0B0]/25 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4A0B0]/20">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A0E14] font-medium">
                Items in Your Bag ({totalItems})
              </h2>
              <Link href="/bestsellers" className="text-xs text-[#7A4F5C] hover:text-[#5C3544] font-semibold">
                + Add more products
              </Link>
            </div>

            <div className="divide-y divide-[#D4A0B0]/20">
              {cart.map((item) => {
                const imgUrl = item.product.images?.[0]?.url;
                const isGift = isGiftProduct(item.product);
                const needsConfig = item.needsConfiguration || (isGift && !item.giftBoxConfig);

                return (
                  <div key={item.product.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex gap-4 items-start min-w-0">
                      {/* Product Thumbnail */}
                      <Link
                        href={`/products/${item.product.handle}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-[#FDF6F4] flex-shrink-0 border border-[#D4A0B0]/20 block"
                      >
                        {imgUrl ? (
                          <Image src={imgUrl} alt={item.product.title} fill className="object-contain p-2" sizes="96px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#D4A0B0] text-xs">Azyleen</div>
                        )}
                      </Link>

                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#BA788C] tracking-wider block">
                          {item.product.vendor}
                        </span>
                        <Link
                          href={`/products/${item.product.handle}`}
                          className="font-medium text-sm sm:text-base text-[#1A0E14] hover:text-[#5C3544] transition-colors line-clamp-1 mt-0.5"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-xs text-[#7E636E] mt-0.5">
                          Rs. {item.product.price.toLocaleString()} each
                        </p>

                        {/* Gift Box Status Tag */}
                        {isGift && needsConfig && (
                          <div className="mt-2 inline-flex items-center gap-2 p-2 rounded-xl bg-[#FFF2F0] border border-[#F8B4B4] text-[11px]">
                            <span className="font-bold text-[#9E2A2B]">⚠️ Needs Personalization</span>
                            <Link href="/gift-vouchers" className="text-[#5C3544] font-bold underline hover:text-[#3D1E2B]">
                              Customize in Studio →
                            </Link>
                          </div>
                        )}

                        {isGift && !needsConfig && item.giftBoxConfig && (
                          <div className="mt-2 p-2 rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/40 text-[11px] text-[#5C3544]">
                            <div className="flex items-center gap-2 font-semibold">
                              <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
                              <span>To: {item.giftBoxConfig.recipientName}</span>
                              <span className="text-[10px] text-[#7E636E]">({item.giftBoxConfig.occasion})</span>
                            </div>
                            <div className="text-[10px] text-[#7E636E] mt-0.5">
                              From: {item.giftBoxConfig.senderName} • Format: {item.giftBoxConfig.deliveryType === "physical" ? "Keepsake Foil Box" : "Digital Pass"}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls & Line Total */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                      <div className="flex items-center border border-[#D4A0B0]/40 rounded-full bg-[#FDF6F4]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#5C3544] hover:bg-[#D4A0B0]/20 rounded-full transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-[#1A0E14]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#5C3544] hover:bg-[#D4A0B0]/20 rounded-full transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <span className="text-sm font-bold text-[#5C3544]">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#7E636E] hover:text-[#D93025] transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Order Summary, Promos & Checkout */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 border border-[#D4A0B0]/25 shadow-sm space-y-5">
            <h3 className="font-serif text-xl text-[#1A0E14] font-medium pb-3 border-b border-[#D4A0B0]/20">
              Order Summary
            </h3>

            {/* Promo / Voucher Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#BA788C]" />
                <span>Promo or Gift Voucher Code</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. GLOW15 or AZ-GLOW..."
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow px-3.5 py-2.5 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544] uppercase placeholder:normal-case"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#F9EEF1] text-[#5C3544] hover:bg-[#5C3544] hover:text-white border border-[#D4A0B0]/30 rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </form>

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-[#7E636E] pt-2 border-t border-[#D4A0B0]/20">
              <div className="flex justify-between">
                <span>Items Subtotal ({totalItems})</span>
                <span className="font-semibold text-[#1A0E14]">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountApplied && (
                <div className="flex justify-between text-[#1A7A4A] font-semibold">
                  <span>Discount (GLOW15 15%)</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              {voucherApplied && (
                <div className="flex justify-between text-[#1A7A4A] font-semibold">
                  <span>Gift Voucher ({voucherCodeApplied})</span>
                  <span>- Rs. {voucherAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping across Pakistan</span>
                <span className="font-semibold text-[#1A0E14]">
                  {shippingCost === 0 ? <span className="text-[#1A7A4A] font-bold">FREE</span> : `Rs. ${shippingCost}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#5C3544] pt-3 border-t border-[#D4A0B0]/20">
                <span>Estimated Total</span>
                <span>Rs. {(finalTotal + shippingCost).toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white py-4 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 rounded-2xl text-xs font-semibold text-[#128C7E] bg-[#E7F6F2] hover:bg-[#D5EFE8] border border-[#128C7E]/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-[#128C7E]/20" />
                <span>Instant Order via WhatsApp COD</span>
              </button>
            </div>

            {/* Trust Assurance */}
            <div className="pt-2 border-t border-[#D4A0B0]/20 space-y-2 text-[11px] text-[#7E636E]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1A7A4A] flex-shrink-0" />
                <span>100% Guaranteed Authentic Seoul Import</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#BA788C] flex-shrink-0" />
                <span>Dispatched safely from Lahore via TCS Express</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Guard Modal (If unconfigured gift boxes exist) */}
      {showCheckoutWarning && (
        <div className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FDF6F4] border border-[#D4A0B0]/40 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center space-y-4 animate-scale-up">
            <div className="w-14 h-14 rounded-full bg-[#F9EEF1] border border-[#D4A0B0]/30 flex items-center justify-center mx-auto text-[#5C3544]">
              <Gift className="w-7 h-7 text-[#BA788C]" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C]">
                Personalization Required
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#5C3544] mt-1">
                Configure Your Gift Box
              </h3>
              <p className="text-xs text-[#7E636E] mt-2 leading-relaxed">
                Your luxury keepsake box includes a handwritten card and custom packaging details that have not been personalized yet.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/gift-vouchers"
                className="w-full py-3.5 px-4 rounded-xl bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
                <span>Customize in Gifting Studio Now</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (unconfiguredGiftItems[0]) {
                    markGiftBoxBlank(unconfiguredGiftItems[0].product.id);
                  }
                  setShowCheckoutWarning(false);
                  router.push("/checkout");
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F9EEF1] border border-[#D4A0B0]/40 text-[#5C3544] text-xs font-semibold transition-colors cursor-pointer"
              >
                Proceed with Blank Gift Box
              </button>

              <button
                type="button"
                onClick={() => setShowCheckoutWarning(false)}
                className="text-xs text-[#7E636E] hover:text-[#5C3544] block mx-auto pt-1 cursor-pointer"
              >
                Return to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
