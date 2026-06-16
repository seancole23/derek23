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

Videos are **not in the repo** — hosted in a GitHub Release and served via GitHub's CDN.

- Release tag: `videos-v1`
- URL pattern: `https://github.com/seancole23/derek23/releases/download/videos-v1/{client}-{NN}.mp4`
- Source files: `/Desktop/Derek23/WIX/comps/{Client}/`

To add or replace a video:

```bash
gh release upload videos-v1 "path/to/file.mp4#client-NN.mp4" \
  --repo seancole23/derek23 --clobber
# then update: videos: v('client', N) in lib/projects.ts
```

## Client Video Status

| Client     | Slug       | Videos | Status     |
|------------|------------|--------|------------|
| Air Wick   | airwick    | 9      | ✅ Done    |
| Mastercard | mastercard | 4      | ⚠️ Review  |
| Resolve    | resolve    | 4      | ⚠️ Review  |
| Verizon    | verizon    | 4      | ⚠️ Review  |
| Coca-Cola  | coke       | 4      | ⚠️ Review  |
| Finish     | finish     | 4      | ⚠️ Review  |
| VMLY&R     | vmlyr      | 3      | ⚠️ Review  |
| Wolters    | wolters    | 4      | ⚠️ Review  |
| Mavenlink  | mavenlink  | 3      | ⚠️ Review  |
| US Bank    | usbank     | 4      | ⚠️ Review  |
| Lysol      | lysol      | 4      | ⚠️ Review  |
| Woolite    | woolite    | 3      | ⚠️ Review  |
| Rid-X      | ridx       | 4      | ⚠️ Review  |

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
