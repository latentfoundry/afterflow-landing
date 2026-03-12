import type { Metadata } from "next";
import Link from "next/link";
import { RequestAccessFormInner } from "../components/request-access-form";
import {
  ogImagePath,
  requestAccessPath,
  siteDescription,
} from "../lib/site";
import { SiteLogo } from "../components/site-logo";

const requestAccessTitle = "Enterprise Access | Afterflow";
const requestAccessDescription = `Request enterprise access to Afterflow. ${siteDescription}`;

export const metadata: Metadata = {
  title: requestAccessTitle,
  description: requestAccessDescription,
  alternates: {
    canonical: requestAccessPath,
  },
  openGraph: {
    title: requestAccessTitle,
    description: requestAccessDescription,
    url: requestAccessPath,
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
  },
};

export default function RequestAccessPage() {
  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-14">
        <header className="flex items-center justify-between border-b border-black/10 pb-4">
          <SiteLogo />
          <Link
            href="/"
            className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/55 transition-colors hover:text-black"
          >
            Back
          </Link>
        </header>

        <section className="flex flex-1 items-start py-6 sm:py-8 lg:items-center lg:py-10">
          <RequestAccessFormInner source="request-access-page" />
        </section>
      </main>
    </div>
  );
}
