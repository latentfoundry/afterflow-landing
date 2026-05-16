import type { Metadata } from "next";
import { DecisionQuestions } from "./components/landing/decision-questions";
import { FinalCta } from "./components/landing/final-cta";
import { HeroVideoReveal } from "./components/landing/hero-video-reveal";
import { UseCaseStudy } from "./components/landing/use-case-study";
import { WorkflowShowcase } from "./components/landing/workflow-showcase";
import { SmoothScroll } from "./components/smooth-scroll";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { siteRootPath } from "./lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: siteRootPath,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-black">
      <SmoothScroll />
      <SiteHeader currentPath={siteRootPath} fixed />

      <main>
        <HeroVideoReveal />
        <DecisionQuestions />
        <WorkflowShowcase />
        <UseCaseStudy />
        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  );
}
