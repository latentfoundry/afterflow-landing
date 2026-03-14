import type { Metadata } from "next";
import {
  ogImagePath,
  siteName,
  termsPath,
} from "../lib/site";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const pageTitle = "Terms of Service | Afterflow";
const pageDescription =
  "Terms of Service for Afterflow, including the website and related products and services.";

const lastUpdated = "March 15, 2026";

const sections = [
  {
    title: "Scope",
    body: [
      'These Terms of Service ("Terms") govern your access to and use of Afterflow, including our website, demos, waitlists, pilots, communications, and related products and services (collectively, the "Services").',
      "If you access or use the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.",
      "If a separate order form, pilot agreement, enterprise agreement, or other written contract applies to your use of the Services, that agreement will control to the extent of any conflict.",
    ],
  },
  {
    title: "Eligibility and Acceptable Use",
    body: [
      "You may use the Services only in compliance with applicable law and these Terms. You may not use the Services to violate the rights of others, interfere with the Services, bypass security or access controls, or submit content that you do not have the right to use.",
      "You may not use the Services to develop or distribute unlawful, abusive, fraudulent, or harmful content or workflows, or to upload or connect data in a way that breaches confidentiality, privacy, intellectual property, or contractual obligations.",
      "The Services are intended for business and professional use. You are responsible for your use of the Services and for the acts of anyone who uses the Services through your account, workspace, or organization.",
    ],
  },
  {
    title: "Accounts and Access",
    body: [
      "Some parts of the Services may require registration, invitation, approval, or organization-level access. You must provide accurate information and keep it reasonably up to date.",
      "You are responsible for maintaining the confidentiality of your credentials and for activities that occur under your account or access credentials.",
      "We may suspend, limit, or revoke access if we reasonably believe it is necessary to protect the Services, comply with law, prevent abuse, or address security, legal, or operational risks.",
    ],
  },
  {
    title: "Customer Content",
    body: [
      'You may provide content, data, documents, prompts, links, scenario materials, connected-system data, uploads, and other information through the Services ("Customer Content"). You retain any rights you hold in Customer Content.',
      "You grant Afterflow a limited, non-exclusive right to host, store, use, process, transmit, and display Customer Content as reasonably necessary to provide, secure, maintain, and improve the Services, and to generate requested outputs.",
      "You are responsible for ensuring that you have all rights, permissions, notices, and consents needed for Customer Content and for your use of the Services.",
    ],
  },
  {
    title: "Outputs and AI-Assisted Features",
    body: [
      "The Services may generate simulations, analyses, recommendations, reports, summaries, or other outputs. These outputs are generated using software and AI-assisted systems and may be incomplete, probabilistic, inaccurate, or unsuitable for a particular use case.",
      "You are responsible for reviewing outputs and exercising independent judgment before acting on them. The Services are not a substitute for legal, regulatory, financial, security, or other professional advice, and outputs should not be treated as guarantees, forecasts, or statements of fact.",
      "Except as stated in a separate written agreement, Afterflow does not promise that outputs will be error-free, exhaustive, or fit for a particular purpose.",
    ],
  },
  {
    title: "Afterflow Property",
    body: [
      "Afterflow and its licensors retain all rights, title, and interest in the Services, including software, models, systems, workflows, interfaces, branding, documentation, and all related intellectual property.",
      "Subject to these Terms and any applicable commercial agreement, we grant you a limited, non-exclusive, non-transferable, revocable right to access and use the Services for your internal business purposes.",
      "You may not copy, modify, resell, reverse engineer, decompile, or attempt to discover the underlying source code, models, or systems of the Services except to the extent that restriction is prohibited by law.",
    ],
  },
  {
    title: "Feedback",
    body: [
      "If you provide feedback, suggestions, or ideas about the Services, we may use them without restriction or obligation to you.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "The Services may interoperate with third-party products, APIs, websites, hosting providers, or data sources. Afterflow is not responsible for third-party services or content, and your use of them may be subject to separate terms and privacy policies.",
    ],
  },
  {
    title: "Availability and Changes",
    body: [
      "We may update, modify, suspend, or discontinue all or part of the Services from time to time. Features may change as the Services evolve, including during pilots, previews, or limited-access releases.",
      "We will try to act reasonably, but we do not guarantee uninterrupted availability or that every feature will remain available in its current form.",
    ],
  },
  {
    title: "Fees and Commercial Terms",
    body: [
      "Some parts of the Services may be offered free of charge, while other parts may require payment or a separate commercial agreement. If paid features are made available, additional pricing, billing, and commercial terms may apply.",
    ],
  },
  {
    title: "Termination",
    body: [
      "You may stop using the Services at any time. We may suspend or terminate your access if you materially breach these Terms, create risk for the Services or others, or if continued access is no longer commercially or legally feasible.",
      "Sections of these Terms that by their nature should survive termination will survive, including sections relating to intellectual property, disclaimers, limitations of liability, and any accrued rights or obligations.",
    ],
  },
  {
    title: "Disclaimers",
    body: [
      'To the maximum extent permitted by law, the Services are provided "as is" and "as available." Afterflow disclaims all implied warranties, representations, and guarantees, including warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted availability.',
      "Nothing in these Terms excludes, restricts, or modifies rights or remedies that cannot be excluded under applicable law, including non-excludable rights under consumer protection law.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Afterflow will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, goodwill, data, business opportunity, or anticipated savings arising out of or related to the Services.",
      "To the maximum extent permitted by law, Afterflow's total liability for claims arising out of or relating to the Services will not exceed the amount you paid to Afterflow for the Services giving rise to the claim in the 12 months before the event giving rise to liability, or AUD $100 if you have not paid any such amount.",
      "These limitations apply even if a remedy fails of its essential purpose, but only to the extent permitted by applicable law.",
    ],
  },
  {
    title: "Privacy",
    body: [
      "Our Privacy Policy explains how we collect, use, and handle personal information in connection with the Services.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. If we make a material change, we may provide notice through the Services or by other reasonable means. Continued use of the Services after updated Terms take effect means you accept the updated Terms.",
    ],
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: termsPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: termsPath,
    images: [ogImagePath],
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
    images: [ogImagePath],
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <SiteHeader currentPath={termsPath} />

        <section className="border-b border-black/10 py-16 lg:py-20">
          <div className="max-w-4xl space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              {siteName}
            </p>
            <h1 className="text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
              Terms of Service
            </h1>
            <p className="text-lg leading-8 text-black/60 sm:text-2xl sm:leading-10">
              These Terms govern access to and use of Afterflow, including the
              website, demos, waitlists, pilots, and related products and
              services.
            </p>
            <p className="text-sm uppercase tracking-[0.24em] text-black/38">
              Last updated {lastUpdated}
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Terms
            </p>
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-2xl font-black leading-none tracking-[-0.04em] sm:text-4xl">
                    {section.title}
                  </h2>
                  <div className="space-y-4 text-base leading-8 text-black/62 sm:text-lg">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
