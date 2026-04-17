# Workout printables

Minimal HTML pages you can open in a browser and print (or **Print → Save as PDF**): session logs, a 4-week calendar, and a main-lift progression sheet.

Open `index.html` to jump to each printable.

## Live site (GitHub Pages)

After you enable Pages once (see below), the site is usually at:

`https://<your-github-username>.github.io/workout-printables/`

Example: `https://gratiaseew.github.io/workout-printables/`

### One-time setup

1. Push this repo to GitHub (including the `.github/workflows/deploy-pages.yml` file).
2. On GitHub: open the repo → **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, choose **GitHub Actions** (not “Deploy from a branch”).
4. Push to `main` again (or open **Actions** → **Deploy to GitHub Pages** → **Run workflow**) and wait for the green checkmark.
5. Refresh **Settings → Pages**; when the workflow succeeds, the **Visit site** link appears.

Private repos can use Pages on paid GitHub plans; on Free, the repo generally needs to be **public** for Pages to work.

### If Actions fails with “Get Pages site failed” / `HttpError: Not Found`

That usually comes from the optional `configure-pages` step running before Pages exists. This repo’s workflow **does not use** that step anymore—pull the latest `deploy-pages.yml`, push to `main`, and re-run the workflow.
