import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Devesh Meena | Applied AI Engineer",
  description: "Applied AI Engineer at Orca AI - Portfolio & Interactive AI Assistant",
  icons: {
    icon: '/ada-icon.svg'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}