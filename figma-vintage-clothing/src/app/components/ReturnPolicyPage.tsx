const FONT = "'Urbanist', sans-serif";

const SECTIONS = [
  {
    title: "Returns & Refunds",
    body: "We do not accept returns, exchanges, or cancellations for reasons including, but not limited to:",
    list: [
      "Change of mind",
      "Buyer's remorse",
      "Incorrect fit or sizing",
      "Personal preference",
    ],
  },
  {
    title: "Items Not as Described",
    body: `We strive to accurately photograph and describe every item. If your order arrives significantly not as described, please contact us within 48 hours of delivery at thegoodybagco@outlook.com.\n\nYour email should include:`,
    list: [
      "Your order number",
      "A description of the issue",
      "Clear photos of the item and any concerns",
    ],
    footer: "Each claim will be reviewed individually. If we determine that an item was significantly misrepresented, we will work with you to provide an appropriate resolution.",
  },
  {
    title: "Item Condition",
    body: "Many of our pieces are vintage or pre-owned and may show signs of wear consistent with their age. Any notable flaws or imperfections will be disclosed in the product description and photographs whenever possible. We encourage customers to review all photos and descriptions carefully before making a purchase.",
  },
  {
    title: "Questions",
    body: "If you have any questions about an item before purchasing, please contact us at thegoodybagco@outlook.com or send us a message on Instagram @goodybagcollection. We're happy to provide additional photos or information to help you shop with confidence.",
  },
];

export function ReturnPolicyPage() {
  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #0D0D0D", padding: "48px 40px 32px" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#888888", fontWeight: 600, marginBottom: "10px" }}>
          Legal
        </p>
        <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95, color: "#0D0D0D" }}>
          Return Policy
        </h1>
        <p style={{ fontSize: "0.92rem", color: "#888888", lineHeight: 1.75, fontWeight: 300, maxWidth: "580px", marginTop: "18px" }}>
          At The Goody Bag Collection, we specialize in carefully curated vintage and luxury designer pieces. Due to the unique and often one-of-a-kind nature of our inventory,{" "}
          <strong style={{ color: "#0D0D0D", fontWeight: 700 }}>sales are generally final.</strong>{" "}
          Limited exceptions apply if an item arrives significantly not as described — see below for how to reach us.
        </p>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 40px" }}>
        {SECTIONS.map(({ title, body, list, footer }, i) => (
          <div
            key={title}
            style={{ marginBottom: "48px", paddingBottom: "48px", borderBottom: i < SECTIONS.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none" }}
          >
            <h2 style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: "#0D0D0D", marginBottom: "14px" }}>
              {title}
            </h2>
            {body.split("\n\n").map((para, j) => (
              <p key={j} style={{ fontSize: "0.92rem", color: "#888888", lineHeight: 1.78, fontWeight: 300, marginBottom: list && j === body.split("\n\n").length - 1 ? "14px" : "12px" }}>
                {para}
              </p>
            ))}
            {list && (
              <ul style={{ margin: "0 0 16px 0", padding: "0", listStyle: "none" }}>
                {list.map((item) => (
                  <li
                    key={item}
                    style={{ fontSize: "0.92rem", color: "#888888", lineHeight: 1.78, fontWeight: 300, paddingLeft: "16px", position: "relative", marginBottom: "4px" }}
                  >
                    <span style={{ position: "absolute", left: 0, color: "#FAFA5A", fontWeight: 800, fontSize: "0.8rem" }}>—</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {footer && (
              <p style={{ fontSize: "0.92rem", color: "#888888", lineHeight: 1.78, fontWeight: 300 }}>
                {footer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #0D0D0D" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 32px", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", flexWrap: "wrap", gap: "12px" }}>
          <span style={{ fontWeight: 700, color: "#0D0D0D" }}>The Goody Bag Collection</span>
          <span>© 2026 · All items verified · Sustainably sourced vintage</span>
        </div>
      </footer>
    </main>
  );
}
