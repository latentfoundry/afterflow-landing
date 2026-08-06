export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || "";

const productionSiteOrigin = "https://afterflow.dev";

export const siteOrigin = configuredSiteUrl
  ? new URL(configuredSiteUrl).origin
  : productionSiteOrigin;

export const siteRootPath = basePath ? `${basePath}/` : "/";
export const siteRootUrl = new URL(siteRootPath, siteOrigin).toString();
export const howItWorksPath = `${siteRootPath}#how-it-works`;
export const proofPath = `${siteRootPath}#proof`;
export const privacyPath = basePath ? `${basePath}/privacy/` : "/privacy/";
export const termsPath = basePath ? `${basePath}/terms/` : "/terms/";
export const ogImagePath = basePath ? `${basePath}/og.png` : "/og.png";
export const logoUrl = new URL(
  basePath ? `${basePath}/logo.png` : "/logo.png",
  siteOrigin,
).toString();

export const siteName = "Afterflow";
export const companyLegalName = "Afterflow Inc.";
export const siteTitle =
  "Afterflow | Simulate the Operational Impact of AI";
export const siteDescription =
  "Find high-value AI opportunities or bring one from your roadmap. Simulate how each change affects the operation, then learn from every outcome.";
export const socialTitle = "Your organisation, simulated.";
export const socialDescription =
  "Choose the AI initiatives worth backing. Simulate their operational impact before rollout.";

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "mika@afterflow.dev";
export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ||
  "https://calendly.com/mika-afterflow/afterflow-intro";
