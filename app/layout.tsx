import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "ja"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WAOJE Dubai | グローバル起業家ネットワーク",
  description: "中東の中心地で新しいビジネスチャンスを創造する日本の起業家コミュニティ。ドバイにおけるビジネスパートナーシップとネットワーキング。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/waoje-favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
