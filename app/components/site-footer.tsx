import Link from "next/link";
import {
  bookingUrl,
  companyLegalName,
  howItWorksPath,
  privacyPath,
  proofPath,
  siteRootPath,
  termsPath,
} from "../lib/site";
import { AfterflowMark } from "./site-logo";

const primaryLinks = [
  { href: howItWorksPath, label: "How it works" },
  { href: proofPath, label: "Proof" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/12 bg-[#11110f] px-5 py-14 text-white sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-[94rem]">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href={siteRootPath}
              aria-label="Go to Afterflow home"
              className="inline-flex items-center gap-2.5 text-white transition-opacity hover:opacity-78"
            >
              <AfterflowMark className="h-7 w-auto" />
              <span className="text-2xl font-medium leading-none">Afterflow</span>
            </Link>
            <p className="mt-5 max-w-[32rem] text-lg font-light leading-7 text-white/54">
              Simulate operational change before you commit.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-4 text-sm text-white/56 lg:justify-end">
            {primaryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white"
            >
              Book a working session
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/12 pt-6 text-xs text-white/32 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {companyLegalName} All rights reserved.</p>
          <div className="flex gap-6">
            <Link href={privacyPath} className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href={termsPath} className="transition-colors hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
