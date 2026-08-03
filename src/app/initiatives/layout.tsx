import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initiatives - Paso Libre",
  description:
    "Paso Libre is a bilingual LGBTQ+ community platform in Puerto Rico where members can discover events, connect with others, access wellness resources, and support inclusive initiatives that promote movement, health, and belonging.",
  };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen bg-white text-gray-800">
      <div>{children}</div>
    </main>
  );
}
