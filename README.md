# Workout printables

Minimal HTML pages you can open in a browser and print (or **Print → Save as PDF**): session logs, a 4-week calendar, and a main-lift progression sheet.

Open `index.html` for the **Train Sheets** hub (dashboard + **Printables** tab with open/download links). Printable pages include a **← Hub** link back to the hub.

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

## Supabase multi-user setup (Google sign-in)

1. Create a Supabase project.
2. Open **SQL Editor** and run [`supabase/schema.sql`](supabase/schema.sql).
3. In Supabase, open **Authentication → Providers → Google** and enable Google OAuth.
4. Add your site URL(s) to Google OAuth redirect allowlist and Supabase redirect URLs.
5. In [`supabase-config.js`](supabase-config.js), set:
   - `url` to your Supabase project URL
   - `anonKey` to your Supabase anon public key
6. Reload `index.html`.

When configured, users can sign in with Google and their workouts/schedule are stored per-user in Supabase with RLS protection.
