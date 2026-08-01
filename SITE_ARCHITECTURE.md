# SITE_ARCHITECTURE.md — Doğrular Seramik

*UX, IA, Navigation, SEO and Storytelling Architecture.*
*Authored by: Creative Director + UX Director + Information Architect + CRO Specialist perspectives.*
*Updated: 2026-06-13*

---

## EXECUTIVE SUMMARY

The website serves two fundamentally different audiences arriving with different goals and different mental models. The architect arrives to evaluate a material. The homeowner arrives to find a dream. Both paths must feel inevitable — neither should feel like they are navigating a site built for someone else.

The architecture achieves this through a single unified navigation system that branches into two distinct discovery modes: **Effect-first for professionals** (they know what they want and filter toward it) and **Space-first for consumers** (they imagine the room they want and discover the material through it). Both paths converge at the same conversion point: sample request or showroom visit.

---

## 1. NUMBER OF PAGES

### Page Templates (11 unique templates)

| # | Template | Content Type | Volume |
|---|---|---|---|
| 1 | Homepage | Static | 1 page |
| 2 | Collections Index | Static | 1 page |
| 3 | Collection Detail | Dynamic (CMS) | 1 per collection (estimated 15–40) |
| 4 | Spaces Index | Static | 1 page |
| 5 | Space Detail | Semi-static (CMS-editable) | 6 pages |
| 6 | Projects Index | Static | 1 page |
| 7 | Project Detail | Dynamic (CMS) | 1 per project (growing) |
| 8 | About | Static | 1 page |
| 9 | Contact + Sample Request | Static | 1 page |
| 10 | Professional Zone | Static | 1 page |
| 11 | 404 | Static | 1 page |

### Decision: Why Not More

**No Blog at launch.** A blog demands consistent editorial cadence. Launching a blog that receives 2 posts and then goes silent is worse for SEO and brand perception than no blog at all. The professional zone's downloadable catalogs serve the content-depth function for v1. Blog is documented as a post-launch extension.

**No separate Sustainability page at launch.** Sustainability content lives within the About page under its own anchored section. A standalone page only earns its place when there is enough substantive content to justify a full page — certifications, carbon reporting, supply chain specifics. That depth comes in v2.

**No Dealer/Showroom Map page at launch.** The Contact page includes a simplified showroom listing (text-based, with Google Maps embed). A dedicated interactive map-based dealer locator is a post-launch feature requiring geolocation infrastructure and a dealer CMS schema.

**No separate Search page.** Search is a utility feature accessible via a search icon in the navigation. Results are presented as an overlay/modal, not a dedicated page.

### Total URL Count at Launch

- Static pages: 22 (11 templates × 2 languages)
- Space Detail: 12 (6 spaces × 2 languages)
- Collection Detail: ~60–80 estimated (30–40 collections × 2 languages)
- Project Detail: ~20–30 estimated (10–15 projects × 2 languages)
- System pages: `/sitemap.xml`, `/robots.txt`, `/en/sitemap.xml`

**Total estimated URLs at launch: ~115–145**

---

## 2. NAVIGATION STRUCTURE

### Primary Navigation Items (5 items — strict maximum)

```
[LOGO]    Koleksiyonlar    Mekanlar    Projeler    Hakkımızda    [Örnek İste ↗]
```

**Why 5 items:** Research from Nielsen Norman Group confirms that beyond 7 primary nav items, users experience choice overload. For a luxury brand, restraint in the navigation mirrors restraint in the design. Five items. Every item earns its place.

**What was excluded from primary nav:**
- "Sürdürülebilirlik" (Sustainability) → lives within Hakkımızda
- "Profesyoneller" (Professional Zone) → accessible from Hakkımızda submenu AND from the homepage dual-CTA section
- "İletişim" (Contact) → accessible from footer and from the "Örnek İste" CTA button
- Blog (future) → will join primary nav when launched

### Megamenu: Koleksiyonlar

Triggered on hover (0.5s delay) or focus (keyboard). Full-width panel below the nav bar.

**Left column — By Effect:**
- Taş (Stone)
- Mermer (Marble)
- Beton (Concrete)
- Ahşap (Wood)
- Renk (Color)
- Özel (Special / Limited)

**Center column — By Format:**
- Büyük Format (Large Slab — 60×120 and above)
- Standart (Standard formats)
- Mozaik (Mosaic)

**Right column — Featured Collection (editorial):**
One curated collection shown with a hero image, name, and a single line of copy. This slot rotates with new or seasonal collections. It is editable from Sanity. This column converts browsing intent into editorial discovery.

**Megamenu footer strip:**
"Tüm Koleksiyonları Gör →" (View All Collections) — links to the Collections Index page.

### Megamenu: Mekanlar

Simpler panel. Single column of 6 spaces with a supporting image per item.

- Banyo (Bathroom)
- Mutfak (Kitchen)
- Yaşam Alanı (Living Room)
- Dış Mekan (Outdoor)
- Cephe (Facade)
- Ticari Alan (Commercial)

**No megamenu** for Projeler, Hakkımızda — direct navigation. These sections do not benefit from a preview panel; their content speaks for itself on arrival.

### Search

