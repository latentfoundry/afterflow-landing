"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  howItWorksPath,
  requestAccessPath,
  siteRootPath,
  useCasesPath,
} from "../lib/site";
import { SiteLogo } from "./site-logo";

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
    >
      {open ? (
        <>
          <path d="M7 7 17 17" />
          <path d="M17 7 7 17" />
        </>
      ) : (
        <>
          <path d="M5 7h14" />
          <path d="M5 12h14" />
          <path d="M5 17h14" />
        </>
      )}
    </svg>
  );
}

const menuItems = [
  { href: siteRootPath, label: "Home" },
  { href: howItWorksPath, label: "How It Works" },
  { href: useCasesPath, label: "Use Cases" },
];

function isCurrentPath(currentPath: string | undefined, href: string) {
  if (!currentPath) {
    return false;
  }

  if (href === siteRootPath) {
    return currentPath === href;
  }

  return currentPath.startsWith(href);
}

export function SiteHeader({ currentPath }: { currentPath?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className="flex items-center justify-between border-b border-black/10 pb-4">
        <SiteLogo />
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={requestAccessPath}
            className={`inline-flex min-h-12 items-center rounded-full border px-4 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors ${
              isCurrentPath(currentPath, requestAccessPath)
                ? "border-black bg-black text-white"
                : "border-black/10 text-black/60 hover:border-black/20 hover:text-black"
            }`}
          >
            <span className="hidden sm:inline">Request Access</span>
            <span className="sm:hidden">Access</span>
          </Link>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close site menu" : "Open site menu"}
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls="site-menu-panel"
            onClick={() => setIsMenuOpen((current) => !current)}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-all ${
              isMenuOpen
                ? "border-black bg-black text-white shadow-[0_14px_34px_rgba(0,0,0,0.16)]"
                : "border-black/10 bg-black text-white shadow-[0_14px_34px_rgba(0,0,0,0.14)] hover:bg-black/88"
            }`}
          >
            <MenuIcon open={isMenuOpen} />
          </button>
        </div>
      </header>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Close site menu"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-black/18 backdrop-blur-[2px]"
          />

          <div
            id="site-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-4 top-24 rounded-[30px] border border-black/10 bg-[#f0ece5] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.18)] sm:inset-x-auto sm:right-10 sm:top-20 sm:w-[360px] sm:p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/42">
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
              {menuItems.map((item) => {
                const active = isCurrentPath(currentPath, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex min-h-16 items-center justify-between rounded-[22px] px-5 py-4 transition-colors ${
                      active
                        ? "bg-black text-white"
                        : "bg-[#e7e3dd] text-black/72 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    <span className="text-base font-medium tracking-[-0.03em]">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
