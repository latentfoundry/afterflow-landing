import "server-only";

const configuredLastModified = process.env.SITE_LAST_MODIFIED?.trim();

export const siteLastModified =
  configuredLastModified && !Number.isNaN(Date.parse(configuredLastModified))
    ? configuredLastModified
    : "2026-08-06T00:00:00.000Z";

export const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION?.trim() || "";

export const bingSiteVerification =
  process.env.BING_SITE_VERIFICATION?.trim() || "";
