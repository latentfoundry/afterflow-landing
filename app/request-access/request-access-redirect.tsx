"use client";

import { useEffect } from "react";

export function RequestAccessRedirect({ bookingUrl }: { bookingUrl: string }) {
  useEffect(() => {
    window.location.replace(bookingUrl);
  }, [bookingUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-5 text-center text-black sm:px-8">
      <div className="max-w-md">
        <p className="text-xs font-medium uppercase text-black/40">
          Redirecting
        </p>
        <h1 className="mt-4 text-4xl font-light leading-tight">
          Opening Calendly.
        </h1>
        <p className="mt-4 text-base leading-7 text-black/56">
          If it does not open automatically, use the booking link below.
        </p>
        <a
          href={bookingUrl}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-medium text-white transition hover:bg-black/82"
        >
          Open Calendly
        </a>
      </div>
    </main>
  );
}
