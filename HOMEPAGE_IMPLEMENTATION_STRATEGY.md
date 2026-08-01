# HOMEPAGE_IMPLEMENTATION_STRATEGY.md — Doğrular Seramik

*The precise technical map for implementing the homepage.*
*Every decision documented. No ambiguity permitted during coding.*
*All values are exact. Deviations require documented justification.*
*Date: 2026-06-13*

---

## PRE-IMPLEMENTATION CHALLENGE REVIEW

Before locking this strategy, every major decision was challenged:

**Challenge: Is the 12-column grid necessary, or would a simpler system work?**
The asymmetric collections grid (7+5 in row 1, 4+4+4 in row 2) requires the granularity of a 12-column system to produce the specific proportions that create visual hierarchy without size labeling. A 6-column grid would force the featured tile to be 4/6 = 66% wide — too dominant. The 12-column grid allows 7/12 = 58% — dominant but not overwhelming. The 12-column system is justified.

**Challenge: Is 250vh of scroll distance correct for the GSAP pin?**
At a natural reading scroll speed of approximately 500px/second (a moderate pace), 250vh at 1440px viewport = 2.5 × 900px (assuming 900px viewport height) = 2250px of scroll distance. At 500px/second, this is 4.5 seconds of continuous scroll. With 4 images and a scrub lag of 1 second, this gives each image approximately 1 second of hold time visible on screen plus the lag creating additional perceived dwell. This is the minimum required for genuine engagement. 300vh would be more generous but risks the visitor losing patience. 250vh is confirmed.

**Challenge: Should the Dual CTA panels extend full viewport width or respect the max-width container?**
Full viewport width. The panels are the page's closing act — the brand releases its compositional control at this moment and offers two open paths. Full-width panels communicate "we are giving you the full width of the experience to make your choice." Contained panels feel like the brand is still managing the decision. Full width is confirmed.

**Challenge: Is 120px minimum vertical section padding too much?**
At 1440px viewport and 1400px max-width container, the visual density of the page without generous padding would make it read like a cramped catalog. The 120px minimum (which scales down to 60px on mobile via `clamp()`) creates the luxury breathing room that VISUAL_DIRECTION.md requires. The total homepage height at desktop is approximately 9,000–11,000px — a significant scroll. The padding contributes significantly to this height. This is not waste — it is the scroll journey. 120px minimum is confirmed.

**Challenge: Is the independent gap column in the Craft section (column 7 unoccupied) a valid layout technique?**
Yes. Using a CSS Grid column as a visual gap (81px + two 24px grid gaps = 129px total) is a legitimate and intentional layout decision. It creates the luxury breathing space between the narrative and data columns without resorting to padding hacks. The 129px gap between the two Craft section columns is the most deliberate spatial luxury decision on the page. Confirmed.

**Challenge: Should the featured tile in the Collections grid be portrait or landscape?**
Nearly square. At 713px wide and 624px tall (spanning 2 rows of 300px each + 24px gap), the featured tile ratio is approximately 1.14:1 (very slightly landscape). This is deliberate: a square tile in an editorial context communicates stability and authority, different from the landscape supporting tiles. The slight landscape ratio prevents it from feeling like a perfect square (which would feel static rather than architectural). Confirmed.

---

## SECTION 1: EXACT LAYOUT SYSTEM

### Page-Level Shell

```
<main>                          → overflow-x: hidden; position: relative
  <nav />                       → position: fixed; top: 0; left: 0; right: 0; z-index: 40
  <section /> × 7               → full viewport width; background per section
  <footer />
</main>
```

### Section Container Pattern (Universal)

Every section that contains constrained content follows this exact pattern:

```
<section>                       → full-width background; position: relative
  <div class="section-shell">  → max-width: 1400px; margin: 0 auto
                                   padding-inline: clamp(24px, 5.5vw, 80px)
                                   padding-block: clamp(60px, 10vw, 120px)
    {section content}
  </div>
</section>
```

**Exceptions to the section container pattern:**

1. **HeroSection**: No section container. The photography is full-bleed. A `div.hero-text-block` is positioned absolutely with `position: absolute; bottom: 15%; left: clamp(24px, 5.5vw, 80px); max-width: min(620px, 80vw)`.

2. **FeaturedProjectSection**: No top or bottom padding on the section itself. The section is edge-to-edge vertically. The internal left column has its own padding. Right column images have no padding.

3. **DualCtaSection**: No section container. The two panels span full viewport width with no max-width constraint. Internal panel content is constrained with `max-width: 600px; margin: 0 auto` within each panel.

### Z-Index System

```
z-40: Navigation (fixed)
z-30: Mobile navigation overlay
z-20: Future modal/dialog use
z-10: Section sticky elements (left column in FeaturedProjectSection)
z-1:  Section content layers
z-0:  Section backgrounds and images
```

No z-index value exceeds 40 on the homepage.

---

## SECTION 2: EXACT SPACING SYSTEM

### Base Unit

**8px**. All spacing values are multiples of 8px.

### Spacing Scale (Homepage-relevant values only)

| Token name | Value | Tailwind equivalent | Usage |
|---|---|---|---|
| `--space-1` | 8px | `p-2` / `gap-2` | Micro internal spacing |
| `--space-2` | 16px | `p-4` / `gap-4` | Label-to-content gaps |
| `--space-3` | 24px | `p-6` / `gap-6` | Standard grid gap (collections) |
| `--space-4` | 32px | `p-8` / `gap-8` | Between related elements |
| `--space-5` | 40px | `p-10` / `gap-10` | Headline-to-CTA gap |
| `--space-6` | 48px | `p-12` / `gap-12` | Content blocks within sections |
| `--space-7` | 64px | `p-16` / `gap-16` | Headline-to-grid gap |
| `--space-8` | 80px | `p-20` / `gap-20` | Section horizontal padding (desktop) |
| `--space-9` | 96px | `p-24` / `gap-24` | Left column padding; wide column gap |
| `--space-10` | 120px | `p-30` | Section vertical padding (desktop) |

