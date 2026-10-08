import { NextRequest, NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || "azyleen-demo.myshopify.com";
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "20ba6c587e0f238d2ebcac98d55418de";
const GRAPHQL_URL = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Format lines for Shopify cartCreate
    // merchandiseId must be a Shopify Global ID: "gid://shopify/ProductVariant/..."
    const lines = items.map((item: any) => {
      let variantId = item.selectedVariantId || item.product?.variants?.[0]?.id || "";
      if (variantId && !variantId.startsWith("gid://shopify/ProductVariant/")) {
        // Strip any non-numeric or extract ID
        const cleanId = String(variantId).replace(/\D/g, "");
        if (cleanId) {
          variantId = `gid://shopify/ProductVariant/${cleanId}`;
        }
      }

      return {
        merchandiseId: variantId,
        quantity: item.quantity || 1,
      };
    }).filter((l: any) => l.merchandiseId);

    if (lines.length === 0) {
      // Fallback: If no valid variant IDs, return direct store checkout
      return NextResponse.json({
        checkoutUrl: `https://${SHOPIFY_DOMAIN}/cart`,
      });
    }

    const mutation = `
      mutation CartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
            totalQuantity
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({
        query: mutation,
        variables: {
          input: { lines },
        },
      }),
    });

    const data = await res.json();
    const cart = data.data?.cartCreate?.cart;
    const errors = data.data?.cartCreate?.userErrors;

    if (cart?.checkoutUrl) {
      let finalCheckoutUrl = cart.checkoutUrl;
      // Guarantee no redirection to azyleen.com
      if (finalCheckoutUrl.includes("azyleen.com")) {
        finalCheckoutUrl = finalCheckoutUrl.replace("https://azyleen.com", "https://azyleen-demo.myshopify.com");
      }
      return NextResponse.json({
        checkoutUrl: finalCheckoutUrl,
        cartId: cart.id,
      });
    }

    if (errors && errors.length > 0) {
      console.warn("Shopify cart errors:", errors);
    }

    // Fallback: Shopify Permalink URL (Direct to azyleen-demo.myshopify.com)
    const fallbackDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "azyleen-demo.myshopify.com";
    const permalinkParts = items.map((i: any) => {
      const vId = String(i.selectedVariantId || i.product?.variants?.[0]?.id || "").replace(/\D/g, "");
      return `${vId}:${i.quantity || 1}`;
    }).filter((p: string) => !p.startsWith(":"));

    const fallbackUrl = permalinkParts.length > 0
      ? `https://${fallbackDomain}/cart/${permalinkParts.join(",")}`
      : `https://${fallbackDomain}/cart`;

    return NextResponse.json({ checkoutUrl: fallbackUrl });
  } catch (error: any) {
    console.error("Shopify checkout route error:", error);
    const fallbackDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "azyleen-demo.myshopify.com";
    return NextResponse.json(
      { error: "Failed to initiate checkout", checkoutUrl: `https://${fallbackDomain}/cart` },
      { status: 500 }
    );
  }
}
