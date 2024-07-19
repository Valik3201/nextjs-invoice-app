import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

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
      : "Default title";

    return new ImageResponse(
      (
        <div
          tw="h-full w-full flex flex-col align-start justify-center py-10 px-20"
          style={{
            backgroundImage:
              "url(https://cruip-tutorials-next.vercel.app/social-card-bg.jpg)",
            backgroundSize: "100% 100%",
            fontFamily: "Inter",
          }}
        >
          <div tw="text-6xl font-extrabold text-white tracking-tight leading-none mb-6 whitespace-pre-wrap">
            {title}
          </div>
          <img
            width="203"
            height="44"
            src={`https://cruip-tutorials-next.vercel.app/author.png`}
          />
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
