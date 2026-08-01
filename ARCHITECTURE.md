# ARCHITECTURE.md — Doğrular Seramik

*Internal technical architecture document. Updated: 2026-06-13.*

---

## 1. TECHNOLOGY STACK

### Core Framework
**Next.js 15 (App Router)**

**Rationale:** App Router enables React Server Components by default, meaning collection data, project data, and catalog content render on the server — zero JS cost for content, better SEO, faster LCP. The route-based architecture maps cleanly to the site's pages. GSAP and Motion animations are isolated to leaf-level Client Components, keeping the server/client boundary clean.

**Alternative considered:** Astro — better for static content. Rejected because the professional portal, sample request forms, and eventual CMS preview mode require server-side capabilities. Next.js is the correct choice for a site that will grow to include personalized professional experiences.

**Alternative considered:** Vite + React SPA — simpler, but poor SEO and poor LCP for a content-heavy site where architectural photography must load fast and rank. Rejected.

### Styling
**Tailwind CSS v4**

**Rationale:** v4's CSS-first configuration (no tailwind.config.js) allows CSS variables to be the single source of truth for design tokens. Design tokens defined in `globals.css` as CSS custom properties are consumed directly by Tailwind utilities. This gives maximum flexibility without the overhead of a runtime CSS-in-JS solution. Performance is better on mobile — no runtime style calculation.

**Tailwind v4 specific notes:**
- Config: Use `@tailwindcss/postcss` (v4 pattern), NOT the v3 plugin in postcss.config.js
- CSS variables from DESIGN.md are declared in `@layer base { :root { ... } }` within globals.css
- Custom utilities via `@layer utilities` for the specific patterns used throughout the project

### Animation
**Dual library strategy:**
- **Motion (motion/react):** Component-level interactions — hover states, button feedback, card entry animations, page transitions. Import from `motion/react`. Default for all React component animation.
- **GSAP + ScrollTrigger:** Scroll-storytelling — the pinned project narrative section, the horizontal project reel. Isolated to dedicated leaf Client Components with `useEffect` and `ctx.revert()` cleanup.

**Rule:** NEVER mix GSAP and Motion in the same component tree. They compete for the same frame budget.

### Typography
**next/font for all fonts**

All fonts are self-hosted via `next/font`. Zero external font network requests. Font files served from the Next.js static asset pipeline with optimal caching headers.

Primary font decision: Cabinet Grotesk (Fontshare — free for commercial use) as the confirmed implementation. PP Neue Montreal is the design ideal; Cabinet Grotesk is the licensed production font. This decision is documented in DECISION_LOG.md.

### Icons
**@phosphor-icons/react (Light weight)**

Phosphor Light icons: ultra-thin, precise, architectural. Consistent stroke weight across the entire site. One icon family per project — no mixing with Lucide or Material Icons.

### Internationalization
**next-intl v4**

Turkish (tr) as the default locale. English (en) as the professional/international secondary locale. URL structure: `dogrularseramik.com/` (Turkish) and `dogrularseramik.com/en/` (English).

See Section 3 for full i18n architecture.

### CMS (Headless)
**Sanity v3**

**Rationale:** Sanity's flexible schema supports the specific content types needed: Collections with technical specifications (structured, typed fields), Projects with multiple image galleries and crew credits, and Blog/Editorial content with rich text. The Sanity Studio can be embedded at `/studio` in production, allowing content editors to preview changes in context. Free tier is sufficient for launch.

**Data boundaries:** All CMS data is fetched server-side in Server Components using `@sanity/client`. Zero Sanity SDK on the client bundle. Images served via Sanity's CDN with next/image optimization.

### State Management
**No global state library at launch**

Server Components handle all data. URL state (collection filters, active space) managed via URL search params (Next.js `useSearchParams` in Client Components). Form state via React `useActionState` (native Next.js Server Actions).

**Why no Zustand/Jotai at launch:** Adding global state libraries for problems that don't exist yet adds bundle cost and architectural complexity. The professional portal (login, saved collections) may require it — documented as a future extension point.

