export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || "";

const productionSiteOrigin = "https://afterflow.dev";

export const siteOrigin = configuredSiteUrl
  ? new URL(configuredSiteUrl).origin
  : productionSiteOrigin;

export const siteRootPath = basePath ? `${basePath}/` : "/";
export const siteRootUrl = new URL(siteRootPath, siteOrigin).toString();
export const howItWorksPath = `${siteRootPath}#workflow`;
export const useCasesPath = `${siteRootPath}#use-cases`;
export const privacyPath = basePath ? `${basePath}/privacy/` : "/privacy/";
export const termsPath = basePath ? `${basePath}/terms/` : "/terms/";
export const requestAccessPath = basePath
  ? `${basePath}/request-access/`
  : "/request-access/";
export const requestAccessUrl = new URL(
  requestAccessPath,
  siteOrigin,
).toString();
export const ogImagePath = basePath ? `${basePath}/og.png` : "/og.png";
export const logoUrl = new URL(
  basePath ? `${basePath}/logo.png` : "/logo.png",
  siteOrigin,
).toString();

export const siteName = "Afterflow";
export const companyLegalName = "Afterflow Inc.";
export const siteTitle =
  "Afterflow | Simulate critical enterprise decisions";
export const siteDescription =
  "Afterflow helps teams pressure-test critical enterprise decisions with approved context, stakeholder simulations, and evidence-backed paths.";

export const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "mika@afterflow.dev";
export const bookingUrl =
  process.env.NEXT_PUBLIC_BOOKING_URL?.trim() ||
  "https://calendly.com/mika-afterflow/afterflow-intro";
