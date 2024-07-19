import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image(req: NextRequest) {
  const url = new URL(req.url);
  const theme = url.searchParams.get("theme") || "light";

  const fontResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap"
  );
  const fontData = await fontResponse.arrayBuffer();

  const backgroundColor = theme === "dark" ? "#333" : "#fff";
  const textColor = theme === "dark" ? "#fff" : "#000";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: backgroundColor,
          color: textColor,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>Invoice App</h1>
        <p
          style={{
            fontSize: "32px",
            color: theme === "dark" ? "#ccc" : "#666",
          }}
        >
          Streamline your invoicing process with ease
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "League Spartan",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
