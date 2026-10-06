# PROJECT MEMORY — INN Focus NGO website (resume note)

## What this is
Static 4-page site (Home / About / Work / Donate) for INN Focus NGO —
Educational Empowerment Society, Ghazipur, Uttar Pradesh.
Stack: hand-written HTML + `css/style.css` (mobile-first) + `js/main.js`.
Repo: `Kalubitrun/inn-focus-ngo`, branch `main`.
Local path: `/home/sandeep/Desktop/infocus/website`.
Live: `https://innfocusngo.in` (domain at Hostinger; apex A/AAAA + www CNAME
to `kalubitrun.github.io`; hosting = free GitHub Pages with HTTPS).

## Key identifiers (never change without asking)
- UPI: `9170694591@ybl` (Union Bank of India; QR payee decodes as `Somprabh singh`)
- WhatsApp: `919170694591` (`https://wa.me/919170694591`)
- Registration: `GAZ/02616/2024-2025`, 12A registered, 80G approved
- Address: Vill. Khudura, Post Gahmar, District Ghazipur, Uttar Pradesh
- Theme: SFPI-inspired maroon `#8C3027` / `#862E26` / `#5C1F18`, gold `#DBA860`,
  cream `#F6F4F2`, ink `#272727`; fonts Bodoni Moda (display serif, 500/600/700)
  + Nunito Sans (body, 400/600/700/800). No emojis anywhere; inline SVG icons only.

## Done so far (latest first)
1. Domain purchased (`innfocusngo.in` at Hostinger), DNS wired
   (apex A/AAAA + www CNAME), site live with HTTPS. Pushed `144a1df`.
2. Mobile re-optimization (44px carousel dots, H1 weight 600, stacks verified).
3. Classroom video on Work page (`images/work-classroom.mp4` 4.7MB, faststart;
   poster `images/video-poster.jpg`). NOTE: file HAS audio (mean −18.7 dB,
   AAC-LC 44.1kHz stereo); reported "no sound" cases were device-side
   (silent switch / output device / tab mute), not the file.
4. 6-slide hero carousel (`images/hero-slide-1..6.jpg`, real classroom photos,
   watermark bands stripped, ≤1400px, ~30–160KB each; autoplay + arrows +
   dots + swipe + keyboard; frame 4/3 cover-fit).
5. SFPI full style swap (maroon/gold/cream, Bodoni Moda + Nunito Sans,
   `images/logo.svg` recoloured, `theme-color #8c3027`).
6. Premium mission cards (gradient bars, ghost numerals, tag pills).
7. UPI intent Pay buttons on Home + Donate
   (`upi://pay?pa=9170694591@ybl&pn=INN%20Focus%20NGO&am={amount}&cu=INR...`;
   mobile-only, QR remains desktop fallback).
8. Scannable QR (`images/qr-clean.png` 656px, quiet-zone padded, pyzbar-verified).
9. Professional rebuild (typography, tone rewrite, trust bars, receipt form).
- Raw sources in `images/gallery/` (~12MB + original video): NEVER commit to git.

## Next up — Phase 1 on-site SEO (PLANNED, not started)
1. `robots.txt` + `sitemap.xml` (new files at repo root).
2. Canonical tags → `https://innfocusngo.in/...` (fixes github.io duplicate
   content — most urgent item).
3. OG/Twitter cards + `og-image.jpg` (1200x630, compose from classroom photo).
4. JSON-LD: `NGO` schema all pages, `FAQPage` on Donate, `BreadcrumbList`
   inner pages.
5. Hygiene: custom `404.html`, keyword-rich image filenames/alt polish,
   trim 2 long meta descriptions to ~155 chars.
- Phase 2 (user-side): Search Console verify + sitemap submit, Google Business
  Profile, Bing Webmaster, GiveIndia/GuideStar listings over time.

## Open questions for user
- OK to auto-generate `og-image.jpg` from classroom photo?
- Schema facts: founding year, contact email, social profile URLs?
- Keywords English-only or + Hindi (e.g. शिक्षा NGO गाजीपुर)?
- Phase 1 all 5 items at once, or trimmed?

## Git caution
- Remote `main` was ahead of local (CNAME commit added via GitHub web UI).
  Always `git pull` before editing/pushing.
- Never commit `images/gallery/` or `images/qr-clean.jpg` (superseded by PNG).
