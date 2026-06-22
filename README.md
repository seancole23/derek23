# derek23.com — Portfolio Site

Next.js 15 + TypeScript static export. Deployed to [derek23.vercel.app](https://derek23.vercel.app) via Vercel (auto-deploy on push to `main`).

## Stack

- **Next.js 15** App Router, `output: 'export'` (fully static, no server)
- **TypeScript** throughout
- **CSS Modules** — no Tailwind, no component library
- **Vercel** — free Hobby plan, ~30s deploy on push to `main`

## Structure

```
app/
  layout.tsx          — root layout, metadata, globals.css import
  page.tsx            — page composition (Nav → Hero → WorkGrid → About → Contact)
  globals.css         — CSS variables, reset
components/
  Nav.tsx/css         — fixed top nav, scrolled blur effect
  Hero.tsx/css        — full-viewport hero with background image + scroll hint
  WorkGrid.tsx/css    — 4-col responsive grid, holds lightbox state
  ProjectCard.tsx/css — hover-to-preview video card
  Lightbox.tsx/css    — ratio-aware fullscreen player, per-client multi-video nav
  About.tsx/css       — bio + services list
  Contact.tsx/css     — email/phone links + footer
lib/
  projects.ts         — all project data, video URL arrays, LightboxPos type
public/
  images/             — thumbnails (449×363), logos, hero-bg.jpg
```

## Video Hosting

Videos are **not in the repo** — hosted on **Cloudflare R2** and streamed via its public dev URL.

- Bucket: `derek23-videos` (Cloudflare account: donnymat46@gmail.com)
- Public base URL: `https://pub-8fd5e90fc3ff4bad8280d9a046054a45.r2.dev`
- Filename pattern: `{client}-{NN}.mp4` (e.g. `airwick-01.mp4`, `airwick-09.mp4`)
- Source files: `/Desktop/Derek23/WIX/comps/{Client}/`

> **Why R2, not GitHub Releases?** GitHub serves release assets with `Content-Disposition: attachment` — browsers can't stream video from those URLs. R2 streams correctly.

To add or replace a video:

```bash
# 1. Copy to /tmp with the correct slug name
cp "path/to/source.mp4" /tmp/derek23-videos/client-NN.mp4

# 2. Upload to R2
wrangler r2 object put "derek23-videos/client-NN.mp4" \
  --file "/tmp/derek23-videos/client-NN.mp4" \
  --content-type "video/mp4"

# 3. Update count in lib/projects.ts
# videos: v('client', N)
```

## Client Video Status

All 54 videos are live on R2. Air Wick is fully reviewed and ordered. The other 12 clients have placeholder videos uploaded (first N files from source) and still need a review pass to confirm order and count.

| Client     | Slug       | Videos | Source files | Status             |
|------------|------------|--------|--------------|--------------------|
| Air Wick   | airwick    | 9      | 9            | ✅ Done            |
| Mastercard | mastercard | 4      | 20           | ⚠️ Needs review   |
| Resolve    | resolve    | 4      | 15           | ⚠️ Needs review   |
| Verizon    | verizon    | 4      | 25           | ⚠️ Needs review   |
| Coca-Cola  | coke       | 4      | 5            | ⚠️ Needs review   |
| Finish     | finish     | 4      | 18           | ⚠️ Needs review   |
| VMLY&R     | vmlyr      | 3      | 7            | ⚠️ Needs review   |
| Wolters    | wolters    | 4      | 8            | ⚠️ Needs review   |
| Mavenlink  | mavenlink  | 3      | 9            | ⚠️ Needs review   |
| US Bank    | usbank     | 4      | 7            | ⚠️ Needs review   |
| Lysol      | lysol      | 4      | 13           | ⚠️ Needs review   |
| Woolite    | woolite    | 3      | 10           | ⚠️ Needs review   |
| Rid-X      | ridx       | 4      | 7            | ⚠️ Needs review   |

## Lightbox

- Panel width set from video's natural ratio (`onLoadedMetadata`) — each video gets a correctly proportioned panel
- Info bar height measured at runtime via ref (no hardcoded constant)
- Portrait (9:16) videos don't clip: backdrop scrolls, `margin: auto` on panel centers when it fits
- Next/prev cycles through a client's videos before advancing to the next client
- Unmuting lands at 70% volume

## Dev

```bash
npm run dev    # localhost:3000
npm run build  # static export → /out
```

No env vars required — all data is static, videos are public CDN URLs.