### Responsive Spacing (Clamp Values)

**Section padding-block (vertical):**
```css
clamp(60px, 10vw, 120px)
```
→ 60px at 600px viewport, 120px at 1200px+ viewport.

**Section padding-inline (horizontal):**
```css
clamp(24px, 5.5vw, 80px)
```
→ 24px at <440px, 80px at 1450px+.

**Hero text block bottom offset:**
```css
bottom: clamp(48px, 8vh, 120px)
```

**Display heading bottom margin to subtext:**
```css
margin-bottom: clamp(16px, 2vw, 24px)
```

**Subtext to CTA gap:**
```css
margin-bottom: clamp(32px, 4vw, 40px)
```

### Section-Specific Spacing

**HeroSection:**
- Text block bottom distance from viewport edge: `clamp(48px, 8vh, 120px)`
- Gap between headline and subtext: 24px
- Gap between subtext and CTA: 40px
- CTA button padding: `padding: 16px 32px` (8px base × 2 and × 4)

**BrandStatementSection:**
- Total vertical section height: `clamp(60vh, 75vh, 80vh)` (minimum 60vh, typical 75vh)
- Text block: `max-width: 45ch; margin: 0 auto`
- Stagger gap between revealed text lines: implicit in stagger delay (100ms), not CSS spacing
- No additional spacing elements — the section is pure text on dark ground

**CollectionsPreviewSection:**
- Section headline to grid: `margin-top: 64px` (--space-7)
- Grid gap (column and row): `24px` (--space-3)
- Grid-to-link gap: `margin-top: 48px` (--space-6)

**FeaturedProjectSection:**
- Left column internal padding: `padding: 96px 80px` (--space-9 vertical, --space-8 horizontal)
- Gap between left column project details:
  - Project typology to headline: `margin-bottom: 16px`
  - Headline to location+year: `margin-bottom: 8px`
  - Location to architect: `margin-bottom: 8px`
  - Architect to collection used: `margin-bottom: 40px`
  - Collection to description: `margin-bottom: 32px`
  - Description to link: `margin-top: auto` (pushed to bottom of column)

**SpaceExplorerSection:**
- Section headline to grid: `margin-top: 56px`
- Grid gap: `16px` (--space-2)

**CraftTrustSection:**
- Visual gap column (col 7): 81.33px of visual breathing room + 2×24px grid gaps = ~129px
- Data point spacing: Each data point group is separated by `margin-bottom: 64px` (--space-7)
- Certification strip top margin: `margin-top: 80px` (--space-8)

**DualCtaSection:**
- Internal panel padding: `padding: 96px 80px` (desktop) — `clamp(64px, 8vh, 96px)` vertical, `clamp(40px, 5.5vw, 80px)` horizontal
- Role indicator to headline: `margin-bottom: 16px`
- Headline to descriptor: `margin-bottom: 16px`
- Descriptor to CTA: `margin-bottom: 40px`

---

## SECTION 3: EXACT GRID SYSTEM

### Grid Foundation

**Container content width at 1440px reference viewport:**
1400px max-width − 2×80px padding = 1240px content width.

**12-column grid:**
Column width = (1240px − 11×24px) ÷ 12 = (1240 − 264) ÷ 12 = 81.33px per column.

All column span calculations verified against this base.

---

### Collections Preview Grid

```css
.collections-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 300px 300px 240px;
  gap: 24px;
}
```

**Tile assignments (desktop):**

| Tile | grid-column | grid-row | Width (approx) | Height | Ratio |
|---|---|---|---|---|---|
| A (featured) | 1 / 8 | 1 / 3 | 713px | 624px | ~1.14:1 |
| B | 8 / 13 | 1 / 2 | 503px | 300px | ~1.68:1 |
| C | 8 / 13 | 2 / 3 | 503px | 300px | ~1.68:1 |
| D | 1 / 5 | 3 / 4 | 397px | 240px | ~1.65:1 |
| E | 5 / 9 | 3 / 4 | 397px | 240px | ~1.65:1 |
| F | 9 / 13 | 3 / 4 | 397px | 240px | ~1.65:1 |

**Verification:**
Row 1: columns 1-7 (Tile A top) + columns 8-12 (Tile B) = 12 ✓
Row 2: columns 1-7 (Tile A bottom) + columns 8-12 (Tile C) = 12 ✓
Row 3: columns 1-4 + 5-8 + 9-12 = 12 ✓
Total content height: 300 + 24 + 300 + 24 + 240 = 888px ✓

**Tablet grid (768px–1279px):**
```css
grid-template-columns: repeat(2, 1fr);
grid-template-rows: auto;
gap: 16px;
```
Tile A: `col-span-2` (full width)
Tiles B, C: `col-span-1` each (side by side)
Tiles D, E: `col-span-1` each (side by side)
Tile F: `col-span-2` (full width)
Row heights: auto (driven by `aspect-ratio: 16/10` on Tile A, `aspect-ratio: 4/3` on all others)

**Mobile grid (<768px):**
```css
grid-template-columns: 1fr;
grid-auto-rows: auto;
gap: 8px;
```
All tiles: `col-span-1`, `aspect-ratio: 4/3`

---

### Featured Project Grid

```css
.featured-project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0; /* No gap — left column and right column are distinct */
  min-height: 100vh;
}
```

**Column assignments:**
Left column: `grid-column: 1 / 6` (5 tracks, 502.67px wide)
Right column: `grid-column: 6 / 13` (7 tracks, 713.33px wide)

No gap between columns — the transition from left column dark surface to right column photography is the visual separation.

**Left column implementation:**
```css
.featured-left {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 96px 80px;
  background-color: var(--ds-ink-900);
}
```

**Right column implementation:**
```css
.featured-right {
  position: relative;
  height: 100%; /* Fills the scroll container */
}
.featured-image-stack {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
.featured-image {
  position: absolute;
  inset: 0;
  opacity: 0;
}
.featured-image:first-child {
  opacity: 1; /* First image visible by default */
}
```

