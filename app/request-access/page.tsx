import type { Metadata } from "next";
import {
  bookingUrl,
  ogImagePath,
  requestAccessPath,
} from "../lib/site";
import { RequestAccessFormInner } from "../components/request-access-form";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const requestAccessTitle = "Request Access | Afterflow";
const requestAccessDescription =
  "Request access to Afterflow and pressure-test one real operational decision with approved context and evidence-backed paths.";

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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RequestAccessPage() {
  const bookingIsExternal = bookingUrl.startsWith("http");

  return (
    <div className="min-h-screen bg-white text-black">
      <main>
        <div className="px-5 pt-5 sm:px-8 lg:px-12">
          <SiteHeader currentPath={requestAccessPath} />
        </div>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[94rem]">
            <div className="max-w-5xl">
              <p className="text-xs font-medium uppercase text-black/44">
                Contact
              </p>
              <h1 className="mt-5 text-[clamp(3.5rem,7.8vw,8rem)] font-light leading-[0.96]">
                Start with one real scenario.
              </h1>
              <p className="mt-6 max-w-3xl text-xl leading-8 text-black/58">
                Share the decision, the timing, and the outcome you need to
                pressure-test.
              </p>
            </div>

            <div className="mt-14 grid overflow-hidden rounded-[1.8rem] bg-[#f7f6f2] shadow-[0_30px_100px_rgba(0,0,0,0.06)] lg:grid-cols-2">
              <RequestAccessFormInner source="contact-page" />

              <a
                href={bookingUrl}
                target={bookingIsExternal ? "_blank" : undefined}
                rel={bookingIsExternal ? "noreferrer" : undefined}
                className="group min-h-[22rem] border-t border-black/8 bg-white p-8 transition-colors hover:bg-black hover:text-white sm:p-10 lg:border-l lg:border-t-0 lg:p-12"
              >
                <p className="text-xs font-medium uppercase text-black/38 transition-colors group-hover:text-white/46">
                  Schedule a call
                </p>
                <p className="mt-24 text-4xl font-light leading-tight sm:text-5xl">
                  Book a time
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
