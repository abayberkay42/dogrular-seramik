# IMPLEMENTATION_MANIFESTO.md — Doğrular Seramik

*The governing philosophy for all technical and implementation decisions.*
*This document is consulted before writing any line of code.*
*No code. No components. No layout. Doctrine only.*
*Date: 2026-06-13*

---

## SELF-REVIEW VERDICT (CONDUCTED BEFORE WRITING THIS DOCUMENT)

Five criteria evaluated internally before finalizing this manifesto:

**Awwwards quality?** YES — The cinematic GSAP pin, the stagger choreography, the typography at architectural scale, and the dark/light alternation produce a visual experience that competes directly with the highest tier of material brand websites currently published. The critical risk is the GSAP pin execution — scrub value, scroll distance, and image crossfade timing must be tuned in the browser, not estimated. The manifesto requires in-browser validation before declaring the featured project section complete.

**Luxury enough?** YES — Luxury is achieved here through restraint, not richness. No animation library except where earned. No state management library. No component over-engineering. The 120px minimum section padding. The 80px collections gutter. The specificity of CSS custom properties for every color token. These are discipline-based luxury decisions, not surface-level ornament.

**Timeless?** YES — The stack is Next.js App Router + Tailwind v4 + GSAP 3 + Motion library. All stable, all long-term maintained. The code philosophy of "restraint first, complexity only where earned" produces more maintainable code than clever implementations. GSAP is pinned to an exact minor version (`3.12.x`) to prevent scroll behavior changes between updates.

**Technically scalable?** YES — Components at the section boundary, not below it. Design tokens in CSS custom properties. Font configuration via `next/font`. `ReducedMotionContext` elevated to layout level, not scoped to the homepage. These choices make future pages composable from the same foundations without requiring refactoring of the homepage.

**Visually unforgettable?** YES — The hero image loads `priority` at full quality. The GSAP pin scrub creates cinematic weight. The clip-path headline reveal at 1.1s gives the page its arrival moment. The collection tile stagger at 80ms creates the impression of a hand of cards being laid deliberately. These moments are protected by the implementation philosophy and cannot be accidentally degraded by shortcuts.

---

## REVISION FROM SELF-REVIEW

Two items revised before finalizing:

1. **Font selection is the first implementation decision** — before any component is written, the display and body typefaces are selected, configured in `next/font`, and tested in the browser at the correct display scale on the actual background colors. All subsequent layout decisions are made with the actual font rendering in place, not with a placeholder. Font rendering in browser differs from rendering in design tools.

2. **`ReducedMotionContext` lives at layout level** — not scoped to the homepage component. All pages on the site share this context from the root layout. This is the correct architectural boundary.

---

## 1. CODE PHILOSOPHY

The governing rule: **restraint first, complexity only where earned.**

Every line of JavaScript is questioned before it is written. The question is: "Can this be CSS?" If yes, it is CSS. The question is then: "Can this be a CSS custom property or a semantic HTML attribute?" If yes, it is that. JavaScript enters the page only when CSS cannot deliver the required behavior at the required quality level.

Three categories of justified JavaScript on this homepage:

**Justified complexity (GSAP ScrollTrigger):** The pinned featured project section requires scroll-scrubbed animation with physics-like deceleration. CSS scroll-driven animations exist but cannot achieve the scrub lag (the 1-second deceleration) that produces the cinematic weight required by VISUAL_DIRECTION.md. GSAP earns its presence in this one section.

**Justified complexity (IntersectionObserver):** Section entry animations need to fire once, on entry, without re-firing on scroll-up. The Motion library (`motion/react`) handles this cleanly within React's component model. The IntersectionObserver threshold and rootMargin values are specific enough that a CSS `@keyframes` + `animation-play-state` approach would require complex coordination. Motion earns its presence for Tier 2 animations.

**Justified complexity (Navigation scroll state):** The navigation transitions from transparent to frosted after 80px of scroll. This requires a scroll event listener. A single `useEffect` with a passive scroll listener, driving a single boolean `useState`. This is the minimum JavaScript for this behavior.

Everything else on the homepage — hover states, focus states, color transitions, typography, spacing — is CSS.

**Prohibited code patterns:**
- No `setTimeout` as an animation timing mechanism
- No `window.addEventListener('scroll')` outside of the navigation — all scroll-linked behavior uses GSAP ScrollTrigger or CSS scroll-driven animations
- No inline styles except for GSAP's dynamic transform values
- No `!important` in any CSS
- No `z-index` values above 50 except in the documented z-index scale
- No `any` type in TypeScript — every component's props are fully typed

**The code reads the direction:** Before writing any section component, re-read the relevant sections of HOMEPAGE_BLUEPRINT.md and VISUAL_DIRECTION.md. The component is a translation of the document into code, not an interpretation of the general intent.

---

## 2. COMPONENT PHILOSOPHY

