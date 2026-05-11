import type { Metadata } from "next";
import {
  bookingUrl,
  ogImagePath,
  requestAccessPath,
  siteDescription,
} from "../lib/site";
import { RequestAccessFormInner } from "../components/request-access-form";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const requestAccessTitle = "Contact | Afterflow";
const requestAccessDescription = `Contact Afterflow. ${siteDescription}`;

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
  const bookingIsExternal = bookingUrl.startsWith("http");

  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 pb-10 pt-6 sm:px-10 lg:px-14">
        <SiteHeader currentPath={requestAccessPath} />

        <section className="flex flex-1 items-center py-12 lg:py-16">
          <div className="w-full">
            <div className="max-w-5xl space-y-7">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
                Contact
              </p>
              <h1 className="text-[clamp(3.5rem,8vw,7.2rem)] font-black leading-[0.88] tracking-[-0.08em]">
                Reach out.
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-black/58 sm:text-2xl sm:leading-10">
                Share one scenario and the outcome you want to test.
              </p>
            </div>

            <div className="mt-12 grid overflow-hidden border border-black/12 bg-black/10 lg:grid-cols-2">
              <RequestAccessFormInner source="contact-page" />

              <a
                href={bookingUrl}
                target={bookingIsExternal ? "_blank" : undefined}
                rel={bookingIsExternal ? "noreferrer" : undefined}
                className="group min-h-[18rem] border-t border-black/10 bg-[#ece8e1] p-8 transition-colors hover:bg-[#f2eee7] sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/38">
                  Schedule a call
                </p>
                <p className="mt-20 text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-4xl">
                  Book a time
                </p>
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
