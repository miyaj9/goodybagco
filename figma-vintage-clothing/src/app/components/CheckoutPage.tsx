import { useState } from "react";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import type { Product } from "./ProductCard";

const FONT = "'Urbanist', sans-serif";

function Field({ label, placeholder, type = "text", value, onChange, required = true }: {
  label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, color: "#0D0D0D", marginBottom: "6px" }}>
        {label}
      </label>
      <input
        type={type} required={required} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 outline-none transition-colors"
        style={{ border: "1px solid rgba(0,0,0,0.15)", fontSize: "0.88rem", fontFamily: FONT, backgroundColor: "#FAFAFA", color: "#0D0D0D" }}
        onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#0D0D0D"; }}
        onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)"; }}
      />
    </div>
  );
}

interface CheckoutPageProps {
  cart: Product[];
  onRemoveFromCart: (id: number) => void;
  onPurchase: () => void;
}

export function CheckoutPage({ cart, onRemoveFromCart, onPurchase }: CheckoutPageProps) {
  const [step, setStep] = useState<"cart" | "info" | "done">("cart");
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", card: "", expiry: "", cvv: "" });
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });

  const subtotal = cart.reduce((s, p) => s + (p.price ?? 0), 0);
  const shipping = subtotal > 0 && subtotal < 300 ? 12 : 0;
  const total = subtotal + shipping;
  const getImageSrc = (image: string, params: string) =>
    image.startsWith("http") ? `${image}${image.includes("?") ? "&" : "?"}${params}` : image;

  if (step === "done") return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ fontFamily: FONT }}>
      <CheckCircle size={36} strokeWidth={1.5} color="#0D0D0D" className="mb-5" />
      <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "10px" }}>Order Confirmed</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", lineHeight: 1.05 }}>
        Thank You<br />For Your Order.
      </h1>
      <p style={{ fontSize: "0.88rem", color: "#888888", marginTop: "14px", lineHeight: 1.7, maxWidth: "360px" }}>
        Your authenticated pieces are on their way. Confirmation sent to <strong style={{ color: "#0D0D0D" }}>{form.email || "your inbox"}</strong>.
      </p>
      <button
        onClick={() => setStep("cart")}
        className="flex items-center gap-3 mt-8 px-7 py-3.5 hover:opacity-75 transition-opacity"
        style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
      >
        Continue Shopping <ArrowRight size={13} strokeWidth={2} />
      </button>
    </main>
  );

  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Steps */}
        <div className="flex items-center gap-5 mb-10" style={{ paddingBottom: "12px", borderBottom: "1px solid #0D0D0D" }}>
          {["Bag", "Checkout"].map((s, i) => {
            const active = (i === 0 && step === "cart") || (i === 1 && step === "info");
            return (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span style={{ color: "#ddd" }}>—</span>}
                <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: active ? 800 : 500, color: active ? "#0D0D0D" : "#888888" }}>
                  {s}
                </span>
              </span>
            );
          })}
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center py-24">
            <ShoppingBag size={36} strokeWidth={1.5} color="#888888" className="mb-5" />
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Your Bag is Empty</h2>
            <p style={{ fontSize: "0.88rem", color: "#888888", marginTop: "8px" }}>Browse our authenticated vintage collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left */}
            <div className="lg:col-span-2">
              {step === "cart" ? (
                <>
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
                          ✓ Authenticated · Entrupy verification card included
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{typeof item.price === "number" ? `$${item.price.toLocaleString()}` : "Price TBD"}</span>
                        <button onClick={() => onRemoveFromCart(item.id)} className="hover:opacity-40 transition-opacity">
                          <Trash2 size={14} strokeWidth={1.5} color="#888888" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} />
                </>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setStep("done"); onPurchase(); }} className="space-y-8">
                  <h1 style={{ fontSize: "1.4rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em" }}>Checkout</h1>

                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid #0D0D0D", paddingBottom: "8px", marginBottom: "14px" }}>Contact</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2"><Field label="Full Name" placeholder="Your name" value={form.name} onChange={set("name")} /></div>
                      <div className="sm:col-span-2"><Field label="Email" placeholder="you@email.com" type="email" value={form.email} onChange={set("email")} /></div>
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid #0D0D0D", paddingBottom: "8px", marginBottom: "14px" }}>Shipping</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2"><Field label="Address" placeholder="123 Vintage Lane" value={form.address} onChange={set("address")} /></div>
                      <Field label="City" placeholder="New York" value={form.city} onChange={set("city")} />
                      <Field label="ZIP" placeholder="10001" value={form.zip} onChange={set("zip")} />
                    </div>
                  </div>

                  <div>
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid #0D0D0D", paddingBottom: "8px", marginBottom: "14px" }}>Payment</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2"><Field label="Card Number" placeholder="1234 5678 9012 3456" value={form.card} onChange={set("card")} /></div>
                      <Field label="Expiry" placeholder="MM / YY" value={form.expiry} onChange={set("expiry")} />
                      <Field label="CVV" placeholder="•••" value={form.cvv} onChange={set("cvv")} />
                    </div>
                  </div>

                  <button type="submit" className="w-full py-4 flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}>
                    Place Order — ${total} <ArrowRight size={13} strokeWidth={2} />
                  </button>
                  <p className="flex items-center justify-center gap-2" style={{ fontSize: "0.65rem", color: "#888888" }}>
                    <ShieldCheck size={11} color="#888888" /> Encrypted & secure
                  </p>
                </form>
              )}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 p-6" style={{ border: "1px solid #0D0D0D" }}>
                <h3 style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "16px", paddingBottom: "10px", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                  Summary
                </h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2">
                      <span style={{ fontSize: "0.82rem", color: "#0D0D0D", lineHeight: 1.4, flex: 1 }}>{item.name}</span>
                      <span style={{ fontSize: "0.82rem", fontWeight: 600, whiteSpace: "nowrap" }}>{typeof item.price === "number" ? `$${item.price.toLocaleString()}` : "Price TBD"}</span>
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
                  {subtotal > 0 && subtotal < 300 && (
                    <p style={{ fontSize: "0.68rem", color: "#888888", marginTop: "4px" }}>
                      Free domestic shipping on orders over $300.
                    </p>
                  )}
                </div>
                <div className="flex justify-between mt-4 pt-4" style={{ borderTop: "1px solid #0D0D0D" }}>
                  <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800 }}>${total.toLocaleString()}</span>
                </div>
                <div className="mt-4 flex items-center gap-2" style={{ fontSize: "0.65rem", color: "#888888" }}>
                  <ShieldCheck size={11} /> Entrupy verification card included
                </div>
                {step === "cart" && (
                  <button onClick={() => setStep("info")} className="w-full mt-5 py-3.5 flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}>
                    Checkout <ArrowRight size={12} strokeWidth={2} />
                  </button>
                )}
                {step === "info" && (
                  <button onClick={() => setStep("cart")} className="w-full mt-3 py-2 hover:opacity-50 transition-opacity"
                    style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontFamily: FONT }}>
                    ← Back to Bag
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
