import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ClimaCraft",
  description: "Your trustworthy weather companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
