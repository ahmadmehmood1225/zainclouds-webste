import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export const alt = "Zain Clouds";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1e3c",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a1e3c",
            borderRadius: 14,
          }}
        >
          <div style={{ display: "flex", position: "relative" }}>
            <svg width="44" height="44" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
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
      </div>
    ),
    size,
  );
}