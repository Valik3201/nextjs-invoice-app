import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import { AuthContextProvider } from "../context/AuthContext";
import Navigation from "../components/Navigation";
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
      <body className={leagueSpartan.className}>
        <AuthContextProvider>
          <Navigation />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
