import { ImageResponse } from "next/og";
import { siteName } from "../src/lib/site";

export const alt =
  "Ebook gratis belajar Cloud Computing, Linux, AWS, dan DevOps dari dasar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.22) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(99, 102, 241, 0.18) 0%, transparent 45%)",
          padding: "40px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Inner Card Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            borderRadius: "24px",
            padding: "52px 60px",
            position: "relative",
          }}
        >
          {/* Header Section: Brand Name & Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                color: "#f8fafc",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.04em",
              }}
            >
              {siteName}
            </div>
          </div>

          {/* Main Content Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                fontSize: 62,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "#ffffff",
              }}
            >
              Belajar{" "}
              <span style={{ color: "#38bdf8", marginLeft: "14px", marginRight: "14px" }}>
                Cloud Computing
              </span>{" "}
              &amp; DevOps
            </div>

            <div
              style={{
                display: "flex",
                color: "#94a3b8",
                fontSize: 26,
                lineHeight: 1.4,
                maxWidth: "920px",
              }}
            >
              Panduan praktis dan terstruktur untuk pemula: dari Linux, AWS, hingga otomatisasi infrastructure dari dasar.
            </div>
          </div>

          {/* Footer Tags Section */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            {["Linux", "AWS", "Cloud Native", "CI/CD", "Docker"].map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  borderRadius: "8px",
                  padding: "6px 16px",
                  color: "#cbd5e1",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}