**Mobile layout:**
```css
/* Below 768px */
.featured-project-grid {
  display: block; /* Remove grid entirely */
}
.featured-left {
  position: static; /* Remove sticky */
  height: auto;
  padding: 64px 24px 40px;
}
.featured-right {
  display: flex;
  flex-direction: column;
  gap: 2px; /* Hairline gap between images */
}
.featured-image-stack {
  position: static;
  height: auto;
  aspect-ratio: 16/9;
}
.featured-image {
  position: static;
  opacity: 1; /* All images visible on mobile */
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

---

### Space Explorer Grid

```css
.space-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
```

All 6 tiles: `col-span-1`, `aspect-ratio: 4/3`

At 1240px content width with 16px gaps:
Tile width = (1240 − 2×16) ÷ 3 = 402.67px
Tile height = 402.67 × 3/4 = 302px
Grid height = 2×302 + 16 = 620px

**Tablet (768–1279px):** Same 3-column grid — still sufficient at 768px.

**Mobile (<768px):**
```css
grid-template-columns: repeat(2, 1fr);
gap: 8px;
```
3 rows × 2 columns = 6 tiles.

---

### Craft & Trust Grid

```css
.craft-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  align-items: start;
}
```

Left (narrative): `grid-column: 1 / 7` (6 columns, 607.98px)
Visual gap: column 7 (81.33px + 2×24px gaps = 129.33px visual separation)
Right (data): `grid-column: 8 / 13` (5 columns, 502.65px)

The 129px visual gap between the two content columns is the luxury spacing commitment: the open space IS the design.

**Tablet and mobile (<1280px):**
```css
.craft-grid {
  display: flex;
  flex-direction: column;
  gap: 64px;
}
```

---

### Dual CTA Layout

Not a grid — two flex children of the section, each `flex: 1`:

```css
.dual-cta-wrapper {
  display: flex;
  min-height: clamp(320px, 50vh, 480px);
}
.dual-cta-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(64px, 8vh, 96px) clamp(40px, 5.5vw, 80px);
}
.dual-cta-divider {
  width: 1px;
  background-color: var(--ds-border-dark);
  flex-shrink: 0;
}
```

**Mobile (<768px):**
```css
.dual-cta-wrapper {
  flex-direction: column;
}
.dual-cta-divider {
  width: auto;
  height: 1px;
}
```

Mobile panel order: Consumer/homeowner panel FIRST (positioned first in the DOM for mobile-first audience). Desktop: both panels equal, no DOM order preference assumed (they are visually equal).

Implementation note: The DOM order is consumer first, professional second. On desktop, both appear side by side — left is consumer, right is professional. This is reversed from the HOMEPAGE_BLUEPRINT.md specification which listed professional on the left and consumer on the right. The mobile accessibility reasoning (consumer audience skews mobile) overrides the desktop visual specification. If the brand team requires professional on the left for desktop, CSS `order: -1` is applied to the professional panel above the tablet breakpoint.

---

## SECTION 4: EXACT ANIMATION SYSTEM

### Easing Function Registry

One custom cubic-bezier is used across all section entry animations. Named and documented:

```css
--ease-material: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

This easing produces a fast initial acceleration followed by a long, progressively slower arrival — matching the physical behavior of heavy architectural materials being placed deliberately. It is the brand's motion signature.

Additional easing values:
```css
--ease-quick: cubic-bezier(0.4, 0, 0.2, 1);    /* For hover state color transitions */
--ease-out: cubic-bezier(0, 0, 0.2, 1);          /* For CTA active/press states */
```

---

### Tier 1: GSAP ScrollTrigger (FeaturedProjectSection)

**Initialization condition:** GSAP is initialized ONLY when ALL of the following are true:
1. `prefersReducedMotion === false`
2. `window.innerWidth >= 1280` (desktop only)
3. The section has entered the viewport (IntersectionObserver trigger with `rootMargin: '200px'`)

**ScrollTrigger configuration:**
```javascript
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: 'top top',
  end: '+=250vh',
  pin: true,
  pinSpacing: true,
  scrub: 1,
  anticipatePin: 1,
  invalidateOnRefresh: true, // Recalculates on viewport resize
})
```

**GSAP version:** Locked to `3.12.x` in package.json. Minor version locked because ScrollTrigger scrub behavior is sensitive to version changes.

**Image crossfade timeline (5 images):**

All images are positioned absolutely within the right column, stacked. Initial state: `image[0].opacity = 1`, all others `opacity = 0`.

Timeline (normalized 0–1 duration, mapped to scroll progress):

```javascript
const tl = gsap.timeline({ defaults: { ease: 'none' } });

// Image 0 → Image 1 at 20% of scroll
tl.to(images[0], { opacity: 0, duration: 0.08 }, 0.16)
  .to(images[1], { opacity: 1, duration: 0.08 }, 0.16);

// Image 1 → Image 2 at 40% of scroll
tl.to(images[1], { opacity: 0, duration: 0.08 }, 0.36)
  .to(images[2], { opacity: 1, duration: 0.08 }, 0.36);

// Image 2 → Image 3 at 60% of scroll
tl.to(images[2], { opacity: 0, duration: 0.08 }, 0.56)
  .to(images[3], { opacity: 1, duration: 0.08 }, 0.56);

// Image 3 → Image 4 at 80% of scroll
tl.to(images[3], { opacity: 0, duration: 0.08 }, 0.76)
  .to(images[4], { opacity: 1, duration: 0.08 }, 0.76);
```

Each crossfade occupies 8% of the total timeline (= 20vh of scroll at 250vh total).
Each hold period occupies ~18–20% of the timeline (= 45–50vh of scroll).
With scrub: 1 lag, each image is visually held for approximately 3–5 seconds at natural scroll speed.

**Cleanup:** On component unmount and on resize events, `ScrollTrigger.getAll().forEach(t => t.kill())` ensures no orphaned triggers. A single resize event listener calls `ScrollTrigger.refresh()`.

