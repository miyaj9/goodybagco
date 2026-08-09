import { useEffect, useState } from "react";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle, LoaderCircle } from "lucide-react";
import type { Product } from "./ProductCard";

const FONT = "'Urbanist', sans-serif";

interface CheckoutPageProps {
  cart: Product[];
  onRemoveFromCart: (id: number) => void;
  onPurchase: () => void;
  onContinueShopping: () => void;
  checkoutStatus?: "success" | "canceled" | null;
}

function toAbsoluteImageUrl(image: string) {
  if (image.startsWith("http")) return image;
  if (typeof window === "undefined") return image;
  return new URL(image, window.location.origin).href;
}

export function CheckoutPage({
  cart,
  onRemoveFromCart,
  onPurchase,
  onContinueShopping,
  checkoutStatus = null,
}: CheckoutPageProps) {
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(checkoutStatus === "success");

  useEffect(() => {
    if (checkoutStatus === "success") {
      setShowSuccess(true);
      onPurchase();
    }
    if (checkoutStatus === "canceled") {
      setError("Checkout was canceled. Your bag is still saved — try again when you're ready.");
    }
  }, [checkoutStatus, onPurchase]);

  const purchasable = cart.filter((p) => typeof p.price === "number" && !p.availableSoon);
  const subtotal = purchasable.reduce((s, p) => s + (p.price ?? 0), 0);
  const shipping = subtotal > 0 && subtotal < 100 ? 12 : 0;
  const total = subtotal + shipping;
  const getImageSrc = (image: string, params: string) =>
    image.startsWith("http") ? `${image}${image.includes("?") ? "&" : "?"}${params}` : image;

  const startStripeCheckout = async () => {
    if (purchasable.length === 0 || paying) return;
    setPaying(true);
    setError(null);

    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          origin: window.location.origin,
          items: purchasable.map((item) => ({
            id: item.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            size: item.size,
            image: toAbsoluteImageUrl(item.image),
            availableSoon: item.availableSoon,
          })),
        }),
      });

      const raw = await response.text();
      let data: { url?: string; error?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          response.status === 404
            ? "Stripe is not deployed yet. Redeploy the site from GitHub/Netlify build (zip upload won’t include Stripe)."
            : `Checkout server error (${response.status}). Check Netlify function logs and STRIPE_SECRET_KEY.`,
        );
      }

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || "Unable to start Stripe Checkout");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start Stripe Checkout");
      setPaying(false);
    }
  };

  if (showSuccess) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ fontFamily: FONT }}>
        <CheckCircle size={36} strokeWidth={1.5} color="#0D0D0D" className="mb-5" />
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "10px" }}>Order Confirmed</p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", lineHeight: 1.05 }}>
          Thank You<br />For Your Order.
        </h1>
        <p style={{ fontSize: "0.88rem", color: "#888888", marginTop: "14px", lineHeight: 1.7, maxWidth: "360px" }}>
          Payment received through Stripe. A confirmation email is on the way, and your Entrupy-verified pieces will ship soon.
        </p>
        <button
          onClick={onContinueShopping}
          className="flex items-center gap-3 mt-8 px-7 py-3.5 hover:opacity-75 transition-opacity"
          style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
        >
          Continue Shopping <ArrowRight size={13} strokeWidth={2} />
        </button>
      </main>
    );
  }

  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-5 mb-10" style={{ paddingBottom: "12px", borderBottom: "1px solid #0D0D0D" }}>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 800, color: "#0D0D0D" }}>
            Bag
          </span>
          <span style={{ color: "#ddd" }}>—</span>
          <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500, color: "#888888" }}>
            Stripe Checkout
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-24">
            <ShoppingBag size={36} strokeWidth={1.5} color="#888888" className="mb-5" />
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Your Bag is Empty</h2>
            <p style={{ fontSize: "0.88rem", color: "#888888", marginTop: "8px" }}>Browse our authenticated vintage collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h1 style={{ fontSize: "1.4rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", marginBottom: "20px" }}>
                Shopping Bag ({cart.length})
              </h1>
              {cart.map((item) => (
                <div key={item.id} className="flex gap-5 py-6" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                  <div
                    className="w-24 h-32 overflow-hidden shrink-0"
                    style={{ backgroundColor: item.imageBackground ?? "#FFFFFF" }}
                  >
                    <img
                      src={getImageSrc(item.image, "w=200&h=267&fit=max&auto=format")}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontWeight: 500, marginBottom: "3px" }}>{item.brand}</p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "#0D0D0D" }}>{item.name}</p>
                    <p style={{ fontSize: "0.78rem", color: "#888888", marginTop: "3px" }}>Size {item.size} · {item.era} · {item.condition}</p>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", marginTop: "6px" }}>
                      {item.availableSoon
                        ? "Available Soon — not included in checkout"
                        : "✓ Authenticated · Entrupy verification card included"}
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                      {typeof item.price === "number" ? `$${item.price.toLocaleString()}` : "Price TBD"}
                    </span>
                    <button onClick={() => onRemoveFromCart(item.id)} className="hover:opacity-40 transition-opacity">
                      <Trash2 size={14} strokeWidth={1.5} color="#888888" />
                    </button>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} />
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 p-6" style={{ border: "1px solid #0D0D0D" }}>
                <h3 style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                  Summary
                </h3>
                <div className="space-y-3">
                  {purchasable.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2">
                      <span style={{ fontSize: "0.82rem", color: "#0D0D0D", lineHeight: 1.4, flex: 1 }}>{item.name}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>${item.price!.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 space-y-2" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                  <div className="flex justify-between" style={{ fontSize: "0.8rem", color: "#888888" }}>
                    <span>Subtotal</span><span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between" style={{ fontSize: "0.8rem", color: "#888888" }}>
                    <span>Domestic Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
                  </div>
                  {subtotal > 0 && subtotal < 100 && (
                    <p style={{ fontSize: "0.68rem", color: "#888888", marginTop: "4px" }}>
                      Free domestic shipping on orders over $100.
                    </p>
                  )}
                </div>
                <div className="flex justify-between mt-4 pt-4" style={{ borderTop: "1px solid #0D0D0D" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800 }}>${total.toLocaleString()}</span>
                </div>
                <div className="mt-4 flex items-center gap-2" style={{ fontSize: "0.65rem", color: "#888888" }}>
                  <ShieldCheck size={11} /> Secure checkout powered by Stripe
                </div>

                {error && (
                  <p style={{ marginTop: "14px", fontSize: "0.78rem", color: "#B00020", lineHeight: 1.5 }}>
                    {error}
                  </p>
                )}

                <button
                  onClick={startStripeCheckout}
                  disabled={paying || purchasable.length === 0}
                  className="w-full mt-5 py-3.5 flex items-center justify-center gap-3 hover:opacity-80 transition-opacity disabled:opacity-50"
                  style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
                >
                  {paying ? (
                    <>
                      <LoaderCircle size={14} className="animate-spin" /> Connecting to Stripe…
                    </>
                  ) : (
                    <>
                      Pay with Stripe <ArrowRight size={12} strokeWidth={2} />
                    </>
                  )}
                </button>
                <p style={{ marginTop: "10px", fontSize: "0.65rem", color: "#888888", lineHeight: 1.5, textAlign: "center" }}>
                  You’ll enter shipping and card details on Stripe’s secure page.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
