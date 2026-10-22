import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Octis | Jewellery Shop Management Software for India",
  description:
    "The all-in-one cloud platform for Indian jewelers. Manage billing, inventory, HUID compliance, and customer loyalty — beautifully and effortlessly.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen font-sans text-foreground antialiased selection:bg-gold-300 selection:text-[#1a0c08]">
        {children}
      </body>
    </html>
  );
}
