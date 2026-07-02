import type { Metadata } from "next";
import { bookingUrl, ogImagePath } from "../lib/site";
import { RequestAccessRedirect } from "./request-access-redirect";

const requestAccessTitle = "Request Access | Afterflow";
const requestAccessDescription =
  "Book time with Afterflow to pressure-test one real operational decision with approved context and evidence-backed paths.";

export const metadata: Metadata = {
  title: requestAccessTitle,
  description: requestAccessDescription,
  alternates: {
    canonical: bookingUrl,
  },
  openGraph: {
    title: requestAccessTitle,
    description: requestAccessDescription,
    url: bookingUrl,
    images: [ogImagePath],
  },
  twitter: {
    title: requestAccessTitle,
    description: requestAccessDescription,
    images: [ogImagePath],
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RequestAccessPage() {
  return <RequestAccessRedirect bookingUrl={bookingUrl} />;
}
