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

The site is configured to publish to GitHub Pages under the repository path when deployed from Actions.
