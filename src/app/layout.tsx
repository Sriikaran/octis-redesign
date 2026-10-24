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
  title: "Octis | AI-Powered Jewellery ERP & Jewellery Management Software for Indian Jewellery Retailers",
  description:
    "AI-Powered Jewellery ERP and Jewellery Management Software for Indian Jewellery Retailers. Connect showroom operations, metal traceability, and accounts with Jewellery Business Intelligence and AI Jewellery Software.",
  keywords: [
    "Jewellery Management Software for Indian Jewellery Retailers",
    "AI-Powered Jewellery ERP",
    "AI Jewellery Software",
    "Jewellery Business Intelligence",
    "Jewellery ERP India",
    "Jewellery Billing and Inventory Software",
    "HUID BIS Hallmarking Software",
  ],
  metadataBase: new URL("https://octis.in"),
  alternates: {
    canonical: "https://octis.in",
  },
  openGraph: {
    title: "Octis | AI-Powered Jewellery ERP & Management Software",
    description:
      "Run your entire jewellery business from one powerful ecosystem platform. AI-Powered Jewellery ERP and Jewellery Business Intelligence for Indian retail jewelers.",
    url: "https://octis.in",
    siteName: "Octis",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Octis | AI-Powered Jewellery ERP & Management Software",
    description:
      "AI-Powered Jewellery ERP and Jewellery Business Intelligence for Indian retail jewelers.",
  },
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