A search icon (magnifying glass, Phosphor Light) sits between "Hakkımızda" and "Örnek İste" in the nav bar. On click: a search overlay expands downward from the nav, full-width, with a text input. Results are displayed in real-time below: collections (by name and effect) and projects (by name and location). Closes on Escape or clicking outside.

**Why search is not a primary nav item:** Search is a utility for users who already know what they want. It should be available but not dominant. The majority of users discover through browsing; search serves the returning professional or the user with a specific brief.

---

## 3. HEADER STRATEGY

### Structure

```
[Logo — left]  [Nav links — center]  [Search icon + Language toggle + CTA — right]
```

Height: 72px desktop. This never changes — no "expanded" or "tall" header state.

### Behavior States

**State 1 — Initial (top of page, over hero):**
Background: fully transparent.
Text color: `--ds-text-dark-primary` (off-white) — the hero is always a dark-background section.
Logo: white version.
The nav appears to float above the hero image with no visible bar, giving the hero photography its full visual weight from edge to top.

**State 2 — Scrolled (after 80px of scroll):**
Background: `--ds-ink-900 / 0.88` with `backdrop-filter: blur(20px)`.
The header solidifies subtly — no jump, a 300ms transition on `background-color` and `backdrop-filter`.
Text color: remains `--ds-text-dark-primary` (white) — the frosted glass bar works on both dark and light content beneath it.
This state persists for the full scroll depth of the page.

**State 3 — Megamenu open:**
The frosted bar expands downward into the megamenu panel via a clip-path or max-height transition (300ms, `--ease-material`). The rest of the page dims slightly (`overlay: rgba(0,0,0,0.3)`). The megamenu closes on Escape, clicking outside, or moving to a non-nav area.

**State 4 — Mobile (< 768px):**
The desktop nav links are hidden. Hamburger icon appears (right side). "Örnek İste" CTA collapses — the primary CTA is instead surfaced inside the mobile menu overlay.

### Why This Header Model

The transparent-then-frosted approach is used by Poliform, Rimadesio, and most award-winning material brand websites. It allows the hero photography to breathe edge-to-top without a visual bar interrupting the composition — the brand name and navigation appear to emerge from the image. The frosted state on scroll is functional (sticky navigation for long-scroll pages) without being visually disruptive.

**Challenge considered and rejected:** A "scroll-hide on scroll-down / reveal on scroll-up" Headroom.js pattern. Rejected because architects using this site will frequently scroll both directions while comparing details. Having the nav disappear on scroll-down introduces confusion and frustration for a task-oriented professional audience.

---

## 4. FOOTER STRATEGY

### Philosophy

The footer is a map for users who have scrolled all the way down and still haven't found what they need. It is also a trust signal — certifications, contact information, and the brand statement reinforced at the bottom of every page.

It is NOT a sitemap dump. It is NOT a newsletter signup farm. It is a composed, final moment that sends the user to the right next action.

### Structure (4-column layout, dark background — `--ds-ink-900`)

**Column 1 — Brand**
Logo (white version).
One-line brand statement in body type.
Export countries / certification badges (small, text-based or minimal icon).

**Column 2 — Collections**
Label: Koleksiyonlar
Links: Taş, Mermer, Beton, Ahşap, Renk, Özel, Büyük Format, → Tüm Koleksiyonlar

**Column 3 — Site**
Label: Keşfet
Links: Mekanlar, Projeler, Hakkımızda, Sürdürülebilirlik, Profesyoneller

**Column 4 — İletişim / Contact**
Label: Bize Ulaşın
Address (city, country).
Email address (clickable `mailto:`).
Phone (clickable `tel:`).
Social icons: Instagram, LinkedIn, Pinterest — Phosphor Light icons, no labels.

**Footer base strip (below the 4-column layout):**
Left: © 2026 Doğrular Seramik. Tüm hakları saklıdır.
Center: Gizlilik Politikası | Kullanım Koşulları (minimal, text links)
Right: Language toggle (TR / EN)

**One deliberate exclusion:** No "Newsletter" or "Subscribe" section in the footer. The professional audience captures via sample request (lead capture at the point of intent) or professional registration. A generic newsletter opt-in cheapens the brand and rarely converts in this category.

---

## 5. USER JOURNEYS

### Journey A — The Specification Architect (B2B Primary)

```
Entry point: ArchDaily article / Dezeen reference / direct search
    ↓
Homepage hero (Brand impression — 15 seconds)
    ↓
Megamenu: Koleksiyonlar → By Effect → "Taş" (Stone)
    ↓
Collections Index (filtered to Stone effects, editorial grid)
    ↓
Collection Detail: [Specific collection]
    — Views: hero image, gallery, available finishes, format sizes
    — Views: "Bu Koleksiyon ile Gerçekleştirilen Projeler" (Projects using this collection)
    ↓
Downloads technical spec PDF (no login required, email field optional)
    ↓
Requests sample (4-field form: Name, Company, Email, Project Brief)
    ↓
Optional: Checks Project Gallery for scale reference
    ↓
Conversion: Sample dispatched, follow-up call from Doğrular team
```

**Friction to eliminate:**
- Technical spec download must require zero account creation
- Sample request form: 4 fields maximum
- Collection filtering on index page must be instant (client-side filter, no page reload)