---

## 2. SITE ARCHITECTURE (SITEMAP)

### Primary Navigation Structure

```
dogrularseramik.com/ (tr, default)
dogrularseramik.com/en/ (en)
```

### Routes (v1 Launch Scope)

```
/                              — Homepage
/koleksiyonlar/                — Collections Index
/koleksiyonlar/[slug]/         — Collection Detail
/mekanlar/                     — Spaces Index
/mekanlar/[slug]/              — Space Detail (Bathroom, Kitchen, etc.)
/projeler/                     — Projects Index
/projeler/[slug]/              — Project Case Study
/hakkimizda/                   — About
/iletisim/                     — Contact + Sample Request
/profesyoneller/               — Professional Zone (catalog download, tech specs, dealer locator)
/sitemap.xml                   — Auto-generated
/robots.txt                    — Configured
```

**English equivalents (via i18n routing):**
```
/en/
/en/collections/
/en/collections/[slug]/
/en/spaces/
/en/spaces/[slug]/
/en/projects/
/en/projects/[slug]/
/en/about/
/en/contact/
/en/professionals/
```

### Post-launch Extensions (Documented, Not Built v1)
```
/blog/                         — Editorial / The Ceramic Studio blog
/bayiler/                      — Dealer / Showroom Locator (map-based)
/profil/                       — Professional Account (saved collections, order history)
/api/                          — Internal API routes (contact form, sample request)
```

### Page Priority and SEO Weight
| Page | SEO Priority | Crawl Frequency |
|---|---|---|
| Homepage | 1.0 | Weekly |
| Collection Detail | 0.9 | Weekly |
| Project Case Study | 0.8 | Monthly |
| Collections Index | 0.8 | Weekly |
| Space Detail | 0.7 | Monthly |
| About | 0.6 | Monthly |
| Contact | 0.5 | Monthly |
| Professionals | 0.5 | Monthly |

---

## 3. URL STRATEGY & INTERNATIONALIZATION

### Locale Architecture (next-intl v4 pattern)

```
app/
  [locale]/              — Dynamic locale segment
    layout.tsx           — Locale-specific root layout
    page.tsx             — Homepage (tr: '/', en: '/en/')
    koleksiyonlar/       — Turkish URL slug
      page.tsx
      [slug]/
        page.tsx
    collections/         — English URL slug (separate route, same component)
      page.tsx
      [slug]/
        page.tsx
```

**Implementation decision:** Locale-specific route segments rather than translated params. Turkish URLs use Turkish words (`/koleksiyonlar/ankara-tasi/`), English URLs use English equivalents (`/en/collections/ankara-stone/`). This is better for SEO in both markets than machine-translated URLs.

**Middleware pattern:**
```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed' // tr URLs are clean: /, /koleksiyonlar/
                             // en URLs prefix: /en/, /en/collections/
});
```

### SEO / Hreflang
Every page generates `hreflang` alternate tags linking Turkish and English equivalents. Canonical URLs in Turkish for the default market.

### Content Translation Strategy
- Static UI strings: next-intl message files (`/messages/tr.json`, `/messages/en.json`)
- Dynamic CMS content: Sanity's i18n plugin with locale-specific fields per document
- Collection names and descriptions: both Turkish and English fields in Sanity schema
- Technical specifications: same data in both languages (SI units)

---

## 4. FOLDER ARCHITECTURE

