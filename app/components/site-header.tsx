"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  howItWorksPath,
  requestAccessHref,
  siteRootPath,
  useCasesPath,
} from "../lib/site";
import { heroIntroReveal } from "../lib/landing-content";
import { SiteLogo } from "./site-logo";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
    >
      {open ? (
        <>
          <path d="M7 7 17 17" />
          <path d="M17 7 7 17" />
        </>
      ) : (
        <>
          <path d="M5 8h14" />
          <path d="M5 16h14" />
        </>
      )}
    </svg>
  );
}

const menuItems = [
  { href: siteRootPath, label: "Home" },
  { href: howItWorksPath, label: "How it works" },
  { href: useCasesPath, label: "Use cases" },
];

const requestAccessItem = {
  external: true,
  href: requestAccessHref,
  label: "Request Access",
} as const;

function isCurrentPath(currentPath: string | undefined, href: string) {
  if (!currentPath) {
    return false;
  }

  if (href === siteRootPath) {
    return currentPath === href;
  }

  return currentPath.startsWith(href);
}

export function SiteHeader({
  currentPath,
  fixed = false,
}: {
  currentPath?: string;
  fixed?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(
    !fixed || !heroIntroReveal.enabled,
  );

  useEffect(() => {
    if (!fixed || !heroIntroReveal.enabled) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || window.location.hash) {
      const frame = requestAnimationFrame(() => setIntroComplete(true));
      return () => cancelAnimationFrame(frame);
    }

    let revealTimer: number | undefined;

    const showAfterHeroReveal = () => {
      if (revealTimer) {
        window.clearTimeout(revealTimer);
      }

      revealTimer = window.setTimeout(() => {
        setIntroComplete(true);
      }, 3950);
    };

    window.addEventListener(
      "afterflow:hero-intro-started",
      showAfterHeroReveal,
      { once: true },
    );

    const fallbackTimer = window.setTimeout(showAfterHeroReveal, 2600);

    return () => {
      window.removeEventListener(
        "afterflow:hero-intro-started",
        showAfterHeroReveal,
      );
      window.clearTimeout(fallbackTimer);

      if (revealTimer) {
        window.clearTimeout(revealTimer);
      }
    };
  }, [fixed]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${
          fixed ? "fixed inset-x-0 top-0 z-50" : "relative"
        } border-b border-black/8 bg-white/92 text-black backdrop-blur-xl transition duration-700 ${
          fixed && !introComplete
            ? "pointer-events-none -translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div
          className={`flex h-20 items-center justify-between ${
            fixed
              ? "mx-auto max-w-[120rem] px-5 sm:px-8 lg:px-12"
              : "w-full"
          }`}
        >
          <SiteLogo />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-9 text-base text-black/72 md:flex"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-black ${
                  isCurrentPath(currentPath, item.href)
                    ? "text-black"
                    : "text-black/66"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={requestAccessHref}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-12 items-center rounded-full bg-black px-6 text-base font-medium text-white transition-colors hover:bg-black/82 sm:inline-flex"
            >
              Request Access
            </a>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close site menu" : "Open site menu"}
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu-panel"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all md:hidden ${
                isMenuOpen
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white text-black hover:border-black/24"
              }`}
            >
              <MenuIcon open={isMenuOpen} />
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button
            type="button"
            aria-label="Close site menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/24 backdrop-blur-[2px]"
          />

          <div
            id="site-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-4 top-24 rounded-[1.6rem] border border-black/10 bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.18)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase text-black/42">
                Navigate
              </p>
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-black/55 transition-colors hover:border-black/20 hover:text-black"
              >
                <MenuIcon open />
              </button>
            </div>

            <nav aria-label="Site menu" className="mt-4 space-y-2">
              {[...menuItems, requestAccessItem].map(
                (item) => {
                  const active =
                    !("external" in item) &&
                    isCurrentPath(currentPath, item.href);
                  const className = `flex min-h-16 items-center rounded-[1.1rem] px-5 py-4 text-lg transition-colors ${
                    active
                      ? "bg-black text-white"
                      : "bg-[#f7f6f2] text-black/72 hover:bg-black/5 hover:text-black"
                  }`;

                  if ("external" in item) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => setIsMenuOpen(false)}
                        className={className}
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={className}
                    >
                      {item.label}
                    </Link>
                  );
                },
              )}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
