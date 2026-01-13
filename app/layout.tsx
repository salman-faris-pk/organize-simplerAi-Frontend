import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "EXTR∆CT∆ - platform for extract pdf..";
const description =
  "Organize Simple is a web application that helps you to extract organzied data from unorganized text.";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/logo-org.png',
    apple: '/logo-org.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-amber-50/20 `}
      >
        {children}
        <Toaster position="top-right"/>
      </body>
    </html>
  );
}
