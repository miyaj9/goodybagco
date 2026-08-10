import { useEffect, useState, type CSSProperties } from "react";
import logoImg from "../../imports/Black_and_White_Modern_Studio_Logo-2.png";
import { Menu, Search, ShoppingBag, Heart, X } from "lucide-react";

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
  { page: "returns", label: "Return Policy" },
];

const FONT = "'Urbanist', sans-serif";

const linkStyle = (active: boolean): CSSProperties => ({
  fontSize: "0.68rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  fontWeight: active ? 700 : 500,
  color: "#0D0D0D",
  borderBottom: active ? "1.5px solid #0D0D0D" : "1.5px solid transparent",
  paddingBottom: "1px",
  transition: "border-color 0.15s",
  whiteSpace: "nowrap",
  background: "none",
  border: "none",
  borderBottomStyle: "solid",
  cursor: "pointer",
  fontFamily: FONT,
});

export function Navbar({ activePage, onNavigate, cartCount }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const go = (page: Page) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-50 bg-white" style={{ fontFamily: FONT }}>
      {/* Top ticker */}
      <div
        className="flex items-center justify-center px-3 py-2.5"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <p
          className="text-center"
          style={{
            color: "#FAFA5A",
            fontSize: "0.58rem",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          Free Domestic Shipping on Orders Over $100
        </p>
      </div>

      {/* Main header */}
      <div
        className="flex items-center justify-between gap-3 px-4 sm:px-6 h-14"
        style={{ borderBottom: "1px solid #0D0D0D" }}
      >
        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
          style={{ color: "#0D0D0D" }}
        >
          {menuOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>

        {/* Desktop left nav */}
        <nav className="hidden shrink-0 items-center gap-5 md:flex">
          {NAV.filter((item) => item.page !== "returns").map(({ page, label }) => (
            <button
              key={page}
              type="button"
              onClick={() => go(page)}
              style={linkStyle(activePage === page)}
              onMouseEnter={(e) => {
                if (activePage !== page) (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                if (activePage !== page) (e.currentTarget as HTMLElement).style.borderColor = "transparent";
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Center logo */}
        <button
          type="button"
          onClick={() => go("home")}
          className="flex min-w-0 flex-1 items-center justify-center gap-2.5"
        >
          <img
            src={logoImg}
            alt="The Goody Bag Collection"
            className="h-9 w-9 object-cover"
            style={{ borderRadius: "50%", border: "1px solid #0D0D0D" }}
          />
        </button>

        {/* Right icons */}
        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => go("returns")}
            className="hidden md:inline-block"
            style={linkStyle(activePage === "returns")}
            onMouseEnter={(e) => {
              if (activePage !== "returns") (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.25)";
            }}
            onMouseLeave={(e) => {
              if (activePage !== "returns") (e.currentTarget as HTMLElement).style.borderColor = "transparent";
            }}
          >
            Return Policy
          </button>
          <button
            type="button"
            aria-label="Search"
            className="hidden h-11 w-11 items-center justify-center opacity-80 transition-opacity hover:opacity-40 sm:flex"
            style={{ color: "#0D0D0D" }}
          >
            <Search size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className="hidden h-11 w-11 items-center justify-center opacity-80 transition-opacity hover:opacity-40 sm:flex"
            style={{ color: "#0D0D0D" }}
          >
            <Heart size={18} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => go("checkout")}
            className="relative flex h-11 w-11 items-center justify-center opacity-80 transition-opacity hover:opacity-40"
            aria-label="Bag"
            style={{ color: "#0D0D0D" }}
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            {cartCount > 0 && (
              <span
                className="absolute flex items-center justify-center"
                style={{
                  top: "4px",
                  right: "4px",
                  width: "15px",
                  height: "15px",
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

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[calc(2.5rem+3.5rem)] z-40 md:hidden"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="flex flex-col bg-white"
            style={{ borderBottom: "1px solid #0D0D0D" }}
            onClick={(e) => e.stopPropagation()}
          >
            {NAV.map(({ page, label }) => (
              <button
                key={page}
                type="button"
                onClick={() => go(page)}
                className="px-5 py-4 text-left"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: activePage === page ? 800 : 500,
                  color: "#0D0D0D",
                  backgroundColor: activePage === page ? "#FAFA5A" : "#FFFFFF",
                  borderBottom: "1px solid rgba(13,13,13,0.08)",
                  fontFamily: FONT,
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
