import type { Metadata } from "next";
import { Open_Sans, Rethink_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.productName,
    template: `%s · ${siteConfig.shortTitle}`,
  },
  description: "Company details, trust scores, and reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rethinkSans.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-body-md text-text-black">
        {children}
      </body>
    </html>
  );
}