```
dogrular-seramik/
│
├── app/
│   ├── [locale]/                      — i18n root
│   │   ├── layout.tsx                 — Root layout (fonts, providers, nav, footer)
│   │   ├── page.tsx                   — Homepage
│   │   ├── koleksiyonlar/
│   │   │   ├── page.tsx               — Collections index
│   │   │   └── [slug]/
│   │   │       └── page.tsx           — Collection detail
│   │   ├── collections/               — English route (same components, different slugs)
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── mekanlar/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── projeler/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── hakkimizda/
│   │   │   └── page.tsx
│   │   ├── iletisim/
│   │   │   └── page.tsx
│   │   └── profesyoneller/
│   │       └── page.tsx
│   │
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts               — Contact/sample request handler
│   │   └── revalidate/
│   │       └── route.ts               — Sanity webhook revalidation
│   │
│   ├── globals.css                    — Design tokens, Tailwind imports, grain overlay
│   └── layout.tsx                     — Root HTML (lang attribute, meta defaults)
│
├── components/
│   ├── ui/                            — Primitives (no business logic)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── tag.tsx
│   │   ├── icon-cta.tsx
│   │   └── index.ts                   — Barrel exports
│   │
│   ├── layout/                        — Site structure
│   │   ├── navbar.tsx
│   │   ├── mobile-menu.tsx            — 'use client' (hamburger, overlay)
│   │   ├── footer.tsx
│   │   └── page-container.tsx
│   │
│   ├── blocks/                        — Full page sections (Server Components by default)
│   │   ├── hero-home.tsx
│   │   ├── brand-statement.tsx
│   │   ├── collection-grid.tsx
│   │   ├── collection-detail-header.tsx
│   │   ├── project-story.tsx          — Wraps the GSAP scroll-pin Client Component
│   │   ├── space-explorer.tsx
│   │   ├── project-gallery-reel.tsx   — Wraps horizontal scroll Client Component
│   │   ├── craft-section.tsx
│   │   ├── dual-cta.tsx
│   │   └── index.ts
│   │
│   ├── motion/                        — Client-only animation islands
│   │   ├── hero-title-reveal.tsx      — 'use client'
│   │   ├── scroll-pin-project.tsx     — 'use client' (GSAP)
│   │   ├── horizontal-reel.tsx        — 'use client' (GSAP)
│   │   ├── collection-entry.tsx       — 'use client' (Motion)
│   │   ├── page-transition.tsx        — 'use client' (Motion)
│   │   └── grain-overlay.tsx          — 'use client' (fixed, pointer-events-none)
│   │
│   └── forms/                         — Form components
│       ├── sample-request-form.tsx    — 'use client'
│       └── contact-form.tsx           — 'use client'
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts                  — Sanity client config
│   │   ├── queries.ts                 — GROQ query functions
│   │   └── image-builder.ts           — Sanity image URL builder
│   ├── fonts.ts                       — next/font configuration (Cabinet Grotesk + Geist)
│   ├── metadata.ts                    — generateMetadata helper
│   ├── utils.ts                       — cn() utility, formatters
│   └── motion-config.ts              — Shared easing curves + duration constants
│
├── types/
│   ├── collection.ts                  — Collection type from Sanity schema
│   ├── project.ts                     — Project type
│   ├── space.ts                       — Space type
│   └── index.ts                       — Barrel exports
│
├── messages/
│   ├── tr.json                        — Turkish UI strings
│   └── en.json                        — English UI strings
│
├── public/
│   └── fonts/                         — Self-hosted font files (woff2)
│       ├── cabinet-grotesk-*.woff2
│       └── geist-*.woff2
│
├── sanity/                            — Sanity Studio configuration
│   ├── schemas/
│   │   ├── collection.ts
│   │   ├── project.ts
│   │   ├── space.ts
│   │   └── index.ts
│   └── sanity.config.ts
│
├── middleware.ts                      — next-intl locale routing
├── next.config.ts
├── tailwind.config.ts                 — Minimal (v4 pattern)
├── tsconfig.json
│
├── PRODUCT.md
├── DESIGN.md
├── ARCHITECTURE.md
└── DECISION_LOG.md
```

---

## 5. COMPONENT STRATEGY

### Server vs. Client Boundary

**Default: Server Component.** Every component is a Server Component unless it explicitly needs client-side capabilities. Mark `'use client'` only when a component:
- Uses React hooks (useState, useEffect, useRef)
- Handles user events (click, hover, pointer)
- Uses animation libraries (Motion, GSAP)
- Accesses browser APIs (window, document)