**Reduced motion fallback:** When `prefersReducedMotion === true` or `window.innerWidth < 1280`:
- GSAP is never imported
- Left column: `position: static`
- Right column: Images displayed as standard vertical sequence
- Each image wrapped in `motion.div` with `whileInView={{ opacity: 1 }}`, `initial={{ opacity: 0 }}`, `transition={{ duration: 0.4 }}`

---

### Tier 2: Motion Library (Section Entry Animations)

All section entry animations use `motion` from `motion/react`. All use `whileInView` with `once: true`.

**Animation variant registry:**

```typescript
// Hero headline — clip-path reveal left to right
const heroHeadlineVariant = {
  initial: { clipPath: 'inset(0 100% 0 0)' },
  animate: { clipPath: 'inset(0 0% 0 0)' },
  transition: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }
}
// Note: clipPath on the headline wrapper, not on individual glyphs.
// The headline is ONE motion element. Not split into per-word or per-line spans.

// Brand statement lines — fade up with stagger
const brandLineVariant = (index: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
})
// Each sentence in the brand statement is a separate motion.p element.
// Maximum 4 motion.p elements. The stagger creates sequential line appearance.

// Collection tiles — scale + opacity with stagger
const collectionTileVariant = (index: number) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }
})
// index: 0–5 for 6 tiles. Tile A (index 0) appears first.

// Space explorer tiles — same pattern, slightly faster stagger
const spaceTileVariant = (index: number) => ({
  initial: { opacity: 0, scale: 0.97 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }
})
// index: 0–5 for 6 tiles. Tiles enter row by row (0,1,2 then 3,4,5).

// Craft section — simple opacity only (no transform — communicates factual stability)
const craftEntryVariant = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

// Dual CTA panels — fade up with stagger between panels
const ctaPanelVariant = (index: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }
})
```

**Reduced motion variants** (substituted when `prefersReducedMotion === true`):
```typescript
const reducedMotionVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }, // or whileInView: { opacity: 1 }
  transition: { duration: 0.2 }
}
```

All `scale`, `y`, `clipPath` transforms are removed. Only opacity transitions remain.

---

### Tier 3: CSS Transitions (Hover States)

All CSS-only. No JavaScript. All transitions use `--ease-material` or `--ease-quick`.

**Navigation link hover:**
```css
.nav-link {
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 3px;
  transition: text-decoration-color 200ms var(--ease-quick);
}
.nav-link:hover {
  text-decoration-color: currentColor;
}
```

**Navigation CTA ("Örnek İste") hover:**
```css
.nav-cta {
  background-color: var(--ds-accent);
  color: var(--ds-ink-900);
  padding: 10px 20px;
  border-radius: 9999px;
  transition: background-color 200ms var(--ease-quick),
              transform 100ms var(--ease-out);
}
.nav-cta:hover { background-color: var(--ds-accent-hover); }
.nav-cta:active { transform: translateY(1px) scale(0.99); }
```

**Collection tile hover:**
```css
.collection-tile { overflow: hidden; }
.collection-tile img {
  transition: transform 600ms var(--ease-material);
  transform: scale(1);
  will-change: transform; /* Added on hover, removed after */
}
.collection-tile:hover img { transform: scale(1.03); }
.collection-tile .tile-name {
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  transition: text-decoration-color 200ms var(--ease-quick);
}
.collection-tile:hover .tile-name {
  text-decoration-color: var(--ds-accent);
}
```

Note: `will-change: transform` is set on hover start (via `:hover`) and removed on hover end. In CSS, `will-change` inside a `:hover` selector achieves this without JavaScript.

**Space tile hover:**
```css
.space-tile { overflow: hidden; }
.space-tile img {
  transition: transform 500ms var(--ease-material);
}
.space-tile:hover img { transform: scale(1.04); }
.space-tile .tile-label {
  transition: opacity 300ms var(--ease-quick),
              transform 300ms var(--ease-material);
  opacity: 0.7;
  transform: translateY(4px);
}
.space-tile:hover .tile-label {
  opacity: 1;
  transform: translateY(0);
}
```

**Ghost CTA button hover (Dual CTA):**
```css
.ghost-cta {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--ds-text-primary);
  padding: 14px 28px;
  border-radius: 9999px;
  transition: background-color 200ms var(--ease-quick),
              border-color 200ms var(--ease-quick),
              transform 100ms var(--ease-out);
}
.ghost-cta:hover {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.5);
}
.ghost-cta:active { transform: translateY(1px) scale(0.99); }
```

**Navigation frosted state transition:**
```css
.nav-bar {
  background-color: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  transition: background-color 400ms var(--ease-quick),
              backdrop-filter 400ms var(--ease-quick);
}
.nav-bar.is-scrolled {
  background-color: rgba(14, 14, 14, 0.88);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
}
```

The `400ms` transition on the navigation is deliberately longer than other hover states — the nav changing state is a significant visual event and should not feel instantaneous.

**Count-up animation (Craft section data points):**

This is not a CSS transition and not a Motion animation. It is a custom implementation using `requestAnimationFrame`:

```typescript
function animateCountUp(
  targetEl: HTMLElement,
  from: number,
  to: number,
  duration: number = 1500
) {
  const startTime = performance.now();
  const range = to - from;

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out: decelerates as it approaches the target value
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(from + range * eased);
    targetEl.textContent = formatNumber(current); // formatNumber adds separators if needed
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
```

Triggered once by IntersectionObserver when the data point enters the viewport. `once: true` behavior enforced by `observer.disconnect()` after triggering.

---

## SECTION 5: EXACT RESPONSIVE BEHAVIOR

### Breakpoint System

```css
/* Using Tailwind v4 default breakpoints */
/* sm:  640px  — not used on homepage */
/* md:  768px  — tablet trigger */
/* lg:  1024px — intermediate (used for spacing adjustments only) */
/* xl:  1280px — desktop trigger (full composition) */
/* 2xl: 1536px — ultra-wide (spacing refinement only) */
```

