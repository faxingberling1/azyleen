"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Sparkles,
  Gift,
  Truck,
  MessageCircle,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";
import { isGiftProduct } from "@/context/CartContext";

export default function ThankYouPageClient() {
  const searchParams = useSearchParams();
  const orderIdQuery = searchParams.get("orderId");

  const [order, setOrder] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.35, x: 0.5 },
        colors: ["#5C3544", "#BA788C", "#D4A0B0", "#C59B6D", "#1A7A4A"],
        zIndex: 99999,
      });
    } catch (e) {
      // ignore
    }

    try {
      const saved = localStorage.getItem("azyleen_last_order");
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrder(parsed);
      }
    } catch (e) {
      console.warn("Could not load last order", e);
    }
    setIsLoaded(true);
  }, []);

  const orderId = orderIdQuery || order?.orderId || "AZ-PK-89421";

  const handleWhatsAppHelp = () => {
    const text = `Salam Azyleen Concierge! My Order ID is *${orderId}*. Could you please confirm the dispatch timeline for my order to ${
      order?.shippingDetails?.city || "my address"
    }? Thank you!`;
    window.open(`https://wa.me/923252867992?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Celebration Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D4A0B0]/30 shadow-sm text-center relative overflow-hidden">
        {/* Top Accent Strip */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D4A0B0] via-[#5C3544] to-[#C59B6D]" />

        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#059669] mx-auto mb-4 shadow-xs">
          <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#BA788C] bg-[#FDF6F4] px-4 py-1.5 rounded-full border border-[#D4A0B0]/40 inline-flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B6D]" />
          <span>Shukriya! Order Confirmed</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#1A0E14] font-medium mt-1">
          Your Radiant Skin Journey Begins
        </h1>

        <p className="text-xs sm:text-sm text-[#7E636E] mt-2 max-w-lg mx-auto leading-relaxed">
          We&apos;ve received your order and our team in Lahore is preparing your 100% authentic Seoul formulations with luxury keepsake packaging.
        </p>

        {/* Order Meta Pill */}
        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 p-3.5 sm:p-4 rounded-2xl bg-[#FDF6F4] border border-[#D4A0B0]/30 text-xs text-[#5C3544]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7E636E] block">Order Reference</span>
            <strong className="font-mono text-sm text-[#5C3544]">{orderId}</strong>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[#D4A0B0]/30" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7E636E] block">Date</span>
            <span className="font-medium">{order?.date || "Today"}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-[#D4A0B0]/30" />
          <div>
            <span className="text-[10px] uppercase font-bold text-[#7E636E] block">Payment Method</span>
            <span className="font-bold text-[#1A7A4A] capitalize">
              {order?.paymentMethod === "cod"
                ? "Cash on Delivery (COD)"
                : order?.paymentMethod === "bank_transfer"
                ? "Bank Transfer (IBFT)"
                : "Debit / Credit Card"}
            </span>
          </div>
        </div>
      </div>

      {/* Fulfillment Status & Delivery Timeline */}
      <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A0B0]/25 shadow-xs space-y-6">
        <h3 className="font-serif text-xl text-[#1A0E14] font-medium pb-3 border-b border-[#D4A0B0]/20 flex items-center justify-between">
          <span>Delivery Timeline</span>
          <span className="text-xs font-sans text-[#1A7A4A] font-semibold flex items-center gap-1.5">
            <Truck className="w-4 h-4" />
            <span>2-3 Business Days Delivery</span>
          </span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#065F46] space-y-1">
            <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto text-xs font-bold">
              ✓
            </div>
            <p className="text-xs font-bold mt-1">Order Placed</p>
            <p className="text-[10px] text-[#047857]">Received in system</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FDF6F4] border border-[#D4A0B0]/40 text-[#5C3544] space-y-1">
            <div className="w-7 h-7 rounded-full bg-[#5C3544] text-white flex items-center justify-center mx-auto text-xs font-bold animate-pulse">
              2
            </div>
            <p className="text-xs font-bold mt-1">Packaging &amp; Notes</p>
            <p className="text-[10px] text-[#7E636E]">Handcrafting keepsake</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FDF6F4]/50 border border-[#D4A0B0]/20 text-[#7E636E] space-y-1 opacity-70">
            <div className="w-7 h-7 rounded-full bg-[#EAD9DE] text-[#7E636E] flex items-center justify-center mx-auto text-xs font-bold">
              3
            </div>
            <p className="text-xs font-bold mt-1">TCS Dispatch</p>
            <p className="text-[10px]">Tracking SMS en route</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#FDF6F4]/50 border border-[#D4A0B0]/20 text-[#7E636E] space-y-1 opacity-70">
            <div className="w-7 h-7 rounded-full bg-[#EAD9DE] text-[#7E636E] flex items-center justify-center mx-auto text-xs font-bold">
              4
            </div>
            <p className="text-xs font-bold mt-1">Doorstep Delivery</p>
            <p className="text-[10px]">Inspect &amp; enjoy glow</p>
          </div>
        </div>
      </div>

      {/* Ordered Items Breakdown */}
      {order?.items && order.items.length > 0 && (
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A0B0]/25 shadow-xs space-y-5">
          <h3 className="font-serif text-xl text-[#1A0E14] font-medium pb-3 border-b border-[#D4A0B0]/20">
            Ordered Items ({order.items.length})
          </h3>

          <div className="divide-y divide-[#D4A0B0]/20">
            {order.items.map((item: any, idx: number) => {
              const imgUrl = item.product.images?.[0]?.url;
              const isGift = isGiftProduct(item.product);

              return (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-start min-w-0">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#FDF6F4] border border-[#D4A0B0]/25 flex-shrink-0">
                      {imgUrl ? (
                        <Image src={imgUrl} alt={item.product.title} fill className="object-contain p-1" sizes="64px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#D4A0B0]">Azyleen</div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <span className="text-[9.5px] uppercase font-bold text-[#BA788C] tracking-wider block">
                        {item.product.vendor}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#1A0E14] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] text-[#7E636E] mt-0.5">
                        Qty: {item.quantity} • Rs. {item.product.price.toLocaleString()} each
                      </p>

                      {/* Display Gift Box Card Customization if Present */}
                      {item.giftBoxConfig && (
                        <div className="mt-2 p-2.5 rounded-xl bg-gradient-to-r from-[#FDF6F4] to-[#F9EEF1] border border-[#D4A0B0]/40 text-[11px] text-[#5C3544] space-y-1">
                          <div className="flex items-center gap-1.5 font-bold">
                            <Gift className="w-3.5 h-3.5 text-[#BA788C]" />
                            <span>Keepsake Card: To {item.giftBoxConfig.recipientName} from {item.giftBoxConfig.senderName}</span>
                          </div>
                          {item.giftBoxConfig.personalMessage && (
                            <p className="italic text-[#7E636E] text-[10.5px]">
                              &ldquo;{item.giftBoxConfig.personalMessage}&rdquo;
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right sm:pl-4 self-end sm:self-center">
                    <span className="text-xs sm:text-sm font-bold text-[#5C3544]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-[#D4A0B0]/20 space-y-2 text-xs text-[#7E636E] max-w-xs ml-auto">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-[#1A0E14]">Rs. {order.subtotal?.toLocaleString()}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-[#1A7A4A] font-semibold">
                <span>Promo Discount:</span>
                <span>- Rs. {order.discountAmount.toLocaleString()}</span>
              </div>
            )}
            {order.voucherAmount > 0 && (
              <div className="flex justify-between text-[#1A7A4A] font-semibold">
                <span>Gift Voucher:</span>
                <span>- Rs. {order.voucherAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping (Pakistan):</span>
              <span className="font-semibold text-[#1A0E14]">
                {order.shippingCost === 0 ? <span className="text-[#1A7A4A]">FREE</span> : `Rs. ${order.shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#5C3544] pt-2 border-t border-[#D4A0B0]/20">
              <span>Total Paid:</span>
              <span>Rs. {order.total?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Delivery & Customer Details Card */}
      {order?.shippingDetails && (
        <div className="mt-6 bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A0B0]/25 shadow-xs">
          <h3 className="font-serif text-xl text-[#1A0E14] font-medium pb-3 border-b border-[#D4A0B0]/20">
            Recipient &amp; Delivery Destination
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#7E636E] pt-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C] block mb-1">
                Customer
              </span>
              <p className="font-semibold text-[#1A0E14]">{order.shippingDetails.fullName}</p>
              <p>{order.shippingDetails.phone}</p>
              <p>{order.shippingDetails.email}</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C] block mb-1">
                Dispatch Address
              </span>
              <p className="font-semibold text-[#1A0E14]">{order.shippingDetails.city}, Pakistan</p>
              <p>{order.shippingDetails.address}</p>
              {order.shippingDetails.apartment && <p>{order.shippingDetails.apartment}</p>}
              {order.shippingDetails.deliveryNotes && (
                <p className="italic text-[11px] mt-1 text-[#5C3544]">
                  Note: &ldquo;{order.shippingDetails.deliveryNotes}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action Footer Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={handlePrint}
          className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FDF6F4] text-[#5C3544] border border-[#D4A0B0]/40 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleWhatsAppHelp}
            className="px-6 py-3.5 rounded-full bg-[#E7F6F2] hover:bg-[#D5EFE8] text-[#128C7E] border border-[#128C7E]/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-[#128C7E]/20" />
            <span>WhatsApp Tracking VIP</span>
          </button>

          <Link
            href="/bestsellers"
            className="px-8 py-3.5 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
