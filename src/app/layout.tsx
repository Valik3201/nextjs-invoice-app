import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";
import StoreProvider from "../providers/StoreProvider";
import AuthProvider from "../providers/AuthProvider";
import Navigation from "../components/Navbar/Navigation";
import "./globals.css";
import Footer from "../components/Footer/Footer";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

const ThemeProvider = dynamic(() => import("../context/ThemeContext"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Invoices Dashboard",
  description: "Effortlessly oversee your invoicing processes",
  openGraph: {
    images: [
      {
        url: "https://nextjs-schedule-generator.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Invoice App - Streamline Your Invoicing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "https://nextjs-schedule-generator.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Invoice App - Streamline Your Invoicing",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("__theme__")?.value || "light";

  return (
    <html lang="en" style={theme !== "light" ? { colorScheme: theme } : {}}>
      <body
        className={`${leagueSpartan.className} min-h-svh flex flex-col bg-light text-dark-darkest dark:bg-dark dark:text-white`}
      >
        <StoreProvider>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme={theme} enableSystem>
              <Navigation />
              <main className="container mx-auto pt-[72px] md:pt-20 lg:pt-0 w-[327px] md:w-[672px] lg:w-[730px] my-8 md:my-[61px] lg:my-[78px]">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
