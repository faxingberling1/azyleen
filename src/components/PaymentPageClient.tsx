"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Truck,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Banknote,
  CreditCard,
  Building,
  Copy,
  Check,
  Lock,
  Sparkles,
  Gift,
} from "lucide-react";
import { useCart, isGiftProduct } from "@/context/CartContext";

type PaymentMethod = "cod" | "bank_transfer" | "card";

export default function PaymentPageClient() {
  const router = useRouter();
  const { cart, subtotal, freeShippingThreshold, clearCart } = useCart();

  const [isLoaded, setIsLoaded] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("cod");
  const [bankRef, setBankRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Discounts
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [voucherCodeApplied, setVoucherCodeApplied] = useState("");

  useEffect(() => {
    try {
      const savedShipping = localStorage.getItem("azyleen_shipping_details");
      if (savedShipping) {
        setShippingDetails(JSON.parse(savedShipping));
      }

      const savedDiscounts = localStorage.getItem("azyleen_cart_discounts");
      if (savedDiscounts) {
        const d = JSON.parse(savedDiscounts);
        if (d.discountApplied) setDiscountAmount(d.discountAmount || 0);
        if (d.voucherApplied) {
          setVoucherAmount(d.voucherAmount || 0);
          setVoucherCodeApplied(d.voucherCodeApplied || "");
        }
      }
    } catch (e) {
      console.warn("Could not load from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Redirection Guards
  useEffect(() => {
    if (isLoaded) {
      if (cart.length === 0) {
        router.replace("/cart");
      } else if (!shippingDetails || !shippingDetails.address) {
        router.replace("/checkout");
      }
    }
  }, [isLoaded, cart.length, shippingDetails, router]);

  if (!isLoaded || cart.length === 0 || !shippingDetails) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-[#5C3544]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#5C3544] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Preparing payment options...</span>
        </div>
      </div>
    );
  }

  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discountAmount - voucherAmount);

  const handleCopyIban = () => {
    navigator.clipboard.writeText("PK36MEZN0002010105883492");
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderId = `AZ-PK-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const orderRecord = {
      orderId,
      date: now.toLocaleDateString("en-PK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      items: cart,
      shippingDetails,
      paymentMethod: selectedMethod,
      bankReference: selectedMethod === "bank_transfer" ? bankRef : undefined,
      subtotal,
      shippingCost,
      discountAmount,
      voucherAmount,
      voucherCode: voucherCodeApplied,
      total: finalTotal + shippingCost,
    };

    try {
      localStorage.setItem("azyleen_last_order", JSON.stringify(orderRecord));

      // Append to history
      const existingHistory = localStorage.getItem("azyleen_order_history");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      history.unshift(orderRecord);
      localStorage.setItem("azyleen_order_history", JSON.stringify(history));

      // Clear discounts
      localStorage.removeItem("azyleen_cart_discounts");
    } catch (err) {
      console.warn("Could not save order", err);
    }

    // Clear cart & route to thank you page
    clearCart();
    setTimeout(() => {
      router.push(`/thank-you?orderId=${orderId}`);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Checkout Stepper */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
          <Link href="/cart" className="flex items-center gap-2 text-[#1A7A4A] hover:underline">
            <span className="w-6 h-6 rounded-full bg-[#1A7A4A] text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </span>
            <span>Bag</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-[#D4A0B0]" />
          <Link href="/checkout" className="flex items-center gap-2 text-[#1A7A4A] hover:underline">
            <span className="w-6 h-6 rounded-full bg-[#1A7A4A] text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </span>
            <span>Shipping</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-[#D4A0B0]" />
          <div className="flex items-center gap-2 text-[#5C3544]">
            <span className="w-6 h-6 rounded-full bg-[#5C3544] text-white flex items-center justify-center text-[11px] font-bold">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Payment Method Selection & Review (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Details Summary Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#D4A0B0]/25 shadow-xs text-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D4A0B0]/20">
              <span className="font-bold text-[#5C3544] uppercase tracking-wider">
                Delivering To:
              </span>
              <Link
                href="/checkout"
                className="text-[#7A4F5C] hover:text-[#5C3544] font-semibold underline"
              >
                Change Address
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#7E636E]">
              <div>
                <p className="font-semibold text-[#1A0E14]">{shippingDetails.fullName}</p>
                <p>{shippingDetails.phone}</p>
                <p>{shippingDetails.email}</p>
              </div>
              <div>
                <p className="font-semibold text-[#1A0E14]">{shippingDetails.city}, Pakistan</p>
                <p className="line-clamp-2">{shippingDetails.address}</p>
                {shippingDetails.apartment && <p className="italic">{shippingDetails.apartment}</p>}
              </div>
            </div>
          </div>

          <form onSubmit={handleCompleteOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A0B0]/25 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A0E14] font-medium flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#BA788C]" />
                <span>Select Payment Method</span>
              </h2>
              <p className="text-xs text-[#7E636E] mt-1">
                All transactions are secure and verified with Azyleen authenticity guarantee.
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-3">
              {/* OPTION 1: Cash on Delivery (COD) */}
              <div
                onClick={() => setSelectedMethod("cod")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  selectedMethod === "cod"
                    ? "border-[#5C3544] bg-[#FDF6F4] ring-2 ring-[#5C3544]/20 shadow-xs"
                    : "border-[#D4A0B0]/25 bg-white hover:border-[#BA788C]/40"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${selectedMethod === "cod" ? "bg-[#5C3544] text-white" : "bg-[#F9EEF1] text-[#7A4F5C]"}`}>
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A0E14]">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] font-bold text-[#1A7A4A] bg-[#ECFDF5] px-2 py-0.5 rounded-full">
                      Most Popular in Pakistan
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7E636E] mt-1 leading-snug">
                    Pay in cash directly to the courier rider upon delivery at your doorstep. Inspect your tamper-proof Azyleen seal.
                  </p>
                </div>
              </div>

              {/* OPTION 2: Direct Bank Transfer (IBFT) */}
              <div
                onClick={() => setSelectedMethod("bank_transfer")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  selectedMethod === "bank_transfer"
                    ? "border-[#5C3544] bg-[#FDF6F4] ring-2 ring-[#5C3544]/20 shadow-xs"
                    : "border-[#D4A0B0]/25 bg-white hover:border-[#BA788C]/40"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${selectedMethod === "bank_transfer" ? "bg-[#5C3544] text-white" : "bg-[#F9EEF1] text-[#7A4F5C]"}`}>
                  <Building className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A0E14]">
                      Online Bank Transfer (IBFT / Meezan)
                    </span>
                    <span className="text-[10px] font-bold text-[#5C3544] bg-[#F9EEF1] px-2 py-0.5 rounded-full">
                      Instant Verification
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7E636E] mt-1 leading-snug">
                    Transfer directly via your Mobile Banking app (Meezan, HBL, Nayapay, SadaPay, etc.).
                  </p>

                  {/* Bank Details Dropdown when selected */}
                  {selectedMethod === "bank_transfer" && (
                    <div className="mt-3 p-3.5 rounded-xl bg-white border border-[#D4A0B0]/30 space-y-2 text-xs text-[#5C3544]">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-[#7E636E]">Bank Name:</span>
                        <strong className="font-semibold">Meezan Bank Ltd. (Islamic Banking)</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-[#7E636E]">Account Title:</span>
                        <strong className="font-semibold">Azyleen Skincare Luxury</strong>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-[#7E636E]">Account No:</span>
                        <strong className="font-mono">0201-0105-883492</strong>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-[#D4A0B0]/20">
                        <span className="text-[11px] text-[#7E636E]">IBAN:</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyIban();
                          }}
                          className="font-mono text-[11px] bg-[#FDF6F4] px-2 py-1 rounded-lg border border-[#D4A0B0]/40 flex items-center gap-1 hover:bg-[#F9EEF1] cursor-pointer"
                        >
                          <span>PK36MEZN0002010105883492</span>
                          {copiedBank ? <Check className="w-3 h-3 text-[#1A7A4A]" /> : <Copy className="w-3 h-3 text-[#7E636E]" />}
                        </button>
                      </div>

                      <div className="pt-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider text-[#7E636E] block mb-1">
                          Transaction Reference / Sender Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Meezan Ref # 882914 or your account title"
                          value={bankRef}
                          onChange={(e) => setBankRef(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-lg bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* OPTION 3: Debit/Credit Card & JazzCash */}
              <div
                onClick={() => setSelectedMethod("card")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  selectedMethod === "card"
                    ? "border-[#5C3544] bg-[#FDF6F4] ring-2 ring-[#5C3544]/20 shadow-xs"
                    : "border-[#D4A0B0]/25 bg-white hover:border-[#BA788C]/40"
                }`}
              >
                <div className={`p-2.5 rounded-xl ${selectedMethod === "card" ? "bg-[#5C3544] text-white" : "bg-[#F9EEF1] text-[#7A4F5C]"}`}>
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1A0E14]">
                      Visa / MasterCard / JazzCash
                    </span>
                    <span className="text-[10px] font-bold text-[#7E636E] bg-[#F9EEF1] px-2 py-0.5 rounded-full">
                      Zero Surcharge
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7E636E] mt-1 leading-snug">
                    Pay securely using local or international debit/credit card or JazzCash mobile wallet.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#D4A0B0]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/checkout"
                className="text-xs text-[#7E636E] hover:text-[#5C3544] flex items-center gap-1.5 py-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Shipping Details</span>
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group disabled:opacity-75"
              >
                <Sparkles className="w-4 h-4 text-[#C59B6D]" />
                <span>
                  {isSubmitting ? "Securing Order..." : `Place Order • Rs. ${(finalTotal + shippingCost).toLocaleString()}`}
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Review (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 border border-[#D4A0B0]/25 shadow-sm space-y-4">
            <h3 className="font-serif text-xl text-[#1A0E14] font-medium pb-3 border-b border-[#D4A0B0]/20">
              Payment Summary
            </h3>

            {/* Items review */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-[#D4A0B0]/15 last:border-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FDF6F4] border border-[#D4A0B0]/25 flex-shrink-0">
                    {item.product.images?.[0]?.url && (
                      <Image src={item.product.images[0].url} alt={item.product.title} fill className="object-contain p-1" sizes="48px" />
                    )}
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-xs font-medium text-[#1A0E14] truncate">{item.product.title}</p>
                    <p className="text-[10px] text-[#7E636E]">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#5C3544]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 text-xs text-[#7E636E] pt-3 border-t border-[#D4A0B0]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1A0E14]">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1A7A4A] font-semibold">
                  <span>Discount</span>
                  <span>- Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}

              {voucherAmount > 0 && (
                <div className="flex justify-between text-[#1A7A4A] font-semibold">
                  <span>Gift Voucher ({voucherCodeApplied})</span>
                  <span>- Rs. {voucherAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping via TCS Express</span>
                <span className="font-semibold text-[#1A0E14]">
                  {shippingCost === 0 ? <span className="text-[#1A7A4A] font-bold">FREE</span> : `Rs. ${shippingCost}`}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#5C3544] pt-3 border-t border-[#D4A0B0]/20">
                <span>Final Total Due</span>
                <span>Rs. {(finalTotal + shippingCost).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#7E636E] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1A7A4A]" />
              <span>Azyleen 100% Authentic Korean Promise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
