import type { Metadata } from "next";
import {
  ogImagePath,
  privacyPath,
  siteName,
} from "../lib/site";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

const pageTitle = "Privacy Policy | Afterflow";
const pageDescription =
  "Privacy Policy for Afterflow, including the website and related products and services.";

const lastUpdated = "March 15, 2026";

const sections = [
  {
    title: "Scope",
    body: [
      'This Privacy Policy explains how Afterflow ("Afterflow", "we", "us", or "our") collects, uses, discloses, and otherwise handles personal information in connection with our website, waitlists, demos, communications, and related products and services (collectively, the "Services").',
      "This policy does not apply to third-party websites, services, or integrations that are not controlled by Afterflow, even if they are linked from or connected to the Services. Certain enterprise deployments or customer environments may also be subject to separate agreements or notices that supplement this policy.",
    ],
  },
  {
    title: "Information We Collect",
    body: [
      "The information we collect depends on how you interact with the Services. It may include contact and professional information, account or profile information, company information, communications, support requests, and any other information you choose to provide through forms, demos, waitlists, or correspondence with us.",
      "If you or your organization use product features, pilots, or integrations, the information processed through the Services may also include scenario inputs, documents, links, records, connected-system data, uploads, notes, prompts, outputs, and other materials made available through the Services.",
      "We may also collect technical, device, browser, network, usage, and log information such as IP address, approximate location derived from IP, pages viewed, referring pages, timestamps, and interactions with the Services.",
      "We may receive information from third parties such as organization administrators, connected integrations, service providers, referral sources, or public sources where permitted by law and relevant to the Services.",
    ],
  },
  {
    title: "How We Collect Information",
    body: [
      "We collect information directly from you when you submit forms, request access, book demos, communicate with us, connect systems, or otherwise use the Services.",
      "We collect certain information automatically when you access or use the Services, including through logs, cookies, local storage, and similar technologies used for functionality, security, abuse prevention, and service improvement.",
      "We may also collect information from third parties or other users of the Services, including when an organization invites you to use the Services or when you choose to connect third-party tools or data sources.",
    ],
  },
  {
    title: "How We Use Information",
    body: [
      "We use personal information to provide, operate, maintain, secure, and improve the Services; to review and respond to requests, demos, waitlists, and support inquiries; and to communicate with you about the Services.",
      "We may also use personal information to authenticate users, prevent fraud and abuse, monitor usage, troubleshoot issues, comply with legal obligations, enforce our terms, and protect the rights, safety, and integrity of Afterflow, our users, and others.",
      "Where relevant to the Services, we use submitted content and related information to generate simulations, analyses, reports, and related outputs requested through the Services.",
    ],
  },
  {
    title: "Cookies and Similar Technologies",
    body: [
      "We use cookies, local storage, and similar technologies to operate the Services, remember preferences, protect against abuse, and understand how the Services are used.",
      "Depending on your location and the relevant law, you may be able to manage these technologies through browser settings or consent tools made available through the Services.",
    ],
  },
  {
    title: "How We Share Information",
    body: [
      "We may share personal information with vendors and service providers that help us host, operate, secure, support, and improve the Services.",
      "If you use the Services on behalf of an organization, your organization and its authorized administrators may have access to information associated with your workspace or use of the Services.",
      "We may also share information when you direct us to do so, when needed to support requested integrations or transactions, when required by law or legal process, to protect rights and safety, or in connection with a financing, merger, acquisition, reorganization, asset sale, or similar transaction.",
    ],
  },
  {
    title: "International Data Handling",
    body: [
      "Personal information may be processed or stored in countries other than where you live, including where our service providers operate or where enterprise deployments are hosted.",
      "Where required by applicable law, we will take reasonable steps to implement appropriate safeguards for cross-border transfers.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including to provide the Services, maintain security, resolve disputes, enforce agreements, and comply with legal obligations.",
      "Retention periods vary depending on the nature of the information, the context in which it was collected, and whether the information is needed for active customer, operational, or legal purposes.",
    ],
  },
  {
    title: "Security",
    body: [
      "We use reasonable technical and organizational measures designed to protect personal information against unauthorized access, loss, misuse, and alteration. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    title: "Your Rights and Choices",
    body: [
      "Depending on where you live, you may have rights to access, correct, update, delete, restrict, object to, or request a copy of personal information we hold about you. You may also have the right to withdraw consent where processing is based on consent.",
      "You can also opt out of marketing communications by following the unsubscribe instructions in those messages or by contacting us through the Services. We may still send transactional or service-related communications where permitted.",
    ],
  },
  {
    title: "Additional Information for EEA, UK, and Similar Jurisdictions",
    body: [
      "Where these laws apply, our legal bases for processing may include performance of a contract, compliance with legal obligations, our legitimate interests in operating and improving the Services, and consent where required.",
      "If you are in one of these jurisdictions and have a privacy-related request, you may use the contact routes made available through the Services.",
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
              This policy applies across Afterflow, including the website,
              waitlists, demos, communications, and related products and
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
