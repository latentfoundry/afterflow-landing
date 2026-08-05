import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  basePath,
  companyLegalName,
  contactEmail,
  logoUrl,
  ogImagePath,
  siteDescription,
  siteName,
  siteOrigin,
  siteRootUrl,
  siteTitle,
} from "./lib/site";
import {
  bingSiteVerification,
  googleSiteVerification,
} from "./lib/seo";
import "./globals.css";

const strawford = localFont({
  variable: "--font-strawford",
  display: "swap",
  src: [
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
  ],
});

const socialImageAlt =
  "Afterflow simulates how enterprise AI rollouts affect an organisation before launch.";

const verification =
  googleSiteVerification || bingSiteVerification
    ? {
        ...(googleSiteVerification
          ? { google: googleSiteVerification }
          : {}),
        ...(bingSiteVerification
          ? { other: { "msvalidate.01": bingSiteVerification } }
          : {}),
      }
    : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  applicationName: siteName,
  title: siteTitle,
  description: siteDescription,
  category: "technology",
  creator: siteName,
  publisher: siteName,
  authors: [{ name: siteName, url: siteRootUrl }],
  verification,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    siteName,
    locale: "en_US",
    url: siteRootUrl,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: socialImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [{ url: ogImagePath, alt: socialImageAlt }],
  },
  icons: {
    icon: [
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
      {
        url: `${basePath}/favicon/favicon.ico`,
        sizes: "any",
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
    "msapplication-TileColor": "#f4f0e8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationId = `${siteRootUrl}#organization`;
  const websiteId = `${siteRootUrl}#website`;
  const webpageId = `${siteRootUrl}#webpage`;
  const serviceId = `${siteRootUrl}#service`;
  const logoId = `${siteRootUrl}#logo`;
  const socialImageUrl = new URL(ogImagePath, siteOrigin).toString();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": logoId,
        "@type": "ImageObject",
        url: logoUrl,
        contentUrl: logoUrl,
        width: 500,
        height: 500,
        caption: siteName,
      },
      {
        "@id": organizationId,
        "@type": "Organization",
        name: siteName,
        legalName: companyLegalName,
        url: siteRootUrl,
        description: siteDescription,
        email: contactEmail,
        logo: {
          "@id": logoId,
        },
      },
      {
        "@id": websiteId,
        "@type": "WebSite",
        name: siteName,
        url: siteRootUrl,
        description: siteDescription,
        inLanguage: "en",
        publisher: {
          "@id": organizationId,
        },
      },
      {
        "@id": serviceId,
        "@type": "Service",
        name: "Afterflow enterprise AI rollout simulation",
        serviceType: "Enterprise AI rollout simulation",
        url: siteRootUrl,
        description: siteDescription,
        provider: {
          "@id": organizationId,
        },
      },
      {
        "@id": webpageId,
        "@type": "WebPage",
        name: siteTitle,
        url: siteRootUrl,
        description: siteDescription,
        inLanguage: "en",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": serviceId,
        },
        mainEntity: {
          "@id": serviceId,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: socialImageUrl,
          width: 1200,
          height: 630,
          caption: socialImageAlt,
        },
      },
    ],
  };

  return (
    <html lang="en">
      <body className={`${strawford.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