**Client Component isolation:** Client components are leaf nodes in the component tree. A Server Component (the `CollectionGrid` block) renders a Client Component (`CollectionEntry` for the animation) as a child — the data fetching stays on the server, the animation runs on the client.

```
CollectionGrid (Server — fetches data)
  └── CollectionEntry (Client — handles hover + entry animation)
        └── CollectionTile (Server — static markup)
```

### Component Size Discipline
- Primitives (`/components/ui/`): Zero business logic. Accept only display props. Maximum 100 lines.
- Compositions (`/components/layout/`): Assemble primitives. Minimal logic. Maximum 200 lines.
- Blocks (`/components/blocks/`): Full page sections. Fetch their own data or receive it via props. No animation logic — delegate to `/components/motion/` children.
- Motion islands (`/components/motion/`): Animation-only. Receive content as children or props. No business logic. Each is `'use client'`.

### Data Fetching Pattern
All data fetching in page.tsx or layout.tsx (Server Components at the route level), passed as props to blocks. No data fetching inside blocks. This keeps the data flow unidirectional and testable.

```typescript
// app/[locale]/koleksiyonlar/[slug]/page.tsx (Server Component)
const collection = await getCollection(slug, locale)

return <CollectionDetailHeader collection={collection} />
```

---

## 6. DATA ARCHITECTURE (CMS SCHEMAS)

### Collection Schema (Sanity)
```
Collection {
  _id: string
  slug: { current: string } // Turkish + English variants
  name: { tr: string, en: string }
  tagline: { tr: string, en: string }        // Short: "Doğal taşın derinliği"
  description: { tr: BlockContent, en: BlockContent }
  heroImage: SanityImage
  galleryImages: SanityImage[]
  effect: 'stone' | 'marble' | 'wood' | 'concrete' | 'color' | 'special'
  formats: Format[]                           // Available sizes
  finishes: Finish[]                          // Matte, Polished, Satin, etc.
  technicalSpec: TechnicalSpec               // Structured spec fields
  relatedCollections: Collection[]           // Referenced
  spaces: Space[]                            // Which spaces this works in
  projects: Project[]                        // Projects using this collection
  catalogPdf: { asset: SanityAsset }
}
```

### Project Schema (Sanity)
```
Project {
  _id: string
  slug: { current: string }
  name: { tr: string, en: string }
  location: string                           // City, Country
  year: number
  typology: 'residential' | 'commercial' | 'hospitality' | 'public'
  architect: string                          // Credit name
  interiorDesigner: string                   // Optional credit
  heroImage: SanityImage
  galleryImages: SanityImage[]              // 4–8 images for scroll-pin story
  collectionsUsed: Collection[]
  description: { tr: BlockContent, en: BlockContent }
  featured: boolean                          // For homepage featured project
}
```

---

## 7. NAMING CONVENTIONS

### Files
- React components: `kebab-case.tsx` (`collection-grid.tsx`, `hero-home.tsx`)
- Utility functions: `kebab-case.ts` (`image-builder.ts`, `motion-config.ts`)
- Type definitions: `kebab-case.ts` (`collection.ts`, `project.ts`)
- Sanity schemas: `kebab-case.ts` matching the type name

### Components
- Component names: `PascalCase` (`CollectionGrid`, `HeroHome`)
- Props interfaces: `ComponentNameProps` (`CollectionGridProps`)
- Never default exports for components — always named exports for tree-shaking clarity

### CSS Variables (Design Tokens)
- Prefix: `--ds-` (Doğrular Seramik)
- Pattern: `--ds-{category}-{modifier}` 
- Examples: `--ds-ink-900`, `--ds-accent`, `--ds-surface-100`, `--ds-text-dark-primary`
- Motion: `--ds-ease-material`, `--ds-duration-slow`

### TypeScript
- Types: `PascalCase` (`Collection`, `Project`, `Space`)
- Interfaces: `PascalCase` (same as Types — no I-prefix)
- Enums: Avoid — use string literal unions instead (`'stone' | 'marble' | 'wood'`)
- Generic type params: Single uppercase letter or descriptive `PascalCase` (`T`, `TData`, `TError`)

