import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System Proof",
  robots: { index: false, follow: false },
};

export default function DesignTestPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-bg)" }}>

      {/* ======================================================
          PAGE HEADER
      ====================================================== */}
      <div style={{ background: "var(--color-primary)", padding: "var(--spacing-8) var(--spacing-12)" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-accent)", fontSize: "var(--text-xs)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
          AfrONet Design System Proof — delete before launch
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-text-inverse)", fontSize: "var(--text-2xl)", marginTop: "var(--spacing-2)" }}>
          Visual Design Validation
        </h1>
      </div>

      <div style={{ maxWidth: "var(--content-wide)", margin: "0 auto", padding: "var(--spacing-12) var(--spacing-8)" }}>

        {/* ======================================================
            1. SURFACE LAYER STACK
        ====================================================== */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-6)" }}>
            01 — Surface Layers
          </h2>
          <div style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-xl)", padding: "var(--spacing-8)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-4)" }}>--color-bg #FFFFFF</p>
            <div style={{ background: "var(--color-surface)", borderRadius: "var(--radius-lg)", padding: "var(--spacing-6)" }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-4)" }}>--color-surface #FBFAF3</p>
              <div style={{ background: "var(--color-surface-warm)", borderRadius: "var(--radius-md)", padding: "var(--spacing-6)" }}>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-4)" }}>--color-surface-warm #FFFAED</p>
                <div style={{ background: "var(--color-surface-offset)", borderRadius: "var(--radius-sm)", padding: "var(--spacing-4)" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>--color-surface-offset #F3F0E8</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            2. TYPE SPECIMEN
        ====================================================== */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-6)" }}>
            02 — Type Specimen
          </h2>

          {/* Display font territory */}
          <div style={{ marginBottom: "var(--spacing-8)", padding: "var(--spacing-6)", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", borderLeft: "3px solid var(--color-accent)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Display Font Territory — Instrument Sans</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-hero)", fontWeight: 700, color: "var(--color-primary)", lineHeight: 1.05 }}>
              Growing<br />
              <span style={{ color: "var(--color-accent)" }}>Organic</span>
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text)", marginTop: "var(--spacing-4)" }}>
              Across Africa
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-2xl)", fontWeight: 600, color: "var(--color-text)", marginTop: "var(--spacing-4)" }}>
              Page Title (h1) — 2xl
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-xl)", fontWeight: 600, color: "var(--color-text)", marginTop: "var(--spacing-4)" }}>
              Section Heading (h2) — xl
            </p>
          </div>

          {/* Editorial font */}
          <div style={{ marginBottom: "var(--spacing-8)", padding: "var(--spacing-6)", background: "var(--color-surface-warm)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Editorial Font — Instrument Serif</p>
            <p style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-2xl)", fontStyle: "italic", color: "var(--color-text)" }}>
              &ldquo;Making Africa an Organic Food Basket&rdquo;
            </p>
            <p style={{ fontFamily: "var(--font-editorial)", fontSize: "var(--text-lg)", fontStyle: "italic", color: "var(--color-text-muted)", marginTop: "var(--spacing-3)" }}>
              Testimonials, pull quotes, hero subtitles
            </p>
          </div>

          {/* Body font territory */}
          <div style={{ padding: "var(--spacing-6)", background: "var(--color-surface)", borderRadius: "var(--radius-lg)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Body Font Territory — Manrope</p>
            <p style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", fontWeight: 700, color: "var(--color-text)", marginBottom: "var(--spacing-3)" }}>
              Card Heading (h3) — Archivo Bold
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text)", marginBottom: "var(--spacing-3)", maxWidth: "65ch" }}>
              Body paragraph — AfrONet unites and represents organic agriculture stakeholders across Africa through policy dialogue, capacity building, knowledge sharing, and trade facilitation. This sentence tests comfortable reading length at 65ch max-width.
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text)", marginBottom: "var(--spacing-3)" }}>
              Button / nav text — text-sm (14–16px)
            </p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              TINY LABEL — TEXT-XS (12–14px) — ABSOLUTE FLOOR
            </p>
          </div>
        </section>

        {/* ======================================================
            3. COLOR & CONTRAST CHECK
        ====================================================== */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-6)" }}>
            03 — Color & Contrast
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--spacing-4)" }}>

            {/* On white */}
            <div style={{ background: "#FFFFFF", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--spacing-6)" }}>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-3)" }}>On --color-bg #FFF</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text)", marginBottom: "var(--spacing-1)" }}>Primary text #111111</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-1)" }}>Muted text #777777</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-faint)" }}>Faint text #BBBBBB</p>
            </div>

            {/* On surface */}
            <div style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "var(--spacing-6)" }}>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-3)" }}>On --color-surface #FBFAF3</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text)", marginBottom: "var(--spacing-1)" }}>Primary text #111111</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-1)" }}>Muted text #777777</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-faint)" }}>Faint text #BBBBBB</p>
            </div>

            {/* On primary green */}
            <div style={{ background: "var(--color-primary)", borderRadius: "var(--radius-lg)", padding: "var(--spacing-6)" }}>
              <p style={{ fontSize: "var(--text-xs)", color: "rgba(255,255,255,0.6)", marginBottom: "var(--spacing-3)" }}>On --color-primary #1a3a1a</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text-inverse)", marginBottom: "var(--spacing-1)" }}>White text #FFFFFF ✓</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-accent)", marginBottom: "var(--spacing-1)" }}>Accent yellow #F5D83C ✓</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "rgba(255,255,255,0.6)" }}>Muted white (60%) ✓</p>
            </div>

            {/* On accent yellow */}
            <div style={{ background: "var(--color-accent)", borderRadius: "var(--radius-lg)", padding: "var(--spacing-6)" }}>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-primary)", marginBottom: "var(--spacing-3)" }}>On --color-accent #F5D83C</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-primary)", marginBottom: "var(--spacing-1)" }}>Dark green #1a3a1a ✓</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-text)", marginBottom: "var(--spacing-1)" }}>Body text #111111 ✓</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "var(--color-primary-mid)" }}>Mid green #2d5a27 ✓</p>
            </div>
          </div>

          {/* Color swatches */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)", marginTop: "var(--spacing-6)" }}>
            {[
              { label: "primary", bg: "#1a3a1a" },
              { label: "primary-mid", bg: "#2d5a27" },
              { label: "primary-link", bg: "#2d6a4f" },
              { label: "accent", bg: "#F5D83C" },
              { label: "accent-soft", bg: "#FFEE58" },
              { label: "surface-warm", bg: "#FFFAED" },
              { label: "surface-offset", bg: "#F3F0E8" },
              { label: "border", bg: "#E2DDD4" },
            ].map(({ label, bg }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "var(--radius-md)", background: bg, border: "1px solid var(--color-border)", marginBottom: "var(--spacing-1)" }} />
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)" }}>{label}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-faint)" }}>{bg}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================
            4. COMPONENT SAMPLER
        ====================================================== */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-6)" }}>
            04 — Components
          </h2>

          {/* Buttons */}
          <div style={{ marginBottom: "var(--spacing-8)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Buttons</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)", alignItems: "center" }}>
              <button className="btn btn-primary">Explore Programmes →</button>
              <button className="btn btn-accent">Contact Us</button>
              <button className="btn btn-ghost-dark">Learn More</button>
              <div style={{ background: "var(--color-primary)", padding: "var(--spacing-4)", borderRadius: "var(--radius-lg)", display: "flex", gap: "var(--spacing-3)" }}>
                <button className="btn btn-accent">Contact Us</button>
                <button className="btn btn-ghost">About Us</button>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div style={{ marginBottom: "var(--spacing-8)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Cards</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--spacing-4)" }}>
              <div className="card">
                <div style={{ height: "160px", background: "var(--color-surface-offset)" }} />
                <div className="card-body">
                  <span className="badge badge-green" style={{ marginBottom: "var(--spacing-3)" }}>Markets</span>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text)", marginBottom: "var(--spacing-2)" }}>Uganda is Ready to Go Places</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-4)" }}>A new chapter for organic agriculture in East Africa as Uganda strengthens its position.</p>
                  <button className="btn btn-primary" style={{ fontSize: "var(--text-xs)", padding: "var(--spacing-2) var(--spacing-4)" }}>Read more →</button>
                </div>
              </div>
              <div className="card card-warm">
                <div className="card-body">
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-2)" }}>01</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-primary)", marginBottom: "var(--spacing-3)" }}>Markets & Partnerships</h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>Connecting organic producers with regional and international markets to grow the value chain.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div style={{ marginBottom: "var(--spacing-8)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Badges</p>
            <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap", alignItems: "center" }}>
              <span className="badge badge-green">Markets</span>
              <span className="badge badge-green">Policy</span>
              <span className="badge badge-green">Knowledge</span>
              <div style={{ background: "var(--color-primary)", padding: "var(--spacing-3)", borderRadius: "var(--radius-md)", display: "flex", gap: "var(--spacing-2)" }}>
                <span className="badge badge-white">About Us</span>
                <span className="badge badge-white">Our Impact</span>
              </div>
            </div>
          </div>

          {/* Form input */}
          <div style={{ marginBottom: "var(--spacing-8)", maxWidth: "480px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Form Input</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
              <div>
                <label htmlFor="name" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)", display: "block", marginBottom: "var(--spacing-2)" }}>Full Name</label>
                <input id="name" type="text" className="input" placeholder="e.g. Joseph Masonda" />
              </div>
              <div>
                <label htmlFor="email" style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", fontWeight: 600, color: "var(--color-text)", display: "block", marginBottom: "var(--spacing-2)" }}>Email Address</label>
                <input id="email" type="email" className="input" placeholder="joseph@baronsdigital.com" />
              </div>
            </div>
          </div>

          {/* Skeleton */}
          <div style={{ marginBottom: "var(--spacing-8)", maxWidth: "400px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "var(--spacing-4)" }}>Skeleton Loader</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-2)" }}>
              <div className="skeleton" style={{ height: "160px", borderRadius: "var(--radius-lg)" }} />
              <div className="skeleton skeleton-heading" style={{ height: "1.5em", width: "60%" }} />
              <div className="skeleton skeleton-text" style={{ height: "1em" }} />
              <div className="skeleton skeleton-text" style={{ height: "1em", width: "80%" }} />
              <div className="skeleton skeleton-text" style={{ height: "1em", width: "40%" }} />
            </div>
          </div>

          {/* Divider */}
          <hr className="divider" />
        </section>

        {/* ======================================================
            5. HERO PREVIEW
        ====================================================== */}
        <section style={{ marginBottom: "var(--spacing-16)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-6)" }}>
            05 — Hero Preview
          </h2>
          <div style={{ position: "relative", minHeight: "420px", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--color-primary-mid)", display: "flex", alignItems: "flex-end" }}>
            {/* Simulated photo background */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #2d5a27 0%, #1a3a1a 40%, #0d2410 100%)", opacity: 0.9 }} />
            {/* Overlay */}
            <div className="hero-overlay" style={{ position: "absolute", inset: 0 }} />
            {/* Content */}
            <div style={{ position: "relative", zIndex: 1, padding: "var(--spacing-12)" }}>
              <span className="badge badge-white" style={{ marginBottom: "var(--spacing-6)" }}>Continental Network</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-text-inverse)", lineHeight: 1.1, marginBottom: "var(--spacing-2)" }}>
                Growing Organic
              </h1>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-3xl)", fontWeight: 700, color: "var(--color-accent)", lineHeight: 1.1, marginBottom: "var(--spacing-6)" }}>
                Across Africa
              </h1>
              <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-base)", color: "rgba(255,255,255,0.8)", maxWidth: "52ch", marginBottom: "var(--spacing-8)" }}>
                AfrONet unites organic agriculture stakeholders across the continent through policy, knowledge, and partnerships.
              </p>
              <div style={{ display: "flex", gap: "var(--spacing-3)", flexWrap: "wrap" }}>
                <button className="btn btn-accent">Explore our programmes →</button>
                <button className="btn btn-ghost">Learn more</button>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            VALIDATION CHECKLIST
        ====================================================== */}
        <section style={{ background: "var(--color-surface-warm)", borderRadius: "var(--radius-xl)", padding: "var(--spacing-8)", marginBottom: "var(--spacing-16)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "var(--text-lg)", color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "var(--spacing-6)" }}>
            Validation Checklist
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--spacing-2)" }}>
            {[
              "Surface layers are visually distinct",
              "Fonts load correctly (4 typefaces)",
              "Type scale steps are meaningful",
              "Display fonts only at xl+ (24px+)",
              "Body text reads comfortably at 16px",
              "Accent yellow pops on dark green",
              "White text readable on dark green",
              "Dark green readable on accent yellow",
              "Button hover states work",
              "Card hover lifts correctly",
              "Input focus ring appears",
              "Skeleton shimmer animates",
              "No text smaller than 12px (xs floor)",
              "Body text is left-aligned (not justified)",
            ].map((item) => (
              <label key={item} style={{ display: "flex", alignItems: "center", gap: "var(--spacing-3)", fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-text)", cursor: "pointer" }}>
                <input type="checkbox" style={{ width: "18px", height: "18px", accentColor: "var(--color-primary)", cursor: "pointer" }} />
                {item}
              </label>
            ))}
          </div>
          <div style={{ marginTop: "var(--spacing-6)", padding: "var(--spacing-4)", background: "oklch(0.35 0.1 130 / 0.1)", borderRadius: "var(--radius-md)", border: "1px solid oklch(0.35 0.1 130 / 0.2)" }}>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--color-primary-mid)", fontWeight: 600 }}>
              ✓ Once all items pass — delete this page and move to Phase 3 (API Layer)
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
