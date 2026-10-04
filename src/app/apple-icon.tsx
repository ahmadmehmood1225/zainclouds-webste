import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const alt = "Zain Clouds";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a1e3c 0%, #10284c 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: 30,
            background: "#0a1e3c",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg width="92" height="92" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
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
      </div>
    ),
    size,
  );
}