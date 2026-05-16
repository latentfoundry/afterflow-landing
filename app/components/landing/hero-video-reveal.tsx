"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AfterflowMark } from "../site-logo";
import { heroVideo } from "../../lib/landing-content";
import { requestAccessPath } from "../../lib/site";

const heroVideoBlurDelayMs = 3000;
const heroRevealStartDelayMs = 320;

function getMediaClassName({
  blurred,
  visible,
}: {
  blurred: boolean;
  visible: boolean;
}) {
  return [
    "hero-video-media",
    visible ? "hero-video-media--visible" : "",
    blurred ? "hero-video-media--blurred" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function HeroVideoSlot({
  blurred,
  visible,
  onReady,
}: {
  blurred: boolean;
  visible: boolean;
  onReady: () => void;
}) {
  const mediaClassName = getMediaClassName({ blurred, visible });
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !heroVideo.src) {
      return;
    }

    const rewind = () => {
      video.pause();

      if (video.readyState >= video.HAVE_METADATA) {
        try {
          video.currentTime = 0;
        } catch {
          // Some browsers delay seeking until enough metadata is available.
        }
      }
    };

    const revealFromStart = () => {
      if (
        hasStartedRef.current ||
        video.readyState < video.HAVE_CURRENT_DATA
      ) {
        return;
      }

      hasStartedRef.current = true;
      rewind();

      window.requestAnimationFrame(() => {
        void video.play().catch(() => undefined);
        onReady();
      });
    };

    const handleError = () => {
      if (hasStartedRef.current) {
        return;
      }

      hasStartedRef.current = true;
      onReady();
    };

    video.addEventListener("loadedmetadata", rewind);
    video.addEventListener("loadeddata", revealFromStart);
    video.addEventListener("canplay", revealFromStart);
    video.addEventListener("canplaythrough", revealFromStart);
    video.addEventListener("error", handleError);

    rewind();
    revealFromStart();

    if (video.readyState === video.HAVE_NOTHING) {
      video.load();
    }

    return () => {
      video.removeEventListener("loadedmetadata", rewind);
      video.removeEventListener("loadeddata", revealFromStart);
      video.removeEventListener("canplay", revealFromStart);
      video.removeEventListener("canplaythrough", revealFromStart);
      video.removeEventListener("error", handleError);
    };
  }, [onReady]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {heroVideo.src ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          className={`h-full w-full object-cover ${mediaClassName}`}
          src={heroVideo.src}
          poster={heroVideo.poster || undefined}
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <div
          className={`hero-video-placeholder absolute inset-0 ${getMediaClassName(
            { blurred, visible: true },
          )}`}
        />
      )}
    </div>
  );
}

export function HeroVideoReveal() {
  const [videoReady, setVideoReady] = useState(!heroVideo.src);
  const [introStarted, setIntroStarted] = useState(!heroVideo.src);
  const [videoBlurred, setVideoBlurred] = useState(false);
  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    if (!videoReady) {
      return;
    }

    const startTimer = window.setTimeout(() => {
      setIntroStarted(true);
    }, heroRevealStartDelayMs);

    return () => window.clearTimeout(startTimer);
  }, [videoReady]);

  useEffect(() => {
    if (!introStarted) {
      return;
    }

    window.dispatchEvent(new Event("afterflow:hero-intro-started"));

    const blurTimer = window.setTimeout(() => {
      setVideoBlurred(true);
    }, heroVideoBlurDelayMs);

    return () => window.clearTimeout(blurTimer);
  }, [introStarted]);

  return (
    <section
      className={`hero-intro relative min-h-svh bg-white text-white ${
        introStarted ? "hero-intro--started" : ""
      }`}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-[#f7f6f2]">
        <div className="hero-reveal-frame absolute overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
          <HeroVideoSlot
            blurred={videoBlurred}
            visible={videoReady}
            onReady={handleVideoReady}
          />
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
