"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ShieldCheck, ArrowRight, UserCheck, Lock, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin, isAuthenticated, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      router.push("/account");
    }
  };

  const handleDemoClick = () => {
    demoLogin();
    router.push("/account");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      <AnnouncementBar />
      <Navbar products={[]} />

      <main className="flex-grow flex items-center justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4A0B0]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C59B6D]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-8 sm:p-10 border border-[#D4A0B0]/30 shadow-2xl space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#F9EEF1] text-[#7A4F5C] flex items-center justify-center mx-auto border border-[#D4A0B0]/30 shadow-xs">
                <Sparkles className="w-6 h-6 text-[#BA788C]" />
              </div>
              <h1 className="font-serif text-3xl font-medium text-[#1A0E14] tracking-tight">
                {isRegister ? "Join Azyleen Glow Circle" : "Welcome Back"}
              </h1>
              <p className="text-xs text-[#7E636E]">
                {isRegister
                  ? "Create your account to track orders & unlock exclusive discounts."
                  : "Sign in to access your orders, saved addresses, and Glow Points."}
              </p>
            </div>

            {/* DEMO 1-CLICK LOGIN HIGHLIGHT BOX */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F9EEF1] via-white to-[#FDF6F4] border border-[#D4A0B0]/40 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#BA788C] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#1A7A4A]" />
                  <span>Instant Test Login</span>
                </span>
                <span className="bg-[#1A7A4A] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Ready to test
                </span>
              </div>
              <p className="text-xs text-[#5C3A46] leading-relaxed">
                Test the customer portal with pre-loaded Pakistani orders, address, and 450 Glow points.
              </p>
              <button
                type="button"
                onClick={handleDemoClick}
                className="w-full bg-[#5C3544] hover:bg-[#43232F] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A0B0]" />
                <span>1-Click Demo Login (Zara Ansari)</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-[1px] bg-[#D4A0B0]/25 flex-grow" />
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#7E636E]">
                Or With Your Email
              </span>
              <div className="h-[1px] bg-[#D4A0B0]/25 flex-grow" />
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C3544] block">
                  Email Address
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus-within:border-[#5C3544]">
                  <Mail className="w-4 h-4 text-[#7E636E]" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent text-xs text-[#1A0E14] focus:outline-none w-full"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#5C3544] block">
                  Password
                </label>
                <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#FDF6F4] border border-[#D4A0B0]/30 focus-within:border-[#5C3544]">
                  <Lock className="w-4 h-4 text-[#7E636E]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent text-xs text-[#1A0E14] focus:outline-none w-full"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#BA788C] hover:bg-[#A36678] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isRegister ? "Create Account" : "Sign In to Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Toggle Sign In / Register */}
            <div className="text-center pt-2 text-xs text-[#7E636E]">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsRegister(false)}
                    className="font-bold text-[#5C3544] hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  New to Azyleen?{" "}
                  <button
                    onClick={() => setIsRegister(true)}
                    className="font-bold text-[#5C3544] hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>

            {/* Trust footer */}
            <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#7E636E] pt-2 border-t border-[#D4A0B0]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1A7A4A]" />
              <span>Shopify Customer Account Architecture</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
