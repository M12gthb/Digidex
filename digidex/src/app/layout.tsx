import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MyMetadata extends Metadata {
  title: string;
  description: string;
  icons: {
    icon: string;
  };
}

export const metadata: MyMetadata = {
  title: "Digidex",
  description: "Digidex feita com Api de digimon",
  icons: {
    icon: "/Digivice_tri.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={metadata.icons.icon} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-zinc-800">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
