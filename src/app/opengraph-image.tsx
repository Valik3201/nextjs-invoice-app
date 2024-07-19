import { ImageResponse } from "next/og";

export const runtime = "edge";

export const contentType = "image/png";

export default async function Image({ params }: { params: string[] }) {
  const leagueSpartan = await fetch(
    "https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap"
  ).then((res) => res.arrayBuffer());

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
        tw="h-full w-full flex flex-col align-start justify-center py-10 px-20"
        style={{
          backgroundColor: "#F8F8FB",
          backgroundSize: "100% 100%",
          fontFamily: "League Spartan",
        }}
      >
        <div tw="flex">
          <div tw="flex items-center">
            <div tw="flex">
              <img
                width="100"
                height="100"
                src={`/logo-sm.png`}
                tw="mr-10 mt-6"
              />

              <div tw="flex flex-col">
                <h1 tw="text-8xl font-extrabold tracking-tight leading-none mb-6 whitespace-pre-wrap">
                  {title}
                </h1>
                <p tw="text-2xl max-w-96">{description}</p>
              </div>
            </div>
          </div>

          <div tw="flex">
            <img
              width="628"
              height="760"
              src={`/mockups/mockup-1.png`}
              tw="mr-10"
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "League Spartan",
          data: leagueSpartan,
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
