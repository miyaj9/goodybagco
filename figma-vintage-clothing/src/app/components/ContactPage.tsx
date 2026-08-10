import { Mail, Instagram, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";

const FONT = "'Urbanist', sans-serif";

const FAQS = [
  {
    q: "Are your items authentic?",
    a: "Yes. We source every piece from trusted authentic sellers, then double-verify each item with Entrupy. Every order includes an Entrupy verification card.",
  },
  {
    q: "Do you accept consignments?",
    a: "Yes. We accept select luxury and vintage designer pieces. Visit our Consignment page or contact us to learn more.",
  },
  {
    q: "Do you offer returns?",
    a: "Please refer to our return policy or contact us before purchasing if you have any questions about an item.",
  },
  {
    q: "Need help finding a specific designer piece?",
    a: "Send us an email or message on Instagram. We'll do our best to help you source the item you're looking for.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "16px",
          padding: "20px 0", background: "none", border: "none",
          cursor: "pointer", textAlign: "left", fontFamily: FONT,
        }}
      >
        <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "#0D0D0D", lineHeight: 1.4 }}>
          {q}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          color="#888888"
          style={{ flexShrink: 0, transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p style={{ fontSize: "0.88rem", color: "#888888", lineHeight: 1.75, paddingBottom: "20px", fontWeight: 400 }}>
          {a}
        </p>
      )}
    </div>
  );
}

export function ContactPage() {
  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
      <style>{`
        .contact-header {
          border-bottom: 1px solid #0D0D0D;
          padding: 36px 20px 28px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          border-bottom: 1px solid #0D0D0D;
        }
        .contact-details,
        .contact-faq {
          padding: 36px 20px;
        }
        .contact-details {
          border-bottom: 1px solid #0D0D0D;
        }
        @media (min-width: 768px) {
          .contact-header {
            padding: 48px 40px 32px;
          }
          .contact-grid {
            grid-template-columns: 1fr 1fr;
          }
          .contact-details,
          .contact-faq {
            padding: 48px 40px;
          }
          .contact-details {
            border-bottom: none;
            border-right: 1px solid #0D0D0D;
          }
        }
      `}</style>

      {/* Header */}
      <div className="contact-header">
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#888888", fontWeight: 600, marginBottom: "10px" }}>
          Get In Touch
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 8vw, 4rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95, color: "#0D0D0D" }}>
          We'd Love to<br />Hear From You.
        </h1>
        <p style={{ fontSize: "0.92rem", color: "#888888", lineHeight: 1.75, fontWeight: 300, maxWidth: "520px", marginTop: "18px" }}>
          Whether you have a question about a piece, would like to inquire about consignment, or need assistance with your order, we're here to help.
        </p>
      </div>

      <div className="contact-grid">

        {/* Left — contact details */}
        <div className="contact-details">

          {[
            {
              icon: <Mail size={18} strokeWidth={1.5} />,
              label: "Email",
              value: "thegoodybagco@outlook.com",
              href: "mailto:thegoodybagco@outlook.com",
            },
            {
              icon: <Instagram size={18} strokeWidth={1.5} />,
              label: "Instagram",
              value: "@goodybagcollection",
              href: "https://instagram.com/goodybagcollection",
            },
            {
              icon: <Clock size={18} strokeWidth={1.5} />,
              label: "Response Time",
              value: "We aim to respond to all inquiries within 24–48 business hours.",
              href: null,
            },
          ].map(({ icon, label, value, href }) => (
            <div
              key={label}
              style={{ paddingBottom: "32px", marginBottom: "32px", borderBottom: "1px solid rgba(0,0,0,0.08)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ color: "#FAFA5A", backgroundColor: "#0D0D0D", padding: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {icon}
                </span>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "#888888" }}>
                  {label}
                </p>
              </div>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ fontSize: "1rem", fontWeight: 600, color: "#0D0D0D", textDecoration: "none", borderBottom: "1.5px solid #0D0D0D", paddingBottom: "1px", transition: "opacity 0.15s", wordBreak: "break-word" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.5"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                  {value}
                </a>
              ) : (
                <p style={{ fontSize: "0.92rem", color: "#888888", lineHeight: 1.65, fontWeight: 300, maxWidth: "320px" }}>
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Right — FAQ */}
        <div className="contact-faq">
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 700, color: "#0D0D0D", marginBottom: "24px" }}>
            Frequently Asked Questions
          </p>
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #0D0D0D" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 20px", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontWeight: 700, color: "#0D0D0D" }}>The Goody Bag Collection</span>
          <span>© 2026 · All items verified · Sustainably sourced vintage</span>
        </div>
      </footer>
    </main>
  );
}