### Journey B — The Aspirational Homeowner (B2C Primary)

```
Entry point: Instagram Reel / Pinterest Save / Google Image Search
    ↓
Homepage (Space Explorer section draws them in)
    ↓
Mekanlar megamenu → "Banyo" (Bathroom)
    ↓
Space Detail: Banyo
    — Full-room photography grid, editorial lifestyle images
    — "Banyo için Önerilen Koleksiyonlar" (Recommended collections for bathroom)
    ↓
Collection Detail: [Recommended collection]
    — Inspired by photography, reads narrative description
    — Views finish variations
    ↓
Showroom Bul (Find Showroom) — linked from collection page sidebar
    ↓
Contact page: Showroom locator → nearest showroom address and hours
    ↓
Conversion: Showroom visit booked (phone or online)
```

**Friction to eliminate:**
- Space Detail must lead directly to specific collection recommendations (not to the whole collections index)
- Each recommended collection must show a "In stock at showroom near you" indicator (future feature, documented)
- Showroom contact info must be immediately visible without scrolling

### Journey C — The Returning Professional (Repeat Visit)

```
Entry point: Direct URL or brand search "Doğrular Seramik"
    ↓
Homepage (quick orientation)
    ↓
Search icon → types collection name or effect keyword
    ↓
Search results → Collection Detail (direct)
    ↓
Downloads updated spec sheet or requests new sample for new project
    ↓
Conversion: Technical specification confirmed
```

**Implication for architecture:** Search must be fast (client-side over CMS index or Algolia), accessible from every page, and must return results in < 300ms.

### Journey D — The International Professional (Export Market)

```
Entry point: Google search in English / trade publication reference
    ↓
Homepage /en/ (English)
    ↓
Navigation in English: Collections → Stone Effects
    ↓
Collection Detail /en/collections/[slug]/
    — Technical specs in SI units, ISO certification references
    ↓
Professional Zone /en/professionals/
    — International catalog download
    — Contact form for export inquiries
    ↓
Conversion: Export inquiry email, follow-up from commercial team
```

---

## 6. DESKTOP NAVIGATION BEHAVIOR

### Interaction Model

**Hover trigger:** Nav items with megamenus respond to `mouseenter` with a 500ms delay (NNGroup standard — prevents accidental triggers during cursor transit across the nav). On `mouseleave` with 300ms delay (allows cursor to reach into the megamenu panel without it closing prematurely).

**Click/keyboard trigger:** Tab to nav item → Enter or Space opens megamenu. Arrow keys navigate within the megamenu panel. Escape closes and returns focus to the trigger item.

**Visual indicator:** A thin 1px underline in `--ds-accent` appears below the active nav item as the megamenu opens. This is the only visual signal — no caret icon, no chevron.

**Megamenu positioning:** The megamenu panel is full-width (100vw), positioned `position: fixed` below the nav bar to avoid z-index and overflow conflicts with page content. It has its own stacking context.

**Active page indicator:** The nav item corresponding to the current page section carries a persistent accent underline. On a Collection Detail page, "Koleksiyonlar" is the active item. On the homepage, no item is active (the logo IS the homepage link).

**Desktop nav behavior on scroll:** The navigation is sticky at all times after the first 80px of scroll. It does not hide. It does not resize. Its height is constant at 72px.

---

## 7. MOBILE NAVIGATION BEHAVIOR

### Trigger

A minimal hamburger icon (two horizontal lines, Phosphor Light `List` icon) in the upper right. NOT a three-line hamburger — two lines is more refined and less generic. On tap: the icon morphs to a close `X` (`clip-path` and `rotation` transition, 300ms).

### Overlay

Full-screen dark overlay (`position: fixed, inset: 0`), background `--ds-ink-900`, `z-index: 200`. Opens with a clip-path reveal from top (not a slide-in from side — that is a generic pattern). The entire overlay expands in 350ms.

### Menu Structure (Inside Overlay)

```
[X close — top right]

Koleksiyonlar              [+ expand accordion]
    Taş
    Mermer
    Beton
    Ahşap
    Renk
    Özel
    → Tüm Koleksiyonlar

Mekanlar                   [+ expand accordion]
    Banyo
    Mutfak
    Yaşam Alanı
    Dış Mekan
    Cephe
    Ticari

Projeler
Hakkımızda

─────────────────────────
[Örnek İste →]  ← Primary CTA, full-width button

[TR]  [EN]  ← Language toggle, bottom
```

**Link stagger:** Menu items enter with a staggered fade-up animation (Motion `staggerChildren`, 60ms delay between items, 400ms duration each). Each link is large (1.75rem) with generous vertical padding (24px hit target minimum).

**Accordion behavior:** The Collections and Spaces items expand in-place with a smooth `height` transition (using `content-visibility` or `grid-row` expansion — NOT `height: auto` animation which causes layout thrash). The `+` icon rotates 45° to become `×` when open.

**Close behavior:** Tapping the X icon, tapping outside the menu, or pressing Escape. When a menu link is tapped, the menu closes and the target page navigates.

---

## 8. CTA HIERARCHY

### Three-Level Hierarchy — Strictly Enforced

