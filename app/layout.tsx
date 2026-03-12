import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  basePath,
  logoUrl,
  ogImagePath,
  siteDescription,
  siteName,
  siteOrigin,
  siteRootPath,
  siteRootUrl,
  siteTitle,
} from "./lib/site";
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
  metadataBase: new URL(siteOrigin),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteRootPath,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName,
    url: siteRootPath,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Afterflow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImagePath],
  },
  icons: {
    icon: [
      {
        url: `${basePath}/favicon/favicon.ico`,
        sizes: "any",
      },
      {
        url: `${basePath}/favicon/favicon-96x96.png`,
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: `${basePath}/favicon/favicon-32x32.png`,
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: `${basePath}/favicon/favicon-16x16.png`,
        type: "image/png",
        sizes: "16x16",
      },
    ],
    shortcut: `${basePath}/favicon/favicon.ico`,
    apple: [
      {
        url: `${basePath}/favicon/apple-icon.png`,
      },
      {
        url: `${basePath}/favicon/apple-icon-180x180.png`,
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  manifest: `${basePath}/favicon/manifest.json`,
  other: {
    "msapplication-config": `${basePath}/favicon/browserconfig.xml`,
    "msapplication-TileColor": "#ffffff",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteName,
      url: siteRootUrl,
      logo: logoUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteName,
      url: siteRootUrl,
      description: siteDescription,
    },
  ];

  return (
    <html lang="en">
      <body className={`${strawford.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
