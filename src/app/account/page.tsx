"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sparkles,
  Package,
  MapPin,
  Gift,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "perks">("orders");

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
        <AnnouncementBar />
        <Navbar products={[]} />
        <main className="flex-grow flex items-center justify-center p-8">
          <div className="text-center bg-white p-10 rounded-3xl border border-[#D4A0B0]/30 shadow-xl max-w-md space-y-4">
            <h2 className="font-serif text-2xl text-[#5C3544]">Please Log In</h2>
            <p className="text-xs text-[#7E636E]">
              You must be logged in to view your customer portal and orders.
            </p>
            <Link
              href="/login"
              className="inline-block bg-[#5C3544] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Go to Login Page
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14]">
      <AnnouncementBar />
      <Navbar products={[]} />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
        {/* Profile Banner */}
        <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-[#D4A0B0]/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#5C3544] text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A0E14]">
                  {user.firstName} {user.lastName}
                </h1>
                <span className="bg-[#EDF7F1] text-[#1A7A4A] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-[#7E636E] mt-0.5">{user.email} • {user.phone}</p>
              <div className="flex items-center gap-1.5 text-xs text-[#BA788C] mt-1 font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{user.city}, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Glow Points Card */}
          <div className="flex items-center gap-4 bg-[#F9EEF1] p-4 rounded-2xl border border-[#D4A0B0]/30">
            <div className="w-10 h-10 rounded-full bg-[#5C3544] text-[#D4A0B0] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#7A4F5C]">
                Azyleen Glow Points
              </div>
              <div className="font-serif text-xl font-bold text-[#5C3544]">
                {user.glowPoints} Points
              </div>
              <p className="text-[10px] text-[#7E636E]">Worth Rs. {user.glowPoints} store credit</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#D4A0B0]/25 pb-3">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#5C3544] text-white shadow-md"
                : "bg-white text-[#5C3544] hover:bg-[#F9EEF1]"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({user.orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "addresses"
                ? "bg-[#5C3544] text-white shadow-md"
                : "bg-white text-[#5C3544] hover:bg-[#F9EEF1]"
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Address</span>
          </button>

          <button
            onClick={() => setActiveTab("perks")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "perks"
                ? "bg-[#5C3544] text-white shadow-md"
                : "bg-white text-[#5C3544] hover:bg-[#F9EEF1]"
            }`}
          >
            <Gift className="w-4 h-4" />
            <span>Glow Vouchers</span>
          </button>

          <button
            onClick={handleLogout}
            className="ml-auto px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#D93025] hover:bg-[#FDF2F2] rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {user.orders.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-[#D4A0B0]/20 p-8">
                <Package className="w-12 h-12 text-[#D4A0B0] mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#5C3544]">No past orders found</h3>
                <p className="text-xs text-[#7E636E] mt-1 mb-4">
                  Start your Korean skincare ritual today with our bestsellers.
                </p>
                <Link
                  href="/#products"
                  className="bg-[#5C3544] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Shop Formulations
                </Link>
              </div>
            ) : (
              user.orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-6 border border-[#D4A0B0]/30 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D4A0B0]/20 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-lg font-bold text-[#5C3544]">
                          Order #{ord.orderNumber}
                        </span>
                        <span className="bg-[#EDF7F1] text-[#1A7A4A] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          ✓ {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#7E636E] mt-0.5">Placed on {ord.date}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <div className="text-base font-bold text-[#5C3544]">
                        Rs. {ord.total.toLocaleString()}
                      </div>
                      <p className="text-[11px] text-[#7E636E]">{ord.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="space-y-3">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FDF6F4] p-1 border border-[#D4A0B0]/20 flex items-center justify-center font-serif text-[#BA788C] text-xs">
                            K-B
                          </div>
                          <div>
                            <span className="font-semibold text-[#1A0E14]">{item.title}</span>
                            <span className="text-[#7E636E] ml-2">Qty: {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-[#5C3544]">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Bar */}
                  <div className="p-3 bg-[#FDF6F4] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-2 text-[#5C3A46]">
                      <Truck className="w-4 h-4 text-[#BA788C]" />
                      <span>Tracking: <strong className="font-mono">{ord.trackingNumber}</strong></span>
                    </div>
                    <span className="text-[11px] text-[#1A7A4A] font-semibold">
                      Delivered to {ord.shippingAddress}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Address */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-3xl p-6 border-2 border-[#5C3544] shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#BA788C]">
                  Default Delivery Address
                </span>
                <span className="bg-[#5C3544] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Primary
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1A0E14]">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-xs text-[#5C3A46] leading-relaxed">{user.address}</p>
              <p className="text-xs text-[#7E636E]">Phone: {user.phone}</p>
              <div className="pt-2 text-[11px] text-[#1A7A4A] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Eligible for 1-2 Day Express Courier</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Perks & Vouchers */}
        {activeTab === "perks" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#F9EEF1] to-white border border-[#D4A0B0]/40 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#D93025] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Active Voucher
                </span>
                <span className="text-xs font-bold text-[#5C3544]">15% OFF</span>
              </div>
              <div className="font-mono text-lg font-bold text-[#5C3544] tracking-widest">
                GLOW15
              </div>
              <p className="text-xs text-[#5C3A46]">
                Applicable on all serums, creams, and sunscreen bundles over Rs. 3,500.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#EDF3EF] to-white border border-[#6B8E78]/30 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#1A7A4A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Welcome Perk
                </span>
                <span className="text-xs font-bold text-[#1A7A4A]">Rs. 500 OFF</span>
              </div>
              <div className="font-mono text-lg font-bold text-[#1A7A4A] tracking-widest">
                WELCOME500
              </div>
              <p className="text-xs text-[#5C3A46]">
                Flat Rs. 500 discount on your first order above Rs. 4,000.
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
