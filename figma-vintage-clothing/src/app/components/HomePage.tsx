import { useState } from "react";
import { ProductCard, type Product } from "./ProductCard";
import { ArrowRight } from "lucide-react";
import bagPileImg from "../../imports/Image_2-1.jpeg";
import robertoCavalliSkirtImg from "../../imports/roberto-cavalli-tiger-tattoo-skirt.png";
import cavalliSkirtFullImg from "../../imports/cavalli-skirt-gallery/01-full.png";
import cavalliSkirtTigerImg from "../../imports/cavalli-skirt-gallery/02-tiger-detail.png";
import cavalliSkirtLabelImg from "../../imports/cavalli-skirt-gallery/03-label-zipper.png";
import cavalliSkirtAmourSideImg from "../../imports/cavalli-skirt-gallery/04-amour-side.png";
import cavalliSkirtAmourDetailImg from "../../imports/cavalli-skirt-gallery/05-amour-detail.png";
import chanelSunglassesImg from "../../imports/chanel-coco-mark-frameless-sunglasses.png";
import chanelSunglassesThreeQuarterImg from "../../imports/chanel-sunglasses-gallery/01-three-quarter.png";
import chanelSunglassesFrontImg from "../../imports/chanel-sunglasses-gallery/02-front.png";
import chanelSunglassesLogoDetailAltImg from "../../imports/chanel-sunglasses-gallery/04-logo-detail-alt.png";
import chanelSunglassesBridgeDetailImg from "../../imports/chanel-sunglasses-gallery/07-bridge-detail.png";
import fendiBagFrontImg from "../../imports/fendi-bag-gallery/01-front.png";
import fendiBagThreeQuarterImg from "../../imports/fendi-bag-gallery/02-three-quarter.png";
import fendiBagBackImg from "../../imports/fendi-bag-gallery/03-back.png";
import fendiBagInteriorImg from "../../imports/fendi-bag-gallery/04-interior.png";
import gucciSandalsImg from "../../imports/gucci-gg-horsebit-mule-sandals-cutout.png";
import gucciSandalsPairTopImg from "../../imports/gucci-sandals-gallery/01-pair-top.png";
import gucciSandalsSolesImg from "../../imports/gucci-sandals-gallery/02-soles.png";
import gucciSandalsInsoleLogoImg from "../../imports/gucci-sandals-gallery/03-insole-logo.png";
import alaiaPumpsImg from "../../imports/alaia-heart-cut-out-pumps.png";
import alaiaPumpsPairTopImg from "../../imports/alaia-pumps-gallery/01-pair-top.png";
import alaiaPumpsHeelViewImg from "../../imports/alaia-pumps-gallery/02-heel-view.png";
import alaiaPumpsSoleProfileImg from "../../imports/alaia-pumps-gallery/03-sole-profile.png";
import alaiaPumpsThreeQuarterImg from "../../imports/alaia-pumps-gallery/04-three-quarter.png";
import justCavalliLeggingsImg from "../../imports/just-cavalli-leopard-print-leggings.png";
import justCavalliSnakeskinDressImg from "../../imports/just-cavalli-snakeskin-dress-gallery/01-front.png";
import dsquared2BeltBuckleImg from "../../imports/dsquared2-belt-gallery/01-buckle.png";
import dsquared2BeltCoiledImg from "../../imports/dsquared2-belt-gallery/02-coiled.png";
import dsquared2BeltAngleImg from "../../imports/dsquared2-belt-gallery/03-angle.png";
import dgFloralCapriFrontImg from "../../imports/dg-floral-capri-gallery/01-front.png";
import dgFloralCapriBackImg from "../../imports/dg-floral-capri-gallery/02-back.png";
import dgFloralCapriDetailImg from "../../imports/dg-floral-capri-gallery/03-detail.png";
import dgFloralCapriLabelImg from "../../imports/dg-floral-capri-gallery/04-label.png";
import newInFreshDropsImg from "../../imports/new-in-fresh-drops-background.png";
import consignFeatureImg from "../../imports/consign-feature-background.png";
import authenticatedFeatureImg from "../../imports/authenticated-feature-background.png";

