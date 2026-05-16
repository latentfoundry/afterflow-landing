"use client";

import { useState } from "react";
import { useCaseStudies } from "../../lib/landing-content";

const scenarioBranches = [
  {
    path: "Proceed",
    score: "72%",
    signal: "Support queue likely exceeds week-one capacity",
  },
  {
    path: "Phase",
    score: "48%",
    signal: "Vendor handoff is the gating dependency",
  },
  {
    path: "Pause",
    score: "61%",
    signal: "Rollback owner must be assigned before launch",
  },
];

function UseCaseVisual() {
  return (
    <div
      data-nosnippet
      className="relative flex min-h-[30rem] items-center overflow-hidden rounded-[1.8rem] bg-[#15120f] p-5 text-white sm:p-8 lg:min-h-[38rem]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_20%,rgba(214,190,148,0.22),transparent_24%),radial-gradient(circle_at_86%_66%,rgba(118,156,140,0.22),transparent_26%),linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.76))]" />
      <video
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
        src="/video/afterflow.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-black/34" />

      <div className="relative z-10 w-full rounded-[1.4rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-white/46">
              Scenario map
            </p>
            <h3 className="mt-2 text-2xl font-light leading-tight">
              Weekend cohort migration
            </h3>
          </div>
          <div className="hidden shrink-0 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-medium uppercase text-white/62 sm:block">
            Exposure
          </div>
        </div>

        <div className="mt-5 hidden grid-cols-[5.2rem_minmax(0,1fr)_3.6rem] px-4 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-white/42 sm:grid">
          <span>Option</span>
          <span>Flagged dependency</span>
          <span>Exposure</span>
        </div>

        <div className="mt-3 grid gap-2.5">
          {scenarioBranches.map((branch, index) => (
            <div
              key={branch.path}
              className="use-case-visual-row grid gap-3 rounded-[1rem] bg-white/10 px-4 py-3 text-sm text-white/76 sm:grid-cols-[5.2rem_minmax(0,1fr)_3.6rem] sm:items-center"
              style={{ animationDelay: `${index * 180}ms` }}
            >
              <span className="font-medium text-white">{branch.path}</span>
              <span>{branch.signal}</span>
              <span className="font-medium text-white">{branch.score}</span>
              <span className="inline-flex h-2 overflow-hidden rounded-full bg-white/16 sm:col-span-3">
                <span
                  className="block h-full rounded-full bg-white/72"
                  style={{ width: branch.score }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CarouselIcon({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.6"
    >
      {direction === "previous" ? (
        <path d="m15 6-6 6 6 6" />
      ) : (
        <path d="m9 6 6 6-6 6" />
      )}
    </svg>
  );
}

function UseCaseCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = useCaseStudies.length - 1;

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? lastIndex : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === lastIndex ? 0 : current + 1));
  };

  return (
    <div className="relative flex min-h-[30rem] flex-col overflow-hidden rounded-[1.8rem] bg-[#f7f6f2] p-7 text-black sm:p-8 lg:min-h-[38rem]">
      <div className="flex justify-end">
        <span className="rounded-full border border-black/10 px-3 py-1.5 text-sm text-black/44">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(useCaseStudies.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-10 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {useCaseStudies.map((study, studyIndex) => (
            <article
              key={study.title}
              aria-hidden={activeIndex !== studyIndex}
              className="min-w-full pr-1"
            >
              <h3 className="max-w-4xl text-[clamp(1.75rem,3.35vw,3.35rem)] font-light leading-[1.08]">
                {study.title}
              </h3>
              <p className="mt-5 max-w-3xl text-lg leading-7 text-black/54">
                {study.description}
              </p>
              <ul className="mt-8 divide-y divide-black/10 border-y border-black/10">
                {study.examples.map((example, index) => (
                  <li
                    key={example}
                    className="flex items-center justify-between gap-6 py-4 text-lg text-black/68"
                  >
                    <span>{example}</span>
                    <span className="text-sm text-black/34">0{index + 1}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-5 pt-6">
        <div className="flex gap-2">
          {useCaseStudies.map((study, index) => (
            <button
              key={study.title}
              type="button"
              aria-label={`Show ${study.title}`}
              aria-current={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-9 bg-black" : "w-2.5 bg-black/18"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous scenario class"
            onClick={goToPrevious}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 text-black transition hover:bg-black hover:text-white"
          >
            <CarouselIcon direction="previous" />
          </button>
          <button
            type="button"
            aria-label="Next scenario class"
            onClick={goToNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white transition hover:bg-black/82"
          >
            <CarouselIcon direction="next" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function UseCaseStudy() {
  return (
    <section
      id="use-cases"
      className="scroll-mt-24 bg-black px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[94rem]">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase text-white/42">
              Use cases
            </p>
            <h2 className="mt-5 max-w-5xl text-[clamp(2.8rem,5.2vw,5.8rem)] font-light leading-[1.04]">
              Scenario classes Afterflow can simulate.
            </h2>
          </div>
        </div>

        <div className="mt-14 grid items-stretch gap-7 lg:grid-cols-[0.9fr_1.45fr]">
          <UseCaseVisual />
          <UseCaseCarousel />
        </div>
      </div>
    </section>
  );
}
