import { Package, ArrowRight, ShieldCheck } from "lucide-react";
import type { Product } from "./ProductCard";

const FONT = "'Urbanist', sans-serif";

interface ClosetPageProps {
  purchases: Product[];
  onShop: () => void;
}

export function ClosetPage({ purchases, onShop }: ClosetPageProps) {
  const total = purchases.reduce((s, p) => s + p.price, 0);

  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-6" style={{ borderBottom: "1px solid #0D0D0D" }}>
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#888888", fontWeight: 600, marginBottom: "6px" }}>
              Your Collection
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", lineHeight: 1 }}>
              My Closet
            </h1>
          </div>
          {purchases.length > 0 && (
            <div className="flex items-end gap-8">
              <div>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888" }}>Pieces</p>
                <p style={{ fontSize: "2rem", fontWeight: 800, color: "#0D0D0D", lineHeight: 1 }}>{purchases.length}</p>
              </div>
              <div style={{ width: "1px", height: "36px", backgroundColor: "rgba(0,0,0,0.15)" }} />
              <div>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888" }}>Collection Value</p>
                <p style={{ fontSize: "2rem", fontWeight: 800, color: "#0D0D0D", lineHeight: 1 }}>${total}</p>
              </div>
            </div>
          )}
        </div>

        {purchases.length === 0 ? (
          <div className="flex flex-col items-center py-28">
            <Package size={36} strokeWidth={1.5} color="#888888" className="mb-6" />
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", textAlign: "center" }}>
              Your Closet<br />is Empty.
            </h2>
            <p style={{ fontSize: "0.88rem", color: "#888888", marginTop: "10px", lineHeight: 1.7, textAlign: "center", maxWidth: "320px" }}>
              Once you purchase an authenticated piece, it'll live here in your collection.
            </p>
            <button
              onClick={onShop}
              className="flex items-center gap-3 mt-8 px-7 py-3.5 hover:opacity-75 transition-opacity"
              style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
            >
              Browse New In <ArrowRight size={13} strokeWidth={2} />
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 pt-10">
              {purchases.map((item) => (
                <div key={item.id} className="group">
                  <div className="relative overflow-hidden bg-[#F4F4F4]" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={`${item.image}&w=480&h=640&fit=crop&auto=format`}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Yellow authenticated tab */}
                    <div
                      className="absolute top-0 left-0 flex items-center gap-1 px-2.5 py-1.5"
                      style={{ backgroundColor: "#FAFA5A", border: "1px solid #0D0D0D" }}
                    >
                      <ShieldCheck size={9} strokeWidth={2} />
                      <span style={{ fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>Auth'd</span>
                    </div>
                  </div>
                  <div className="pt-2.5">
                    <p style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", marginBottom: "2px" }}>{item.brand}</p>
                    <p style={{ fontSize: "0.88rem", color: "#0D0D0D", lineHeight: 1.35 }}>{item.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "#888888", marginTop: "2px" }}>{item.size} · {item.era}</p>
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, marginTop: "5px" }}>${item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6" style={{ borderTop: "1px solid #0D0D0D" }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888" }}>
                {purchases.length} authenticated {purchases.length === 1 ? "piece" : "pieces"}
              </p>
              <button
                onClick={onShop}
                className="flex items-center gap-3 px-7 py-3 hover:opacity-75 transition-opacity"
                style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
              >
                Shop More <ArrowRight size={13} strokeWidth={2} />
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