export const ALL_PRODUCTS: Product[] = [
  {
    id: 9,
    name: "Tiger Tattoo Print Skirt",
    brand: "Roberto Cavalli",
    price: 1111,
    size: "S",
    era: "Vintage",
    condition: "Great",
    category: "Bottoms",
    color: "White",
    collection: "Spring/Summer 2003 Collection by Roberto Cavalli",
    fabric: "97% Cotton, 2% Elastane, 1% Polyamide",
    measurements: {
      waist: '28.5"',
      hip: '32"',
      length: '26"',
    },
    details: ["Graphic print", "Glitter accents", "Slit pockets", "Zip & button closure"],
    image: robertoCavalliSkirtImg,
    images: [
      robertoCavalliSkirtImg,
      cavalliSkirtFullImg,
      cavalliSkirtTigerImg,
      cavalliSkirtLabelImg,
      cavalliSkirtAmourSideImg,
      cavalliSkirtAmourDetailImg,
    ],
    imageBackground: "#000000",
  },
  {
    id: 10,
    name: "Metal Coco Mark Frameless Sunglasses",
    brand: "Chanel",
    price: 700,
    size: "One Size",
    era: "Vintage",
    condition: "Great",
    category: "Accessories",
    color: "Light Purple",
    serialNumber: "AC1751014",
    details: ["Coco Mark", "Frameless", "Metal frame"],
    image: chanelSunglassesImg,
    images: [
      chanelSunglassesImg,
      chanelSunglassesThreeQuarterImg,
      chanelSunglassesFrontImg,
      chanelSunglassesLogoDetailAltImg,
      chanelSunglassesBridgeDetailImg,
    ],
  },
  {
    id: 11,
    name: "Baguette Phone Pouch Bag",
    brand: "Fendi",
    price: 700,
    size: "One Size",
    era: "Y2K / 2000s",
    condition: "Good",
    category: "Bags",
    color: "Black",
    material: "Leather",
    hardware: "Silver Tone",
    measurements: {
      height: "10 cm",
      length: "18 cm",
      width: "2 cm",
      handleDrop: "2.5 cm",
    },
    image: fendiBagFrontImg,
    images: [
      fendiBagFrontImg,
      fendiBagThreeQuarterImg,
      fendiBagBackImg,
      fendiBagInteriorImg,
    ],
    imageBackground: "#000000",
  },
  {
    id: 12,
    name: "GG Canvas Horsebit Mule Sandals",
    brand: "Gucci",
    price: 350,
    size: "IT 35",
    era: "Vintage",
    condition: "Good",
    category: "Shoes",
    color: "Orange and Pink",
    material: "Leather",
    details: ["Gucci monogram print", "Horsebit detail", "Mule sandal silhouette"],
    image: gucciSandalsImg,
    images: [
      gucciSandalsImg,
      gucciSandalsPairTopImg,
      gucciSandalsSolesImg,
      gucciSandalsInsoleLogoImg,
    ],
  },
  {
    id: 19,
    name: "Snakeskin Dress",
    brand: "Just Cavalli",
    price: 450,
    size: "IT 40",
    era: "Y2K / 2000s",
    condition: "Good",
    category: "Tops",
    color: "Pink / Cream Snakeskin",
    material: "Silk",
    details: ["Snakeskin print", "Halter neck", "Metal ring hardware", "Open back"],
    image: justCavalliSnakeskinDressImg,
    images: [justCavalliSnakeskinDressImg],
    imageBackground: "#000000",
    availableSoon: true,
  },
  {
    id: 17,
    name: "Floral Capri",
    brand: "Dolce & Gabbana",
    price: 150,
    size: "42 IT",
    era: "Vintage",
    condition: "Good",
    category: "Bottoms",
    color: "Cream / Red Floral",
    origin: "Italy",
    fabric: "97% Cotton, 3% Elastane",
    measurements: {
      waist: '31"',
      inseam: '22"',
    },
    details: ["Floral print", "Capri length", "Five-pocket design", "Branded D&G hardware"],
    image: dgFloralCapriFrontImg,
    images: [
      dgFloralCapriFrontImg,
      dgFloralCapriBackImg,
      dgFloralCapriDetailImg,
      dgFloralCapriLabelImg,
    ],
    imageBackground: "#000000",
  },
  {
    id: 14,
    name: "Leopard Print Leggings",
    brand: "Just Cavalli",
    price: 50,
    size: "42",
    era: "Vintage",
    condition: "Excellent",
    category: "Bottoms",
    details: ["Leopard print", "Floral and butterfly motifs", "Gold star waistband"],
    image: justCavalliLeggingsImg,
    imageBackground: "#000000",
  },
  {
    id: 15,
    name: "DS2 Logo Belt",
    brand: "Dsquared2",
    price: 100,
    size: "TBD",
    era: "Contemporary / 2020s",
    condition: "New with tags",
    category: "Accessories",
    color: "Black",
    material: "Leather",
    details: ["DS2 logo buckle", "American flag motif", "Silver-tone hardware"],
    image: dsquared2BeltBuckleImg,
    images: [
      dsquared2BeltBuckleImg,
      dsquared2BeltCoiledImg,
      dsquared2BeltAngleImg,
    ],
    imageBackground: "#000000",
  },
  {
    id: 13,
    name: "Heart Cut Out Pumps",
    brand: "Alaïa",
    price: 925,
    size: "38.5",
    era: "Contemporary / 2020s",
    condition: "Great",
    category: "Shoes",
    color: "Raspberry",
    senserId: "33594239",
    brandId: "AA3M053CK150",
    composition: "Upper: Calfskin 60%, Polyurethanes 40%; Sole: Calfskin 95%, Rubber 5%",
    origin: "Italy",
    description: "Mules with heart-shaped cutouts on the toe, featuring a pointed toe design.",
    details: ["Dust bag", "Box"],
    image: alaiaPumpsPairTopImg,
    images: [
      alaiaPumpsPairTopImg,
      alaiaPumpsImg,
      alaiaPumpsHeelViewImg,
      alaiaPumpsSoleProfileImg,
      alaiaPumpsThreeQuarterImg,
    ],
    sold: true,
  },
];

