import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Paso Libre",
  description:
    "Paso Libre is a bilingual LGBTQ+ community platform in Puerto Rico where members can discover events, connect with others, access wellness resources, and support inclusive initiatives that promote movement, health, and belonging.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen overflow-x-hidden text-gray-800">
      <div className="h-28 bg-[#0d4db0]"></div>
      <div>{children}</div>
    </main>
  );
}