**Primary CTA: "Örnek İste" (Request Samples)**
The single most important conversion action on the website. Generates the highest-quality leads (confirmed intent, professional context).

Appears:
- Navigation bar (right side, always visible on desktop)
- Hero section of Homepage (below the headline)
- Collection Detail page (persistent position: below the material description, before the technical spec)
- Professional Zone page (large, centered)
- Mobile menu overlay (full-width, below the nav links)
- Contact page (as the primary form)

Styling: Filled pill, `--ds-accent` background, off-white text, 48px height. The one spot of color in an otherwise neutral interface.

**Secondary CTA: "Katalog İndir" (Download Catalog)**
Serves the professional audience who is evaluating multiple brands and wants offline reference material.

Appears:
- Professional Zone page (prominent)
- Collection Detail page (below the primary CTA, as an alternative action)
- About page (once, near the end of the brand story)

Styling: Ghost pill, `--ds-text-dark-primary` or `--ds-text-light-primary` border, same size as primary. No fill.

**Tertiary CTA: "Showroom Bul" (Find a Showroom)**
Serves the homeowner who needs to see material in person and the professional who needs to verify supply locally.

Appears:
- Contact page (prominent section)
- Space Detail pages (subtle text link at the bottom: "Bu mekan için showroom'umuzu ziyaret edin")
- Footer (text link in the Contact column)

Styling: Text link with a right-arrow icon. Never a button. This is a navigational action, not a conversion moment.

### The One-Primary-CTA-Per-Page Rule

No page ever shows two filled CTA buttons competing for attention. The hierarchy must be unambiguous:
- One primary CTA (filled, accented, one per section)
- One secondary CTA (ghost, adjacent to primary when both are present)
- Tertiary actions are text links only

**Exception:** The dual-CTA section on the homepage (the final section before footer). This section is explicitly designed as a bifurcation point for the two audiences: "Profesyoneller: Katalog İndir" (ghost, left) and "Ev Sahipleri: Showroom Bul" (ghost, right). Neither uses the accent fill — the primary CTA from the hero is already established. This exception is architecturally intentional and singular.

---

## 9. COLLECTION HIERARCHY

### Three-Axis Organization System

Collections can be discovered through three independent axes. No single axis is canonical — each serves a different user mental model.

**Axis 1 — By Effect (What It Looks Like)**
Primary axis for professionals specifying by material type.

- Taş Efekti (Stone Effect) — includes granite, travertine, limestone looks
- Mermer Efekti (Marble Effect) — veined marble-look surfaces
- Beton Efekti (Concrete Effect) — raw concrete, industrial
- Ahşap Efekti (Wood Effect) — plank-format, timber looks
- Renk (Color / Solid) — non-mimetic, pure color collections
- Özel (Special) — limited editions, collaborations, textured/3D

**Axis 2 — By Space (Where It Lives)**
Primary axis for homeowners and space-first thinkers.

- Banyo (Bathroom)
- Mutfak (Kitchen)
- Yaşam Alanı (Living Room / Interior)
- Dış Mekan (Outdoor / Terrace)
- Cephe (Facade / Exterior)
- Ticari (Commercial / Hospitality)

Note: One collection can belong to multiple spaces. A stone-effect collection may appear under Banyo AND Yaşam Alanı AND Dış Mekan. The many-to-many relationship is handled in Sanity with references.

**Axis 3 — By Format (How Big)**
Primary axis for contractors and technical specifiers.

- Büyük Format: 60×120, 80×160, 120×120, 60×260 and above
- Standart: 30×60, 60×60, 45×90
- Küçük: 15×15, 20×20, 30×30
- Mozaik: Strip, Square, Hexagonal

**Discovery hierarchy on the Collections Index page:**
1. Default view: Editorial grid, all collections, newest first, no active filter
2. Filter controls: Above the grid. Effect | Space | Format — three independent filter dropdowns (multi-select within each, client-side instant filter)
3. Collection count displayed: "28 koleksiyon" or "Filtre: 6 koleksiyon" — gives scale without demanding it

### Collection Detail Page — Content Hierarchy

Within a collection page, information is presented in strict importance order:

1. **Hero** — Full-bleed architectural application image. The material in its ideal environment.
2. **Collection Name + Tagline** — Name in display type, tagline in body (one sentence).
3. **Narrative Description** — 2–3 paragraphs. Material character, origin story, design intent.
4. **Finish Gallery** — Horizontal scroll of available finishes (Matte, Polished, Satin, Structured). Each finish has its own photography.
5. **Available Formats** — Clean table or grid: size codes, dimensions, pack quantity, weight.
6. **Application Spaces** — Which spaces this collection is appropriate for (icon + label, linked to Space Detail pages).
7. **Projects Using This Collection** — 2–3 project thumbnails with project name and location. Links to Project Detail.
8. **Technical Specifications** — Expandable section (accordion). Water absorption, slip coefficient, frost resistance, ISO certifications. Download PDF button here.
9. **Related Collections** — 3 collection thumbnails, same effect or complementary aesthetic.
10. **Primary CTA** — "Örnek İste" — persistent, appears after narrative description AND after technical spec section.

---

## 10. PROJECT HIERARCHY