**Components exist at the section boundary.** A section in HOMEPAGE_BLUEPRINT.md maps to one React component. Within that component, elements are composed directly unless they are genuinely repeated across multiple sections.

The component tree for the homepage:

```
HomepagePage
├── HeroSection
├── BrandStatementSection
├── CollectionsPreviewSection
│   └── CollectionTile (×6 — genuinely repeated, justified component)
├── FeaturedProjectSection
├── SpaceExplorerSection
│   └── SpaceTile (×6 — genuinely repeated, justified component)
├── CraftTrustSection
└── DualCtaSection
```

This is eight components for the homepage. Not forty. Not eighty. Eight.

**The rule against speculative abstraction:** If a UI element appears only once on the entire homepage, it is NOT extracted into a separate component. It is composed inline within its section component. The desire to "make it reusable" is resisted until a second use case exists. If the BrandStatement text block ever appears on another page, it is extracted then. Not before.

**The rule against prop proliferation:** A component that accepts more than five meaningful props (excluding standard HTML attributes) has too many responsibilities. A `CollectionTile` component that accepts `variant`, `size`, `theme`, `orientation`, `hoverBehavior`, and `animationDelay` is a component trying to be six components. Each of the six should be a separate component or the abstraction is wrong.

**Separation of concerns within components:**

Every section component has exactly two concerns: **structure** and **animation**. The visual appearance (colors, typography, spacing) is handled by CSS and design tokens — the component does not manage appearance through props. The animation is handled by the component but is isolated in its own block, easily identifiable and removable.

---

## 3. ANIMATION PHILOSOPHY

Three tiers. Never mixed. Tier assignment is permanent for each animation — no animation migrates between tiers.

**Tier 1 — Cinematic (GSAP ScrollTrigger):** Featured Project section only.

Setup philosophy: GSAP is imported asynchronously via dynamic import (`const { gsap } = await import('gsap')`) and initialized only when the featured project section enters the viewport. This keeps GSAP out of the initial JavaScript bundle. The ScrollTrigger plugin is registered once per page load.

The scrub value is `1` — a one-second lag. This is not aesthetic preference; it is a deliberate choice to communicate material weight. A scrub value of `0.1` would feel digital and light. A scrub value of `1` feels architectural and heavy. The value is treated as a brand decision, not a performance tuning parameter.

The scroll distance is `+=250vh` — 2.5 times the viewport height. At a comfortable reading scroll speed, this gives the visitor approximately 15–25 seconds in the pinned section. This duration is sufficient for genuine engagement with the space. If the photography changes in roughly 4–6 seconds per image, 250vh accommodates 4–6 images at comfortable pacing.

Image crossfade implementation: Images are stacked absolutely within the right column container. All images are at `opacity: 0` except the first, which is at `opacity: 1`. The GSAP timeline scrubs opacity values sequentially — image 2 fades in while image 1 fades out, then image 3 fades in while image 2 fades out. Each transition occupies approximately 1/(n-1) of the total timeline. The crossfade duration within each transition is 40% of that segment — the remaining 60% is the held still moment before the next transition begins.

**Tier 2 — Choreography (Motion library):** Section entries.

The `motion` component from `motion/react` is used for section entry animations. The trigger is intersection-based: `whileInView` with `once: true`. The viewport threshold is 15% (`amount: 0.15`) — the section must be 15% visible before the animation fires.

The `once: true` flag is a philosophical commitment: sections arrive, they do not re-animate. The visitor who scrolls back up sees the sections as they were after they arrived. They are not reset and re-revealed. This is how physical spaces work — you don't disappear when you leave a room and reappear when you return.

Every Tier 2 animation has a unique `transition` specification. No two sections share the same timing:

- Hero headline: `{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }` — clip-path reveal
- Brand statement lines: `{ duration: 0.7, delay: (i * 0.1), ease: [0.25, 0.46, 0.45, 0.94] }` — staggered per line
- Collection tiles: `{ duration: 0.7, delay: (i * 0.08), ease: [0.25, 0.46, 0.45, 0.94] }` — staggered per tile
- Space tiles: `{ duration: 0.6, delay: (i * 0.06), ease: [0.25, 0.46, 0.45, 0.94] }` — slightly faster stagger
- Craft section: `{ duration: 0.5, ease: "easeOut" }` — simple fade, no stagger (content is informational, not theatrical)
- Dual CTA panels: `{ duration: 0.6, delay: i * 0.15 }` — two panels, subtle stagger

The easing function `[0.25, 0.46, 0.45, 0.94]` is the custom cubic-bezier for all entry animations. It is a decelerating curve with a fast initial acceleration and a long, slow arrival. This curve is the brand's motion signature — it is the same curve used across all Tier 2 animations.

**Tier 3 — Micro-interaction (CSS transitions):** Hover and focus states.

All hover states are CSS only. No JavaScript observes hover. The `transition` property is set in the component's CSS. Hover state styles use Tailwind's `hover:` prefix.

