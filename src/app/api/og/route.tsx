import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "My website";

    const hasDescription = searchParams.has("description");
    const description = hasDescription
      ? searchParams.get("description")?.slice(0, 100)
      : "My website";

    const leagueSpartanExtraBold = await fetch(
      new URL(
        "../../../../public/fonts/LeagueSpartan-ExtraBold.ttf",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-[#F8F8FB] flex w-full h-full">
            <div tw="flex flex-col md:flex-row w-full md:items-center justify-between p-20">
              <div tw="flex flex-col">
                <h1 tw="text-[#141625] text-3xl sm:text-5xl tracking-tight text-left">
                  {title}
                </h1>
                <h2 tw="text-[#7C5DFA] text-2xl sm:text-3xl tracking-tight text-left">
                  {description}
                </h2>
              </div>

              <div tw="mt-8 flex md:mt-0">
                <a tw="flex items-center justify-center rounded-full border border-transparent bg-[#7C5DFA] px-8 py-5 text-2xl text-white">
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "League Spartan",
            data: leagueSpartanExtraBold,
            style: "normal",
            weight: 800,
          },
        ],
      }
    );
  } catch (e: any) {
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
