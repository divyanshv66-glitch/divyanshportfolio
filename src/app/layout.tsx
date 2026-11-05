import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });

const title = `${siteConfig.name} — ${siteConfig.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    title,
    description: siteConfig.description,
    url: "/",
    siteName: siteConfig.name,
    images: [{ url: siteConfig.showreel.poster, width: 1920, height: 1080, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description: siteConfig.description },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Without JS, show content that would otherwise wait for scroll reveal. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://videos.pexels.com" />
      </head>
      <body>{children}</body>
    </html>
  );
}
