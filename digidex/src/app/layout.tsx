import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Digidex",
  description: "Digidex feita com Api de digimon",
  icons: "../public/Digivice_tri.webp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-zinc-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
