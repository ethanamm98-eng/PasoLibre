import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Paso Libre",
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
    <main className="h-screen overflow-x-hidden bg-white text-gray-800">
      {/* <div className="h-20"></div> */}
      <div>{children}</div>
    </main>
  );
}
