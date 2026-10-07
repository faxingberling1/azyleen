"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: "Delivered" | "Dispatched" | "Processing";
  total: number;
  items: Array<{
    title: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber: string;
}

export interface CustomerUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  glowPoints: number;
  orders: CustomerOrder[];
}

interface AuthContextType {
  user: CustomerUser | null;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  demoLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: CustomerUser = {
  id: "cust_demo_789",
  firstName: "Zara",
  lastName: "Ansari",
  email: "zara.ansari@azyleen.com",
  phone: "+92 321 8459123",
  city: "Lahore",
  address: "House 42, Block C, Gulberg III, Lahore, Pakistan",
  glowPoints: 450,
  orders: [
    {
      id: "ord_101",
      orderNumber: "AZ-9412",
      date: "Oct 2, 2026",
      status: "Delivered",
      total: 6948,
      items: [
        {
          title: "Anua Niacinamide 10% + TXA Serum",
          quantity: 1,
          price: 3649,
          image: "https://cdn.shopify.com/s/files/1/0714/9568/0111/files/Anua_Peach_70_Niacin.webp?v=1786880586",
        },
        {
          title: "Centella Air Fit Suncream SPF 50+",
          quantity: 1,
          price: 3299,
          image: "https://cdn.shopify.com/s/files/1/0714/9568/0111/files/anua-global-ampoule-serum-peach-70-niacinamide-serum-1239193727.webp?v=1786879298",
        },
      ],
      paymentMethod: "Cash on Delivery (COD)",
      shippingAddress: "House 42, Block C, Gulberg III, Lahore",
      trackingNumber: "TCS-9821471029",
    },
    {
      id: "ord_102",
      orderNumber: "AZ-8921",
      date: "Sep 14, 2026",
      status: "Delivered",
      total: 3499,
      items: [
        {
          title: "Axis-Y Dark Spot Correcting Glow Serum",
          quantity: 1,
          price: 3499,
          image: "https://cdn.shopify.com/s/files/1/0714/9568/0111/files/Anua_Peach_70_Niacin.webp?v=1786880586",
        },
      ],
      paymentMethod: "EasyPaisa Digital Wallet",
      shippingAddress: "House 42, Block C, Gulberg III, Lahore",
      trackingNumber: "LPRD-77192841",
    },
  ],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("azyleen_customer");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load customer session", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        if (user) {
          localStorage.setItem("azyleen_customer", JSON.stringify(user));
        } else {
          localStorage.removeItem("azyleen_customer");
        }
      } catch (e) {
        console.warn("Could not save customer session", e);
      }
    }
  }, [user, isLoaded]);

  const demoLogin = () => {
    setUser(DEMO_USER);
  };

  const login = (email: string) => {
    if (email.toLowerCase().includes("demo") || email.toLowerCase() === DEMO_USER.email) {
      setUser(DEMO_USER);
      return true;
    }
    // Generic account created from email
    const [first, ...rest] = email.split("@")[0].split(".");
    setUser({
      id: `cust_${Date.now()}`,
      firstName: first ? first.charAt(0).toUpperCase() + first.slice(1) : "Glow",
      lastName: rest.join(" ") || "Member",
      email,
      phone: "+92 300 1234567",
      city: "Karachi",
      address: "DHA Phase 6, Karachi, Pakistan",
      glowPoints: 100,
      orders: [],
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        demoLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
