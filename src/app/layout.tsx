import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "なんでBOX",
    template: "%s | なんでBOX"
  },
  description: "子どもたちの「なんで？」を楽しく解き明かす、明るい学びのメディアです。科学、自然、宇宙、動物、からだに関する疑問に分かりやすく答えます。",
  keywords: ["子ども", "教育", "学習", "科学", "なぜ", "疑問", "Q&A"],
  authors: [{ name: "なんでBOX" }],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "なんでBOX",
    title: "なんでBOX",
    description: "子どもたちの「なんで？」を楽しく解き明かす、明るい学びのメディアです。",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "なんでBOX"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "なんでBOX",
    description: "子どもたちの「なんで？」を楽しく解き明かす、明るい学びのメディアです。",
    images: ["/opengraph-image"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSans.className} antialiased bg-gradient-to-b from-blue-50 to-purple-50`}>
        {children}
      </body>
    </html>
  );
}