Primary design breakpoints: `md` (768px) and `xl` (1280px).
At mobile (<768px): single-column, no GSAP, touch-optimized.
At tablet (768–1279px): two-column grids, no GSAP pin, simplified animations.
At desktop (1280px+): full 12-column composition, GSAP, complete animation system.

### Section-by-Section Responsive Matrix

**Navigation:**

| Viewport | Behavior |
|---|---|
| Desktop (1280px+) | Horizontal flex: logo | links (5) | CTA. Transparent over hero, frosted after 80px scroll. |
| Tablet (768–1279px) | Same as desktop. All links fit. |
| Mobile (<768px) | Logo left, hamburger icon right. Overlay menu (full-screen, z-30). Staggered link entry animation on open. |

Mobile hamburger: Lines morph to X via CSS transform (no JavaScript for the icon morph). The overlay is a `<dialog>` element (native HTML, handles focus trap and Escape key dismissal by default).

**HeroSection:**

| Viewport | Behavior |
|---|---|
| Desktop (1280px+) | `min-h-[100dvh]`. Text block: `position: absolute; bottom: clamp(48px, 8vh, 120px); left: 80px`. Headline: `clamp(2.5rem, 5.5vw, 7rem)`. |
| Tablet (768–1279px) | Same position. Headline: intermediate clamp value (~5rem max). |
| Mobile (<768px) | Text block: `position: absolute; bottom: 48px; left: 24px; right: 24px`. Headline: `clamp(2.5rem, 7vw, 3.5rem)` (larger relative to viewport because smaller viewport). |

Mobile hero image: Different crop. Portrait orientation (3:4 or 9:16) via `<picture>` element with `media="(max-width: 767px)"` source. The architectural subject is tighter, more intimate. The surface material must be prominently visible even at mobile crop.

**BrandStatementSection:**

| Viewport | Behavior |
|---|---|
| Desktop (1280px+) | `min-height: 65vh`. Text: `max-width: 45ch; margin: 0 auto`. Display size. |
| Tablet | `min-height: 55vh`. Text: `max-width: 50ch`. |
| Mobile | `min-height: 50vh`. Text: full-width with 24px horizontal padding. `max-width: none`. |

**CollectionsPreviewSection:**

Fully documented in Grid System section above.

Additional responsive behavior:
- Section headline on mobile: `font-size: clamp(1.5rem, 5vw, 2rem)`.
- "Tüm Koleksiyonlar →" link: always right-aligned, always visible. On mobile, full-width with text right-aligned.

**FeaturedProjectSection:**

Fully documented in Grid System section above.

Additional: On tablet and mobile, after the last project image, a button "Tüm Projeler →" appears below the images. On desktop, this link is in the pinned left column.

**SpaceExplorerSection:**

| Viewport | Columns | Gap |
|---|---|---|
| Desktop (1280px+) | 3 | 16px |
| Tablet (768–1279px) | 3 | 12px |
| Mobile (<768px) | 2 | 8px |

Section headline responsive sizing: `clamp(1.5rem, 3vw, 3rem)`.

**CraftTrustSection:**

| Viewport | Layout |
|---|---|
| Desktop (1280px+) | 12-column grid: 6-col narrative + 1-col gap + 5-col data. Side by side. |
| Tablet + Mobile | flex-direction: column. Narrative first, data below, certification strip last. Gap: 64px between stacked elements. |

Count-up animation: Functions identically at all viewports.

Certification logos strip: `display: flex; flex-wrap: wrap; gap: 32px; align-items: center`. 
On mobile: logos wrap to 2–3 per row.

**DualCtaSection:**

| Viewport | Layout |
|---|---|
| Desktop (1280px+) | flex-direction: row. Two panels equal width. Vertical divider. |
| Tablet (768–1279px) | flex-direction: row (still fits). Divider maintained. |
| Mobile (<768px) | flex-direction: column. Horizontal divider between panels. Consumer panel first. |

---

## SECTION 6: EXACT COMPONENT RELATIONSHIPS

### Component Tree (Exhaustive)

```
layout.tsx (Server Component)
├── next/font configuration (displayFont, bodyFont — CSS variables injected)
├── MotionContextProvider (Client Component — at root layout level)
│   └── reads window.matchMedia('(prefers-reduced-motion: reduce)')
│   └── exports: { prefersReducedMotion: boolean }
├── Navigation (Client Component)
│   └── reads: window.scrollY via passive scroll listener
│   └── state: { isScrolled: boolean }
│   └── renders: Logo | NavLinks | CtaButton | MobileMenu (dialog)
└── {children}

app/page.tsx (Server Component)
└── fetches: collections(6), featuredProject(1), spaces(6) in parallel
└── renders:
    HeroSection (Client Component — Motion animation)
    BrandStatementSection (Client Component — Motion animation)
    CollectionsPreviewSection (Client Component — Motion animation)
    │   props: { collections: Collection[] }
    │   └── CollectionTile (Client Component) × 6
    │       props: { collection: Collection; index: number; gridPosition: TilePosition }
    FeaturedProjectSection (Client Component — GSAP + Motion)
    │   props: { project: FeaturedProject }
    │   └── consumes: MotionContext (for prefersReducedMotion)
    │   └── manages: GSAP instance via dynamic import
    SpaceExplorerSection (Client Component — Motion animation)
    │   props: { spaces: Space[] }
    │   └── SpaceTile (Client Component) × 6
    │       props: { space: Space; index: number }
    CraftTrustSection (Client Component — Motion + CountUp)
    │   └── CountUpNumber (Client Component, isolated)
    │       props: { value: number; suffix?: string; duration?: number }
    DualCtaSection (Client Component — Motion animation)
```

### Data Types

