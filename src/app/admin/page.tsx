"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
  Settings,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Sparkles,
  Search,
  DollarSign,
  AlertCircle,
  Database,
  Key,
} from "lucide-react";

interface AdminProduct {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  price: number;
  image: string;
  status: string;
}

export default function DemoAdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "products" | "orders" | "api">("dashboard");
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample live orders received by the store
  const [orders, setOrders] = useState([
    {
      id: "ORD-9412",
      customer: "Zara Ansari",
      city: "Lahore",
      items: "Anua Niacinamide + Centella Sunscreen",
      total: 6948,
      status: "Delivered",
      date: "Today, 11:20 AM",
      method: "Cash on Delivery (COD)",
    },
    {
      id: "ORD-9411",
      customer: "Sara Hussain",
      city: "Karachi",
      items: "COSRX Snail 96 Mucin Essence (x2)",
      total: 7500,
      status: "Dispatched",
      date: "Today, 09:45 AM",
      method: "Cash on Delivery (COD)",
    },
    {
      id: "ORD-9410",
      customer: "Mahnoor Khan",
      city: "Islamabad",
      items: "Dr. Althea 345 Relief Cream",
      total: 3850,
      status: "Processing",
      date: "Yesterday",
      method: "EasyPaisa Wallet",
    },
    {
      id: "ORD-9409",
      customer: "Hira Butt",
      city: "Faisalabad",
      items: "Axis-Y Dark Spot Serum",
      total: 3499,
      status: "Delivered",
      date: "2 days ago",
      method: "JazzCash",
    },
  ]);

  useEffect(() => {
    fetch("https://qdza9d-gk.myshopify.com/api/2024-01/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "4954dfe736d1eb015a46e5166cde5136",
      },
      body: JSON.stringify({
        query: "{ products(first: 25) { edges { node { id title handle vendor priceRange { minVariantPrice { amount } } images(first: 1) { edges { node { url } } } } } } }",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.products?.edges) {
          const mapped = data.data.products.edges.map(({ node }: any) => ({
            id: String(node.id),
            title: node.title,
            handle: node.handle,
            vendor: node.vendor || "Azyleen",
            price: parseFloat(node.priceRange?.minVariantPrice?.amount) || 3499,
            image: node.images?.edges?.[0]?.node?.url || "",
            status: "Active",
          }));
          setProducts(mapped);
        }
      })
      .catch((err) => console.warn(err))
      .finally(() => setLoading(false));
  }, []);

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col">
      {/* Top Admin Bar */}
      <header className="bg-[#1A0E14] text-white px-6 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#5C3544] flex items-center justify-center font-serif text-white font-bold text-sm">
            AZ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-base font-semibold tracking-wide">Azyleen</span>
              <span className="bg-[#5C3544] text-[#FDF6F4] text-[9.5px] font-bold px-2 py-0.5 rounded uppercase">
                Shopify Backend Demo
              </span>
            </div>
            <span className="text-[11px] text-white/60">qdza9d-gk.myshopify.com</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors py-1 px-3 rounded-lg bg-white/10"
          >
            <span>View Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <a
            href="https://admin.shopify.com/store/qdza9d-gk"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-[#1A7A4A] hover:bg-[#15633C] text-white font-semibold py-1.5 px-3 rounded-lg transition-colors shadow-xs"
          >
            <span>Official Shopify Login</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 space-y-1 flex-shrink-0">
          <div className="text-[10px] uppercase font-bold text-gray-400 px-3 py-2">
            Store Management
          </div>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-[#5C3544] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Store Overview</span>
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-[#5C3544] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders &amp; COD ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "products"
                ? "bg-[#5C3544] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("api")}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === "api"
                ? "bg-[#5C3544] text-white shadow-xs"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Storefront API Settings</span>
          </button>

          <div className="pt-8">
            <div className="p-3.5 rounded-2xl bg-[#F9EEF1] border border-[#D4A0B0]/30 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#5C3544] block">
                Shopify Sync Status
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#1A7A4A] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#1A7A4A] animate-pulse" />
                <span>Connected &amp; Live</span>
              </div>
              <p className="text-[10.5px] text-[#7E636E] leading-relaxed">
                Storefront API 2024-01 active with live checkout session generation.
              </p>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-grow p-6 sm:p-8 space-y-6 overflow-x-auto">
          {/* TAB 1: Dashboard Overview */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Admin Dashboard Overview</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Real-time storefront sales, recent Cash on Delivery orders, and product sync.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>Today&rsquo;s Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    Rs. {totalSales.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    +18% from last week
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    {orders.length} Orders
                  </div>
                  <span className="text-[11px] text-gray-500">
                    COD across Lahore &amp; Karachi
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>Live Products</span>
                    <Package className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    {products.length || 19} Items
                  </div>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    All synced from Shopify
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>API Performance</span>
                    <TrendingUp className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mt-2">
                    99.9% Uptime
                  </div>
                  <span className="text-[11px] text-gray-500">
                    Sub-second GraphQL TTFB
                  </span>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-semibold text-[#5C3544] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {orders.slice(0, 3).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {ord.id} • {ord.customer} ({ord.city})
                        </div>
                        <div className="text-gray-500 text-[11px]">{ord.items}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          Rs. {ord.total.toLocaleString()}
                        </div>
                        <span className="inline-block bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Orders Management */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Orders &amp; COD Dispatches</h2>
                  <p className="text-xs text-gray-500">
                    Manage incoming Pakistani orders, track courier statuses, and verify Cash on Delivery.
                  </p>
                </div>
                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">
                  {orders.length} Total Orders
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 uppercase text-[10px] tracking-wider border-y border-gray-200">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer &amp; City</th>
                      <th className="py-3 px-4">Products</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-gray-900">{ord.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-gray-900">{ord.customer}</div>
                          <div className="text-gray-400 text-[10.5px]">{ord.city}</div>
                        </td>
                        <td className="py-3 px-4 text-gray-700 max-w-xs truncate">{ord.items}</td>
                        <td className="py-3 px-4 text-gray-600">{ord.method}</td>
                        <td className="py-3 px-4 font-bold text-gray-900">
                          Rs. {ord.total.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              ord.status === "Delivered"
                                ? "bg-emerald-50 text-emerald-700"
                                : ord.status === "Dispatched"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => alert(`Tracking details for ${ord.id} (Courier: TCS / Leopards)`)}
                            className="text-[#5C3544] font-semibold hover:underline"
                          >
                            Track Parcel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Products Synced */}
          {activeTab === "products" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Shopify Product Catalog</h2>
                  <p className="text-xs text-gray-500">
                    19 authentic Korean skincare items imported from qdza9d-gk.myshopify.com
                  </p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none"
                  />
                </div>
              </div>

              {loading ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  Loading Shopify catalog...
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between text-xs gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden flex-shrink-0">
                          {p.image ? (
                            <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
                              K-B
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-[#BA788C] uppercase">
                            {p.vendor}
                          </div>
                          <Link
                            href={`/products/${p.handle}`}
                            className="font-semibold text-gray-900 hover:text-[#5C3544]"
                          >
                            {p.title}
                          </Link>
                          <div className="text-[11px] text-gray-400 font-mono">
                            handle: {p.handle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            Rs. {p.price.toLocaleString()}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-semibold">In Stock</span>
                        </div>
                        <Link
                          href={`/products/${p.handle}`}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-[#5C3544] hover:text-white text-gray-700 text-xs font-semibold transition-colors"
                        >
                          View PDP
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Storefront API Settings */}
          {activeTab === "api" && (
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Storefront API &amp; Headless Backend</h2>
                <p className="text-xs text-gray-500">
                  Connection credentials powering your Next.js frontend with Shopify as the headless backend.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="text-[10.5px] font-bold uppercase text-gray-400">
                    Store Domain
                  </div>
                  <div className="font-mono text-xs font-bold text-gray-900">
                    qdza9d-gk.myshopify.com
                  </div>
                  <p className="text-[11px] text-gray-500">Primary myshopify subdomain</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="text-[10.5px] font-bold uppercase text-gray-400">
                    Storefront API Token
                  </div>
                  <div className="font-mono text-xs font-bold text-gray-900 truncate">
                    4954dfe736d1eb015a46e5166cde5136
                  </div>
                  <p className="text-[11px] text-gray-500">Read product listings, create checkouts</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="text-[10.5px] font-bold uppercase text-gray-400">
                    GraphQL Endpoint
                  </div>
                  <div className="font-mono text-xs font-bold text-gray-900 truncate">
                    https://qdza9d-gk.myshopify.com/api/2024-01/graphql.json
                  </div>
                  <p className="text-[11px] text-gray-500">Version 2024-01 (Latest stable)</p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                  <div className="text-[10.5px] font-bold uppercase text-gray-400">
                    Checkout Permalinks
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-600">
                    Active &amp; Redirecting
                  </div>
                  <p className="text-[11px] text-gray-500">Generates instant checkout sessions on Shopify demo store</p>
                </div>
              </div>

              {/* Instructions box */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>How to connect your own custom Shopify store:</span>
                </div>
                <p>
                  To point this storefront to a different store or your own Shopify Partner store, simply update the two variables in your <code>.env.local</code> file and restart the server.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
