import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import Newsletter from "@/components/Newsletter";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ProductPageClient from "@/components/ProductPageClient";
import { getShopifyProducts, getShopifyProductByHandle } from "@/lib/shopify";

interface PageProps {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getShopifyProducts();
  return products.map((p) => ({
    handle: p.handle,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getShopifyProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found — Azyleen",
    };
  }

  const primaryImage = product.images?.[0]?.url || "";

  return {
    title: `${product.title} — 100% Authentic Korean Skincare | Azyleen Pakistan`,
    description: `Buy original ${product.title} by ${product.vendor} in Pakistan. 100% authentic Seoul import, clinically formulated for South Asian skin. Cash on Delivery across Pakistan.`,
    openGraph: {
      title: `${product.title} — Azyleen`,
      description: product.description,
      images: primaryImage ? [{ url: primaryImage }] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const [product, allProducts] = await Promise.all([
    getShopifyProductByHandle(handle),
    getShopifyProducts(),
  ]);

  if (!product) {
    notFound();
  }

  // Filter out current product to get complementary upsell & related items
  const relatedProducts = allProducts.filter((p) => p.handle !== product.handle);

  // JSON-LD structured data for Google SEO & rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.images?.[0]?.url,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.vendor,
    },
    offers: {
      "@type": "Offer",
      url: `https://azyleen.com/products/${product.handle}`,
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Azyleen",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewsCount || 42,
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDF6F4]">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <AnnouncementBar />
      <Navbar products={allProducts} />

      {/* Interactive PDP with Upsells */}
      <main className="flex-grow">
        <ProductPageClient product={product} relatedProducts={relatedProducts} />
        <ReviewsSection />
        <Newsletter />
      </main>

      {/* Footer & Floating WhatsApp */}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
