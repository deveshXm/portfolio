import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Devesh Meena | Software Engineer",
  description: "Software Engineer and AI Engineer specialized in RAG systems and multi-agent AI architectures",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable}`}
        style={{ 
          margin: 0, 
          padding: 0,
          imageRendering: "pixelated",
          overflow: "auto"
        }}
      >
        {children}
      </body>
    </html>
  );
}
