import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const contentType = "image/png";

export default async function GET(req: NextRequest) {
  const leagueSpartan = await fetch(
    "https://fonts.googleapis.com/css2?family=League+Spartan:wght@100..900&display=swap"
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(req.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Invoices";

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
                  <p tw="text-2xl max-w-96">
                    Work smarter with the invoice app. Streamline your invoicing
                    process with ease.
                  </p>
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
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
