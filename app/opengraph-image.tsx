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
          alignItems: "center",
          background: "linear-gradient(135deg, #07111f 0%, #12315a 100%)",
          color: "#f8fafc",
          display: "flex",
          height: "100%",
          padding: "72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid rgba(56, 189, 248, 0.45)",
            borderRadius: "32px",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            flexDirection: "column",
            padding: "56px",
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#7dd3fc",
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {siteName}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginTop: 28,
            }}
          >
            Belajar Cloud
            <br />
            Computing &amp; DevOps
          </div>
          <div
            style={{
              color: "#cbd5e1",
              display: "flex",
              fontSize: 30,
              marginTop: 28,
            }}
          >
            Panduan gratis untuk pemula: Linux, AWS, dan cloud dari dasar.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