### Two Tiers of Projects

**Tier 1 — Flagship Projects (4–8 total)**
Full narrative case studies. These receive the scroll-pinned storytelling treatment (GSAP ScrollTrigger, pinned left column with scrolling photography gallery). Selected for: visual quality of photography, prestigious location or typology, prominent architect credit, strong collection showcase.

These are the projects that build professional credibility. They appear on:
- Homepage (one featured flagship project as a standalone section)
- Projects Index (at the top, visually dominant)
- Professional Zone (curated selection)

**Tier 2 — Standard Projects (growing library)**
Gallery entries: hero image, project name, location, typology, collection used. Click → detail page with full-width image gallery and descriptive text, but without the scroll-pinned narrative treatment.

These are for volume and diversity — showing the range of typologies, geographies, and scales.

### Project Organization (Projects Index)

Default view: Newest first, all typologies.

Filter controls:
- Typology: Konut (Residential), Ticari (Commercial), Otelcilik (Hospitality), Kamusal (Public)
- Collection: Multi-select (shows projects using a specific collection)
- Location: Country or city (for international audience filtering)

### Project Detail Page — Content Hierarchy

1. **Hero** — Full-bleed hero image of the most impactful space.
2. **Project Name + Metadata strip** — Name, Location, Year, Typology, Architect credit, Interior Designer credit (if applicable).
3. **Project Description** — 1–2 paragraphs. The brief, the challenge, the material choice rationale.
4. **Scroll-Pinned Story** (Tier 1 only) — GSAP-pinned left column (collection name + key detail) while right scrolls through 4–6 project images.
5. **Standard Gallery** (Tier 2) — Simple grid or lightbox gallery.
6. **Collections Used** — Linked tiles to each collection featured in the project.
7. **Related Projects** — 2 projects of similar typology.
8. **CTA** — "Bu koleksiyon için örnek isteyin" (Request a sample for this collection) — linked to the primary collection of the project.

---

## 11. LANGUAGE STRUCTURE

### Model: Default Turkish, Prefixed English

```
Default locale (tr): dogrularseramik.com/
Secondary locale (en): dogrularseramik.com/en/
```

### URL Mapping

| Turkish URL | English URL |
|---|---|
| `/` | `/en/` |
| `/koleksiyonlar/` | `/en/collections/` |
| `/koleksiyonlar/ankara-tasi/` | `/en/collections/ankara-stone/` |
| `/mekanlar/` | `/en/spaces/` |
| `/mekanlar/banyo/` | `/en/spaces/bathroom/` |
| `/projeler/` | `/en/projects/` |
| `/projeler/bogazici-villa/` | `/en/projects/bosphorus-villa/` |
| `/hakkimizda/` | `/en/about/` |
| `/iletisim/` | `/en/contact/` |
| `/profesyoneller/` | `/en/professionals/` |

**Critical rule:** Turkish slugs use Turkish words with Turkish-language characters replaced by ASCII equivalents (standard Turkish URL practice: ş→s, ğ→g, ı→i, ö→o, ü→u, ç→c). Example: "Büyük Format" → `buyuk-format`.

### Language Toggle Behavior

The language toggle (TR / EN) appears in two locations:
1. Navigation bar (desktop, right of the CTA button)
2. Footer base strip (right side)
3. Mobile menu overlay (bottom)

On toggle: The user is redirected to the equivalent page in the other language. If an exact equivalent page exists (same content, different language), they land on that page. If no equivalent exists (e.g., a project that has only been published in Turkish), they land on the other language's index page for that section.

**hreflang tags:** Every page generates `<link rel="alternate" hreflang="tr">` and `<link rel="alternate" hreflang="en">` in the `<head>`, pointing to the correct equivalent page in each language.

### Content Parity Requirement

All 11 page templates must be fully translated at launch. Dynamic content (Collection Detail, Project Detail) requires both Turkish and English fields completed in Sanity before publication. An unpublished English version is not equivalent to a missing page — it prevents the international audience from discovering the content.

**Content team protocol:** Every new collection or project published in Sanity must have both `tr` and `en` language fields populated before the `publishedAt` field is set. The Sanity schema enforces this with validation rules.

---

## 12. SEO HIERARCHY

### Page Authority Pyramid

```
                    [Homepage]
                   /          \
          [Collections      [Projects
            Index]            Index]
           /    \              |    \
    [Collection [Space     [Project [Space
      Detail]   Detail]    Detail]  Detail]
       |
    [Professional  [About]  [Contact]
       Zone]
```

Link equity flows DOWN the pyramid from homepage. The most SEO-valuable pages (Collection Detail, Space Detail, Project Detail) receive the most internal links.

### Target Queries by Page Type

**Homepage:**
- "doğrular seramik" (branded)
- "premium seramik türkiye" (category brand)
- "lüks seramik istanbul" (geographic + category)

**Collection Detail pages (highest commercial intent):**
- "[effect] seramik" → "mermer efektli seramik", "taş efektli seramik"
- "[effect] porselen karo" → "beton efektli porselen"
- "[format] seramik" → "büyük format seramik levha"
- English: "marble effect porcelain tiles Turkey", "stone look ceramic tiles manufacturer"

