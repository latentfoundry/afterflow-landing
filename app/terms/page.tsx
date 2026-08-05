import type { Metadata } from "next";
import {
  companyLegalName,
  contactEmail,
  ogImagePath,
  termsPath,
} from "../lib/site";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const pageTitle = "Terms of Service | Afterflow";
const pageDescription =
  `Terms of Service for ${companyLegalName} and Afterflow, including the website and related products and services.`;

const lastUpdated = "May 11, 2026";

const sections = [
  {
    title: "Scope",
    body: [
      `These Terms of Service ("Terms") govern your access to and use of Afterflow, including our website, request forms, demos, evaluations, communications, and related products and services (collectively, the "Services"). The Services are owned and operated by ${companyLegalName}, doing business as Afterflow.`,
      "If you access or use the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.",
      "If a separate order form, evaluation agreement, enterprise agreement, data-processing agreement, or other written contract applies to your use of the Services, that agreement will control to the extent of any conflict.",
    ],
  },
  {
    title: "Service Description",
    body: [
      "Afterflow helps organizations dry-run high-stakes operational decisions before execution. The Services may help structure approved context, build world models and stakeholder maps, run decision simulations, compare branches, and surface evidence-backed paths, assumptions, leading indicators, simulated actions, and mitigations.",
      "The Services are intended for bounded scenarios with a real decision, a decision owner, an approved data boundary, and a defined time window. They are not intended for generic research tasks or decisions with no meaningful operational consequence.",
      "Specific features, integrations, deployment models, processing locations, and security controls may vary by plan, configuration, customer environment, and any separate written agreement.",
    ],
  },
  {
    title: "Accounts and Access",
    body: [
      "Some parts of the Services may require registration, invitation, approval, or organization-level access. You must provide accurate information and keep it reasonably up to date.",
      "You are responsible for maintaining the confidentiality of credentials and for activity that occurs under your account, workspace, or organization.",
      "We may suspend, limit, or revoke access if we reasonably believe it is necessary to protect the Services, comply with law, prevent abuse, or address security, legal, or operational risk.",
    ],
  },
  {
    title: "Customer Content and Data Boundary",
    body: [
      'You may provide or authorize content, data, documents, links, scenario materials, connected-system data, uploads, and other information through the Services ("Customer Content"). You retain any rights you hold in Customer Content.',
      `You grant ${companyLegalName} a limited, non-exclusive right to host, store, use, process, transmit, and display Customer Content as reasonably necessary to provide, secure, maintain, troubleshoot, and support the Services, and to generate requested outputs.`,
      "You are responsible for approving the internal and external sources in scope for each scenario. You must not submit, connect, or expose Customer Content unless you have the rights, permissions, notices, and consents needed to do so.",
    ],
  },
  {
    title: "Connectors and Third-Party Services",
    body: [
      "The Services may interoperate with third-party products, APIs, websites, hosting providers, model or AI service providers, enterprise systems, repositories, databases, or data sources.",
      "Connector-based use is intended to be read-only unless a separate written agreement expressly says otherwise. The Services are not intended to execute production changes, write back to customer systems, or automate operational actions unless separately agreed in writing.",
      `${companyLegalName} is not responsible for third-party services or content, and your use of them may be subject to separate terms, permissions, and privacy policies.`,
    ],
  },
  {
    title: "Customer Responsibilities",
    body: [
      "You are responsible for the accuracy, completeness, legality, and currency of Customer Content, including internal documents, policies, system records, external sources, and connected-system data made available through the Services.",
      "You are responsible for configuring access permissions, connector scopes, approved users, administrators, and source boundaries in a way that is appropriate for your organization.",
      "You are responsible for reviewing outputs and deciding whether and how to act on them. Afterflow provides decision-support software; it does not replace your organization's review, sign-off, governance, compliance, security, or operational processes.",
    ],
  },
  {
    title: "Outputs and AI-Assisted Features",
    body: [
      "The Services may generate simulations, analyses, reports, summaries, ranked paths, evidence, assumptions, leading indicators, simulated actions, mitigations, comparisons, or other outputs. These outputs may be incomplete, probabilistic, inaccurate, outdated, or unsuitable for a particular use case.",
      "Outputs depend on Customer Content, scenario scope, assumptions, connected sources, configuration, model behavior, and other inputs. If Customer Content is incomplete, outdated, contradictory, or inaccurate, outputs may reflect those limitations.",
      "The Services do not predict the exact future and do not guarantee that a decision, rollout, migration, policy change, incident response, or other operational action will succeed or comply with law.",
      "You are responsible for reviewing outputs and exercising independent judgment before acting on them. The Services are not a substitute for legal, regulatory, financial, security, compliance, operational, or other professional advice.",
      `Except as stated in a separate written agreement, ${companyLegalName} does not promise that outputs will be error-free, exhaustive, or fit for a particular purpose.`,
    ],
  },
  {
    title: "Acceptable Use",
    body: [
      "You may use the Services only in compliance with applicable law and these Terms. You may not use the Services to violate rights, bypass security or access controls, interfere with the Services, or submit content that you do not have the right to use.",
      "You may not use the Services to develop or distribute unlawful, abusive, fraudulent, deceptive, or harmful content or workflows, or to upload or connect data in a way that breaches confidentiality, privacy, intellectual property, employment, security, or contractual obligations.",
      "The Services are intended for business and professional use. You are responsible for your use of the Services and for the acts of anyone who uses the Services through your account, workspace, or organization.",
    ],
  },
  {
    title: "Afterflow Property",
    body: [
      `${companyLegalName} and its licensors retain all rights, title, and interest in the Services, including software, models, systems, workflows, interfaces, branding, documentation, and all related intellectual property.`,
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
    title: "Confidentiality",
    body: [
      "If we exchange non-public information that is identified as confidential or should reasonably be understood to be confidential, each party will use reasonable care to protect it and will use it only for the purpose for which it was provided, unless otherwise agreed in writing.",
      "Confidential information does not include information that is publicly available, already known without a confidentiality obligation, independently developed, or lawfully received from a third party without a confidentiality obligation.",
    ],
  },
  {
    title: "Availability and Changes",
    body: [
      "We may update, modify, suspend, or discontinue all or part of the Services from time to time. Features may change as the Services evolve, including during evaluations, previews, or limited-access releases.",
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
    title: "Privacy and Security",
    body: [
      "Our Privacy Policy explains how we collect, use, and handle personal information in connection with the Services.",
      "Security controls, processing locations, private deployments, audit logging, model providers, and data-processing obligations may be covered by a separate written agreement where applicable.",
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
      `To the maximum extent permitted by law, the Services are provided "as is" and "as available." ${companyLegalName} disclaims all implied warranties, representations, and guarantees, including warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted availability.`,
      "Nothing in these Terms excludes, restricts, or modifies rights or remedies that cannot be excluded under applicable law, including non-excludable rights under consumer protection law.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      `To the maximum extent permitted by law, ${companyLegalName} will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenue, goodwill, data, business opportunity, or anticipated savings arising out of or related to the Services.`,
      `To the maximum extent permitted by law, ${companyLegalName}'s total liability for claims arising out of or relating to the Services will not exceed the amount you paid to ${companyLegalName} for the Services giving rise to the claim in the 12 months before the event giving rise to liability, or USD $100 if you have not paid any such amount.`,
      "These limitations apply even if a remedy fails of its essential purpose, but only to the extent permitted by applicable law.",
    ],
  },
  {
    title: "Indemnity",
    body: [
      `To the extent permitted by law, you will defend, indemnify, and hold harmless ${companyLegalName} from claims, liabilities, damages, losses, and expenses arising from your Customer Content, your use of the Services, your breach of these Terms, or your violation of law or third-party rights.`,
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law rules.",
      "Except where prohibited by law or agreed otherwise in writing, the state and federal courts located in Delaware will have exclusive jurisdiction over disputes arising out of or relating to these Terms or the Services.",
    ],
  },
  {
    title: "Changes to These Terms",
    body: [
      "We may update these Terms from time to time. If we make a material change, we may provide notice through the Services or by other reasonable means. Continued use of the Services after updated Terms take effect means you accept the updated Terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about these Terms may be sent to ${contactEmail}.`,
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
    <div className="min-h-screen bg-white text-black">
      <main>
        <div className="px-5 pt-5 sm:px-8 lg:px-12">
          <SiteHeader currentPath={termsPath} />
        </div>

        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[94rem] border-b border-black/10 pb-16">
            <p className="text-xs font-medium uppercase text-black/44">
              Legal
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(3.5rem,7.8vw,8rem)] font-light leading-[0.96]">
              Terms of Service
            </h1>
            <p className="mt-6 max-w-4xl text-xl leading-8 text-black/58">
              These Terms govern access to and use of the Afterflow Services
              operated by {companyLegalName}, including the website, request
              forms, demos, evaluations, and related products and services.
            </p>
            <p className="mt-8 text-sm text-black/38">
              Last updated {lastUpdated}
            </p>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
          <div className="mx-auto grid max-w-[94rem] gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-20">
            <p className="text-xs font-medium uppercase text-black/44">
              Terms
            </p>
            <div className="space-y-12">
              {sections.map((section) => (
                <section key={section.title} className="space-y-4">
                  <h2 className="text-3xl font-light leading-tight sm:text-4xl">
                    {section.title}
                  </h2>
                  <div className="max-w-5xl space-y-4 text-base leading-8 text-black/62 sm:text-lg">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
