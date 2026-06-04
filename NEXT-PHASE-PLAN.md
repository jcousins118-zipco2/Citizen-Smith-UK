# Citizen Smith — Next Phase Plan
**Generated 2 June 2026**
**Poe's handover note for when Jason returns**

---

## 1. Copy-Wording UI Action

**What:** a small "Copy to clipboard" button on each document page so users can grab the template wording easily.

**How:**
- Add a `<button class="copy-btn">Copy wording</button>` next to each `<textarea readonly>`
- One line of JS:
  ```js
  navigator.clipboard.writeText(document.querySelector('textarea').value)
  ```
- Visual feedback: flash "Copied!" for 2 seconds

**Files to touch:** each document page (30+ files). Could also do it as a single shared JS include.

**Priority:** high — it's the single biggest UX improvement for the prototype.

---

## 2. What-to-Keep Checklist Block

**What:** a small interactive checklist on each document page where the user can tick items off.

**How:**
- Convert `<ul>` items in "What to keep" into checkbox `<li>` items
- Could do as a `<form>` with `<input type="checkbox">` — zero JS required
- Simple, persistent while the page is open

**Files to touch:** same set as copy-wording.

**Priority:** medium — nice-to-have, quick to add alongside copy buttons.

---

## 3. Domain + Hosting

**Domain considerations:**
- Keep it short, memorable, trust-signalling
- Options:
  - `citizensmith.org.uk` — clear UK focus, .org.uk signals purpose
  - `citizensmith.uk` — shorter, slightly more modern
  - `citizensmith.uk` is available / `citizensmith.org.uk` probably available
- Ideally avoid `.com` — harder to find short names there

**Hosting options (static site, zero backend):**
| Option | Cost | Effort | Notes |
|--------|------|--------|-------|
| Cloudflare Pages | Free | Low | Fastest global CDN, good DNS too |
| Netlify | Free tier | Low | Auto-deploys from git |
| GitHub Pages | Free | Low | Requires public repo or paid private |

**Recommended:** Cloudflare Pages — handles DNS + hosting + CDN in one place. Auto-deploy from a git repo.

**Process:**
1. Buy domain (£5-10/yr at Cloudflare or 123 Reg)
2. Push existing site files to a git repo
3. Connect repo to Cloudflare Pages
4. Point domain at Cloudflare
5. Live in ~30 minutes

**Priority:** medium — the prototype works fine locally. No rush until we want real users.

---

## 4. SEO for a Static Site

**Foundations (already done):**
- Semantic HTML (headings, nav, main)
- Meta tags on each page (title, description)
- Clean URL structure (`/docs/debt/...`)

**Add:**
- A `sitemap.xml` — simple list of all page URLs
- A `robots.txt` — allow all crawlers
- Open Graph / Twitter Card meta tags for link sharing
- Descriptive `<title>` per page (already done on most)
- Canonical URLs

**Tools:**
- Manual sitemap (flat-file site = easy to generate)
- Google Search Console once domain is live

**Priority:** low until domain is live, but the content structure is already SEO-friendly.

---

## 5. Maintenance / Updates Workflow

**How to add a new issue:**
1. Create the issue in `issueMap` in `logic.js`
2. Create a route entry in the relevant sector's route object
3. Create the HTML document page in `docs/{sector}/`
4. Done.

**How to add a new sector:**
1. Add sector to `issueMap` in `logic.js`
2. Add a `sectorRoutes` object
3. Add sector to the `sectorRoutes` lookup in `showRights()`
4. Create sector folder in `docs/`
5. Create document pages

**Server:** `python3 -m http.server 8765` in the `lawsSender/` folder. Restart if the machine reboots.

**No database, no backend, no accounts.** The whole thing is flat files. Back it up by copying the folder somewhere.

---

## Next Steps Priority (when Jason returns)

1. Copy-wording button (1 day, simple)
2. What-to-keep checklist (part of same pass)
3. Sitemap + robots.txt
4. Domain buy + hosting setup
5. SEO meta tags
6. First real-user readthrough
7. Begin outreach plan (Sherlock's socials/outreach assessment)
