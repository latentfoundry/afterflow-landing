# Afterflow

Afterflow is a static [Next.js](https://nextjs.org) landing page configured for deployment to GitHub Pages with GitHub Actions.

## Getting Started

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

Create the production export:

```bash
pnpm build
```

The static output is generated in `out/`.

## Deployment

Push to `main` to trigger the GitHub Pages deployment workflow in `.github/workflows/deploy-pages.yml`.

The workflow builds the static export and publishes it to the custom domain at [afterflow.dev](https://afterflow.dev).

Optional Google and Bing verification tokens can be added as repository variables named `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION`.
