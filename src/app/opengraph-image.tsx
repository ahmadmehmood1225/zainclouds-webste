import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Zain Clouds - Software Solutions for Growing Businesses";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a1e3c",
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background: "rgba(34,156,104,0.35)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -140,
            left: -60,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: "rgba(239,87,144,0.2)",
            filter: "blur(40px)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#0a1e3c",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 0 7 11h13V29"
                stroke="#7ecea9"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M21 33l-5 4v-9"
                stroke="#ffaf11"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#ffffff" }}>Zain</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#7ecea9" }}>Clouds</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div
            style={{
              fontSize: 20,
              letterSpacing: 4,
              color: "#7ecea9",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Software Solutions for Growing Businesses
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Business Systems That Work The Way Business Works
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.4,
              color: "rgba(217,230,246,0.85)",
              marginTop: 24,
              maxWidth: 820,
            }}
          >
            Ecommerce · CRM · ERP · ERPNext · POS · Custom Software, delivered across Saudi
            Arabia, Pakistan and the Gulf region.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 18,
            color: "rgba(217,230,246,0.7)",
          }}
        >
          <span>Saudi Arabia</span>
          <span>Pakistan</span>
          <span>Dubai</span>
          <span>Gulf Region</span>
        </div>
      </div>
    ),
    size,
  );
}