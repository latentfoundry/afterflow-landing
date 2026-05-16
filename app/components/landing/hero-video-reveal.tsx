"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AfterflowMark } from "../site-logo";
import { heroVideo } from "../../lib/landing-content";
import { requestAccessPath } from "../../lib/site";

const heroVideoBlurDelayMs = 3000;

function HeroVideoSlot({ blurred }: { blurred: boolean }) {
  const mediaClassName = [
    "hero-video-media",
    blurred ? "hero-video-media--blurred" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {heroVideo.src ? (
        <video
          aria-hidden="true"
          className={`h-full w-full object-cover ${mediaClassName}`}
          src={heroVideo.src}
          poster={heroVideo.poster || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : (
        <div
          className={`hero-video-placeholder absolute inset-0 ${mediaClassName}`}
        />
      )}
    </div>
  );
}

export function HeroVideoReveal() {
  const [videoBlurred, setVideoBlurred] = useState(false);

  useEffect(() => {
    const blurTimer = window.setTimeout(() => {
      setVideoBlurred(true);
    }, heroVideoBlurDelayMs);

    return () => window.clearTimeout(blurTimer);
  }, []);

  return (
    <section className="relative min-h-svh bg-white text-white">
      <div className="sticky top-0 h-svh overflow-hidden bg-[#f7f6f2]">
        <div className="hero-reveal-frame absolute overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
          <HeroVideoSlot blurred={videoBlurred} />
          <div className="hero-video-overlay absolute inset-0" />
          <div className="hero-reveal-copy absolute inset-x-6 bottom-[8svh] mx-auto flex max-w-5xl flex-col items-center text-center sm:bottom-[9svh]">
            <div className="inline-flex items-center justify-center gap-2.5 text-white">
              <AfterflowMark className="h-7 w-auto sm:h-8" />
              <span className="text-2xl font-black leading-none sm:text-[1.7rem]">
                Afterflow
              </span>
            </div>
            <h1 className="mt-5 w-full max-w-[21rem] text-[clamp(2.35rem,7vw,7rem)] font-light leading-[0.96] text-white sm:max-w-[84rem]">
              Simulate critical enterprise decisions.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/74 sm:text-xl sm:leading-8">
              Connect context, build a stakeholder graph, and run agent
              simulations that rank likely paths with evidence.
            </p>
            <div className="mt-8 flex w-full max-w-xl flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={requestAccessPath}
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 text-sm font-medium text-black transition hover:bg-white/88"
              >
                Request Access
              </Link>
              <a
                href="#workflow"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/16"
              >
                How it works
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
