import { useState } from "react";
import { ArrowRight, CheckCircle, Upload, ShieldCheck } from "lucide-react";

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
        className="w-full px-4 py-3 outline-none"
        style={{ border: "1px solid rgba(0,0,0,0.15)", fontSize: "0.88rem", fontFamily: FONT, backgroundColor: "#FAFAFA", color: "#0D0D0D", transition: "border-color 0.15s" }}
        onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#0D0D0D"; }}
        onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)"; }}
      />
    </div>
  );
}

const STEPS = [
  { n: "01", title: "Submit", desc: "Fill in the form with photos and details. We respond within 48 hours." },
  { n: "02", title: "Authenticate", desc: "We verify labels, construction, and provenance. Only real pieces listed." },
  { n: "03", title: "We List It", desc: "Photography, copy, and customer enquiries — we handle all of it." },
  { n: "04", title: "You Get Paid", desc: "Keep 80% of the sale, transferred within 5 business days." },
];

export function ConsignmentPage() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", brand: "", description: "", size: "", condition: "", asking: "", era: "" });
  const set = (k: string) => (v: string) => setForm({ ...form, [k]: v });

  if (done) return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8 text-center" style={{ fontFamily: FONT }}>
      <CheckCircle size={36} strokeWidth={1.5} color="#0D0D0D" className="mb-5" />
      <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "10px" }}>Received</p>
      <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", lineHeight: 1.05 }}>
        We'll Be<br />In Touch.
      </h1>
      <p style={{ fontSize: "0.88rem", color: "#888888", marginTop: "14px", lineHeight: 1.7, maxWidth: "340px" }}>
        Our team will review your submission and reach out to <strong style={{ color: "#0D0D0D" }}>{form.email || "your email"}</strong> within 48 hours.
      </p>
      <button
        onClick={() => setDone(false)}
        className="flex items-center gap-3 mt-8 px-7 py-3.5 hover:opacity-75 transition-opacity"
        style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
      >
        Submit Another <ArrowRight size={13} strokeWidth={2} />
      </button>
    </main>
  );

  return (
    <main style={{ fontFamily: FONT, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2" style={{ borderBottom: "1px solid #0D0D0D" }}>
        <div className="flex flex-col justify-center p-6 sm:p-10 md:p-16 order-2 md:order-1" style={{ borderRight: "1px solid #0D0D0D" }}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "20px" }}>
            Sell With Us
          </p>
          <h1 style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 0.95, color: "#0D0D0D" }}>
            Your<br />Vintage.<br />
            <span style={{ color: "#FAFA5A", WebkitTextStroke: "2px #0D0D0D" }}>Your Cash.</span>
          </h1>
          <p style={{ fontSize: "0.88rem", lineHeight: 1.78, color: "#888888", fontWeight: 400, maxWidth: "340px", marginTop: "20px" }}>
            We handle the authentication, photography, listing, and sales.
            You just send us the piece and collect your cut.
          </p>
          <div className="flex gap-8 mt-10">
            {[{ v: "80%", l: "Your cut" }, { v: "48h", l: "Review time" }, { v: "5 days", l: "Payout" }].map(({ v, l }) => (
              <div key={l}>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#0D0D0D", lineHeight: 1 }}>{v}</p>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#888888", marginTop: "3px" }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 md:order-2 overflow-hidden bg-[#F4F4F4]" style={{ minHeight: "420px" }}>
          <img
            src="https://images.unsplash.com/photo-1637228393246-c38a4b3d2011?w=900&h=1000&fit=crop&auto=format"
            alt="Consign your vintage clothing"
            className="w-full h-full object-cover"
            style={{ minHeight: "420px" }}
          />
        </div>
      </section>

      {/* How it works */}
      <section style={{ borderBottom: "1px solid #0D0D0D", backgroundColor: "#0D0D0D" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-10 py-12">
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "32px" }}>
            The Process
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-0">
            {STEPS.map(({ n, title, desc }) => (
              <div
                key={n}
                className="py-2 sm:pr-8 sm:pl-8 sm:border-l sm:border-white/10 first:sm:border-l-0 first:sm:pl-0"
              >
                <p style={{ fontSize: "2.2rem", fontWeight: 800, color: "#FAFA5A", lineHeight: 1, marginBottom: "12px" }}>{n}</p>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#FFFFFF", marginBottom: "8px" }}>{title}</p>
                <p style={{ fontSize: "0.8rem", color: "#888888", lineHeight: 1.65, fontWeight: 400 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.24em", textTransform: "uppercase", fontWeight: 600, color: "#888888", marginBottom: "8px" }}>
          Get Started
        </p>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#0D0D0D", marginBottom: "32px" }}>
          Submit a Piece
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="space-y-8">

          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid #0D0D0D", paddingBottom: "8px", marginBottom: "14px" }}>
              Contact
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><Field label="Full Name" placeholder="Your name" value={form.name} onChange={set("name")} /></div>
              <Field label="Email" placeholder="you@email.com" type="email" value={form.email} onChange={set("email")} />
              <Field label="Phone (optional)" placeholder="+1 555 000 0000" type="tel" value={form.phone} onChange={set("phone")} required={false} />
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid #0D0D0D", paddingBottom: "8px", marginBottom: "14px" }}>
              Item Details
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Brand / Designer" placeholder="e.g. Levi's, Chanel" value={form.brand} onChange={set("brand")} />
              <Field label="Size" placeholder="e.g. M, W28, US 8" value={form.size} onChange={set("size")} />
              <Field label="Era / Decade" placeholder="e.g. 70s, 90s, Y2K" value={form.era} onChange={set("era")} />
              <Field label="Asking Price ($)" placeholder="e.g. 80" type="number" value={form.asking} onChange={set("asking")} />
            </div>

            <div className="mt-4">
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, color: "#0D0D0D", marginBottom: "6px" }}>Condition</label>
              <select
                required value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                className="w-full px-4 py-3 outline-none"
                style={{ border: "1px solid rgba(0,0,0,0.15)", fontSize: "0.88rem", fontFamily: FONT, backgroundColor: "#FAFAFA", color: "#0D0D0D" }}
              >
                <option value="">Select condition...</option>
                <option>Deadstock / New With Tags</option>
                <option>Excellent — no visible wear</option>
                <option>Great — minor wear, no flaws</option>
                <option>Good — light wear, small flaws noted</option>
                <option>Fair — visible wear, priced accordingly</option>
              </select>
            </div>

            <div className="mt-4">
              <label style={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, color: "#0D0D0D", marginBottom: "6px" }}>Description</label>
              <textarea
                required rows={4} placeholder="Fabric, measurements, any flaws, what makes it special..."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-3 outline-none resize-none"
                style={{ border: "1px solid rgba(0,0,0,0.15)", fontSize: "0.88rem", fontFamily: FONT, backgroundColor: "#FAFAFA", color: "#0D0D0D" }}
                onFocus={(e) => { (e.target as HTMLElement).style.borderColor = "#0D0D0D"; }}
                onBlur={(e) => { (e.target as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)"; }}
              />
            </div>
          </div>

          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, borderBottom: "1px solid #0D0D0D", paddingBottom: "8px", marginBottom: "14px" }}>
              Photos
            </p>
            <label
              className="flex flex-col items-center justify-center gap-3 py-10 cursor-pointer transition-colors hover:bg-[#F4F4F4]"
              style={{ border: "1px dashed rgba(0,0,0,0.25)", backgroundColor: "#FAFAFA" }}
            >
              <Upload size={20} strokeWidth={1.5} color="#888888" />
              <div className="text-center">
                <p style={{ fontSize: "0.82rem", color: "#0D0D0D", fontWeight: 500 }}>Upload photos</p>
                <p style={{ fontSize: "0.7rem", color: "#888888", marginTop: "2px" }}>Front, back, labels, details — JPEG or PNG up to 10MB</p>
              </div>
              <input type="file" accept="image/*" multiple className="hidden" />
            </label>
          </div>

          <div className="flex gap-3 p-4 bg-[#F4F4F4]">
            <ShieldCheck size={13} color="#888888" className="mt-0.5 shrink-0" strokeWidth={1.5} />
            <p style={{ fontSize: "0.75rem", color: "#888888", lineHeight: 1.6 }}>
              All submissions are reviewed by our authentication team. We reserve the right to decline pieces
              that don't meet our quality or authenticity standards.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-4 flex items-center justify-center gap-3 hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "#0D0D0D", color: "#FFFFFF", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}
          >
            Submit My Piece <ArrowRight size={13} strokeWidth={2} />
          </button>
        </form>
      </section>
    </main>
  );
}