**Space Detail pages (highest volume, inspirational intent):**
- "banyo seramik fikirleri" (bathroom tile ideas)
- "mutfak tezgah seramik" (kitchen counter ceramic)
- "dış mekan seramik" (outdoor ceramic)
- English: "bathroom tile ideas", "kitchen floor tiles", "outdoor porcelain tiles"

**Project Detail pages (professional discovery):**
- "[city] otel seramik projesi" (hotel ceramic project)
- "istanbul villa seramik" (Istanbul villa tile)
- "mimari porselen uygulama" (architectural porcelain application)
- English: "luxury hotel tile Turkey project", "residential porcelain Istanbul"

**About page:**
- "doğrular seramik hakkında" (branded informational)
- "türk seramik üreticisi" (Turkish ceramic manufacturer)
- English: "Turkish ceramic manufacturer premium quality"

**Professional Zone:**
- "mimar seramik kataloğu" (architect ceramic catalog)
- "seramik teknik özellikler" (ceramic technical specs)
- English: "ceramic tile technical specifications download", "porcelain tile BIM specs"

### On-Page SEO Requirements (per page template)

**Every page must have:**
- Unique `<title>` tag: `[Page Specific Term] | Doğrular Seramik` (max 60 characters)
- Unique meta description: 140–160 characters, action-oriented
- One `<h1>` per page — never repeated
- Structured data (JSON-LD):
  - Homepage: `Organization` schema
  - Collection Detail: `Product` schema
  - Project Detail: `CreativeWork` schema
  - Contact: `LocalBusiness` schema
- Open Graph image: 1200×630px, uses the hero image of each page
- Canonical URL pointing to the definitive language version (Turkish as canonical)

---

## 13. INTERNAL LINKING STRATEGY

### The Pyramid Linking Model

**Tier 1 Links (highest priority — pass maximum authority):**
- Homepage → 3 featured Collections (by name, in the collections preview section)
- Homepage → 1 featured Project (the featured project scroll section)
- Homepage → 3 featured Spaces (in the space explorer section)
- Collections Index → every Collection Detail page (exhaustive)
- Spaces Index → every Space Detail page (exhaustive)
- Projects Index → every Project Detail page (exhaustive)

**Tier 2 Links (cross-section bridging — connect discovery paths):**
- Collection Detail → related Collections (3 max, "similar effect" or "complementary")
- Collection Detail → Projects using this collection (2–3 max)
- Collection Detail → applicable Space Detail pages (contextual — "works in Banyo, Mutfak")
- Project Detail → Collections used (all, linked by name)
- Project Detail → similar Projects (2 max, same typology)
- Space Detail → recommended Collections for this space (3–5 curated, not algorithmic)
- Space Detail → Projects in this space type (2–3 max)

**Tier 3 Links (utility and depth):**
- About → Professional Zone (audience routing: "Mimar veya tasarımcı mısınız?")
- About → Projects Index (proof of work)
- Professional Zone → Collection Detail pages (full catalog links, organized by effect)
- Professional Zone → Contact (sample request + commercial inquiry)
- Footer → all primary nav destinations

### Linking Rules

1. **No orphan pages.** Every page is reachable from at least 2 other pages, independent of the navigation. If a Collection Detail page can only be reached from the Collections Index, it is an orphan — it needs at least one lateral link from a Space Detail or Project Detail.

2. **Anchor text is descriptive, never generic.** "Ankara Taşı koleksiyonunu keşfet" not "buraya tıklayın." "View the Ankara Stone collection" not "click here."

3. **The same page is not linked twice in the same section.** On a Collection Detail page, "Projeler" section links to 2 projects. If those same 2 projects also appear in the "Related Collections" section, they are removed from one. No duplicate destination within a single page section.

4. **Internal links in body copy are used sparingly.** No more than 2–3 inline links per paragraph. Over-linking interrupts reading flow and dilutes link equity signals.

5. **Every Project Detail links to at least one Collection Detail.** This is the most commercially important cross-link: a professional who discovers the brand through a project must be one click from the material specification.

---

## 14. SCROLL PHILOSOPHY

### Core Principle: Standard Scroll Is the Default — Hijacking Is the Exception

The site uses conventional vertical scroll for all pages. Users scroll at their own pace. Content is not gated behind scroll events (content is visible in its default state — animations enhance what is already visible, not reveal what is hidden).

**Scroll hijacking is permitted exactly twice per website:**
1. One scroll-pinned section per project case study (Tier 1 projects only)
2. One horizontal scroll section on the homepage (the project gallery reel) and the projects index

These are the two moments where scroll choreography serves the narrative — the pinned project story makes the viewer feel like they are walking through a space, and the horizontal reel makes the project breadth feel expansive. Every other page uses standard scroll.

### Scroll Entry Animations

As the user scrolls down, content sections enter the viewport with intentional animation (not gatekeeping — the content is present in the DOM, the animation is visual enhancement):