const CATS = ["All", "Tops", "Bottoms", "Accessories", "Bags", "Shoes"];
const FONT = "'Urbanist', sans-serif";

// One column of the conveyor — different objectPosition shows a different crop of the bag photo
function ConveyorColumn({ pos, duration, delay }: { pos: string; duration: number; delay: number }) {
  // 8 tiles + 8 duplicates = 16 total. Animating -50% scrolls through one full set seamlessly.
  const tiles = Array.from({ length: 16 });
  return (
    <div style={{ overflow: "hidden", position: "relative", height: "100%" }}>
      <div
        style={{
          animation: `conveyorDown ${duration}s linear ${delay}s infinite`,
          willChange: "transform",
        }}
      >
        {tiles.map((_, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              aspectRatio: "2 / 3",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={bagPileImg}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: pos,
                display: "block",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const COLS = [
  { pos: "20% 15%",  duration: 110, delay:   0  },
  { pos: "75% 20%",  duration: 150, delay: -38  },
  { pos: "25% 72%",  duration: 95, delay: -19  },
  { pos: "70% 75%",  duration: 130, delay: -65  },
];

interface HomePageProps {
  cart: Product[];
  onAddToCart: (product: Product) => void;
  onNavigate: (page: "consignment" | "returns") => void;
}

export function HomePage({ cart, onAddToCart, onNavigate }: HomePageProps) {
  const [cat, setCat] = useState("All");
  const cartIds = new Set(cart.map((p) => p.id));
  const filtered = cat === "All" ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === cat);

  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF" }}>

      {/* Keyframes + mobile layout */}
      <style>{`
        @keyframes conveyorDown {
          0%   { transform: translateY(-50%); }
          100% { transform: translateY(0%);   }
        }
        .ticker-anim {
          display: inline-block;
          animation: tickerScroll 70s linear infinite;
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-section {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
        }
        .hero-conveyor {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 3px;
          background-color: #000;
        }
        .hero-conveyor > :nth-child(n + 3) {
          display: none;
        }
        .new-in-section {
          padding: 32px 16px;
        }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .feature-strip {
          display: grid;
          grid-template-columns: 1fr;
          border-top: 1px solid #0D0D0D;
          border-bottom: 1px solid #0D0D0D;
        }
        .feature-strip-panel {
          position: relative;
          overflow: hidden;
          min-height: 260px;
          border-bottom: 1px solid #0D0D0D;
          cursor: pointer;
        }
        .feature-strip-panel:last-child {
          border-bottom: none;
        }
        .auth-section {
          display: grid;
          grid-template-columns: 1fr;
          border-bottom: 1px solid #0D0D0D;
        }
        .auth-copy {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-bottom: 1px solid #0D0D0D;
        }
        .auth-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 32px;
        }
        .consign-banner {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-direction: column;
          gap: 24px;
          padding: 40px 20px;
          background-color: #0D0D0D;
        }
        .hero-ctas {
          flex-direction: column;
          align-items: stretch;
          width: min(100%, 280px);
        }
        .hero-ctas button {
          justify-content: center;
          width: 100%;
        }
        @media (min-width: 640px) {
          .hero-conveyor {
            grid-template-columns: repeat(4, 1fr);
          }
          .hero-conveyor > :nth-child(n + 3) {
            display: block;
          }
          .hero-ctas {
            flex-direction: row;
            align-items: center;
            width: auto;
          }
          .hero-ctas button {
            width: auto;
          }
          .new-in-section {
            padding: 48px 40px;
          }
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 16px;
          }
          .feature-strip {
            grid-template-columns: repeat(3, 1fr);
          }
          .feature-strip-panel {
            min-height: 360px;
            border-bottom: none;
            border-right: 1px solid #0D0D0D;
          }
          .feature-strip-panel:last-child {
            border-right: none;
          }
          .auth-section {
            grid-template-columns: 1fr 1fr;
          }
          .auth-copy {
            padding: 64px;
            border-bottom: none;
            border-right: 1px solid #0D0D0D;
          }
          .auth-stats {
            gap: 20px;
            margin-top: 40px;
          }
          .consign-banner {
            flex-direction: row;
            align-items: center;
            gap: 32px;
            padding: 48px 64px;
          }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="hero-section">

        {/* Conveyor columns */}
        <div className="hero-conveyor">
          {COLS.map((c, i) => (
            <ConveyorColumn key={i} pos={c.pos} duration={c.duration} delay={c.delay} />
          ))}
        </div>

        {/* Dark overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.65) 100%)",
        }} />

        {/* Text */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "0 24px",
        }}>
          <p style={{
            fontSize: "0.6rem", letterSpacing: "0.32em",
            textTransform: "uppercase", color: "#FAFA5A",
            fontWeight: 700, marginBottom: "18px",
          }}>
            Curated Vintage & Luxury Designer Finds
          </p>
          <h1 style={{
            fontSize: "clamp(2.8rem, 9vw, 8rem)",
            fontWeight: 900, textTransform: "uppercase",
            letterSpacing: "-0.02em", lineHeight: 0.92,
            color: "#FFFFFF",
            textShadow: "0 2px 48px rgba(0,0,0,0.6)",
            fontFamily: FONT,
          }}>
            The Goody<br />Bag Collection
          </h1>
          <p style={{
            fontSize: "0.82rem", letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.65)", marginTop: "20px",
            fontWeight: 300, maxWidth: "340px", lineHeight: 1.7,
          }}>
            Rare pre-loved pieces, hand-picked and 100% authenticated.
          </p>
          <div className="hero-ctas" style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "32px", justifyContent: "center" }}>
            <button
              onClick={() => document.getElementById("new-in")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 28px",
                backgroundColor: "#FAFA5A", color: "#0D0D0D",
                fontSize: "0.65rem", letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 800,
                fontFamily: FONT, border: "none", cursor: "pointer",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.8"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Shop New In <ArrowRight size={13} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onNavigate("consignment")}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "14px 28px",
                backgroundColor: "transparent", color: "#FFFFFF",
                fontSize: "0.65rem", letterSpacing: "0.22em",
                textTransform: "uppercase", fontWeight: 700,
                fontFamily: FONT, border: "1px solid rgba(255,255,255,0.5)",
                cursor: "pointer", transition: "border-color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#FFFFFF"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
            >
              Sell With Us
            </button>
          </div>
        </div>

        {/* Bottom corners */}
        <p style={{ position: "absolute", bottom: 20, right: 24, zIndex: 10, fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>
          Want In? →
        </p>
        <p style={{ position: "absolute", bottom: 20, left: 24, zIndex: 10, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          Scroll to explore
        </p>
      </section>

      {/* ── Ticker ── */}
      <div style={{ backgroundColor: "#0D0D0D", overflow: "hidden", whiteSpace: "nowrap" }}>
        <p className="ticker-anim" style={{ padding: "12px 0", fontSize: "0.6rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "#FAFA5A", fontWeight: 600 }}>
          {Array(16).fill("100% Authenticated  ·  Hand-Picked  ·  Rare Finds  ·  Fast Shipping  ·  Verified Before Shipping  ·  ").join("")}
        </p>
      </div>

      {/* ── New In ── */}
      <section id="new-in" className="new-in-section">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid #0D0D0D" }}>
          <h2 style={{ fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700 }}>New In</h2>
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888" }}>{filtered.length} Items</span>
        </div>

        <div style={{ display: "flex", gap: "20px", overflowX: "auto", padding: "16px 0 28px", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} style={{
              flexShrink: 0, fontSize: "0.65rem", letterSpacing: "0.2em",
              textTransform: "uppercase", fontWeight: c === cat ? 700 : 500,
              color: c === cat ? "#0D0D0D" : "#888888",
              borderBottom: c === cat ? "1.5px solid #0D0D0D" : "1.5px solid transparent",
              paddingBottom: "8px", paddingTop: "8px", background: "none", border: "none",
              borderBottomStyle: "solid",
              cursor: "pointer", fontFamily: FONT,
            }}>
              {c}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} inCart={cartIds.has(p.id)} />
          ))}
        </div>
      </section>

      {/* ── Three-panel strip ── */}
      <section className="feature-strip">
        {[
          { img: newInFreshDropsImg, label: "New In", caption: "Fresh drops every week." },
          { img: authenticatedFeatureImg, label: "Inquiries", caption: "For inquiries or offers, contact us directly." },
          { img: consignFeatureImg, label: "Consign", caption: "Keep 80% of each sale." },
        ].map(({ img, label, caption }) => (
          <div key={label} className="feature-strip-panel">
            <img src={img} alt={label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.3)" }} />
            <div style={{ position: "absolute", bottom: 24, left: 24, right: 24 }}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "#FAFA5A", marginBottom: "4px" }}>{label}</p>
              <p style={{ fontSize: "0.88rem", color: "#FFFFFF", fontWeight: 400 }}>{caption}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Authenticity ── */}
      <section className="auth-section">
        <div className="auth-copy">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "20px" }}>Our Promise</p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.0, color: "#0D0D0D" }}>
            100%<br />Authenticity.<br />
            <span style={{ color: "#FAFA5A", WebkitTextStroke: "1.5px #0D0D0D" }}>No Exceptions.</span>
          </h2>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.78, color: "#888888", fontWeight: 400, maxWidth: "380px", marginTop: "20px" }}>
            We source every piece from trusted authentic sellers, then double-verify each item with Entrupy before it ships. If we can't verify it, we don't sell it. Every order includes an Entrupy verification card.
          </p>
          <p style={{ fontSize: "0.78rem", lineHeight: 1.72, color: "#888888", fontWeight: 400, maxWidth: "420px", marginTop: "12px" }}>
            100% money-back guarantee: In the improbable scenario of a sale of an inauthentic item, you will receive a 100% refund, including shipping.
          </p>
          <div className="auth-stats">
            {[{ n: "2×", l: "Quality checks" }, { n: "Entrupy", l: "Verification card" }, { n: "100%", l: "Money-back guarantee" }].map(({ n, l }) => (
              <div key={l} style={{ borderTop: "1px solid #0D0D0D", paddingTop: "12px" }}>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0D0D0D", lineHeight: 1 }}>{n}</p>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#888888", marginTop: "4px" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ overflow: "hidden", backgroundColor: "#F4F4F4", minHeight: "280px" }}>
          <img src="https://images.unsplash.com/photo-1621036382228-d728f0d09e33?w=800&h=960&fit=crop&auto=format" alt="Authenticated vintage" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: "280px" }} />
        </div>
      </section>

      {/* ── Consignment banner ── */}
      <section className="consign-banner">
        <div>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "10px" }}>Sell With Us</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1.05 }}>
            Your closet,<br />your income.
          </h2>
        </div>
        <button
          onClick={() => onNavigate("consignment")}
          style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 28px", backgroundColor: "#FAFA5A", color: "#0D0D0D", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 800, fontFamily: FONT, border: "none", cursor: "pointer", width: "fit-content" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          Start Consigning <ArrowRight size={13} strokeWidth={2.5} />
        </button>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: "1px solid #0D0D0D" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontWeight: 700, color: "#0D0D0D" }}>The Goody Bag Collection</span>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button
              onClick={() => onNavigate("returns")}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", fontFamily: FONT, transition: "color 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0D0D0D"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#888888"; }}
            >
              Return Policy
            </button>
            <span>© 2026 · All items verified</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
