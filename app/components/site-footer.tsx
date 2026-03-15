import Link from "next/link";
import {
  howItWorksPath,
  privacyPath,
  siteRootPath,
  termsPath,
  useCasesPath,
} from "../lib/site";
import { AfterflowMark } from "./site-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 py-6">
      <div className="flex flex-col gap-4 text-[11px] font-medium uppercase tracking-[0.24em] text-black/38 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={siteRootPath}
            aria-label="Go to Afterflow home"
            className="inline-flex items-center text-black/52 transition-opacity hover:opacity-78"
          >
            <AfterflowMark className="h-4 w-auto" />
          </Link>
          <p>&copy; 2026 Latent Foundry</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4">
          <Link
            href={siteRootPath}
            className="text-black/52 transition-colors hover:text-black"
          >
            Home
          </Link>
          <Link
            href={howItWorksPath}
            className="text-black/52 transition-colors hover:text-black"
          >
            How It Works
          </Link>
          <Link
            href={useCasesPath}
            className="text-black/52 transition-colors hover:text-black"
          >
            Use Cases
          </Link>
          <Link
            href={privacyPath}
            className="text-black/52 transition-colors hover:text-black"
          >
            Privacy
          </Link>
          <Link
            href={termsPath}
            className="text-black/52 transition-colors hover:text-black"
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
