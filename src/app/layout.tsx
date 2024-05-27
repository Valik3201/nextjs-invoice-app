import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import Navigation from "../components/Navigation";
import StoreProvider from "../store/StoreProvider";
import AuthProvider from "../store/AuthProvider";
import "./globals.css";

const leagueSpartan = League_Spartan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Invoices Dashboard",
  description: "Effortlessly oversee your invoicing processes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${leagueSpartan.className} bg-light text-dark-darkest dark:bg-dark dark:text-white`}
      >
        <StoreProvider>
          <AuthProvider>
            <Navigation />
            {children}
          </AuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
