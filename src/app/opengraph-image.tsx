import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function Image({ params }: { params: string[] }) {
  const leagueSpartan = await fetch(
    new URL(
      "https://fonts.googleapis.com/css2?family=League+Spartan:wght@400&display=swap"
    ).href
  ).then((res) => res.text());

  const fontSrc = leagueSpartan.match(/@font-face {([^}]+)}/g)?.[0];
  const fontUrl = fontSrc?.match(/url\(([^)]+)\)/)?.[1];

  const fontData = await fetch(fontUrl!).then((res) => res.arrayBuffer());

  let title = "";
  let description = "";

  const route = params.join("/");

  if (route === "forgot-password") {
    title = "Forgot Password";
    description = "Reset your password securely";
  } else if (route.startsWith("invoices")) {
    const invoiceId = params[1] || "Unknown Invoice";
    title = `Invoice ${invoiceId}`;
    description = "View and manage your invoice details";
  } else if (route.startsWith("profile")) {
    const userId = params[1] || "User";
    title = `Profile of ${userId}`;
    description = "Manage your profile settings";
  } else if (route === "signin") {
    title = "Sign In";
    description = "Access your account securely";
  } else if (route === "signup") {
    title = "Sign Up";
    description = "Create a new account";
  } else {
    title = "Invoices";
    description =
      "Work smarter with the invoice app. Streamline your invoicing process with ease.";
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          padding: "10px 20px",
          background: "#F8F8FB",
          fontFamily: "League Spartan",
          backgroundSize: "100% 100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex" }}>
              <img
                width="100"
                height="100"
                src={`/logo-sm.png`}
                style={{ marginRight: "10px", marginTop: "6px" }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1
                  style={{
                    fontSize: "64px",
                    fontWeight: "800",
                    lineHeight: "none",
                    marginBottom: "6px",
                  }}
                >
                  {title}
                </h1>
                <p style={{ fontSize: "24px", maxWidth: "24rem" }}>
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <img
              width="628"
              height="760"
              src={`/mockups/mockup-1.png`}
              style={{ marginRight: "10px" }}
            />
          </div>
        </div>
      </div>
    ),
    {
      fonts: [
        {
          name: "League Spartan",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
      width: size.width,
      height: size.height,
    }
  );
}
