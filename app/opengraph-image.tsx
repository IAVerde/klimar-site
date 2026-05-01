import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Klimar™ — Gestão para serviços técnicos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          background:
            "radial-gradient(ellipse 70% 60% at 70% 30%, rgba(0,184,212,0.25), transparent 60%), #0F172A",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #00B8D4 0%, #006C7F 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 36,
              color: "#fff",
              boxShadow: "0 0 32px rgba(0,184,212,0.45)",
            }}
          >
            k
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "#F1F5F9",
              display: "flex",
            }}
          >
            klimar
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", zIndex: 1 }}>
          <div
            style={{
              fontSize: 110,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#F1F5F9",
              maxWidth: 980,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            <span>A&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#00B8D4" }}>agenda</span>
            <span>&nbsp;do seu técnico, resolvida.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
            color: "#94A3B8",
            fontFamily: "ui-monospace, monospace",
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span>useklimar.com.br</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>gestão para serviços técnicos</span>
        </div>
      </div>
    ),
    size,
  );
}
