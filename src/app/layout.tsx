import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

const pangram = localFont({
  src: [
    {
      path: "./fonts/Pangram-Bold.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pangram-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Loudpot",
  description: "App for people who loves concerts and artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-primary">
      <body className={pangram.className}>{children}</body>
    </html>
  );
}
