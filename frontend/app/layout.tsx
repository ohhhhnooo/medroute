import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MedRoute — AI Emergency Call Routing",
  description: "AI-assisted emergency medical dispatch system for ambulance stations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${dmSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