```typescript
type Collection = {
  id: string;
  name: string;            // Turkish collection name
  category: string;        // Effect category (e.g., "Mermer Efekti")
  heroImageUrl: string;    // Editorial photography URL
  slug: string;            // For link to collection detail page
  projectCount?: number;   // Optional project count for micro-metadata
}

type FeaturedProject = {
  id: string;
  name: string;            // Project name
  typology: string;        // e.g., "Konut Projesi"
  location: string;        // City, Country
  year: number;
  architectCredit: string; // Architect or firm name
  collectionUsed: {
    name: string;
    slug: string;          // For accent-colored link
  };
  description: string;     // 50-60 words maximum
  images: string[];        // 4–6 image URLs, in reveal order
}

type Space = {
  id: string;
  name: string;            // e.g., "Banyo", "Mutfak", "Salon"
  invitation: string;      // 4–6 word invitation text
  heroImageUrl: string;    // Full-room architectural photography
  slug: string;            // For link to space detail page
}
```

### Context API

```typescript
// Created in layout.tsx, consumed by any component that needs it
const MotionContext = React.createContext<{
  prefersReducedMotion: boolean;
}>({
  prefersReducedMotion: false, // Safe default for SSR
});

// Hook for consuming components
function useMotionContext() {
  return React.useContext(MotionContext);
}
```

### Props Design Rules

1. No component receives more than 5 meaningful props (excluding standard HTML attributes and ref).
2. Animation behavior is NOT controlled through props — it is determined internally by the component based on `MotionContext`.
3. CMS data is passed as typed objects, never as raw API response shapes.
4. Grid position information is passed to tiles (e.g., `index: number`) so the tile can calculate its own stagger delay. The parent section does not manage individual tile animation timing.

---

## SECTION 7: EXACT VISUAL HIERARCHY

### Design Token File Structure

All tokens defined as CSS custom properties in `:root`. This is the SINGLE source of truth for all colors.

