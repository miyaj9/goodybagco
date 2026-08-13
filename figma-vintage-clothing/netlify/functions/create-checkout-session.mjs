import Stripe from "stripe";

const FREE_SHIPPING_THRESHOLD_CENTS = 10000;
const STANDARD_SHIPPING_CENTS = 1200;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(body),
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return json(500, { error: "Stripe is not configured. Add STRIPE_SECRET_KEY in Netlify env vars." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON body" });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const origin = typeof payload.origin === "string" ? payload.origin.replace(/\/$/, "") : "";

  if (!origin || items.length === 0) {
    return json(400, { error: "Missing origin or cart items" });
  }

  const lineItems = [];
  let subtotalCents = 0;

  for (const item of items) {
    if (item?.availableSoon || item?.sold) continue;
    const priceDollars = Number(item?.price);
    if (!Number.isFinite(priceDollars) || priceDollars <= 0) continue;

    const unitAmount = Math.round(priceDollars * 100);
    const name = [item.brand, item.name].filter(Boolean).join(" — ") || "Vintage item";
    const images = [];
    if (typeof item.image === "string" && item.image.startsWith("http")) {
      images.push(item.image);
    }

    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: unitAmount,
        product_data: {
          name,
          description: item.size ? `Size ${item.size}` : undefined,
          images: images.length ? images : undefined,
        },
      },
    });
    subtotalCents += unitAmount;
  }

  if (lineItems.length === 0) {
    return json(400, { error: "No purchasable items in cart" });
  }

  const shippingCents = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS ? 0 : STANDARD_SHIPPING_CENTS;
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: shippingCents, currency: "usd" },
            display_name:
              shippingCents === 0
                ? "Free domestic shipping"
                : "Domestic shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      phone_number_collection: { enabled: true },
      success_url: `${origin}/?checkout=success`,
      cancel_url: `${origin}/?checkout=canceled`,
      metadata: {
        source: "goodybagco-site",
      },
    });

    return json(200, { url: session.url });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return json(500, {
      error: error?.message || "Unable to create Stripe Checkout session",
    });
  }
}
