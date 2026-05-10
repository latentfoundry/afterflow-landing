import type { Metadata } from "next";
import {
  companyLegalName,
  contactEmail,
  ogImagePath,
  privacyPath,
  siteName,
} from "../lib/site";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const pageTitle = "Privacy Policy | Afterflow";
const pageDescription =
  `Privacy Policy for ${companyLegalName} and Afterflow, including the website and related products and services.`;

const lastUpdated = "May 11, 2026";

const sections = [
  {
    title: "Scope",
    body: [
      `This Privacy Policy explains how ${companyLegalName} ("Afterflow", "we", "us", or "our") collects, uses, discloses, and otherwise handles personal information in connection with our website, request forms, demos, evaluations, communications, and related products and services (collectively, the "Services").`,
      "Afterflow helps organizations dry-run high-stakes operational decisions by structuring approved context into a world model, running decision simulations, and surfacing evidence-backed paths, assumptions, stakeholders, and mitigations.",
      "This policy does not apply to third-party websites, services, or integrations that we do not control. Customer deployments, private environments, order forms, or enterprise agreements may include additional privacy, security, or data-processing terms.",
    ],
  },
  {
    title: "Information We Collect From You",
    body: [
      "The information we collect depends on how you interact with the Services. It may include contact details, professional details, company information, account information, demo or evaluation requests, support requests, communications, and other information you choose to provide.",
      "When you use product features, we may process scenario inputs, decision briefs, questions, notes, uploaded files, links, prompts, outputs, and other materials made available through the Services.",
      "We may also collect technical and usage information such as IP address, device and browser information, approximate location derived from IP address, referring pages, pages viewed, timestamps, feature usage, and security logs.",
      "We may receive information from organization administrators, authorized users, connected integrations, service providers, referral sources, public sources, or external web sources where relevant to the Services and permitted by law.",
    ],
  },
  {
    title: "Customer Content and Approved Sources",
    body: [
      'Organizations may provide or authorize content, data, documents, links, source materials, connected-system data, and other information for a bounded scenario ("Customer Content"). Customer Content may include internal documents, policies, controls, dependency information, system maps, risk materials, migration plans, incident materials, ownership records, stakeholder information, and external context.',
      "The applicable customer agreement, product configuration, or scenario setup may define the approved data boundary, including which internal or external sources are in scope and whether connector access is read-only.",
      "Where Customer Content contains personal information, we process that personal information to provide the Services and in accordance with this policy and any applicable customer agreement.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use information to provide, operate, maintain, secure, troubleshoot, and improve the Services; respond to requests; communicate with you; authenticate users; prevent fraud or abuse; and comply with legal obligations.",
      "We use Customer Content to ingest and structure operational context, build world models and stakeholder maps, run decision simulations, compare branches, and generate evidence-backed outputs such as ranked paths, assumptions, leading indicators, predicted actions, and mitigations.",
      "We may use usage data, diagnostics, feedback, aggregated information, or de-identified information to understand and improve the Services, subject to applicable law and any written agreement with a customer.",
    ],
  },
  {
    title: "AI and Model Processing",
    body: [
      "The Services may use AI, retrieval, graph, and simulation systems to process Customer Content and generate outputs requested by users.",
      "We do not use Customer Content to train or fine-tune Afterflow models unless the customer separately agrees in writing.",
      "Model providers, processing locations, deployments, and related controls may vary by configuration and any applicable customer agreement.",
    ],
  },
  {
    title: "How We Share Information",
    body: [
      "We may share information with vendors and service providers that help us host, operate, secure, support, communicate about, analyze, and improve the Services, including cloud infrastructure, communications, security, analytics, support, and model or AI service providers.",
      "If you use the Services on behalf of an organization, that organization and its authorized administrators may access information associated with your account, workspace, scenario, or use of the Services.",
      "We may share information when you direct us to do so, when needed for requested integrations, when required by law or legal process, to protect rights and safety, or in connection with a financing, merger, acquisition, reorganization, asset sale, or similar transaction.",
      "We do not sell personal information or share it for cross-context behavioral advertising as those terms are commonly used in U.S. state privacy laws.",
    ],
  },
  {
    title: "Cookies and Similar Technologies",
    body: [
      "We use cookies, local storage, logs, and similar technologies to operate the Services, remember preferences, protect against abuse, and understand how the Services are used.",
      "Depending on your location and applicable law, you may be able to manage these technologies through browser settings or consent tools made available through the Services.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use reasonable technical and organizational measures designed to protect personal information against unauthorized access, loss, misuse, and alteration. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      "For customer deployments, any private deployment, regional processing, model-provider, connector, logging, or other security controls are handled according to the applicable customer agreement, configuration, or deployment documentation.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including to provide the Services, maintain security, resolve disputes, enforce agreements, and comply with legal obligations.",
      "Retention periods vary depending on the nature of the information, the context in which it was collected, and any customer agreement, deletion request, legal requirement, or operational need.",
    ],
  },
  {
    title: "Your Rights and Choices",
    body: [
      "Depending on where you live, you may have rights to access, correct, update, delete, restrict, object to, or request a copy of personal information we hold about you. You may also have the right to withdraw consent where processing is based on consent.",
      "You can also opt out of marketing communications by following the unsubscribe instructions in those messages or by contacting us through the Services. We may still send transactional or service-related communications where permitted.",
      `To make a privacy request, contact us at ${contactEmail}. If your information is controlled by an organization using Afterflow, we may direct your request to that organization.`,
    ],
  },
  {
    title: "International Data Handling",
    body: [
      "Personal information may be processed or stored in countries other than where you live, including where our service providers operate or where customer deployments are hosted.",
      "Where required by applicable law or customer agreement, we will take reasonable steps to use appropriate safeguards for cross-border transfers and regional processing requirements.",
    ],
  },
  {
    title: "EEA, UK, California, and Similar Jurisdictions",
    body: [
      "Where these laws apply, our legal bases for processing may include performance of a contract, compliance with legal obligations, our legitimate interests in operating and improving the Services, and consent where required.",
      "Where applicable, residents of certain jurisdictions may have rights to know, access, correct, delete, port, restrict, object to, or opt out of certain processing of personal information.",
      "We will not discriminate against you for exercising privacy rights that apply to you.",
    ],
  },
  {
    title: "Children",
    body: [
      "The Services are intended for business and professional use and are not directed to children. If you believe a child has provided personal information through the Services, contact us and we will take reasonable steps to address the issue.",
    ],
  },
  {
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. If we do, we will update the \"Last updated\" date on this page.",
    ],
  },
  {
    title: "Contact",
    body: [
      `If you have questions about this Privacy Policy or our privacy practices, contact us at ${contactEmail}.`,
    ],
  },
];

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: privacyPath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: privacyPath,
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

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#e7e3dd] text-black">
      <main className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:px-10 lg:px-14">
        <SiteHeader currentPath={privacyPath} />

        <section className="border-b border-black/10 py-16 lg:py-20">
          <div className="max-w-4xl space-y-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              {siteName}
            </p>
            <h1 className="text-4xl font-black leading-none tracking-[-0.06em] sm:text-6xl">
              Privacy Policy
            </h1>
            <p className="text-lg leading-8 text-black/60 sm:text-2xl sm:leading-10">
              This policy applies to the Afterflow Services operated by{" "}
              {companyLegalName}, including the website, request forms, demos,
              evaluations, communications, and related products and services.
            </p>
            <p className="text-sm uppercase tracking-[0.24em] text-black/38">
              Last updated {lastUpdated}
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-black/45">
              Details
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
