import type { Metadata } from "next";
import { Geist_Mono, Chivo } from "next/font/google";

import { LanguageProvider } from "./context/language";

import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chivo = Chivo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
}); // I like this one

export const metadata: Metadata = {
  title: "Paso Libre",
  description:
    "Paso Libre is a bilingual LGBTQ+ community platform in Puerto Rico where members can discover events, connect with others, access wellness resources, and support inclusive initiatives that promote movement, health, and belonging.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

<script async src="https://www.tiktok.com/embed.js"></script>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistMono.variable} ${chivo.className} antialiased bg-white`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
