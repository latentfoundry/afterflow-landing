import Link from "next/link";
import {
  companyLegalName,
  howItWorksPath,
  privacyPath,
  requestAccessHref,
  siteRootPath,
  termsPath,
} from "../lib/site";
import { AfterflowMark } from "./site-logo";

const primaryLinks = [
  { href: siteRootPath, label: "Home" },
  { href: howItWorksPath, label: "How It Works" },
  { external: true, href: requestAccessHref, label: "Contact" },
];

const legalLinks = [
  { href: termsPath, label: "Terms" },
  { href: privacyPath, label: "Privacy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_34rem]">
          <div>
            <Link
              href={siteRootPath}
              aria-label="Go to Afterflow home"
              className="inline-flex items-center gap-3 text-white transition-opacity hover:opacity-78"
            >
              <AfterflowMark className="h-10 w-auto" />
              <span className="text-4xl font-medium leading-none">
                Afterflow
              </span>
            </Link>

            <p className="mt-12 max-w-lg text-3xl font-light leading-tight text-white">
              Dry-run critical decisions before you make them.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <div className="flex flex-col gap-5 text-xl sm:flex-row sm:items-center sm:gap-10 lg:justify-end">
              {primaryLinks.map((item) => (
                "external" in item ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-white/82 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-white/82 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-24 border-t border-white/18 pt-8">
          <div className="flex flex-col gap-6 text-sm text-white/48 lg:flex-row lg:items-center lg:justify-between">
            <p>&copy; 2026 {companyLegalName} All rights reserved.</p>
            <div className="flex gap-6">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
