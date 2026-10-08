"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Send,
  Search,
  PackageCheck,
  HelpCircle,
  MapPin
} from "lucide-react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function SupportPage() {
  // Order Tracking State
  const [orderQuery, setOrderQuery] = useState("");
  const [trackedOrder, setTrackedOrder] = useState<{
    id: string;
    status: string;
    city: string;
    carrier: string;
    estimatedDelivery: string;
    step: number;
  } | null>(null);
  const [isSearchingOrder, setIsSearchingOrder] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "Skin Routine Advice",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleOrderLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    setIsSearchingOrder(true);
    setTimeout(() => {
      setTrackedOrder({
        id: orderQuery.toUpperCase().startsWith("AZ-") ? orderQuery.toUpperCase() : `AZ-${orderQuery.slice(-5)}`,
        status: "In Transit — Dispatched via Express Air",
        city: "Lahore Hub to Delivery Address",
        carrier: "Trax Logistics Express",
        estimatedDelivery: "Within 24-48 Hours (COD Available)",
        step: 3,
      });
      setIsSearchingOrder(false);
    }, 700);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", phone: "", email: "", topic: "Skin Routine Advice", message: "" });
    }, 4000);
  };

  const faqs = [
    {
      q: "How do I verify that my Azyleen products are 100% authentic?",
      a: "Every product imported by Azyleen features the manufacturer's original batch code printed on the bottom of the bottle and outer packaging. You can verify this batch code directly on manufacturer websites (or batch checking tools like CheckFresh/CosmeticCalculator). We guarantee 100% original Seoul imports or a 10x refund.",
    },
    {
      q: "How fast is delivery across Pakistan?",
      a: "Orders placed before 4:00 PM PKT are dispatched the very same day from our Lahore fulfillment center. Delivery within Lahore arrives in 24 hours. Karachi, Islamabad, Rawalpindi, and other major cities arrive within 2-3 business days. Rural and remote areas arrive in 3-4 days.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We offer Cash on Delivery (COD) nationwide across all cities and towns in Pakistan. We also accept instant digital payments via JazzCash, EasyPaisa, Bank Transfer, and Visa/Mastercard debit and credit cards.",
    },
    {
      q: "What is your 7-Day Return & Exchange policy?",
      a: "If your parcel arrives damaged in transit, or if you received an incorrect item, contact our WhatsApp Concierge within 7 days of delivery. We will arrange a free immediate replacement or full refund with zero questions asked.",
    },
    {
      q: "Can I receive a free personalized skin consultation?",
      a: "Yes! Our skincare advisors are trained in Korean formulation synergy and South Asian dermatological concerns (melasma, post-inflammatory dark spots, damaged barrier). Click our WhatsApp button to receive a personalized routine tailored to your skin type.",
    },
    {
      q: "Do your sunscreens leave any white cast on Pakistani skin tones?",
      a: "None at all. We specifically test and curate viral Korean sunscreens (such as Skin1004 Hyalu-Cica Water-Fit) that utilize modern organic UV filters. They absorb completely clear within 60 seconds, leaving zero chalky residue or purple tint on medium-to-deep skin tones.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={[]} />

      <main className="flex-grow">
        {/* Support Header */}
        <section className="relative pt-12 pb-16 sm:pb-20 bg-gradient-to-b from-[#F9EEF1]/80 via-[#FDF6F4] to-[#FDF6F4] border-b border-[#D4A0B0]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4A0B0]/40 shadow-xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#BA788C]" />
              <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5C3544]">
                VIP Concierge &amp; Customer Care
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#1A0E14] tracking-tight">
              How Can We Help <span className="italic font-serif text-[#7A4F5C]">Your Skin</span> Today?
            </h1>

            <p className="text-xs sm:text-base text-[#5C3A46] mt-3.5 max-w-2xl mx-auto leading-relaxed">
              Have a question about your order, need a personalized routine recommendation, or want to verify an authentic batch code? Our Lahore skincare specialists are ready to help.
            </p>
          </div>
        </section>

        {/* Quick Contact Channels (3 High-Impact Cards) */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Card */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#D4A0B0]/30 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F8F0] text-[#128C7E] flex items-center justify-center mb-5 shadow-xs">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#128C7E] animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#128C7E]">
                    Fastest Response (Avg. 5 mins)
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A0E14]">
                  WhatsApp Skincare Concierge
                </h3>
                <p className="text-xs text-[#7E636E] mt-2 leading-relaxed">
                  Chat directly with our South Asian skincare specialists for instant order tracking, shade advice, and routine curation.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D4A0B0]/20">
                <a
                  href="https://wa.me/923252867992?text=Hi%20Azyleen%2C%20I%20have%20a%20question%20about%20my%20skincare%20order"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-[#128C7E] hover:bg-[#0E6D62] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#D4A0B0]/30 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#F9EEF1] text-[#BA788C] flex items-center justify-center mb-5 shadow-xs">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C]">
                    Written Support &amp; Receipts
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A0E14]">
                  Email Concierge
                </h3>
                <p className="text-xs text-[#7E636E] mt-2 leading-relaxed">
                  Send us order changes, address corrections, wholesale inquiries, or high-res photos for batch-code verification.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D4A0B0]/20">
                <a
                  href="mailto:support@azyleen.com"
                  className="w-full py-3 px-4 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>support@azyleen.com</span>
                </a>
              </div>
            </div>

            {/* Operating Hours & Hub Card */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#D4A0B0]/30 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FDF6F4] text-[#5C3544] border border-[#D4A0B0]/30 flex items-center justify-center mb-5 shadow-xs">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C3544]">
                    Fulfillment &amp; Hours
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1A0E14]">
                  Lahore Fulfillment Hub
                </h3>
                <div className="mt-3 space-y-2 text-xs text-[#5C3A46]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#BA788C] flex-shrink-0 mt-0.5" />
                    <span>Gulberg III, Lahore, Pakistan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#BA788C] flex-shrink-0 mt-0.5" />
                    <span>Mon - Sat: 10:00 AM - 10:00 PM PKT</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#BA788C] flex-shrink-0 mt-0.5" />
                    <span>Helpline: +92 325 2867992</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#D4A0B0]/20 flex items-center justify-between text-[11px] text-[#1A7A4A] font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dispatches active today</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Order Tracking Tool */}
        <section className="py-12 bg-white border-y border-[#D4A0B0]/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[10.5px] font-bold uppercase tracking-widest text-[#BA788C] block mb-1">
                Self-Service Lookup
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-[#1A0E14]">
                Track Your Express Order
              </h2>
              <p className="text-xs sm:text-sm text-[#7E636E] mt-1.5">
                Enter your Azyleen Order Number (e.g. <code>AZ-10842</code>) or your registered 11-digit mobile phone number.
              </p>
            </div>

            <form onSubmit={handleOrderLookup} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-8">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-[#BA788C] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="Order ID (e.g. AZ-10825) or 03001234567"
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#FDF6F4] border border-[#D4A0B0]/40 text-xs sm:text-sm text-[#1A0E14] focus:outline-none focus:border-[#5C3544] shadow-2xs font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSearchingOrder}
                className="px-8 py-3.5 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {isSearchingOrder ? (
                  <span>Checking...</span>
                ) : (
                  <>
                    <PackageCheck className="w-4 h-4" />
                    <span>Track Order</span>
                  </>
                )}
              </button>
            </form>

            {/* Simulated Live Order Status Result */}
            {trackedOrder && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FDF6F4] border border-[#D4A0B0]/30 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#D4A0B0]/20 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#BA788C] uppercase tracking-wider block">
                      Order Reference
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#1A0E14]">
                      {trackedOrder.id}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#D4A0B0]/30 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#1A7A4A] animate-pulse" />
                    <span className="text-xs font-bold text-[#1A7A4A]">{trackedOrder.status}</span>
                  </div>
                </div>

                {/* Tracking Progress Steps */}
                <div className="grid grid-cols-4 gap-2 pt-6 pb-4">
                  {[
                    { step: 1, label: "Confirmed" },
                    { step: 2, label: "Batch Verified" },
                    { step: 3, label: "In Transit" },
                    { step: 4, label: "Delivered" },
                  ].map((s) => (
                    <div key={s.step} className="flex flex-col items-center text-center">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 transition-all ${
                          s.step <= trackedOrder.step
                            ? "bg-[#1A7A4A] text-white shadow-xs"
                            : "bg-white text-[#7E636E] border border-[#D4A0B0]/30"
                        }`}
                      >
                        {s.step <= trackedOrder.step ? "✓" : s.step}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-[#5C3544]">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-[#D4A0B0]/20 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5C3A46]">
                  <div>
                    <span className="text-[#7E636E] block text-[11px]">Courier Partner:</span>
                    <strong>{trackedOrder.carrier}</strong>
                  </div>
                  <div>
                    <span className="text-[#7E636E] block text-[11px]">Estimated Delivery:</span>
                    <strong className="text-[#1A7A4A]">{trackedOrder.estimatedDelivery}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact & Consultation Form Split with FAQ */}
        <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact / Skin Concern Form */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C] block mb-2">
                Send a Direct Message
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A0E14] mb-4">
                Consult With Our Seoul Skincare Advisors
              </h2>
              <p className="text-xs sm:text-sm text-[#7E636E] mb-8 leading-relaxed">
                Tell us about your current skin concerns, ask for an ingredient check, or inquire about an existing order. We respond within 2 hours during working hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-3xl bg-[#EDF7F1] border border-[#A7F3D0] text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#1A7A4A] mx-auto mb-3" />
                  <h4 className="font-serif text-2xl font-bold text-[#1A7A4A]">
                    Message Received ✨
                  </h4>
                  <p className="text-xs sm:text-sm text-[#1A7A4A] mt-2 max-w-md mx-auto">
                    Thank you! Our skincare specialist has received your message and will reach out to your WhatsApp/Email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#5C3544] block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ayesha Khan"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4A0B0]/40 text-xs sm:text-sm text-[#1A0E14] focus:outline-none focus:border-[#BA788C]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#5C3544] block mb-1">WhatsApp Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0300 1234567"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4A0B0]/40 text-xs sm:text-sm text-[#1A0E14] focus:outline-none focus:border-[#BA788C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#5C3544] block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ayesha@gmail.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4A0B0]/40 text-xs sm:text-sm text-[#1A0E14] focus:outline-none focus:border-[#BA788C]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#5C3544] block mb-1">Inquiry Topic</label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4A0B0]/40 text-xs sm:text-sm text-[#1A0E14] focus:outline-none focus:border-[#BA788C]"
                      >
                        <option value="Skin Routine Advice">Skin Routine Advice</option>
                        <option value="Order Status & Delivery">Order Status &amp; Delivery</option>
                        <option value="Batch Code Authenticity">Batch Code Authenticity</option>
                        <option value="Return or Exchange">Return or Exchange</option>
                        <option value="Wholesale / Partnership">Wholesale / Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#5C3544] block mb-1">Your Message or Skin Concern</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your skin concern (e.g., dark spots, acne scars, barrier damage, dryness) or order number..."
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#D4A0B0]/40 text-xs sm:text-sm text-[#1A0E14] focus:outline-none focus:border-[#BA788C]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-[#5C3544] hover:bg-[#43232F] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Consultation Request</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Comprehensive FAQ Accordion */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#BA788C] block mb-2">
                Instant Answers
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1A0E14] mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#7E636E] mb-8 leading-relaxed">
                Everything you need to know about our genuine Seoul sourcing, nationwide Pakistan delivery, Cash on Delivery, and returns.
              </p>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-[#D4A0B0]/30 shadow-xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FDF6F4]/50 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-semibold text-[#1A0E14] leading-snug">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#BA788C] flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs text-[#5C3A46] leading-relaxed border-t border-[#D4A0B0]/15 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