- **Dark sections:** Content enters via `opacity: 0 → 1` + `translateY(16px → 0)`, 700ms, `--ease-out-surface`. No blur — dark backgrounds + blur creates a muddy effect.
- **Light sections (collection grids, space pages):** Content enters via `scale(0.96 → 1)` + `opacity: 0 → 1`, 700ms, `--ease-material`. The scale suggests materiality arriving.
- **Typography (large headings):** Clip-path mask wipe on hero headings only. On section headings: standard fade-up, no clip-path (clip-path on every heading becomes noise).
- **Photography:** `scale(1.04 → 1)` on entry within `overflow: hidden` containers — the photography gently settles into its frame.

### Scroll Speed Philosophy

No momentum manipulation, no Locomotive Scroll, no Lenis on mobile. The native scroll behavior is preserved on all devices. On desktop, Lenis can be used for smooth inertia scrolling IF it is disabled for users with `prefers-reduced-motion` AND IF it does not interfere with the GSAP ScrollTrigger pinned sections (they must be tested together).

**On reduced motion:** All scroll animations collapse to `opacity` only, with 0ms duration. No transforms. The `useReducedMotion()` hook is checked in every motion component.

---

## 15. STORYTELLING PHILOSOPHY

### The Master Narrative Arc: Aspiration → Understanding → Credibility → Action

Every page on the site follows this four-chapter structure. The proportions change per page, but the order never does.

**Aspiration** — Show the dream before explaining the product. The visitor must feel something before they understand anything. This chapter lives at the top of every page, above the fold.

**Understanding** — Let the visitor learn about the material, the collection, the space. This is editorial content: what makes this stone different, what finishes are available, what makes this space work. This chapter earns attention by delivering value.

**Credibility** — Prove the brand is worthy of the aspiration. Project case studies at architectural scale. Named architects. ISO certifications. Export market references. This chapter converts interest into consideration.

**Action** — Give one clear, frictionless next step. Not three options competing. One invitation. The sample request, the catalog download, or the showroom finder — the correct one per page, presented at the moment when credibility has been established and the visitor is ready.

### Page-Level Storytelling

**Homepage story:**
1. The Brand World (dark hero — full-bleed architectural photography, display headline) — **Aspiration**
2. Brand Statement (centered manifesto text — one paragraph, large type) — **Understanding**
3. Collections Preview (editorial grid — material beauty, 6 collection thumbnails) — **Understanding**
4. Featured Project (scroll-pinned narrative — one case study at full depth) — **Credibility**
5. Space Explorer (inspiration gateway — 6 spaces, curated photography) — **Understanding**
6. Craft Section (manufacturing story — production quality, certifications) — **Credibility**
7. Dual CTA (bifurcation for two audiences — professional and homeowner) — **Action**

**Collection Detail story:**
1. Hero (material in context, full-bleed) — **Aspiration**
2. Name + Narrative (what this material is, where it comes from, what it creates) — **Understanding**
3. Finish Gallery + Formats (what is available, how it appears in different treatments) — **Understanding**
4. Projects (where this material has been used, by whom, at what scale) — **Credibility**
5. Technical Spec (downloadable, for professionals) — **Credibility**
6. Related Collections + CTA — **Action**

**Space Detail story:**
1. Hero (the space at its most aspirational) — **Aspiration**
2. Space description (what this space requires from a surface — functional + aesthetic) — **Understanding**
3. Curated Collections (3–5 collections that work in this space, with reasoning) — **Understanding + Credibility**
4. Projects in this space (real applications at scale) — **Credibility**
5. CTA — **Action**

**Project Detail story:**
1. Hero (the most impactful image of the space) — **Aspiration**
2. Project context (location, typology, architect, brief) — **Understanding**
3. The space narrative (scroll-pinned or gallery — the story of how the material shaped the space) — **Understanding + Aspiration**
4. Collections used (material specification bridge) — **Credibility**
5. CTA to the collection — **Action**

### Storytelling Rules

1. **Never explain what the user can see.** If the hero image shows a marble-effect bathroom, do not caption it "Marble effect ceramic in a luxury bathroom." The image communicates this. The copy communicates something the image cannot: the material's origin, its character, its context in architectural culture.

2. **The brand voice is that of an informed material expert, not a marketer.** Copy sounds like it was written by the person who designed the collection — specific, considered, material-literate. Never vague or promotional.

3. **One story per section.** Each section on a page tells one story and only one. No section tries to communicate "our quality, our range, our sustainability, our exports" simultaneously. Pick the one story the section should tell, tell it well, and move on.

4. **The scroll is the pacing.** The visitor determines when they are ready for the next chapter by scrolling. The architecture cannot force the pace — it can only ensure the next chapter is worth arriving at.

---

## COMPLETE SITEMAP

### Turkish (Default — tr)

