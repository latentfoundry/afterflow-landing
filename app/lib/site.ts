const repository = process.env.GITHUB_REPOSITORY ?? "";
const [repositoryOwner = "", repositoryName = ""] = repository.split("/");
const isUserOrOrgSite = repositoryName.endsWith(".github.io");

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || "";

const defaultSiteOrigin =
  repositoryOwner && repositoryName
    ? isUserOrOrgSite
      ? `https://${repositoryName}`
      : `https://${repositoryOwner}.github.io`
    : "http://localhost:3000";

export const siteOrigin = configuredSiteUrl
  ? new URL(configuredSiteUrl).origin
  : defaultSiteOrigin;

export const siteRootPath = basePath ? `${basePath}/` : "/";
export const siteRootUrl = new URL(siteRootPath, siteOrigin).toString();
export const requestAccessPath = basePath
  ? `${basePath}/request-access/`
  : "/request-access/";
export const requestAccessUrl = new URL(
  requestAccessPath,
  siteOrigin,
).toString();
export const ogImagePath = basePath ? `${basePath}/og.png` : "/og.png";
export const ogImageUrl = new URL(ogImagePath, siteOrigin).toString();
export const logoUrl = new URL(
  basePath ? `${basePath}/logo.png` : "/logo.png",
  siteOrigin,
).toString();

export const siteName = "Afterflow";
export const siteTitle =
  "Afterflow | AI Decision Simulation for Enterprise Teams";
export const siteDescription =
  "Test critical decisions before you make them. Afterflow simulates how stakeholders, media, regulators, markets, and operations may react.";
