import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import Toast from "@/components/Toast";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Azyleen — Authentic Korean Skincare Pakistan | Anua, Centella, COSRX",
  description:
    "Pakistan's premier Korean skincare destination. 100% authentic K-Beauty actives curated for South Asian skin and climates. Cash on delivery, fast shipping, and easy returns.",
  keywords: [
    "Azyleen",
    "Korean Skincare Pakistan",
    "K-Beauty Pakistan",
    "Anua Peach Serum",
    "Centella Sunscreen",
    "COSRX Snail Mucin",
    "Dr Althea Relief Cream",
    "Glass Skin Pakistan",
  ],
  openGraph: {
    title: "Azyleen — Authentic Korean Skincare Pakistan",
    description: "Your skin, softly transformed. Direct from Seoul, curated for South Asian skin.",
    url: "https://azyleen-demo.myshopify.com",
    siteName: "Azyleen",
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: "https://cdn.shopify.com/s/files/1/0714/9568/0111/files/Anua_Peach_70_Niacin.webp?v=1786880586",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="font-sans min-h-screen flex flex-col bg-[#FDF6F4] text-[#1A0E14] antialiased selection:bg-[#D4A0B0] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <main className="flex-grow">{children}</main>
              <CartDrawer />
              <Toast />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
