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
  Gift,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  CheckCircle2,
} from "lucide-react";
import { useCart, isGiftProduct } from "@/context/CartContext";

const PAKISTAN_CITIES = [
  { name: "Lahore", eta: "Same / Next Day Express (Free Local Hub)" },
  { name: "Karachi", eta: "1-2 Business Days via Air Express" },
  { name: "Islamabad", eta: "1-2 Business Days via TCS" },
  { name: "Rawalpindi", eta: "1-2 Business Days via TCS" },
  { name: "Faisalabad", eta: "2 Business Days" },
  { name: "Multan", eta: "2 Business Days" },
  { name: "Peshawar", eta: "2-3 Business Days" },
  { name: "Sialkot", eta: "1-2 Business Days" },
  { name: "Gujranwala", eta: "1-2 Business Days" },
  { name: "Quetta", eta: "2-3 Business Days" },
  { name: "Hyderabad", eta: "2-3 Business Days" },
  { name: "Other City / Town", eta: "2-4 Business Days Nationwide" },
];

export default function CheckoutPageClient() {
  const router = useRouter();
  const { cart, subtotal, freeShippingThreshold, totalItems, hasUnconfiguredGifts, unconfiguredGiftItems, markGiftBoxBlank } = useCart();

  const [isLoaded, setIsLoaded] = useState(false);

  // Form State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("Lahore");
  const [postalCode, setPostalCode] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  // Discount info
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherAmount, setVoucherAmount] = useState(0);
  const [voucherCodeApplied, setVoucherCodeApplied] = useState("");

  // Guard & Load from LocalStorage
  useEffect(() => {
    try {
      const savedShipping = localStorage.getItem("azyleen_shipping_details");
      if (savedShipping) {
        const parsed = JSON.parse(savedShipping);
        setEmail(parsed.email || "");
        setPhone(parsed.phone || "");
        setFullName(parsed.fullName || "");
        setAddress(parsed.address || "");
        setApartment(parsed.apartment || "");
        setCity(parsed.city || "Lahore");
        setPostalCode(parsed.postalCode || "");
        setDeliveryNotes(parsed.deliveryNotes || "");
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

  // Redirection guard if cart is empty
  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart");
    }
  }, [isLoaded, cart.length, router]);

  if (!isLoaded || cart.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-[#5C3544]">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#5C3544] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Securing checkout session...</span>
        </div>
      </div>
    );
  }

  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 250;
  const finalTotal = Math.max(0, subtotal - discountAmount - voucherAmount);
  const activeCityInfo = PAKISTAN_CITIES.find((c) => c.name === city) || PAKISTAN_CITIES[0];

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();

    const shippingDetails = {
      fullName,
      email,
      phone,
      address,
      apartment,
      city,
      postalCode,
      deliveryNotes,
    };

    try {
      localStorage.setItem("azyleen_shipping_details", JSON.stringify(shippingDetails));
    } catch (err) {
      console.warn("Failed to save shipping details", err);
    }

    router.push("/payment");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Checkout Stepper */}
      <div className="mb-8 max-w-2xl mx-auto">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider">
          <Link href="/cart" className="flex items-center gap-2 text-[#7A4F5C] hover:text-[#5C3544]">
            <span className="w-6 h-6 rounded-full bg-[#1A7A4A] text-white flex items-center justify-center text-[11px] font-bold">
              ✓
            </span>
            <span>Shopping Bag</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-[#D4A0B0]" />
          <div className="flex items-center gap-2 text-[#5C3544]">
            <span className="w-6 h-6 rounded-full bg-[#5C3544] text-white flex items-center justify-center text-[11px] font-bold">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Shipping Address Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Unconfigured Gift Box Reminder Alert */}
          {hasUnconfiguredGifts && (
            <div className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#E9A7B3] flex items-start gap-3.5">
              <Gift className="w-5 h-5 text-[#BA788C] flex-shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-bold text-[#5C3544]">
                  Your order contains an unconfigured Keepsake Gift Box.
                </p>
                <p className="text-[#7E636E] mt-0.5">
                  Would you like to personalize your recipient note and gift card now?
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <Link href="/gift-vouchers" className="font-bold text-[#5C3544] underline hover:text-[#3D1E2B]">
                    Customize in Gifting Studio →
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      if (unconfiguredGiftItems[0]) markGiftBoxBlank(unconfiguredGiftItems[0].product.id);
                    }}
                    className="text-[#7E636E] underline cursor-pointer"
                  >
                    Send blank gift card
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmitShipping} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D4A0B0]/25 shadow-xs space-y-6">
            {/* Contact Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl sm:text-2xl text-[#1A0E14] font-medium flex items-center gap-2">
                  <User className="w-5 h-5 text-[#BA788C]" />
                  <span>Contact Information</span>
                </h2>
                <span className="text-[11px] text-[#7E636E]">Required for dispatch SMS</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#BA788C] absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. ayesha@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#BA788C] absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0321 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                    />
                  </div>
                  <span className="text-[10px] text-[#7E636E] mt-1 block">
                    Our courier will call/WhatsApp this number prior to delivery.
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery Address Section */}
            <div className="pt-4 border-t border-[#D4A0B0]/20">
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A0E14] font-medium flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#BA788C]" />
                <span>Shipping Destination</span>
              </h2>

              <div className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                    Complete Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat No., Street, Block, Phase, Area"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                      Apartment / Suite / Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Packages Mall, Apt 4B"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                      Destination City (Pakistan) *
                    </label>
                    <div className="relative">
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544] cursor-pointer"
                      >
                        {PAKISTAN_CITIES.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                      Postal / ZIP Code (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 54000"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7E636E] block mb-1.5">
                      Special Courier Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Leave at gate if unavailable"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full px-3.5 py-3 text-xs rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus:outline-none focus:border-[#5C3544]"
                    />
                  </div>
                </div>

                {/* City Delivery Speed Pill */}
                <div className="p-3.5 rounded-2xl bg-[#FDF6F4] border border-[#D4A0B0]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#BA788C]" />
                    <span className="font-semibold text-[#5C3544]">Estimated Speed for {city}:</span>
                  </div>
                  <span className="font-medium text-[#1A7A4A]">{activeCityInfo.eta}</span>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-[#D4A0B0]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/cart"
                className="text-xs text-[#7E636E] hover:text-[#5C3544] flex items-center gap-1.5 py-2 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Return to Shopping Bag</span>
              </Link>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Order Summary (5 Cols) */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-3xl p-6 border border-[#D4A0B0]/25 shadow-sm space-y-4">
            <h3 className="font-serif text-xl text-[#1A0E14] font-medium pb-3 border-b border-[#D4A0B0]/20">
              Order Review ({totalItems} items)
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => {
                const imgUrl = item.product.images?.[0]?.url;
                const isGift = isGiftProduct(item.product);

                return (
                  <div key={item.product.id} className="flex items-center gap-3 py-2 border-b border-[#D4A0B0]/15 last:border-0">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FDF6F4] border border-[#D4A0B0]/25 flex-shrink-0">
                      {imgUrl ? (
                        <Image src={imgUrl} alt={item.product.title} fill className="object-contain p-1" sizes="56px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-[#D4A0B0]">Azyleen</div>
                      )}
                      <span className="absolute top-0 right-0 w-4 h-4 rounded-bl-lg bg-[#5C3544] text-white text-[9px] font-bold flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="min-w-0 flex-grow">
                      <p className="text-xs font-medium text-[#1A0E14] truncate">
                        {item.product.title}
                      </p>
                      {item.giftBoxConfig && (
                        <p className="text-[10px] text-[#7A4F5C] truncate">
                          To: {item.giftBoxConfig.recipientName} ({item.giftBoxConfig.occasion})
                        </p>
                      )}
                      {isGift && !item.giftBoxConfig && (
                        <p className="text-[10px] text-[#9E2A2B] font-bold">
                          ⚠️ Needs Personalization
                        </p>
                      )}
                      <p className="text-[11px] font-semibold text-[#5C3544] mt-0.5">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals Breakdown */}
            <div className="space-y-2 text-xs text-[#7E636E] pt-3 border-t border-[#D4A0B0]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1A0E14]">Rs. {subtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#1A7A4A] font-semibold">
                  <span>Promo Discount (15%)</span>
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
                <span>Total Due</span>
                <span>Rs. {(finalTotal + shippingCost).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#7E636E] flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1A7A4A]" />
              <span>Safe &amp; Encrypted 256-Bit Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