```css
:root {
  /* ─── Dark palette (authority sections) ─────────────── */
  --ds-ink-900: oklch(8% 0 0);      /* Near-black primary background */
  --ds-ink-800: oklch(12% 0 0);     /* Slightly lighter dark (Dual CTA panels) */
  --ds-ink-700: oklch(18% 0 0);     /* Dark surface elevation */

  /* ─── Light palette (discovery sections) ─────────────── */
  --ds-surface-100: oklch(97% 0 0); /* Near-white primary background */
  --ds-surface-200: oklch(94% 0 0); /* Subtle surface tint */

  /* ─── Text colors ─────────────────────────────────────── */
  --ds-text-on-dark: oklch(95% 0 0);         /* Body text on dark backgrounds */
  --ds-text-muted-on-dark: oklch(65% 0 0);   /* Secondary text on dark */
  --ds-text-on-light: oklch(18% 0 0);        /* Body text on light backgrounds */
  --ds-text-muted-on-light: oklch(45% 0 0);  /* Secondary text on light */

  /* ─── Accent (used ≤5 times on the page) ─────────────── */
  --ds-accent: [SELECTED AFTER FONT TEST];   /* To be determined in Phase 0 */
  --ds-accent-hover: [LIGHTER VARIANT];

  /* ─── Borders ─────────────────────────────────────────── */
  --ds-border-dark: rgba(255, 255, 255, 0.15);  /* Hairline on dark surfaces */
  --ds-border-light: rgba(0, 0, 0, 0.12);       /* Hairline on light surfaces */

  /* ─── Typography ──────────────────────────────────────── */
  --font-display: [next/font CSS variable];
  --font-body: [next/font CSS variable];

  /* ─── Motion ─────────────────────────────────────────── */
  --ease-material: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-quick: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

**Accent color selection criteria** (confirmed in Phase 0 browser test):
- Not warm. Not orange, amber, or gold — these push toward the rejected warm-beige palette.
- Not cool purple or blue — generic AI/SaaS signal.
- Candidates: A specific warm terracotta (not clay), a specific slate blue (not navy), a deep sage, a single saturated architectural tone. The accent must be muted enough (saturation < 70%) that it reads as considered, not shouted.
- The accent appears on: navigation CTA, collection tile hover underline, featured project collection credit, accent detail in dual CTA section. Five instances or fewer.

---

### Visual Hierarchy Per Section

**HeroSection:**
- Layer 0 (background): Full-bleed photography — fills 100% of the section
- Layer 1: Gradient overlay — `linear-gradient(to top, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0) 55%)` — covers bottom 55% of image, full opacity at bottom
- Layer 2: Text block — headline, subtext, CTA button
- Layer 3: Navigation (z-40, above everything)

Hero text block internal hierarchy:
1. `h1` — display scale — the largest text on the entire page
2. `p` — body text, `max-width: 45ch` — maximum one sentence
3. `button.nav-cta` — the only filled accent-color button on the page

**BrandStatementSection:**
The section contains ONLY the text. Nothing else.
1. Multi-line display-scale text — 2–4 sentences total, split into `motion.p` elements for stagger

No sub-hierarchy. The text IS the section.

**CollectionsPreviewSection:**
1. Section label (optional, very small — used here as one of the two permitted label instances on the homepage): `"Koleksiyonlar"` in Label typography, left-aligned above the headline
2. Section headline — display-small scale
3. Collections grid (asymmetric 12-col as specified)
4. Per tile: photography → name → category label
5. "Tüm Koleksiyonlar →" text link — below grid, right-aligned

**FeaturedProjectSection:**
Left column (top to bottom):
1. Typology label (Label typography: `"KESİTLER"` or `"KESİT PROJE"`) — very small, uppercase, tracked
2. Project name (display-small) — the section's headline
3. Location, Year (body, muted) — on one line
4. Architect credit (body) — one line
5. Collection used (body, accent color) — linked
6. Project description (body) — 50-60 words, 2 paragraphs
7. "Tüm Projeler →" (text link, body-small) — at bottom of column

Right column:
1. Current project image — fills the column completely. No caption. No label. The image is self-sufficient.

**SpaceExplorerSection:**
1. Section headline — left-aligned, display-small scale. Questions the visitor directly.
2. 6-tile even grid
3. Per tile: photography → space name → invitation text (4-6 words, body-small, below name)

**CraftTrustSection:**
Left column (narrative):
1. Section headline — sub-heading scale
2. Body paragraphs — 2 paragraphs, 50 words max combined
3. No CTA, no list items, no bullet points — flowing prose only

Right column (data):
1. 4–6 data points, each consisting of:
   - Large number (display-small — the CountUpNumber)
   - One-line label below (Label typography)
2. Each data point separated by `64px` gap

Below both columns (full width):
3. Certification strip — `display: flex; flex-wrap: wrap; gap: 32px` — certification logos/wordmarks at uniform height

**DualCtaSection:**
Left panel:
1. Role indicator (micro-label, 2px accent underline above it)
2. Panel headline (display-small)
3. One-line descriptor (body)
4. Ghost CTA button

Right panel: Mirror structure.

Divider: `1px` vertical rule in `--ds-border-dark` between panels.

---

## SECTION 8: EXACT IMPLEMENTATION ORDER

### Phase 0: Foundation (Before Any Page Component)

These steps MUST be completed and browser-verified before any section component is written.

**Step 0.1 — Font Selection and Test**
Action: Select display and body typefaces. Configure in `next/font`. Create a single test page (`/font-test`) with:
- Display text at 7rem, 4.5rem, 3rem on `--ds-ink-900` background
- Display text at 7rem, 4.5rem, 3rem on `--ds-surface-100` background
- Body text at 18px, 16px on both backgrounds
- Turkish characters: `Ş ş Ğ ğ İ ı Ö ö Ü ü Ç ç`

Acceptance criteria: The display type at 7rem on dark background must feel architectural, not friendly. The body type must be legible and complement the display without competing. Turkish characters must render correctly without fallback to system fonts.

Delete `/font-test` after selection confirmed.

**Step 0.2 — Design Token File**
Action: Create `app/globals.css` with all CSS custom properties as defined in Section 7. The accent color placeholder is left as a comment until the font test in Step 0.1 is reviewed alongside the photography — the accent must be tested against both the typography and the actual architectural photography.

**Step 0.3 — MotionContextProvider**
Action: Create `components/providers/MotionContextProvider.tsx`. Implement as a Client Component in the root layout. Test that `prefersReducedMotion` reads correctly from `window.matchMedia`.

**Step 0.4 — Base Layout**
Action: Configure the page wrapper (`overflow-x: hidden`), the section container pattern (`.section-shell` class), and the Z-index system in `globals.css`.

**Step 0.5 — Navigation**
Action: Build the Navigation component completely — both desktop and mobile states. Test scroll behavior (transparent → frosted at 80px). Test mobile overlay with stagger animation. Test focus management (Escape closes mobile overlay, focus returns to hamburger button).

Navigation must be complete before any section because it overlays every section. Its frosted glass behavior must be verified against the hero photography.

---

### Phase 1: Sections (Top to Bottom, No GSAP)

Each section is built, reviewed in browser at all three breakpoints, and approved before the next begins.

**Step 1.1 — HeroSection**

Build order within the section:
1. Full-bleed `next/image` with `priority` flag. Confirm LCP performance in Lighthouse.
2. Gradient overlay.
3. Text block with headline, subtext, CTA.
4. Clip-path reveal animation on headline (Motion library).
5. CTA button hover state.

Acceptance criteria: At 1440px desktop, the hero feels like the opening frame of an architectural documentary — the photography is the experience, the text arrives with purpose. The LCP measurement (via Lighthouse) must show < 2.0s on 4G mobile simulation.

**Step 1.2 — BrandStatementSection**

Build order:
1. Dark background continuation (verifies the dark-to-dark transition from hero).
2. Text block centered with `max-width: 45ch`.
3. Split text into `motion.p` elements for stagger reveal.
4. Test that the transition from HeroSection to BrandStatementSection reads as ONE continuous dark zone, not as two separate sections.

Acceptance criteria: The section must feel confident in its emptiness. If it feels sparse or empty in a negative way, the type size or weight must be adjusted — not the padding.

**Step 1.3 — CollectionsPreviewSection + CollectionTile**

Build order:
1. Light background (verifies the first dark-to-light transition on the page).
2. Section headline.
3. The 12-column asymmetric grid (CSS only — no images yet, just colored boxes to verify the proportions).
4. Integrate `next/image` into each tile position.
5. Add tile names and category labels below each image.
6. Add hover states (CSS transitions).
7. Add stagger entry animation (Motion library).
8. Add "Tüm Koleksiyonlar →" link.
9. Verify tablet 2-column collapse.
10. Verify mobile single-column stack.

Acceptance criteria: The featured tile (Tile A) must visually dominate without being assigned a label or badge indicating its status. Size alone creates the hierarchy. The hover states must be subtle — a visitor should be able to hover without feeling the page is performing for them.

**Step 1.4 — SpaceExplorerSection + SpaceTile**

Build order:
1. Light background (this is the second light section — verify it reads as a fresh space, not as a continuation of the collections section).
2. Section headline.
3. 3×2 grid.
4. SpaceTile components with photography.
5. Space name and invitation text below each tile.
6. Hover states.
7. Stagger entry animation.
8. Mobile 2×3 collapse.

**Step 1.5 — CraftTrustSection**

Build order:
1. Dark background (verifies the light-to-dark transition after Space Explorer).
2. 12-column grid with visual gap column.
3. Narrative text column (left).
4. Data points column (right) — first with placeholder numbers.
5. CountUpNumber component for each data point.
6. Certification strip.
7. Verify that the section feels factual, not promotional. If it feels like it's selling, the copy is the issue, not the layout.

**Step 1.6 — DualCtaSection**

Build order:
1. Dark background (slightly lighter than --ds-ink-900 — use --ds-ink-800).
2. Full-width two-panel layout.
3. Panel content (role indicator, headline, descriptor, ghost CTA button).
4. Vertical divider between panels.
5. Accent details (2px lines above role indicators).
6. Ghost button hover states.
7. Panel stagger entry animation.
8. Mobile vertical stacking.

---

### Phase 2: FeaturedProjectSection (GSAP)

Built last, after all other sections are complete and stable.

**Step 2.1 — Static structure (no GSAP)**
Left column with `position: sticky; top: 0`. Right column with all images stacked. First image visible, all others `opacity: 0`. Verify the visual structure is correct at desktop and that the mobile fallback (standard scroll) works completely.

**Step 2.2 — GSAP async import**
Implement the dynamic import with IntersectionObserver guard. Verify GSAP is NOT in the initial bundle (check with Next.js bundle analyzer). Verify GSAP IS loaded and initialized when the section enters the viewport.

**Step 2.3 — ScrollTrigger pin**
Implement the pin. Test that the left column remains fixed while the right column scrolls. Test pinSpacing behavior (the page does not collapse when the pin is active). Test the pin's start and end positions at exactly the viewport edges.

**Step 2.4 — Image timeline**
Implement the crossfade timeline. Test with real photography (not placeholders). Tune the scrub value (starting at 1, adjusting if the lag feels wrong with the actual images — photography with less visual change requires less scrub lag, photography with dramatic difference can use more).

**Step 2.5 — Reduced motion and mobile fallback**
Enable `prefers-reduced-motion` emulation in browser devtools. Verify the pin is completely absent and images display as a standard vertical sequence. Test on actual mobile device (not just viewport simulation) to verify no residual GSAP behavior.

---

### Phase 3: Cross-Browser and Performance Validation

**Step 3.1 — Chrome (desktop and mobile simulation)**
Primary development browser. Should be correct at this point.

**Step 3.2 — Safari (macOS desktop)**
Test `backdrop-filter` on the navigation — Safari's implementation has specific prefix requirements (`-webkit-backdrop-filter`). Test `clamp()` typography — Safari handles it correctly but verify. Test the GSAP pin — Safari has specific behavior with `position: sticky` within pinned elements.

**Step 3.3 — Firefox (desktop)**
Firefox does not support `backdrop-filter` by default in older versions (this changed in Firefox 103). Verify the frosted navigation degrades gracefully (solid dark background instead of frosted blur) on older Firefox versions.

**Step 3.4 — Physical mobile device**
Test on an actual iPhone (iOS Safari) and Android (Chrome mobile). The `100dvh` usage must prevent the viewport jump when the URL bar appears/disappears. The GSAP pin must be absent (the desktop-only guard must work correctly). Touch targets must meet 48px minimum.

**Step 3.5 — Lighthouse audit (4G mobile throttling)**
Targets: LCP < 2.0s, INP < 200ms, CLS < 0.05, Performance score 90+. If LCP fails, the hero image optimization strategy is revisited (different size, different quality, different format). If CLS fails, image dimension declarations are verified.

**Step 3.6 — Accessibility audit**
Run axe DevTools (or equivalent) on the complete page. All WCAG AA violations must be resolved. WCAG AAA violations are reviewed and resolved where achievable without visual compromise.

---

### Phase 4: Quality Gate

The homepage is declared complete only when all 7 quality gates pass:

**Gate 1 — The Stop Test:** Show the homepage to someone unfamiliar with the project. Do they stop scrolling within 3 seconds of landing on the hero? If no: the hero photography or the headline is insufficient.

**Gate 2 — The Dark Zone Test:** Does the transition from hero → brand statement read as ONE deliberate dark zone, or as two separate sections? If two separate sections: the visual continuity between them needs adjustment.

**Gate 3 — The Grid Test:** Is the collections grid obviously asymmetric in a way that creates editorial hierarchy? Is one collection obviously featured without needing a badge? If no: the grid proportions need adjustment.

**Gate 4 — The Cinematic Test:** Does the GSAP featured project pin feel cinematic, or does it feel like a technical demonstration? If technical: the scrub value, image quality, or left column content needs adjustment.

**Gate 5 — The Recognition Test:** Does the space explorer make the visitor feel seen (their context is represented)? If no: the space photography is wrong (it is too architectural, not domestic enough for the homeowner).

**Gate 6 — The Trust Test:** Does the craft section feel like fact or like marketing? If marketing: the copy is too promotional. The layout and design cannot fix copy that lacks specificity.

**Gate 7 — The Luxury Test:** Inspect any 3 random sections of the page. Does the white/dark space feel luxurious, or does it feel empty? If empty: the photography is not strong enough to justify the surrounding negative space. If luxurious: the implementation is correct.

---

## IMPLEMENTATION ORDER SUMMARY

```
Phase 0 (Foundation)
├── 0.1 Font selection + browser test
├── 0.2 Design token file (globals.css)
├── 0.3 MotionContextProvider
├── 0.4 Base layout configuration
└── 0.5 Navigation (complete)

Phase 1 (Sections, no GSAP)
├── 1.1 HeroSection + LCP validation
├── 1.2 BrandStatementSection
├── 1.3 CollectionsPreviewSection + CollectionTile
├── 1.4 SpaceExplorerSection + SpaceTile
├── 1.5 CraftTrustSection + CountUpNumber
└── 1.6 DualCtaSection

Phase 2 (GSAP)
├── 2.1 FeaturedProjectSection — static structure
├── 2.2 GSAP async import + guard
├── 2.3 ScrollTrigger pin
├── 2.4 Image crossfade timeline (real photography)
└── 2.5 Reduced motion + mobile fallback

Phase 3 (Validation)
├── 3.1 Chrome
├── 3.2 Safari
├── 3.3 Firefox
├── 3.4 Physical mobile device
├── 3.5 Lighthouse audit
└── 3.6 Accessibility audit

Phase 4 (Quality Gates)
└── All 7 gates must pass before declaring complete
```

---

*This strategy is locked. Deviations during implementation require documented justification.*
*The documents VISUAL_DIRECTION.md, HOMEPAGE_BLUEPRINT.md, and IMPLEMENTATION_MANIFESTO.md govern all decisions not covered here.*
*Begin Phase 0, Step 0.1: Font selection.*
