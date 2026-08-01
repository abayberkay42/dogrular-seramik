# DESIGN.md — Doğrular Seramik

*Internal design system document. Updated: 2026-06-13.*
*This document is the single source of truth for every visual decision on this project.*

---

## 1. VISUAL PHILOSOPHY

### The Central Idea: The Website Is a Surface

Ceramic surfaces are defined by their material honesty — what they are made of, how they respond to light, how they feel underfoot or to the touch. The website must carry this same quality. It should feel like a material itself: precise, considered, nothing wasted, nothing missing.

**Restraint communicates luxury.** The most expensive ceramic brands in the world — Florim, Laminam, Marazzi — do not shout. Their websites are quieter than their competitors. The product photography IS the design. The interface steps back. Clutter is the enemy of luxury.

**The space is the sale, not the tile.** Nobody buys a ceramic tile. They buy a bathroom they have always wanted. They buy an architectural statement. Every photograph on this site must show a space, not a product. Every collection must be named by the space it creates, not by a code.

### The Emotional Target

A visitor arriving on this website should feel: *"This is serious. This is credible. These people know what they are doing."*

Not: *"This looks expensive."* (Too obvious, too try-hard.)
Not: *"I feel warm and cozy."* (That's a generic interior brand response.)
Not: *"This is impressive."* (Implies the site is performing for them, not for the work.)

The feeling is closer to entering a well-designed architecture studio. Quiet confidence. Material samples on the table. Everything exactly where it should be.

---

## 2. CORE DESIGN PRINCIPLES

These are the principles that govern every decision. When two options conflict, apply these in order.

### P1. Material Honesty
Every visual element must have a reason to exist. No decoration for decoration's sake. A line is there to divide. A color is there to communicate. A motion is there to reveal. If it cannot be justified in one sentence, it is removed.

### P2. Hierarchy Through Restraint
Hierarchy is achieved through whitespace, scale, and contrast — not through visual noise. The most important element on each page commands attention not by being louder, but by having more room to breathe.

### P3. Precision in Every Detail
The brand name promises correctness. A pixel of misalignment, a typo, an inconsistent radius, an animation that stutters — each one contradicts the brand promise. Before any component ships, it is checked against every breakpoint, in both languages, in both color modes.

### P4. The Dual Audience Is Always Present
Every page must serve both the specification professional (who needs authority and technical depth) and the aspirational consumer (who needs beauty and inspiration). These goals are not in conflict: great architectural photography serves both. The difference is in the secondary layers: technical specs and download paths sit below the beauty, accessible when needed.

### P5. Photography Leads, Design Follows
No design decision should compete with the photography for attention. Typography, color, layout — all exist to frame and elevate the images, never to compete with them.

---

## 3. COLOR SYSTEM

### Strategy: "Clay & Ink"

The palette name describes the conceptual logic: the warmth of unglazed terracotta clay (the material before it is fired, before the glaze — honest, earthy) anchored by typographic ink (deep, authoritative, precise). These are the two materials of this brand: ceramic and intention.

**Decision challenged and confirmed:** All major ceramic brand competitors (Florim, Atlas Concorde, Marazzi, Laminam) use predominantly light backgrounds. The impulse is to match them. Rejected. Matching them means being invisible among them. The dark anchor sections (hero, brand narrative, featured project) create immediate visual differentiation while the light product sections maintain the accurate color environment needed for material evaluation.

### Color Tokens (OKLCH throughout)

#### Dark Mode (Hero / Narrative Sections)
```
--ds-ink-900:    oklch(0.12 0.009 47)   /* Primary dark surface — near-black, barely warm */
--ds-ink-800:    oklch(0.17 0.010 47)   /* Elevated dark surface — card backgrounds */
--ds-ink-700:    oklch(0.24 0.010 47)   /* Subtle dark divider backgrounds */
--ds-text-dark-primary:   oklch(0.95 0.005 47)   /* Primary text on dark — warm off-white */
--ds-text-dark-secondary: oklch(0.65 0.010 47)   /* Secondary text on dark — muted warm gray */
--ds-border-dark:         oklch(0.28 0.010 47)   /* Hairline dividers on dark */
```

#### Light Mode (Product / Collection Sections)
```
--ds-surface-100: oklch(0.97 0.004 47)   /* Primary light surface — near-white, barely warm */
--ds-surface-200: oklch(0.93 0.006 47)   /* Elevated light surface — subtle tint */
--ds-surface-300: oklch(0.88 0.008 47)   /* Section accent backgrounds */
--ds-text-light-primary:   oklch(0.16 0.010 47)   /* Primary text on light — deep charcoal, warm */
--ds-text-light-secondary: oklch(0.42 0.010 47)   /* Secondary text on light */
--ds-border-light:         oklch(0.84 0.008 47)   /* Hairline dividers on light */
```

#### Brand Accent (Single, Used Sparingly)
```
--ds-accent:         oklch(0.62 0.11 50)    /* Warm amber-clay — the color of unglazed terracotta */
--ds-accent-hover:   oklch(0.56 0.12 50)    /* Darker on hover */
--ds-accent-subtle:  oklch(0.62 0.11 50 / 0.12)  /* Transparent tint for backgrounds */
```

### Rules for Color Usage
- The accent color appears in: primary CTA buttons, active states, focus rings, collection name accent underlines, and section transitions. Nowhere else.
- No section inverts mode mid-page (dark → light → dark → light = broken design). Dark sections cluster at the top (hero, narrative). Light sections handle product/discovery. One deliberate dark section mid-page is allowed for a "featured project" moment.
- Tinted shadows: shadows on light surfaces are tinted with `--ds-accent-subtle`, never pure black.
- No pure white (#FFFFFF). No pure black (#000000). The OKLCH off-values carry the brand warmth without being a warm-beige cliché.

### What This Is NOT
- NOT cream/beige background (#F5F1EA and the full warm-paper family — banned)
- NOT brass/gold accent — the accent is desaturated enough (C 0.11) to read as muted clay, not decorative brass
- NOT a "warm neutral everything" palette — the contrast between ink-dark and clean-light is sharp and intentional

---

## 4. TYPOGRAPHY SYSTEM

### Philosophy
Typography is the second visual language of this brand after photography. It must communicate architectural authority without performing it. Display type is wide and precise. Body type is clear and neutral. Technical type is monospace and exact.

### Font Stack

**Display: PP Neue Montreal (licensed) / Cabinet Grotesk (free alternative)**
- Usage: Hero headlines, collection names, large section titles, navigation brand mark
- Weight range used: Regular (400) for elegance, SemiBold (600) for emphasis. Never Bold (700) in display — too heavy.
- Tracking: -0.035em at hero scale, -0.025em at section heading scale
- Note: PP Neue Montreal (Pangram Pangram) requires commercial license. Cabinet Grotesk (Fontshare, free) is the recommended free alternative and is visually similar — wide, geometric, architectural. The implementation document will confirm which is used.

**Body: Geist (free, Vercel)**
- Usage: All body copy, navigation labels, button text, captions, form labels
- Weight range: Regular (400) for body, Medium (500) for emphasis
- Tracking: 0 (no tracking on body copy)
- Line height: 1.75 for body paragraphs
- Max line length: 65ch enforced via max-width on prose containers

**Technical: Geist Mono (free, Vercel)**
- Usage: Technical specifications (dimensions, weight, slip coefficient), collection codes, metadata strips, form placeholders for technical inputs
- Weight: Regular (400) only
- Sizing: Always 0.875× the adjacent body text size

**Why Geist for body?** Geist is a clean geometric sans designed for both screen clarity and developer tooling contexts — a good bridge between the editorial display font and technical spec contexts. It does not call attention to itself. This is correct for body text.

**Challenge considered and rejected:** Using a serif (like GT Sectra or Canela) for display to achieve a "luxury editorial" feel. Rejected for two reasons: (1) every AI-generated luxury site defaults to serif display, making it an immediate tell; (2) the architecture/ceramic context is more aligned with geometric precision (Zaha Hadid, Kengo Kuma, Herzog & de Meuron all communicate through PRECISION, not warmth of serif). The warmth is carried by the color and photography, not the type.

### Type Scale

| Role | Size | Weight | Tracking | Line Height |
|---|---|---|---|---|
| Hero Display | clamp(3.5rem, 7vw, 8.5rem) | 400 | -0.035em | 0.95 |
| Section Heading | clamp(2.2rem, 3.5vw, 4.5rem) | 400 | -0.03em | 1.0 |
| Sub-heading | clamp(1.4rem, 2vw, 2rem) | 500 | -0.02em | 1.1 |
| Body Large | 1.25rem | 400 | 0 | 1.75 |
| Body | 1.125rem | 400 | 0 | 1.75 |
| Caption / Label | 0.875rem | 400 | 0.01em | 1.5 |
| Technical Spec | 0.875rem (Mono) | 400 | 0.02em | 1.5 |
| Micro Label | 0.75rem | 500 | 0.06em | 1.4 |

### Typography Rules
1. Hero headlines: 2 lines maximum at desktop. If copy exceeds 2 lines, reduce font size or rewrite the copy. Never reduce the container width to force more lines.
2. `text-wrap: balance` on all headings H1–H3.
3. `text-wrap: pretty` on all body paragraphs.
4. No italic unless used for a deliberate brand moment (e.g., a collection name in the middle of body copy).
5. No uppercase body copy. Reserve uppercase for micro-labels only (max 4 words, max 0.75rem, tracking 0.06em+).
6. No eyebrow label above more than 1 in every 3 sections across the page.

---

## 5. GRID & LAYOUT PHILOSOPHY

### The Architectural Grid
The layout grid is 12-column, 1440px max-width container. Sections break this grid deliberately — full-bleed images, asymmetric text-image splits, pinned scroll sections — but always return to it. The grid is the discipline; breaking it is the art.

**Column setup (Tailwind v4):**
- Container: `max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16`
- Grid: `grid grid-cols-12 gap-4 md:gap-6`
- Standard text column: `col-span-12 md:col-span-8 lg:col-span-6`
- Full bleed: Negative margin `--bleed: calc((100vw - 1440px) / 2)` escapes container

### Section Spacing
Sections must breathe. The space between sections communicates that each one is a considered composition, not a sequence of boxes.

- Section padding: `py-24 md:py-36 lg:py-48` (standard)
- Tight sections (within a group): `py-12 md:py-16`
- Hero to first section: `mt-0` (hero bleeds to section; transition is handled by the dark→light color shift)

### Layout Vocabulary (from most to least common)
1. **Full-bleed editorial:** Full-width image with text overlay or adjacent text. Used for hero and featured project.
2. **Asymmetric split:** Text on 5-column left, image on 7-column right (or inverse). Never equal 50/50.
3. **Centered manifesto:** Text centered at max 55ch, massive scale. Used only for the brand statement section. Once per page maximum.
4. **Collection grid:** 3-column at desktop, 2 at tablet, 1 at mobile. Cards are sharp-cornered (2px radius). NOT equal square cards — varying aspect ratios (portrait for stone/marble, landscape for large-format).
5. **Horizontal scroll section:** Project gallery reel. Single row, scroll-snap, full-height cards.
6. **Scroll-pinned narrative:** Left column pins (title + description), right column scrolls through images. Used for featured project case study.

### Mobile Collapse Protocol
Every layout above `md:` collapses to `w-full` single-column below 768px. No exceptions. Specific rules:
- Asymmetric splits: text on top, image below (not side-by-side)
- Pinned scroll sections: unpin on mobile, convert to vertical scroll
- Horizontal scroll sections: reduce card width to 85vw, horizontal scroll preserved
- Min-height: always `min-h-[100dvh]` for full-height sections, never `h-screen`

---

## 6. MOTION PHILOSOPHY

### Motion Must Earn Its Place
Every animation on this site can be justified by one of four reasons:
1. **Materiality reveal:** Mimicking the feeling of a surface being uncovered, a space being entered, a material being understood.
2. **Narrative sequence:** Guiding the viewer through a story in the correct order.
3. **State feedback:** Confirming an interaction (hover, click, form submission).
4. **Hierarchy signal:** Drawing attention to the element that matters most right now.

If an animation cannot be justified by one of these four, it is removed. No motion as decoration.

### Motion Tokens (Custom Easing Library)
```css
--ease-material:   cubic-bezier(0.16, 1, 0.3, 1);    /* Primary: heavy ease-out-expo */
--ease-precise:    cubic-bezier(0.4, 0, 0.2, 1);      /* UI state changes */
--ease-in-surface: cubic-bezier(0.4, 0, 1, 1);        /* Elements leaving viewport */
--ease-out-surface: cubic-bezier(0, 0, 0.2, 1);       /* Elements entering viewport */

--duration-instant: 100ms;
--duration-fast:    250ms;
--duration-base:    400ms;
--duration-slow:    700ms;
--duration-reveal:  1100ms;
```

### Specific Motion Patterns

**Hero Title Reveal:**
Large display headline enters via clip-path mask wipe — `clip-path: inset(0 100% 0 0)` to `clip-path: inset(0 0% 0 0)`. Duration: 1100ms with `--ease-material`. Mimics a surface being unveiled left to right.

**Collection Entry (Scroll-triggered):**
As collection cards enter the viewport, they scale from `scale(0.94)` with `opacity: 0` to `scale(1)` with `opacity: 1`. Duration: 700ms, `--ease-out-surface`. Stagger: 80ms between cards. The weight of stone materializing into view.

**Scroll-Pinned Project Story:**
GSAP ScrollTrigger. Left column (project title, description, collection credit) pins at `start: "top top"` while the right column scrolls through 4–6 project photography images. Scale: each image enters at `scale(0.96)` and exits at `scale(1.04)` — the subtle breathing of a space.

**Texture Grain Parallax:**
The fixed grain overlay on dark sections shifts at `translate3d(0, calc(var(--scroll-y) * -0.03), 0)` — 3% of scroll. This is the subtlest motion on the page and the most important: it creates the sense that the interface itself has material depth.

**Hover on Project Cards:**
`transition: transform 600ms --ease-material`. Cards shift `translate3d(0, -3px, 0)` and the image within the card scales to `scale(1.03)` with `overflow: hidden`. NOT a generic scale-the-whole-card bounce.

**Page Transition:**
Between major route changes: a 200ms cross-fade via opacity, followed by the incoming page content entering from `translateY(12px)` to `translateY(0)`. The grain texture fades in last, settling the surface.

### Performance Rules
- Animate ONLY `transform` and `opacity` via GPU compositing
- `will-change: transform` applied only to elements actively animating (removed after animation completes)
- `backdrop-filter` applied only to `position: fixed` elements (nav, modals)
- Grain overlay is `position: fixed`, `pointer-events: none`, `z-index: 100`
- All GSAP work lives in isolated Client Components with proper `ctx.revert()` cleanup
- `useReducedMotion()` checked in every animation component — reduces to instant opacity only

---

## 7. PHOTOGRAPHY PHILOSOPHY

Photography is not a supporting element on this website. It IS the website. The design wraps around the photography.

### Required Photography Categories

**1. Architectural / Environmental (60% of imagery)**
Full rooms. Real architecture. Surfaces as the defining feature of the space. Shot by an architectural photographer, not a product photographer. Lighting: natural light preferred, professional supplemental. The tile becomes invisible by becoming the room.

**2. Materiality Close-up (20% of imagery)**
45-degree macro shots. Surface texture, veining, finish variation, edge detail. The tile as an object of material beauty. Cropped tightly. No context — just material.

**3. Human Presence (15% of imagery)**
A hand touching a wall. Feet on a floor. A person in soft focus inhabiting the space. Scale reference plus emotional aspiration. The human makes the surface real.

**4. Craft / Process (5% of imagery)**
Manufacturing heritage. Production quality. This serves the brand story and trust-building sections.

### Photography Treatment in UI
- Slight saturation reduction: `-5% to -10%` via CSS `filter: saturate(0.93)` — coheres the palette without distorting material color accuracy.
- No filters that distort material color — clients need accurate color reference for specification.
- Object-fit: `cover` always. Aspect ratios defined per usage context and never broken.
- Priority loading: Hero image always `loading="eager"` / Next.js `priority`. All others lazy.

---

## 8. COMPONENT PHILOSOPHY

### Component Hierarchy
1. **Design Tokens** (CSS variables, not Tailwind arbitrary values)
2. **Primitives** (Button, Input, Tag, Icon — zero business logic)
3. **Compositions** (NavBar, Card, CollectionTile — combine primitives)
4. **Blocks** (HeroSection, CollectionGrid, ProjectStory — full page sections)
5. **Pages** (Assemble blocks into routes)

### Key Component Decisions

**Buttons:**
- Primary: Full-pill (`border-radius: 9999px`), filled with `--ds-accent`, white text, 48px height, `px-6` padding.
- Secondary/Ghost: Full-pill, transparent background, `--ds-text-dark-primary` or `--ds-text-light-primary` border, same dimensions as primary.
- Icon CTA: Circular pill with arrow icon only. Used beside primary CTA or inside cards.
- Active state: `scale(0.97)` + `translateY(1px)` — physical press feedback, 100ms.
- NO: neon glow, gradient fills, square buttons.

**Cards (Collection Tiles):**
- Border radius: 2px — sharp, architectural. NOT rounded corners. NOT pill. The one consistent radius outside of buttons.
- No shadow by default. Hover: subtle shadow tinted to `--ds-accent-subtle`.
- Image aspect ratio: 4:5 portrait for stone/marble/natural effects. 16:9 landscape for concrete/large-format.
- Text sits BELOW the image, never overlaid.
- NO labels, tags, or pills overlaid on the image.

**Navigation:**
- Ultra-thin bar: `height: 72px`, `position: sticky`, `top: 0`, `backdrop-filter: blur(16px)` with `background: --ds-ink-900 / 0.85` on dark sections, `--ds-surface-100 / 0.90` on light sections.
- Logo: left-aligned. Nav links: center-aligned with generous gap (`gap-8`). CTA: right-aligned.
- The navigation reads on a single horizontal line at all desktop breakpoints. If it cannot, labels are shortened before hamburger is introduced.
- Mobile: hamburger → full-screen overlay, dark, staggered link reveal.

**Forms:**
- Label above input: always. No floating labels.
- Focus ring: `outline: 2px solid --ds-accent`, `outline-offset: 2px`.
- Error text: below input, `--ds-text-light-secondary` with a small dot prefix (solid, semantic — not decorative).
- No placeholder-as-label.
- Maximum 4 fields on the sample request form (Name, Company, Email, Project Type + collection selection).

---

## 9. LUXURY RULES

These are non-negotiable conditions for the luxury positioning to hold.

**L1. No prices visible anywhere.** Luxury does not negotiate in public. All pricing through showroom or direct contact.

**L2. Every CTA is an invitation.** "Request Samples" not "Add to Cart." "Download Catalog" not "Get Price List." "Book a Showroom Visit" not "Contact Sales." The language implies the brand is doing the visitor a favor, not the other way around.

**L3. Technical depth is available but never forced.** Spec sheets exist and are downloadable. They are not the first thing the visitor sees. Beauty first, credibility second, specification third.

**L4. Named collections, not code SKUs.** Collections have names that create an image: "Ankara Stone," "Bosphorus Marble," "Kış / Winter." Never "KC-4421-GR." Product codes exist in the spec sheet, not in the navigation.

**L5. Credits for the work.** Every project case study credits the architect, the interior designer, the location. This is how architecture publications work. This is how trust is built in the profession.

**L6. Editorial copy, not marketing copy.** Body copy sounds like it was written by an informed human who loves materials. Not by a marketing department. Reference: Wallpaper*, Dezeen, Domus — this is the editorial register.

**L7. Nothing is rushed.** Animations that complete before their time feel cheap. Typography that is not properly tracked feels careless. Images that load at wrong aspect ratios break the material promise. The brand is called "Doğrular" — the correct ones. Everything must be correct.

---

## 10. FORBIDDEN (The Prohibition List)

Refer to DECISION_LOG.md for the rationale behind each prohibition. These apply to every component, section, and page.

### Visual
- Cream/beige backgrounds (OKLCH L 0.84–0.97, C < 0.06, H 40–100)
- Brass/gold accents (#B08947 family and equivalents)
- Pure black (#000000) or pure white (#FFFFFF)
- Neon glows or outer glow shadows
- Gradient text on any heading
- Glassmorphism as default card treatment
- Grain overlay on scrolling containers (fixed pseudo-element only)
- Isolated tile/product images on white backgrounds

### Typography
- Inter as the default font
- Instrument Serif or Fraunces as display font
- Hero headline exceeding 2 lines at desktop
- Eyebrow label above more than 1 in every 3 sections
- All-caps body copy
- Letter-spacing tighter than -0.04em
- Em-dash (—) anywhere on the page. Zero. Not one.

### Layout
- Three equal feature cards horizontally
- Centered hero with centered image (unless brief evolves)
- Spec table with border-bottom on every row
- Section number eyebrows (01, 02, 001, 002, etc.)
- Empty cells in bento/grid layouts
- Split-header pattern (large left headline + floating right paragraph)
- Side-stripe border-left accent cards
- Hero top padding above 96px (pt-24)
- More than 4 text elements in the hero (one optional eyebrow, headline, subtext max 20 words, CTAs)
- Logo wall inside the hero section
- Any scroll cue text ("Scroll," "↓ Explore," bouncing chevrons)
- Zigzag alternation for 3+ consecutive sections

### Copy
- Em-dash (—) — zero on the entire site
- Marketing buzzwords: seamless, elevate, unleash, transform, next-gen, cutting-edge, world-class
- Fake-precise invented numbers (92%, 4.1×) without real data
- Generic placeholder names in case studies ("Project A," "Client B")
- Aphoristic cadence as the page's default voice

### Motion
- `window.addEventListener('scroll', ...)` — banned. Use GSAP ScrollTrigger or Motion useScroll
- Bounce or elastic easing
- Linear easing on any visible transition
- Animation of layout properties (top, left, width, height)
- `backdrop-filter` on scrolling containers
- Any animation without a justified purpose from the four-reason framework
- More than 1 marquee on any single page
- GSAP ScrollTrigger that doesn't start with `start: "top top"` for pinned sections

### Interaction & Business
- Prices displayed
- "Buy Now" or "Shop Now" CTAs
- Two CTAs with identical intent on the same page
- CTA text wrapping to 2 lines at desktop
- Custom mouse cursors
- Placeholder-as-label in forms
