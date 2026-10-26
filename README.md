# Ronald T. Soka — IT Career Portfolio MVP

A responsive dark technical portfolio built with React, Vite, Tailwind CSS, and Lucide icons. It includes a recruiter-focused homepage, interactive project case studies, skills, credentials, and contact section.

## Before publishing

1. In `src/main.jsx`, replace `YOUR_EMAIL@example.com` with your professional email address.
2. Verify the LinkedIn profile URL in `src/main.jsx` before publishing.
3. Add a CV PDF at `public/Ronald-Soka-CV.pdf` (create the `public` directory if needed) and add a download link in the hero/contact section if desired. The current MVP intentionally does not fabricate a CV file.
4. Review every skill and credential for accuracy. The CCNA entry is labelled in progress.
5. Ensure the case studies do not reveal confidential government, employer, customer, or production network information.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production build:

```bash
npm run build
npm run preview
```

## Deploy free with GitHub Pages

### Option A — GitHub Pages using GitHub Actions (recommended)

1. Create a new GitHub repository named `ronald-soka-portfolio`.
2. Upload/push the contents of this folder to the repository root.
3. In GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. Add `.github/workflows/deploy.yml` using the workflow below.
5. Commit and push. GitHub Actions builds the Vite site and publishes it. Your URL will typically be `https://YOUR-GITHUB-USERNAME.github.io/ronald-soka-portfolio/`.

```yaml
name: Deploy portfolio to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

This project uses `base: './'` in `vite.config.js`, so relative asset paths work for a project subpath on GitHub Pages.

### Option B — Netlify

1. Push this project to GitHub.
2. Sign in to Netlify and choose **Add new site → Import an existing project**.
3. Select the repository. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy. Netlify provides a free hosted URL; you can optionally configure a custom domain.

## Notes

- Contact email copy uses the browser Clipboard API and falls back to an email link if clipboard access is unavailable.
- Case studies are written as sanitised summaries and avoid claiming unverified numerical impact.
- This MVP has no backend, analytics, or contact form. The contact actions open LinkedIn or copy the email address.

A starter CV PDF is included at `public/Ronald-Soka-CV.pdf` and linked from the homepage. Review it carefully before use: add your accurate employment dates and professional contact details, and tailor it for each vacancy.
