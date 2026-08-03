import type { Metadata } from "next";

import Footer from "@/src/app/components/Footer";

export const metadata: Metadata = {
  title: "Profile - Paso Libre",
  description:
    "Paso Libre is a bilingual LGBTQ+ community platform in Puerto Rico where members can discover events, connect with others, access wellness resources, and support inclusive initiatives that promote movement, health, and belonging.",
    icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen text-gray-800 bg-white">
      <div className="h-28 bg-[#0d4db0]"></div>
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
