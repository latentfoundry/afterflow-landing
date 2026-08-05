"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  bookingUrl,
  howItWorksPath,
  proofPath,
} from "../lib/site";
import { SiteLogo } from "./site-logo";

const menuItems = [
  { href: howItWorksPath, label: "How it works" },
  { href: proofPath, label: "Proof" },
];

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

export function SiteHeader({
  fixed = false,
}: {
  currentPath?: string;
  fixed?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!fixed) {
      return;
    }

    const updateScrollState = () => setHasScrolled(window.scrollY > 12);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
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
    const previousOverflow = document.body.style.overflow;
    document.addEventListener("keydown", handleEscape);
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
        } text-[#11110f] transition-[background-color,border-color,box-shadow] duration-300 ${
          fixed
            ? hasScrolled
              ? "border-b border-black/8 bg-[#f4f0e8]/92 shadow-[0_8px_28px_rgba(17,17,15,0.04)] backdrop-blur-xl"
              : "border-b border-transparent bg-[#f4f0e8]/78 backdrop-blur-md"
            : "border-b border-black/8 bg-white"
        }`}
      >
        <div
          className={`flex h-[4.5rem] items-center justify-between ${
            fixed ? "mx-auto max-w-[100rem] px-5 sm:px-8 lg:px-12" : "w-full"
          }`}
        >
          <SiteLogo />

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-8 text-[0.94rem] text-black/58 md:flex"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden min-h-11 items-center rounded-full bg-[#11110f] px-5 text-sm font-medium text-white transition-colors hover:bg-black/78 sm:inline-flex"
            >
              Book a working session
            </a>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close site menu" : "Open site menu"}
              aria-haspopup="dialog"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu-panel"
              onClick={() => setIsMenuOpen((current) => !current)}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all md:hidden ${
                isMenuOpen
                  ? "border-black bg-black text-white"
                  : "border-black/12 bg-white/62 text-black hover:border-black/24"
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
            className="absolute inset-0 bg-black/28 backdrop-blur-[2px]"
          />
          <div
            id="site-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="absolute inset-x-4 top-4 overflow-hidden rounded-[1.35rem] border border-black/10 bg-[#f4f0e8] shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
          >
            <div className="flex h-[4.5rem] items-center justify-between border-b border-black/8 px-4">
              <SiteLogo />
              <button
                type="button"
                aria-label="Close navigation"
                onClick={() => setIsMenuOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/12 bg-black text-white"
              >
                <MenuIcon open />
              </button>
            </div>
            <nav aria-label="Site menu" className="p-3">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex min-h-16 items-center justify-between border-b border-black/10 px-3 text-xl font-light text-black/72 last:border-b-0"
                >
                  {item.label}
                  <span className="metric text-[0.6rem] text-black/30">
                    0{index + 1}
                  </span>
                </Link>
              ))}
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="mt-3 flex min-h-14 items-center justify-center rounded-full bg-[#11110f] px-6 text-sm font-medium text-white"
              >
                Book a working session
              </a>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