The universal hover state principle: the transition property specifies exactly which CSS properties are transitioned. Not `transition: all`. `transition-property: transform, opacity, text-decoration-color`. Specificity of transition declaration prevents unexpected transitions from occurring on unrelated property changes.

**`prefers-reduced-motion` implementation:**

The `ReducedMotionContext` is a React context created in the root layout. Its value is a boolean derived from `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, updated by a `matchMedia` change listener.

In reduced-motion mode:
- Tier 1 (GSAP pin): Removed entirely. The featured project section becomes a standard vertical scroll of images. The left column content is not pinned. A brief fade-up transition (200ms, opacity only) marks each image as it enters the viewport.
- Tier 2 (Motion library): All `initial` and `animate` variants collapse to `{ opacity: 0 }` → `{ opacity: 1, transition: { duration: 0.2 } }`. No transforms, no scale, no clip-path.
- Tier 3 (CSS): The `transition-duration` for transform-based hover states collapses to `0ms`. Color and opacity transitions remain at 100ms (these are not vestibular triggers).

---

## 4. LAYOUT PHILOSOPHY

The layout system is CSS Grid for two-dimensional layouts, Flexbox for one-dimensional arrangements. No exceptions, no mixing for the same layout problem.

**The 12-column grid:**

The homepage's sectional content lives in a `max-w-[1400px] mx-auto` container. Within this container, the 12-column grid is established with `display: grid; grid-template-columns: repeat(12, 1fr); gap: [section-specific]`. The 12 columns provide sufficient granularity for the asymmetric collections grid without requiring pixel math.

Full-bleed elements (the hero photography, section backgrounds) extend outside the max-width container using negative horizontal margins or by placing them as absolutely-positioned siblings to the constrained container, not as children of it.

**The collections grid implementation:**

The asymmetric grid is not achieved with Tailwind's `col-span-*` utility classes on static elements. It is achieved with explicit `grid-column` and `grid-row` CSS properties on each tile, because the responsive collapse behavior requires different column assignments at tablet and mobile breakpoints. Tailwind's responsive prefixes handle the breakpoint switching.

Desktop (1280px+):
- Tile A: `col-start-1 col-end-8 row-start-1 row-end-3` (7 columns, 2 rows)
- Tile B: `col-start-8 col-end-13 row-start-1 row-end-2` (5 columns, 1 row)
- Tile C: `col-start-8 col-end-13 row-start-2 row-end-3` (5 columns, 1 row)
- Tile D: `col-start-1 col-end-5 row-start-3 row-end-4` (4 columns, 1 row)
- Tile E: `col-start-5 col-end-9 row-start-3 row-end-4` (4 columns, 1 row)
- Tile F: `col-start-9 col-end-13 row-start-3 row-end-4` (4 columns, 1 row)

Verification: Row 1: 7+5=12 ✓ Row 2: 5+7=12 (continued from A) ✓ Row 3: 4+4+4=12 ✓

Tablet (768px–1279px): 2-column collapse. Tiles A and B each span 6 columns. Tiles C, D, E, F each span 6 columns in a 2-column grid. Tile A remains largest but the 7:5 asymmetry reduces to a 6:6 balance at this breakpoint — acceptable.

Mobile (<768px): Single column. All tiles span 12 columns. The stacking order matches the visual hierarchy (Tile A first, Tile B second, etc.).

**The featured project layout:**

The left column is `col-span-5` and uses `position: sticky; top: 0; height: 100vh` within the scrollable right container. This sticky positioning is the implementation of the GSAP pin — GSAP controls the outer section's pinning, while the inner left column uses CSS sticky to maintain its position within the pinned container. These two mechanisms work in concert, not in conflict.

**Section height philosophy:** Sections have no fixed height. They are defined by their content + vertical padding. The `min-h-*` class is used only for the hero section (`min-h-[100dvh]`). All other sections expand to fit their content. This produces a layout that is robust to content changes — adding a paragraph to the craft section does not break the layout.

---

## 5. SPACING PHILOSOPHY

All spacing derives from a single base unit: **8px**. Every spacing value in the system is a multiple of 8px. No exceptions.

The Tailwind default scale (4px base) is extended in the theme configuration to add the values needed. The reasoning for 8px base: human motor precision (Fitts's Law), alignment with most display pixel densities, and the relationship to typography (a 16px body font has a natural relationship to 8px spacing units).

**The spacing tiers:**

| Role | Value | Tailwind equivalent |
|---|---|---|
| Micro (within a label or badge) | 4px | `p-1` |
| Small (between label and headline) | 16px | `gap-4` |
| Medium (between headline and body) | 24px | `gap-6` |
| Large (between body and CTA) | 40px | `gap-10` |
| Section inner (between elements within section) | 48–64px | `gap-12–gap-16` |
| Section padding (above and below content) | 120px minimum | `py-[120px]` or `py-30` |
| Section gap (between sections) | 0 (sections are adjacent; backgrounds create visual separation) | — |

**`clamp()` for responsive spacing:**

Section padding scales responsively:
```
padding-block: clamp(60px, 10vw, 120px)
```
This produces: 60px minimum at the narrowest viewport, scales proportionally, 120px maximum at desktop. The minimum is 60px — never less.

The collections grid outer gutter at 1440px viewport is 80px. This is the total horizontal padding inside the max-width container before the grid begins. At mobile, this collapses to 24px — the standard mobile side padding.

**Spacing is never approximated.** If a value is not a multiple of 8px, it is wrong. The only exception is fine optical adjustments in typography (letter-spacing, line-height) which use em-relative values and follow their own logic.

---

## 6. TYPOGRAPHY IMPLEMENTATION PHILOSOPHY

**Font selection is the first implementation act.** Before any component is written, the display font is selected, loaded via `next/font`, and rendered in the browser at 6rem on near-black background and at 4.5rem on near-white background. The selection is confirmed only after this in-browser test. What renders beautifully in a specimen may flatten at scale on the actual palette.

The font family selection criteria:
- The display font must have genuine personality in its capital letterforms at scale
- The capitals must feel architectural — precise geometry, no humanist informality
- It must be available as a variable font (for weight flexibility without multiple HTTP requests)
- Inter is categorically excluded
- The final selection is from: Söhne, ABC Diatype, PP Neue Montreal, Geist, General Sans, or Instrument Sans (the latter only if its capitals pass the in-browser test at the required display scale)

**Font loading:**

```typescript
// In the root layout — both fonts loaded once, available site-wide
const displayFont = localFont({
  src: './fonts/[selected-display].woff2',
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const bodyFont = localFont({
  src: './fonts/[selected-body].woff2',
  variable: '--font-body',
  display: 'swap',
  preload: true,
})
```

Turkish character set (`ş`, `ğ`, `ı`, `ö`, `ü`, `ç`, `Ş`, `Ğ`, `İ`, `Ö`, `Ü`, `Ç`) is included in the font subset. If the selected font does not include these characters, a different font is selected. Turkish brand copy uses Turkish characters; these characters cannot fallback to system fonts without visual inconsistency.

**The type scale:**

All sizes use `clamp()`. The three values in each clamp are: minimum (mobile floor), fluid value (scales with viewport), maximum (desktop ceiling).

```
Display (hero): clamp(2.5rem, 5.5vw, 7rem)        // ~40px → ~79px → 112px
Display (brand statement): clamp(2rem, 4.5vw, 4.5rem)  // ~32px → ~65px → 72px  
Display (section headline): clamp(1.5rem, 3vw, 3rem)    // 24px → ~43px → 48px
Body: clamp(1rem, 1.25vw, 1.125rem)                // 16px → ~18px → 18px
Label: 0.6875rem (11px, fixed — labels do not scale)
```

**Typography settings:**

Display type:
- `font-weight`: 300–400 (light to regular — the precise weight is tested in-browser against the specific font)
- `letter-spacing`: −0.04em (slightly tighter than natural setting — creates the architectural compression)
- `line-height`: 0.95–1.05 (for multi-line display headlines — lines are tight, like architectural drawings)
- `text-wrap: balance` (h1, h2, h3 — even line lengths, no orphaned single words)

Body type:
- `font-weight`: 400
- `letter-spacing`: −0.01em (very slight tightening — body text at 16px can be slightly tight without readability loss)
- `line-height`: 1.65 (generous — reading comfort over layout efficiency)
- `text-wrap: pretty` (reduces single-word orphan lines)
- `max-width: 65ch` (hard limit — enforced as a direct CSS property, not a Tailwind class)

Label type:
- `font-weight`: 500
- `letter-spacing`: 0.12em (wide tracking — the label's visual identity)
- `text-transform: uppercase` (uppercase + tracking = label identity)
- `line-height`: 1 (labels are single-line by design)

**Color of type on dark backgrounds:** `color: oklch(97% 0 0)` (near-white, approximately 95% luminance). Not pure white. The slight reduction from pure white decreases irradiation at sustained reading distances while remaining imperceptible as a distinction in casual viewing.

**Color of type on light backgrounds:** `color: oklch(18% 0 0)` (near-black, approximately 18% luminance). Not pure black. The same reasoning.

---

## 7. IMAGE USAGE PHILOSOPHY

Images are both the most important quality element and the most significant performance risk on this page. The implementation treats them accordingly.

**The hero image is the LCP element. Its loading is the highest priority action on the page.**

Implementation:
```tsx
<Image
  src="/images/hero/hero-architectural-space.webp"
  alt="[Specific architectural description — not 'beautiful space']"
  fill
  priority // Signals next/image to preload this immediately
  quality={90}
  sizes="100vw"
/>
```

Additionally, the hero image is preloaded in the `<head>`:
```html
<link rel="preload" as="image" href="/images/hero/hero-architectural-space.webp" />
```

This dual preloading (next/image `priority` + manual `<link rel="preload">`) minimizes the gap between the initial HTML parse and the image load start.

**All other images are lazy-loaded** — they do not load until they approach the viewport. This is the default behavior of `next/image` without the `priority` flag.

**Image sizing:** Every `next/image` component has a `sizes` attribute that accurately describes the image's rendered width at each breakpoint. Inaccurate `sizes` attributes cause the browser to download images larger than necessary.

Examples:
- Hero image: `sizes="100vw"`
- Featured collection tile (col-span-7): `sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 58vw"`
- Standard collection tile (col-span-4): `sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"`
- Space explorer tile: `sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 33vw"`

**Alt text philosophy:** All images have descriptive alt text that is specific and informative. Not "ceramic tile." Not "beautiful space." Specific: "Doğrular Seramik [Collection Name] large-format porcelain on the floor and walls of a contemporary open-plan living space, Ankara residential project." Alt text serves two purposes simultaneously: accessibility for screen reader users, and SEO signal for image search.

**Image containers use explicit aspect ratios:** Every image container defines its aspect ratio before the image loads. This prevents CLS (layout shift when the image loads and claims its space). The container `aspect-ratio` CSS property, not a padding-bottom trick.

**Format:** WebP as default. AVIF as preferred where browser support allows. Next.js Image handles format negotiation automatically.

**Photography is never a background image:** All photography is `<img>` elements (via `next/image`). CSS `background-image` is only used for texture overlays or abstract gradient backgrounds — never for content photography. Content photography must be accessible (alt text) and indexable (search engines index `<img>` content more reliably than background images).

---

## 8. ACCESSIBILITY PHILOSOPHY

WCAG AA is the floor. WCAG AAA is the target where achievable without visual compromise.

**Contrast commitments:**

Body text contrast: Near-white (`oklch(97% 0 0)` ≈ `#F7F7F7`) on near-black (`oklch(8% 0 0)` ≈ `#141414`) — contrast ratio approximately 14:1. Exceeds AA (4.5:1) and AAA (7:1).

Body text on light background: Near-black (`oklch(18% 0 0)` ≈ `#2A2A2A`) on near-white (`oklch(97% 0 0)` ≈ `#F7F7F7`) — contrast ratio approximately 10:1. Exceeds AA and AAA.

Collection tile names (text below photography): Must be measured against the actual tile background color at the section's specific background tone. Every tile name's contrast is verified in the browser before the section is declared complete.

Ghost button text: Ghost buttons on dark background use near-white text. The ghost border is visible at 1px but does not contribute to contrast — the text color alone must meet the 4.5:1 minimum against the dark background.

**Focus management:**

All interactive elements have a visible focus indicator. The focus ring is a 2px solid ring in the accent color, with a 2px transparent offset creating a gap between the element and the ring. This is implemented as:
```css
:focus-visible {
  outline: 2px solid var(--ds-accent);
  outline-offset: 2px;
}
```

The `:focus-visible` selector (not `:focus`) means the focus ring only appears for keyboard navigation — mouse users do not see the ring. This is the correct approach for luxury visual design that must also be keyboard-accessible.

**Heading hierarchy:**

The page has one `h1` (the hero headline). Section headlines are `h2`. Collection names within the grid are `h3`. The heading hierarchy is not broken at any point. If a section's visual design implies a hierarchy that conflicts with the semantic hierarchy, the semantic hierarchy takes precedence and the visual design is adjusted.

**GSAP pin and keyboard accessibility:**

The featured project's pinned scroll section creates an accessibility challenge: the user who navigates by keyboard cannot "scroll" through the images in the same way a mouse user can. The solution: within the pinned section, the images are also reachable via a keyboard-accessible control. A visually minimal "next image" keyboard trigger (`aria-label="Next project image"`) is present within the left column content and is focusable by Tab. This control is styled to be minimal at all times and does not disrupt the visual composition.

**ARIA roles:**

The navigation is `<nav aria-label="Primary navigation">`. The hero is `<section aria-label="Brand introduction">`. The collections preview is `<section aria-label="Featured collections">`. Every significant section has a semantic `<section>` element with a descriptive `aria-label`. These are not `<div>` containers.

**Image alt text policy:** Documented in the Image Usage philosophy (Section 7). All images have specific, descriptive alt text. Decorative images (if any) use `alt=""` to signal to screen readers that they can be skipped.

---

## 9. PERFORMANCE PHILOSOPHY

Performance is a brand promise. A slow homepage tells the visitor, before they read a word or see an image clearly, that this brand does not keep its promises. The performance targets are:

- LCP: < 2.0 seconds (4G mid-range device)
- INP: < 200ms
- CLS: < 0.05
- Lighthouse Performance: 90+

**The LCP is the hero image.** Everything in the implementation is organized around ensuring this image loads as fast as possible. It is preloaded. It is served in the correct format at the correct size. It is not processed through a complex image pipeline that adds latency. The hero image file size target is < 200KB at 1440px viewport width in WebP format at 90% quality.

**JavaScript budget:**

The homepage JavaScript bundle (excluding React itself and Next.js infrastructure) must not exceed 50KB gzipped. This budget is enforced by:
- GSAP loaded asynchronously and only when needed
- Motion library tree-shaken to only the used components
- No state management libraries
- No utility libraries (no lodash, no date-fns on the homepage)

**GSAP code splitting:**

```typescript
// In FeaturedProjectSection.tsx
useEffect(() => {
  if (prefersReducedMotion) return; // Skip entirely for reduced motion
  
  let gsapInstance: any;
  let scrollTriggerInstance: any;
  
  const initGSAP = async () => {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    gsapInstance = gsap;
    scrollTriggerInstance = ScrollTrigger;
    // ... animation setup
  };
  
  // Initialize GSAP only when the section is approaching the viewport
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) initGSAP(); },
    { rootMargin: '200px' } // 200px before the section enters
  );
  observer.observe(sectionRef.current);
  
  return () => {
    observer.disconnect();
    scrollTriggerInstance?.kill();
  };
}, [prefersReducedMotion]);
```

This pattern ensures GSAP is never downloaded on pages where the featured project section is not present, and is downloaded asynchronously (not blocking page load) even on the homepage.

**CSS performance:**

All animations use `transform` and `opacity` exclusively. No `width`, `height`, `top`, `left`, `margin`, or `padding` animations. `will-change: transform` is applied only to elements that are actively being animated by GSAP — it is removed after the animation completes.

`backdrop-filter` (the frosted navigation) is applied only to the `<nav>` element — a fixed/sticky element. Never applied to scrolling containers. `backdrop-filter` triggers GPU compositing and must be confined to elements where the visual benefit justifies the GPU cost.

**No render-blocking resources:**

Fonts use `display: swap`. External scripts (analytics, if any) are loaded with `defer` or `async`. No stylesheets are loaded synchronously after the initial HTML parse.

---

## 10. RESPONSIVE PHILOSOPHY

The mobile experience is not a degraded desktop. It is a deliberate, complete experience designed specifically for touch navigation and single-column vertical scroll.

**Three primary contexts:**

Mobile (0–767px): Single column. Standard vertical scroll. No GSAP pin. No horizontal scroll. All multi-column grids collapse to single column. Typography scales to mobile clamp values. Touch targets minimum 48px. The dark sections are darker (no frosted glass effects that don't render well on lower-powered mobile hardware).

Tablet (768px–1279px): Two-column grids for collections and space explorer. No GSAP pin. Simplified entry animations (scale and opacity, shorter duration). Navigation still transparent-to-frosted but slightly faster transition. Typography at intermediate clamp values.

Desktop (1280px+): Full 12-column grid. GSAP pin active. Complete animation system. Full typographic scale. Maximum section padding.

**The universal mobile rule:** `min-h-[100dvh]` for the hero section. Never `h-screen`. `100dvh` accounts for the dynamic viewport on iOS Safari (the URL bar appearing and disappearing). `100vh` causes catastrophic layout jumps on mobile.

**Touch interaction:** On mobile, the collection tiles have no hover state — there is no cursor. The tile responds to a tap (`:active`) with a rapid opacity reduction (80% opacity, 100ms) and then restores. This acknowledges the tap without an animation that requires coordination between the tap event and React state.

**The featured project on mobile:** The GSAP pin is removed. The left column content (project name, architect credit, collection used, description) is displayed first as a standard content block. Below it, the project images are displayed in a standard vertical sequence with a simple fade-up on each image's entry. The experience is different from desktop but is complete — the visitor on mobile sees all the same information through a different interaction pattern.

**Typography on mobile:** The `clamp()` values ensure no text is ever smaller than its minimum (no body text below 16px). Display text scales to approximately 40px minimum on mobile — large enough to be genuinely display-scaled even at 390px viewport width.

**The collections grid on mobile:** The six tiles collapse to a single column. The order of tiles follows the visual hierarchy established by the desktop grid: Tile A (the featured, largest tile) appears first. This is the correct mobile order because the visitor's most important first impression of the collections section must be the featured collection.

---

## 11. MICRO-INTERACTION PHILOSOPHY

Every micro-interaction is CSS-only. No JavaScript observes hover, focus, or active states.

**The three-property principle:** Every hover state transition specifies exactly the CSS properties being transitioned — never `transition: all`. The properties are chosen deliberately:

Collection tile hover:
```css
.collection-tile img {
  transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform: scale(1);
}
.collection-tile:hover img {
  transform: scale(1.03);
}
.collection-tile .collection-name {
  transition: text-decoration-color 200ms ease;
  text-decoration: underline;
  text-decoration-color: transparent;
}
.collection-tile:hover .collection-name {
  text-decoration-color: var(--ds-accent);
}
```

The scale (600ms, decelerating) and the underline reveal (200ms, instant acknowledgment) have different durations. The underline appears immediately (200ms) — this is the rapid signal that the cursor has arrived. The scale completes slowly (600ms) — this is the deliberate, weighted response. The distinction matters: the immediate color response says "I see your cursor," the slow scale says "I respond with weight."

**CTA button micro-interaction:**

Ghost buttons have three states: default, hover, active.

Default: transparent background, 1px solid near-white border, near-white text.

Hover: background fills with near-white at 10% opacity (barely perceptible, but present). Border brightens very slightly. Text remains unchanged. The hover state is intentionally subtle — this is a ghost button. It acknowledges the cursor without transforming into a filled button.

Active (`:active`): `transform: translateY(1px) scale(0.99)` — a subtle physical push. The button moves 1px toward the visitor and compresses 1% in all dimensions. This lasts only as long as the mouse button is held. Duration: 100ms.

**Navigation link hover:**

The navigation links use an underline reveal — `text-decoration: underline; text-decoration-color: transparent` in default state, transitioning to the near-white color on hover. Duration: 200ms. No background fill, no transform, no color change on the link text itself. The underline alone is sufficient.

**No hover states on non-interactive elements:** The craft section's data points, the brand statement text, the project description text — none of these have hover states. They are content, not interactive elements. Applying hover states to non-interactive elements trains visitors to click things that do nothing.

---

## 12. SCROLL BEHAVIOR PHILOSOPHY

The homepage's scroll philosophy is: **the page slows where it matters and moves freely everywhere else.**

This produces non-uniform scroll density — sections with more content occupy more vertical space and therefore require more scroll. The visitor who scrolls at a fixed speed through the page experiences different durations in different sections. This is intentional.

**Scroll density by section:**

The hero section: 100dvh. At a comfortable reading scroll speed, this is approximately 1–2 seconds.

The brand statement: approximately 65–75vh. Slightly shorter than the hero — the visitor has arrived at the page, they do not need to be held here as long.

The collections preview: approximately 110–120vh. Enough space for the asymmetric grid to breathe, plus entry stagger time.

The featured project: approximately 250vh of scroll. 2.5x longer than a standard section. This is the deliberate slow-down — the most important credibility section occupies the most scroll distance.

The space explorer: approximately 90–100vh. Return to standard pacing.

The craft section: approximately 80–90vh. Compact — the information is specific and dense, not expansive.

The dual CTA: approximately 55–65vh. Brief. The visitor knows what they want at this point; the section directs them without lingering.

**The GSAP pin's scroll override:**

During the pinned featured project section, the browser's default scroll behavior is suspended by GSAP. The visitor scrolls, but the page does not move — instead, the images change. This is the one point on the page where scroll does not equal page translation. The visitor understands this intuitively because the left column is stable and the right column is changing. The affordance is clear without instruction.

**`smooth-scrolling` policy:** `scroll-behavior: smooth` is NOT applied to the `<html>` element. Smooth scrolling applied globally creates problems with GSAP ScrollTrigger — the two systems conflict when calculating scroll positions. Any smooth-scroll behavior on anchor links is handled via JavaScript, not the CSS property.

**Scroll event listener policy:** One passive scroll event listener exists on the page: the navigation's `isScrolled` state. It is added with `{ passive: true }` to prevent scroll jank. All other scroll-linked behavior uses GSAP ScrollTrigger (for the pin) or IntersectionObserver (for entry animations). Neither of these adds additional scroll event listeners.

---

## 13. STATE MANAGEMENT PHILOSOPHY

The homepage has three and only three categories of state. No state management library is installed.

**State 1: Navigation scroll state**

A boolean: `isScrolled`. True when `window.scrollY > 80`. Drives the navigation's visual mode (transparent → frosted glass).

Implementation: A single `useState(false)` in the `Navigation` component. A single `useEffect` that adds and removes a passive scroll event listener. The navigation re-renders once (false → true) on the first scroll past 80px, and once more (true → false) if the visitor scrolls back above 80px. Total expected re-renders of the Navigation component over a full page visit: 2–4.

**State 2: Reduced motion preference**

A boolean: `prefersReducedMotion`. Derived from `window.matchMedia('(prefers-reduced-motion: reduce)')`.

Implementation: A React context (`MotionContext`) created in the root layout. Initialized from the media query on mount. Updated by a `change` event listener on the media query (if the visitor changes their system preference while on the page). Consumed by every component that uses Tier 1 or Tier 2 animations.

```typescript
// In root layout
const MotionContext = createContext<{ prefersReducedMotion: boolean }>({
  prefersReducedMotion: false,
});
```

This context is not co-located with the homepage — it is at the root layout level. Every page on the site benefits from it without re-implementing it.

**State 3: Animation state (managed outside React)**

Whether a section's entry animation has fired, what scroll progress the GSAP pin is at, which project image is currently displayed — all of this is managed by GSAP and IntersectionObserver directly. React does not know about this state and does not need to. Attempting to synchronize GSAP's internal state with React state would cause unnecessary re-renders and create timing conflicts.

The principle: **let each system manage its own state.** React manages component-level UI state. GSAP manages animation state. IntersectionObserver manages visibility state. They communicate through DOM mutations and CSS class additions, not through shared React state.

---

## 14. REUSABILITY PHILOSOPHY

The homepage is not a design system. It is a specific page with specific content. Reusability is earned, not assumed.

**What is reusable (shared across the site):**

- Design tokens (CSS custom properties): `--ds-ink-900`, `--ds-surface-100`, `--ds-accent`, `--ds-border-dark`, and the full token set. These are defined once in the global stylesheet and referenced everywhere.
- Font variables: `--font-display`, `--font-body`. Defined once in the root layout, available everywhere.
- `MotionContext`: Defined in the root layout, available everywhere.
- `Navigation` component: A page-level component, shared across all pages.
- `Footer` component: A page-level component, shared across all pages.

**What is NOT reusable until proven necessary:**

- `CollectionTile`: Currently used only in the homepage collections grid. It is NOT a generic card component. It is a component optimized for the asymmetric 12-column homepage grid. If Collection Detail pages need a similar tile, a new component is created at that time, sharing only the design tokens.
- `SpaceTile`: Same reasoning as CollectionTile.
- `HeroSection`: The homepage hero is specific to the homepage. A category page hero is a different component with different content and constraints.

**The anti-pattern:** Creating a `<Card>` component with a `variant` prop that accepts `"collection" | "space" | "project" | "craft"` and renders four completely different visual outputs based on the variant. This is not reusability — it is a single bloated component hiding four distinct components. The four components should exist separately, sharing only the design tokens.

**When to extract a shared component:**

The rule: a component is extracted to a shared location when it is CURRENTLY USED in three or more distinct locations across the codebase. Not "will eventually be used." Currently, actively used. The threshold is three because one instance is too early, two instances might be a coincidence, and three instances establish a genuine pattern.

---

## 15. PIXEL PERFECTION PHILOSOPHY

Pixel perfection is not fidelity to a Figma file (there is no Figma file). Pixel perfection is the precision of execution relative to the intention established in VISUAL_DIRECTION.md and HOMEPAGE_BLUEPRINT.md.

**The browser is the design tool:**

Because this implementation is directed by documents rather than visual specs, the browser is where the visual decisions are finalized. Every section is developed in the browser at 1440px viewport and judged against three criteria:

1. Does this section feel correct according to VISUAL_DIRECTION.md?
2. Does this section deliver its intended emotional state from HOMEPAGE_BLUEPRINT.md Section 12?
3. Does this section meet the Awwwards quality standard established in the self-review?

If the answer to any of these is no, the section is revised before proceeding to the next section.

**The review viewports:**

Every section is reviewed at:
- 390px (iPhone 15 — smallest common current device)
- 375px (iPhone SE — smallest supported viewport)
- 768px (iPad portrait — tablet breakpoint)
- 1024px (iPad landscape / small laptop)
- 1280px (desktop minimum for full composition)
- 1440px (design reference viewport)
- 1920px (large desktop)

At every viewport, the page must be visually intentional — not accidentally functional.

**Specific precision commitments:**

Typography: Letter-spacing is specified in em, not px, so it scales correctly with font size. Line-height is specified as a unitless multiplier, not in px, so it scales correctly. `text-wrap: balance` is applied to all h1–h3 elements.

Color: All colors are specified as CSS custom properties using OKLCH. No hex values appear in component CSS except in the token file. The token file is the single source of truth for all color values.

Spacing: All spacing values are multiples of 8px. No arbitrary pixel values without justification. If a spacing value is not a multiple of 8, it is either wrong or it has a documented reason for the exception.

Animation timing: Every animation duration is documented in the Animation Philosophy (Section 3). No animation duration is changed without updating the documentation. The animation durations are treated as brand decisions, not implementation details.

Borders and radius: One radius value per semantic element category. Collection and space tiles: `border-radius: 4px` (slight softening without rounding). CTA buttons: `border-radius: 9999px` (full pill). No other radius values on the homepage without documented justification.

---

## THE MANIFESTO IN ONE PARAGRAPH

**The code is as architecturally considered as the surfaces it presents.** Every line earns its presence. Restraint governs the codebase as it governs the design — complexity enters only where simplicity would fail. The GSAP pin earns its presence. The Motion library earns its presence. Everything else is CSS, semantic HTML, and React at its simplest. The page loads fast because it respects the visitor's bandwidth. It renders precisely because it respects the brand's promise. It responds accessibly because it respects every visitor's ability. The implementation is not a technical achievement to be admired — it is a transparent vehicle for the brand to speak. If the implementation is noticed, it has failed. If only the brand is remembered, it has succeeded.

---

*This manifesto is consulted before writing any component.*
*All implementation decisions are made in reference to this document.*
*Contradictions between this document and shortcuts of convenience resolve in favor of this document.*
