import type { Metadata } from "next";
import { FinalCta } from "./components/landing/final-cta";
import { Hero } from "./components/landing/hero";
import { LandingMotion } from "./components/landing/landing-motion";
import { ProblemSection } from "./components/landing/problem-section";
import { ProductLoop } from "./components/landing/product-loop";
import { ProofSection } from "./components/landing/proof-section";
import { PropagationSection } from "./components/landing/propagation-section";
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
    <div id="top" className="min-h-screen bg-[#f4f0e8] text-[#11110f]">
      <LandingMotion />
      <SiteHeader currentPath={siteRootPath} fixed />

      <main>
        <Hero />
        <ProblemSection />
        <ProductLoop />
        <PropagationSection />
        <ProofSection />
        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  );
}
