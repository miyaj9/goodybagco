import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./components/HomePage";
import { CheckoutPage } from "./components/CheckoutPage";
import { ContactPage } from "./components/ContactPage";
import { ConsignmentPage } from "./components/ConsignmentPage";
import { ReturnPolicyPage } from "./components/ReturnPolicyPage";
import type { Product } from "./components/ProductCard";

type Page = "home" | "contact" | "checkout" | "consignment" | "returns";
type CheckoutStatus = "success" | "canceled" | null;

function readCheckoutStatus(): CheckoutStatus {
  const value = new URLSearchParams(window.location.search).get("checkout");
  if (value === "success" || value === "canceled") return value;
  return null;
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [cart, setCart] = useState<Product[]>([]);
  const [checkoutStatus, setCheckoutStatus] = useState<CheckoutStatus>(null);

  useEffect(() => {
    const status = readCheckoutStatus();
    if (!status) return;
    setCheckoutStatus(status);
    setActivePage("checkout");
    window.history.replaceState({}, "", window.location.pathname);
  }, []);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePurchase = useCallback(() => {
    setCart([]);
  }, []);

  const handleContinueShopping = () => {
    setCheckoutStatus(null);
    setActivePage("home");
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Urbanist', sans-serif" }}>
      <Navbar activePage={activePage} onNavigate={setActivePage} cartCount={cart.length} />

      {activePage === "home" && (
        <HomePage cart={cart} onAddToCart={handleAddToCart} onNavigate={setActivePage} />
      )}
      {activePage === "checkout" && (
        <CheckoutPage
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onPurchase={handlePurchase}
          onContinueShopping={handleContinueShopping}
          checkoutStatus={checkoutStatus}
        />
      )}
      {activePage === "contact" && <ContactPage />}
      {activePage === "consignment" && <ConsignmentPage />}
      {activePage === "returns" && <ReturnPolicyPage />}
    </div>
  );
}
