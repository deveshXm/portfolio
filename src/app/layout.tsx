import type { Metadata } from "next";
import { Geist_Mono, VT323 } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const vt323Font = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devesh Meena | Software Engineer",
  description: "Software Engineer and AI Engineer specialized in RAG systems and multi-agent AI architectures",
  icons: [
    {
      rel: 'icon',
      url: '/dm-icon.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      url: '/dm-icon.svg',
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} ${vt323Font.variable}`}
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