### Tailwind Classes
- Custom utilities: `ds-{name}` (e.g., `ds-grain` for the grain overlay utility)
- Prefer semantic CSS variables over arbitrary Tailwind values: `text-[--ds-text-dark-primary]` over `text-[#f2f2ee]`

### Sanity / CMS
- Schema names: camelCase (`collectionDocument`, `projectDocument`)
- Field names: camelCase (`heroImage`, `collectionsUsed`, `catalogPdf`)
- Query functions: `get{Resource}` + `get{Resource}s` (`getCollection`, `getCollections`)

### Git
- Branch naming: `feature/`, `fix/`, `design/` prefixes
- Commit style: conventional commits (`feat:`, `fix:`, `design:`, `content:`, `docs:`)

---

## 8. PERFORMANCE ARCHITECTURE

### LCP Strategy (Target: < 2s)
- Hero image: `next/image` with `priority` prop. Served via Next.js Image Optimization.
- Hero image preload: `<link rel="preload" as="image">` generated in `generateMetadata`.
- Critical CSS: Inlined by Next.js. Design tokens as CSS variables = zero FOUC.
- Font loading: `next/font` with `font-display: swap` and preloading of the Regular weight.

### CLS Strategy (Target: < 0.05)
- All `next/image` components include explicit `width` and `height` props.
- Font loading with `next/font` prevents layout shift from font swap.
- Aspect ratio wrappers on all image containers using CSS `aspect-ratio`.

### INP Strategy (Target: < 150ms)
- No hydration cost for Server Components.
- Client Components isolated to interactive leaf nodes.
- GSAP and Motion are imported with tree-shaking. GSAP ScrollTrigger loaded only on pages that need it.
- Form submissions use Server Actions — no client-side API calls for the sample request form.

### Bundle Size Targets
- Page JS (excluding shared): < 50KB gzipped per route
- GSAP: Loaded only on pages with ScrollTrigger features
- Motion: Loaded for all pages (unavoidable, acceptable — ~30KB gzipped)
- Sanity client: Server-only (zero bundle impact)

### Image Optimization
- Format: WebP/AVIF via next/image automatic format negotiation
- Sizes: Defined per breakpoint per usage context (`sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 720px"`)
- Sanity images: Via Sanity CDN with width/quality parameters built via `image-builder.ts`

---

## 9. SCALABILITY STRATEGY

### What Must Not Change When the Site Grows

**Design token layer:** All colors, spacing, typography, and easing are CSS variables in `globals.css`. Adding a new collection type, a new page, or a new color scheme requires only token changes — no component rewrites.

**Content schema:** Sanity schemas are designed to be extended. Adding a new `effect` type (e.g., `terrazzo`) to the Collection schema requires adding one string literal — all filtering, display, and routing works automatically.

**i18n:** Adding a third language (Arabic for Gulf market expansion) requires: (1) a new message file, (2) adding the locale to next-intl middleware, (3) adding locale-specific CMS content fields. No routing architecture changes.

**Component hierarchy:** The Server/Client boundary is enforced from day one. Scaling means adding new blocks, not refactoring existing ones.

### Extension Points Documented for Post-launch

| Feature | Extension Point | Estimated Complexity |
|---|---|---|
| Blog / Editorial | New Sanity schema + `/blog/` route | Low |
| Dealer Map | `/bayiler/` route + map integration (Mapbox or Google Maps) | Medium |
| Product Configurator | New section block + 3D viewer library (could be Three.js) | High |
| Professional Account | Auth (NextAuth.js), saved collections, order history | High |
| E-commerce Integration | Would require significant architecture addition — evaluate separately | Very High |
| Real-time Stock | API integration with ERP/inventory system | High |

### The "No Clever" Rule
Architecture decisions must be obvious to a new developer 12 months from now. No clever abstractions, no over-engineered utilities, no premature optimization. The folder structure, naming conventions, and component boundaries are chosen for clarity first, performance second.
