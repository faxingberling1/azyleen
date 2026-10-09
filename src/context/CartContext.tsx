"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ShopifyProduct } from "@/lib/shopify";

export interface GiftBoxConfig {
  recipientName: string;
  senderName: string;
  occasion: string;
  personalMessage: string;
  deliveryType: "physical" | "digital";
  theme?: string;
  amount?: number;
}

export interface CartItem {
  product: ShopifyProduct;
  quantity: number;
  selectedVariantId?: string;
  giftBoxConfig?: GiftBoxConfig;
  needsConfiguration?: boolean;
}

export function isGiftProduct(product?: ShopifyProduct | null): boolean {
  if (!product) return false;
  const h = (product.handle || "").toLowerCase();
  const t = (product.title || "").toLowerCase();
  const c = (product.category || "").toLowerCase();
  return (
    h.includes("gift") ||
    h.includes("voucher") ||
    t.includes("gift voucher") ||
    t.includes("gift box") ||
    t.includes("luxury keepsake") ||
    c.includes("gift")
  );
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    product: ShopifyProduct,
    quantity?: number,
    variantId?: string,
    options?: {
      giftBoxConfig?: GiftBoxConfig;
      needsConfiguration?: boolean;
    }
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateGiftBoxConfig: (productId: string, config: GiftBoxConfig) => void;
  markGiftBoxBlank: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  toastMessage: string | null;
  dismissToast: () => void;
  hasUnconfiguredGifts: boolean;
  unconfiguredGiftItems: CartItem[];
  activeConfigModalItem: { product: ShopifyProduct; existingConfig?: GiftBoxConfig } | null;
  openConfigModal: (product: ShopifyProduct, existingConfig?: GiftBoxConfig) => void;
  closeConfigModal: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 3999; // Rs. 3,999

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Global Gift Box Modal State
  const [activeConfigModalItem, setActiveConfigModalItem] = useState<{
    product: ShopifyProduct;
    existingConfig?: GiftBoxConfig;
  } | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("azyleen_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("azyleen_cart", JSON.stringify(cart));
      } catch (e) {
        console.warn("Could not save cart to localStorage", e);
      }
    }
  }, [cart, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);
  const dismissToast = () => setToastMessage(null);

  const openConfigModal = (product?: ShopifyProduct, existingConfig?: GiftBoxConfig) => {
    if (typeof window !== "undefined") {
      window.location.href = "/gift-vouchers";
    }
  };

  const closeConfigModal = () => {
    setActiveConfigModalItem(null);
  };

  const addToCart = (
    product: ShopifyProduct,
    quantity = 1,
    variantId?: string,
    options?: {
      giftBoxConfig?: GiftBoxConfig;
      needsConfiguration?: boolean;
    }
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (options?.giftBoxConfig) {
          updated[existingIndex].giftBoxConfig = options.giftBoxConfig;
        }
        if (options?.needsConfiguration !== undefined) {
          updated[existingIndex].needsConfiguration = options.needsConfiguration;
        }
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedVariantId: variantId || (product.variants?.[0]?.id ?? ""),
            giftBoxConfig: options?.giftBoxConfig,
            needsConfiguration: options?.needsConfiguration ?? false,
          },
        ];
      }
    });

    setToastMessage(`Added "${product.title}" to bag`);
    setIsOpen(true);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const updateGiftBoxConfig = (productId: string, config: GiftBoxConfig) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === productId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          giftBoxConfig: config,
          needsConfiguration: false,
        };
        return updated;
      } else if (activeConfigModalItem?.product) {
        return [
          ...prev,
          {
            product: activeConfigModalItem.product,
            quantity: 1,
            selectedVariantId: activeConfigModalItem.product.variants?.[0]?.id ?? "",
            giftBoxConfig: config,
            needsConfiguration: false,
          },
        ];
      }
      return prev;
    });

    setToastMessage("Personalized Gift Box saved to your bag ✨");
    closeConfigModal();
    setIsOpen(true);
  };

  const markGiftBoxBlank = (productId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              needsConfiguration: false,
              giftBoxConfig: {
                recipientName: "Valued Recipient",
                senderName: "A Friend",
                occasion: "Special Occasion",
                personalMessage: "Handwritten note card to be filled in person.",
                deliveryType: "physical",
              },
            }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const unconfiguredGiftItems = cart.filter(
    (item) => item.needsConfiguration || (isGiftProduct(item.product) && !item.giftBoxConfig)
  );
  const hasUnconfiguredGifts = unconfiguredGiftItems.length > 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateGiftBoxConfig,
        markGiftBoxBlank,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        toastMessage,
        dismissToast,
        hasUnconfiguredGifts,
        unconfiguredGiftItems,
        activeConfigModalItem,
        openConfigModal,
        closeConfigModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
