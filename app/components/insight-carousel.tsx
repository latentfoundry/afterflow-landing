"use client";

import { useEffect, useEffectEvent, useState } from "react";

type InsightItem = {
  title: string;
  body: string;
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      {direction === "left" ? (
        <path d="m14.5 6.5-5 5.5 5 5.5" />
      ) : (
        <path d="m9.5 6.5 5 5.5-5 5.5" />
      )}
    </svg>
  );
}

export function InsightCarousel({
  items,
  label = "Scenario Shift",
}: {
  items: InsightItem[];
  label?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const moveBy = useEffectEvent((direction: number) => {
    setActiveIndex((current) => {
      const next = current + direction;

      if (next < 0) {
        return items.length - 1;
      }

      return next % items.length;
    });
  });

  useEffect(() => {
    const timer = window.setInterval(() => {
      moveBy(1);
    }, 4200);

    return () => {
      window.clearInterval(timer);
    };
  }, [moveBy]);

  const activeItem = items[activeIndex];

  return (
    <div className="relative overflow-hidden border border-white/10 bg-black px-6 py-6 text-[#f3efe8] shadow-[0_24px_60px_rgba(0,0,0,0.14)] sm:px-8 sm:py-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(241,202,123,0.16),transparent_24%),radial-gradient(circle_at_78%_26%,rgba(115,176,255,0.14),transparent_26%),radial-gradient(circle_at_56%_82%,rgba(172,106,214,0.16),transparent_22%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative space-y-5 sm:space-y-6">
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/42">
            {label}
          </p>
          <div className="h-px flex-1 bg-white/10" />
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/28">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
        </div>

        <div className="min-h-[8.25rem] sm:min-h-[9rem]">
          <p className="text-3xl font-black leading-none tracking-[-0.05em] text-white sm:text-4xl">
            {activeItem.title}
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
            {activeItem.body}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {items.map((item, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={item.title}
                  type="button"
                  aria-label={`Show insight ${index + 1}: ${item.title}`}
                  aria-pressed={active}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    active ? "w-10 bg-white" : "w-2.5 bg-white/22 hover:bg-white/38"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              aria-label="Show previous insight"
              onClick={() => moveBy(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/66 transition-colors hover:border-white/18 hover:text-white"
            >
              <ArrowIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Show next insight"
              onClick={() => moveBy(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/66 transition-colors hover:border-white/18 hover:text-white"
            >
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
