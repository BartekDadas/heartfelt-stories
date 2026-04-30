## Charity campaign storytelling page

A single, scroll-driven campaign page for "siepomaga.pl" inspired by the brief — combining the structured layout (header, two-column hero, stats, comments, footer) with a cinematic storytelling overlay (asymmetric video collage + a full-width scroll-scrubbed video break).

### Page structure (top to bottom)

1. **Sticky header**
   - Multi-color "siepomaga.pl" wordmark (sie/po/ma/ga/.pl in red/yellow/green/teal/gray).
   - Nav links (Zbiórki, Podopieczni, Organizacje, Kampanie) with teal hover.
   - Right side: "1,5%" outlined badge, teal "Załóż..." button, search icon, hamburger on mobile.
   - White, subtle shadow, sticky on scroll.

2. **Hero + Stats (two-column on desktop, stacked on mobile)**
   - **Left (2/3): Red gradient hero card** (135deg `#7f161c → #551a20`), faint white star outlines, "Skarbonka zakończona" blurred dark badge, piggy-bank icon + "SKARBONKA" label, big white title "Łatwogang x Cancer Fighters", organizer row with circular avatar + "ORGANIZATOR: Łatwogang".
   - **Right (1/3): Sticky white stats card** with green-tinted jar illustration, big teal amount "227 803 264 zł", "Wsparty 3 230 174 osoby", info box, and link to "Fundacja Cancer Fighters".

3. **Asymmetric floating video collage (storytelling beat 1)**
   - A masonry-style, slightly off-grid collage of 6–8 mock video tiles (mix of portrait/landscape, varying sizes).
   - Each tile auto-plays muted on viewport, has rounded corners, soft shadow, and **gently bobs/parallaxes** as the user scrolls (transform-based, no layout shift).
   - Short story captions woven between tiles ("9 dni", "non-stop", "dla dzieci…").

4. **Full-width cinematic scroll-scrub video break**
   - A tall pinned section (~200vh) where a real sample MP4 is **scrubbed forward/backward by scroll position** — pause/play not needed, the video timeline is bound to scroll progress.
   - Overlaid kinetic headline that fades through 2–3 story lines as the scrub advances ("Każda sekunda", "Każda złotówka", "Dla nich").
   - Falls back gracefully on mobile (autoplay loop muted) since iOS Safari restricts scrub on some devices.

5. **Campaign description card**
   - White rounded card with the Polish description text and the "Skarbonka została zakończona…" status line ("z nami" as teal link).

6. **Second floating snapshot row (storytelling beat 2)**
   - A smaller asymmetric strip of 3–4 mock clips with a closing thank-you caption — keeps the storytelling rhythm before comments.

7. **Comments section**
   - White card with 4–5 skeleton comment placeholders (avatar circle + 2–3 gray rounded bars), subtle pulse animation.

8. **Footer**
   - Light beige top strip: "Przekaż 1,5% podatku" + foundation logo + "KRS: 0000396361".
   - Four columns (Fundacja Siepomaga / Siepomaga.pl / Wspieraj / Zbieraj) with the listed links.
   - Bottom row: social icons (Facebook, Instagram, X, YouTube), "Switch to English", PayU secure-payment badge.

### Design system

- Background `#f7f7f4`, text `#333`, primary red `#7f161c`, dark red `#551a20`, teal `#009688`, green `#4caf50`, yellow `#ffc107`.
- Open Sans (via Google Fonts) for everything; bold weights for headlines.
- Card radius 8–12px, soft shadow, generous padding.
- Tailwind for layout; CSS variables in `styles.css` extended with the brand palette.

### Mock video sources

- Use free public sample MP4s (Google "BigBuckBunny"-style sample CDN and similar) for both the floating collage tiles and the scroll-scrub hero. All muted, `playsInline`, `loop` where applicable.

### Technical notes

- Single new route at `/` (replace the placeholder in `src/routes/index.tsx`).
- Components split under `src/components/campaign/`: `Header`, `HeroCard`, `StatsCard`, `FloatingVideoCollage`, `ScrollScrubVideo`, `DescriptionCard`, `CommentsSkeleton`, `Footer`.
- Scroll-scrub uses a single `<video>` with `preload="auto"` and `requestAnimationFrame` to lerp `video.currentTime` toward a target derived from `IntersectionObserver` + scroll progress of the pinned section. No external scroll libs needed.
- Floating tiles use `transform: translate3d(...)` driven by a scroll listener (rAF-throttled) for a subtle parallax/bob — purely visual, no layout thrash.
- Fully responsive: two-column grid collapses to one column under `md`; sticky stats card unsticks on mobile and renders above the description.
- Lucide icons for search, hamburger, social, play overlay, info.

### Out of scope (for this pass)

- Real donation backend, real comments, i18n/English toggle, real auth — all visual only.
