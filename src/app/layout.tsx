import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "なんでBOX",
  description: "microCMSベースで運用できる子ども向けのQ&Aメディア"
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