```
/ (Homepage)
│
├── /koleksiyonlar/ (Collections Index)
│   ├── /koleksiyonlar/[collection-slug]/ (Collection Detail — dynamic)
│   │   Example slugs:
│   │   ├── /koleksiyonlar/ankara-tasi/
│   │   ├── /koleksiyonlar/bogazici-mermer/
│   │   ├── /koleksiyonlar/kara-beton/
│   │   ├── /koleksiyonlar/kis-beyazi/
│   │   └── ... (all active collections)
│
├── /mekanlar/ (Spaces Index)
│   ├── /mekanlar/banyo/ (Bathroom)
│   ├── /mekanlar/mutfak/ (Kitchen)
│   ├── /mekanlar/yasam-alani/ (Living Room)
│   ├── /mekanlar/dis-mekan/ (Outdoor)
│   ├── /mekanlar/cephe/ (Facade)
│   └── /mekanlar/ticari/ (Commercial)
│
├── /projeler/ (Projects Index)
│   ├── /projeler/[project-slug]/ (Project Detail — dynamic)
│   │   Example slugs:
│   │   ├── /projeler/bogazici-rezidans/
│   │   ├── /projeler/kapadokya-otel/
│   │   ├── /projeler/atasehir-ofis/
│   │   └── ... (all active projects)
│
├── /hakkimizda/ (About)
│   (Anchor sections within the page:)
│   ├── #hikaye (Brand Story)
│   ├── #uretim (Manufacturing / Craft)
│   ├── #surdurulebilirlik (Sustainability)
│   └── #sertifikalar (Certifications)
│
├── /iletisim/ (Contact + Sample Request)
│   (Anchor sections within the page:)
│   ├── #ornek-iste (Sample Request Form)
│   ├── #showroomlar (Showroom Listing)
│   └── #genel-iletisim (General Contact)
│
└── /profesyoneller/ (Professional Zone)
    (Anchor sections within the page:)
    ├── #kataloglar (Catalog Downloads)
    ├── #teknik-belgeler (Technical Documentation)
    ├── #kayit (Professional Registration)
    └── #proje-destek (Project Specification Assistance)
```

### English (/en/ prefix)

```
/en/ (Homepage — English)
│
├── /en/collections/ (Collections Index — English)
│   └── /en/collections/[english-slug]/ (Collection Detail — English)
│       Example slugs:
│       ├── /en/collections/ankara-stone/
│       ├── /en/collections/bosphorus-marble/
│       ├── /en/collections/black-concrete/
│       ├── /en/collections/winter-white/
│       └── ... (all active collections — English slugs)
│
├── /en/spaces/ (Spaces Index — English)
│   ├── /en/spaces/bathroom/
│   ├── /en/spaces/kitchen/
│   ├── /en/spaces/living-room/
│   ├── /en/spaces/outdoor/
│   ├── /en/spaces/facade/
│   └── /en/spaces/commercial/
│
├── /en/projects/ (Projects Index — English)
│   └── /en/projects/[english-slug]/ (Project Detail — English)
│       Example slugs:
│       ├── /en/projects/bosphorus-residence/
│       ├── /en/projects/cappadocia-hotel/
│       ├── /en/projects/atasehir-office/
│       └── ... (all active projects — English slugs)
│
├── /en/about/ (About — English)
│
├── /en/contact/ (Contact — English)
│
└── /en/professionals/ (Professional Zone — English)
```

### System / Technical URLs

```
/sitemap.xml          — Auto-generated XML sitemap (all tr pages)
/en/sitemap.xml       — Auto-generated XML sitemap (all en pages)
/robots.txt           — Search engine directives
/[404]                — Custom 404 page (designed, on-brand)
/api/contact          — Server Action endpoint (not indexable)
/api/revalidate       — Sanity webhook revalidation (not indexable)
```

### Post-Launch Extension URLs (Documented, Not Built v1)

```
/blog/                        — Editorial blog (Turkish)
/blog/[slug]/                 — Article detail
/en/blog/                     — Blog (English)
/en/blog/[slug]/

/bayiler/                     — Dealer / Showroom Map (interactive)
/en/dealers/

/profil/                      — Professional Account
/profil/kayit/                — Registration
/profil/giris/                — Login
/profil/koleksiyonlarim/      — Saved collections

/studio                       — Sanity Studio (production CMS, auth-protected, not indexable)
```

---

## ARCHITECTURE DECISION SUMMARY

| Decision | Choice | Primary Reason |
|---|---|---|
| Page templates | 11 | Quality over quantity; each page earns its place |
| Primary nav items | 5 | Luxury restraint; NNGroup optimal range |
| Megamenu trigger | Hover (500ms delay) + keyboard | Prevents accidental triggers; fully accessible |
| Header behavior | Transparent → frosted glass on scroll | Full-bleed photography priority; sticky for long-scroll usability |
| Footer columns | 4 columns, dark | Complete but not a sitemap dump |
| Primary CTA | "Örnek İste" (Request Samples) | Highest-quality lead signal for primary B2B audience |
| Dual-audience split | Same nav, divergent discovery paths (By Effect vs. By Space) | Unified brand; no audience feels secondary |
| Collection axes | 3 (Effect, Space, Format) | Matches three distinct user mental models |
| Project tiers | 2 (Flagship + Standard) | Narrative depth where it earns it; scale elsewhere |
| Language model | Turkish default, /en/ prefix | Domestic SEO priority; international access preserved |
| Scroll hijacking | Maximum 2 moments per site | Storytelling tool, not decoration |
| Storytelling arc | Aspiration → Understanding → Credibility → Action | Luxury purchase decision model |
| Sitemap total | ~115–145 URLs at launch | Lean, deep, maintainable |
| Search | Icon-triggered overlay | Utility accessible without dominating |
| Blog | Post-launch | Avoids stale content at launch |
