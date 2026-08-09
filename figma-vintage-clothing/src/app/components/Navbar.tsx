import logoImg from "../../imports/Black_and_White_Modern_Studio_Logo-2.png";
import { Search, ShoppingBag, Heart } from "lucide-react";

type Page = "home" | "contact" | "checkout" | "consignment" | "returns";

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  cartCount: number;
}

const NAV: { page: Page; label: string }[] = [
  { page: "home", label: "New In" },
  { page: "consignment", label: "Consignment" },
  { page: "contact", label: "Contact" },
];

const FONT = "'Urbanist', sans-serif";

export function Navbar({ activePage, onNavigate, cartCount }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white" style={{ fontFamily: FONT }}>
      {/* Top ticker */}
      <div
        className="flex items-center justify-center py-2.5"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <p style={{ color: "#FAFA5A", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600 }}>
          Free Domestic Shipping on Orders Over $100
        </p>
      </div>

      {/* Main header */}
      <div
        className="flex items-center justify-between gap-4 px-6 h-14"
        style={{ borderBottom: "1px solid #0D0D0D" }}
      >
        {/* Left nav */}
        <nav className="flex shrink-0 items-center gap-5">
          {NAV.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: activePage === page ? 700 : 500,
                color: "#0D0D0D",
                borderBottom: activePage === page ? "1.5px solid #0D0D0D" : "1.5px solid transparent",
                paddingBottom: "1px",
                transition: "border-color 0.15s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (activePage !== page) (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.25)"; }}
              onMouseLeave={(e) => { if (activePage !== page) (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Center logo */}
        <button onClick={() => onNavigate("home")} className="flex min-w-0 flex-1 items-center justify-center gap-2.5">
          <img
            src={logoImg}
            alt="The Goody Bag Collection"
            className="h-9 w-9 object-cover"
            style={{ borderRadius: "50%", border: "1px solid #0D0D0D" }}
          />
        </button>

        {/* Right icons */}
        <div className="flex shrink-0 items-center justify-end gap-4">
          <button
            onClick={() => onNavigate("returns")}
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: activePage === "returns" ? 700 : 500,
              color: "#0D0D0D",
              borderBottom: activePage === "returns" ? "1.5px solid #0D0D0D" : "1.5px solid transparent",
              paddingBottom: "1px",
              transition: "border-color 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { if (activePage !== "returns") (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.25)"; }}
            onMouseLeave={(e) => { if (activePage !== "returns") (e.currentTarget as HTMLElement).style.borderColor = "transparent"; }}
          >
            Return Policy
          </button>
          <button aria-label="Search" style={{ color: "#0D0D0D", opacity: 0.8 }} className="hover:opacity-40 transition-opacity">
            <Search size={17} strokeWidth={1.8} />
          </button>
          <button aria-label="Wishlist" style={{ color: "#0D0D0D", opacity: 0.8 }} className="hover:opacity-40 transition-opacity">
            <Heart size={17} strokeWidth={1.8} />
          </button>
          <button
            onClick={() => onNavigate("checkout")}
            className="relative hover:opacity-40 transition-opacity"
            aria-label="Bag"
            style={{ color: "#0D0D0D", opacity: 0.8 }}
          >
            <ShoppingBag size={17} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span
                className="absolute flex items-center justify-center"
                style={{
                  top: "-6px", right: "-7px",
                  width: "15px", height: "15px",
                  backgroundColor: "#FAFA5A",
                  color: "#0D0D0D",
                  fontSize: "0.55rem",
                  fontWeight: 800,
                  borderRadius: "50%",
                  border: "1px solid #0D0D0D",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
