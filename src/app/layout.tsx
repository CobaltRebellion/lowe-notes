import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lowe Notes",
  description: "Basic note site inspired by Google Keep. Made by Braxton Lowe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

