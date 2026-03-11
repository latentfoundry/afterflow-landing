import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const strawford = localFont({
  variable: "--font-strawford",
  display: "swap",
  src: [
    {
      path: "../public/fonts/strawford-thin-webfont.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/strawford-extralight-webfont.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/strawford-light-webfont.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/strawford-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/strawford-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/strawford-bold-webfont.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/strawford-black-webfont.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Afterflow",
  description:
    "Simulate how customers, employees, regulators, media, and investors may react before you commit to a response.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${strawford.variable} antialiased`}>{children}</body>
    </html>
  );
}
