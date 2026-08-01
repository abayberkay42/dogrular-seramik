# DECISION_LOG.md — Doğrular Seramik

*Every significant design, technical, and strategic decision taken during this project.*
*Format: Date | Decision | Alternatives Rejected | Rationale | Risk / Tradeoff*

---

## D-016 — Five Primary Navigation Items (Not Six or Seven)
**Date:** 2026-06-13
**Decision:** Exactly five primary navigation items: Koleksiyonlar, Mekanlar, Projeler, Hakkımızda, + CTA button "Örnek İste."

**Alternatives rejected:**
- Six items (adding İletişim as primary): Rejected. Contact is a conversion destination, not a discovery path. It belongs in the footer and in the CTA, not as a primary nav label.
- Seven items (Atlas Concorde model, adding Sürdürülebilirlik and Profesyoneller): Rejected. Atlas Concorde serves multiple sub-brands and a much larger content universe. Doğrular Seramik at launch has focused content — the navigation should reflect that focus. Sustainability lives within About. The Professional Zone is a secondary destination accessed from About and from the homepage dual-CTA section.
- Four items (collapsing Spaces into Collections): Rejected. The two audiences have fundamentally different mental models — material-first (professional) vs. space-first (consumer). Mekanlar must be a first-class navigation item or the B2C journey becomes indirect.

**Rationale:** Luxury restraint. Every item in a luxury brand's navigation is a curatorial statement. Five items is sufficient to route both audiences without creating choice overload.

**Risk:** The Professional Zone and Contact page are less discoverable. Mitigated by: (1) "Örnek İste" CTA is always visible, (2) Professional Zone link appears in About page and footer, (3) Contact information in footer on every page.

---

## D-017 — Transparent-to-Frosted Header (Single Nav Style)
**Date:** 2026-06-13
**Decision:** Navigation begins fully transparent over the hero (dark section), transitions to frosted glass (backdrop-blur, semi-transparent dark background) after 80px of scroll. This single frosted style is maintained for the full page depth regardless of section background color below.

**Alternatives rejected:**
- Color-switching nav (detects background color per section, switches between dark/light text): Visually ideal but technically fragile. Edge cases at section boundaries cause flickering. Rejected for reliability reasons.
- Always-opaque sticky nav: Prevents the full-bleed photography from reaching the top edge of the viewport. Rejected — the hero photography is the brand's most powerful asset.
- Hide-on-scroll-down / reveal-on-scroll-up (Headroom.js): Rejected. Professionals scroll both directions while evaluating materials. A disappearing nav creates frustration in task-oriented use. Luxury brands do not use this pattern.

**Rationale:** The frosted glass nav works on both dark and light sections beneath it. The blur ensures sufficient contrast for legibility regardless of what the background shows. White text on the frosted dark bar maintains legibility at all times.

---

## D-018 — Two Scroll-Hijack Moments Maximum Per Site
**Date:** 2026-06-13
**Decision:** Scroll hijacking (GSAP ScrollTrigger pinned sections and horizontal scroll reels) is permitted in exactly two contexts: (1) the pinned project narrative on Tier 1 Project Detail pages, (2) the horizontal scroll project gallery reel on the homepage and Projects Index.

**Alternatives rejected:**
- Full-page scroll hijacking (like an agency portfolio): Rejected. Agency portfolios can afford to disorient users with scroll choreography because the portfolio IS the product — the choreography demonstrates the agency's capability. For a ceramic tile brand, the material is the product. Scroll hijacking that distracts from material evaluation is counterproductive.
- Scroll hijacking on Collection Detail pages: Rejected. Architects and professionals need to efficiently scroll through technical information. Forced pacing on specification pages creates friction, not delight.
- No scroll hijacking at all: Rejected. The pinned project story is the single most powerful storytelling moment in the website — it creates the feeling of walking through a real space. This one instance of scroll choreography is earned and justified.

**Rationale:** Restraint. Two moments of scroll storytelling are memorable. Ten are exhausting.

---

## D-019 — "Örnek İste" (Request Samples) as the Single Primary CTA
**Date:** 2026-06-13
**Decision:** "Örnek İste" is the primary CTA across the entire website — in the navigation, in the hero, on collection pages, in the professional zone.

**Alternatives rejected:**
- "İletişim" (Contact) as primary CTA: Too generic. A "Contact" button signals nothing about intent. An "Örnek İste" button signals qualified purchase consideration.
- "Showroom Bul" as primary nav CTA: Serves the B2C homeowner audience better but excludes the B2B professional audience who may be in a city without a showroom. The sample request works for both audiences.
- Audience-specific CTAs in the nav (two buttons): Would require the nav to know the user's audience type before they have declared it. Creates visual complexity in an already-constrained space.

**Rationale:** The sample request is the single highest-converting action for material specification brands. A physical sample in an architect's hand begins a sales relationship. It is the correct singular focus.

---

## D-020 — Three-Axis Collection Organization (Effect, Space, Format)
**Date:** 2026-06-13
**Decision:** Collections are organized across three independent axes: By Effect (what it looks like), By Space (where it lives), By Format (how big). All three axes are available simultaneously on the Collections Index page as filter controls.

**Alternatives rejected:**
- Single-axis (By Effect only): Matches the professional mental model but excludes the homeowner's space-first discovery path.
- Two-axis (By Effect + By Space): Considered. Rejected because Format is critical for technical specifiers who must match an existing installation size. "Only available in 30×60" is a project-killer for an architect who needs 60×120.
- Tabs instead of filters (one view per axis): Creates three separate browsable views. Rejected because users with multi-criteria needs (stone effect, bathroom, large format) would need to apply criteria across three tab views. A multi-select filter panel is more efficient.

**Rationale:** The three axes represent three distinct user mental models. Any single axis fails at least one audience. All three simultaneously, with instant client-side filtering, serves all three.

---

## D-001 — Dark-Anchored Color Strategy
**Date:** 2026-06-13
**Decision:** Use a dual-mode color system: dark sections (--ds-ink-900 near-black) for hero, brand narrative, and featured project; light sections (--ds-surface-100 near-white) for collections, spaces, and discovery.

**Alternatives rejected:**
- Full light background (Florim / Atlas Concorde / Marazzi approach): Rejected because every premium ceramic competitor uses this approach. Matching them means visual invisibility.
- Full dark background (gallery/portfolio approach): Rejected because B2C audience (homeowners) needs accurate material color rendering in a light environment. Dark backgrounds distort perceived tile color.
- Warm cream/beige (the AI default for ceramics/craft): Rejected. This is the saturated AI default for the entire industry — it is the signal of a generic brand, not a premium one.

**Rationale:** The dark hero creates immediate differentiation at first viewport. The light product sections restore the clean evaluation environment that architects and homeowners need to accurately assess material color. The transition between dark and light sections is itself a design moment — like a gallery that leads you from a dramatic antechamber into a clean viewing space.

**Risk:** Dark hero sections can feel heavy or unwelcoming if the photography and typography do not deliver at the required quality level. The dark sections only work if the hero photography is exceptional. If photography is mediocre, the fallback is to convert the hero to a light section.

**Tradeoff:** Slightly more complex CSS token management (two sets of text and surface tokens). Accepted.

---

## D-021 — 7-Section Homepage Structure (Exact Order)
**Date:** 2026-06-13
**Decision:** The homepage contains exactly 7 sections in this order: Hero → Brand Statement → Collections Preview → Featured Project → Space Explorer → Craft & Trust → Dual CTA. See HOMEPAGE_BLUEPRINT.md for complete specification.

**Alternatives rejected:**
- 6 sections (removing Space Explorer): Rejected. Without the Space Explorer, the B2C homeowner audience is never directly addressed on the homepage. Homeowners see a beautiful brand, an architectural project, and then a closing CTA — but are never shown "this is for your space." The B2C conversion path breaks.
- 6 sections (removing Brand Statement): Rejected. Without the manifesto section, the brand is visually impressive but philosophically empty. Competitors can replicate photography. A specific point of view is harder to replicate.
- Brand Statement integrated into Hero (5+1 → 6 sections): Rejected. The hero is a visual moment; the manifesto is a philosophical moment. Combining them causes competition between the photography and the text for the visitor's attention. They must be sequential, not simultaneous.
- Craft & Trust before Collections (trust-first ordering): Rejected. Trust-building content is most effective after the visitor has something to be credulous ABOUT. A brand that opens with credentials feels defensive. One that shows its work first, then reveals its credentials, feels secure.
- Space Explorer before Featured Project: Rejected. The Space Explorer's power comes from context — the visitor has already seen what the brand makes (Collections) and what it creates at scale (Featured Project). The Space Explorer then says "find YOUR space in this world." Without the Featured Project preceding it, the Space Explorer feels premature.

**Rationale:** The 7-section order follows the logical dependency chain of a considered luxury purchase: establish the world → define the belief → show the range → prove the capability → establish personal relevance → confirm operational credibility → direct to action.

---

## D-022 — Dark-Dark Opening (Hero + Brand Statement as Continuous Zone)
**Date:** 2026-06-13
**Decision:** The Hero and Brand Statement sections are both dark (--ds-ink-900) and flow seamlessly without a visual break between them. The first dark-to-light transition occurs between the Brand Statement and the Collections Preview.

**Alternatives rejected:**
- Light Brand Statement (hero is dark, manifesto is light): Would require an immediate dark→light→dark→light pattern at the top of the page. The rapid alternation would undermine both sections — the brand's philosophical weight needs sustained darkness to land.
- Brand Statement as a light interlude between two dark sections: Creates a visual sandwich (dark hero / light manifesto / dark project) that reads as inconsistent rather than intentional.

**Rationale:** The hero and manifesto are ONE emotional moment. The visitor enters the brand's world (hero) and hears the brand's voice (manifesto) before surfacing into the light of product discovery. Holding the darkness for two full sections creates sufficient brand gravity before the tone shifts.

---

## D-023 — No CTA in Brand Statement, Craft, or Featured Project Interior
**Date:** 2026-06-13
**Decision:** Three sections on the homepage contain zero CTA buttons: the Brand Statement (02), the interior of the Featured Project (04), and the Craft & Trust section (06). The Featured Project does include one collection credit link within the pinned left column, but this is contextual navigation, not a conversion CTA.

**Alternatives rejected:**
- Adding "Tüm Koleksiyonlar" CTA below the Brand Statement: Rejected. A CTA immediately after a philosophical manifesto makes the manifesto feel like a sales pitch. The manifesto must exist for its own purpose — to establish belief — not to funnel.
- Adding "Koleksiyonu İncele" CTA within the Craft section: Rejected. Trust sections that contain conversion asks are not trusted. The visitor reads the CTA as commercial intent and discounts the surrounding credibility content accordingly.
- Adding multiple CTAs throughout the Featured Project: Rejected. The pinned project is a cinematic, slow experience. Interrupting it with conversion asks breaks the immersive pace. The collection credit link is sufficient and contextually earned.

**Rationale:** Restraint in CTA placement is luxury behavior. Brands that ask for conversion at every scroll position signal desperation. Brands that hold back, let the content breathe, and convert at precisely the right moment signal confidence.

---

## D-024 — Dual CTA Uses Ghost Buttons (Not Filled)
**Date:** 2026-06-13
**Decision:** The final Dual CTA section uses ghost (outline) buttons for both audience paths, not filled accent-color buttons.

**Alternatives rejected:**
- Filled accent buttons for both CTAs: Would create two "primary" moments on the page, competing with the accent-filled "Örnek İste" button established in the Hero. A page with three accent-filled CTAs has no hierarchy.
- One filled + one ghost (hierarchy between audience paths): Rejected. The homepage serves both audiences equally. Visually privileging one path over the other would be an editorial statement the brand does not want to make.
- Both CTAs using the same ghost style as the nav's secondary actions: Correct choice. The ghost button at section 07 is a closing gesture, not an aggressive ask. By this point, the visitor is pre-sold — the button's job is to confirm direction, not to convince.

**Rationale:** The accent fill was used once (hero CTA) for the universal action. All other CTAs in the page are lower in the hierarchy. Ghost buttons acknowledge this hierarchy without disappearing.

---

## D-002 — Font Choice: Cabinet Grotesk (Free) over PP Neue Montreal (Licensed)
**Date:** 2026-06-13
**Decision:** Cabinet Grotesk (Fontshare, free commercial license) for display. Geist (free, Vercel) for body. Geist Mono for technical specifications.

**Alternatives rejected:**
- PP Neue Montreal (Pangram Pangram): The design-ideal choice — wide, architectural, excellent weight range. Rejected for implementation because the licensing cost (~$40–80 for web commercial use) must be confirmed with the client. The document names this as the design ideal but Cabinet Grotesk as the confirmed implementation font.
- Söhne / Söhne Breit (Klim Type Foundry): Excellent, but higher licensing cost ($300–500 for web). Rejected for same reason.
- Inter: Banned by design principles (generic, ubiquitous, the anti-luxury default).
- Instrument Serif / Fraunces: The AI-default "luxury serif" move. Banned explicitly.
- DM Sans / Plus Jakarta Sans: Acceptable but too common in premium consumer design right now. No distinctive character.
- Geist Display: Good but too "developer tool" in character for the display role here.

**Rationale:** Cabinet Grotesk has genuine character — slightly wider letterforms, confident proportions, architectural in feel — without the licensing barrier. It is available free via Fontshare for commercial use. The Geist pairing (also free, also architectural in its DNA) creates a coherent system without visual conflict.

**Risk:** Cabinet Grotesk is a less unique choice than PP Neue Montreal. If the client has budget for PP Neue Montreal, the upgrade is recommended.

**Tradeoff:** Some visual uniqueness traded for licensing simplicity. If client approves font licensing budget, upgrade to PP Neue Montreal in the implementation phase.

---

## D-003 — No E-commerce at Launch
**Date:** 2026-06-13
**Decision:** No pricing, no cart, no direct purchase at v1 launch. All commercial transactions route through showrooms and direct contact.

**Alternatives rejected:**
- Soft e-commerce (visible prices, online cart): Rejected. Luxury positioning requires price invisibility. Showing prices online removes the relationship-building step that luxury sales depend on. Reference: Poliform, Rimadesio, Laminam all have no prices on their websites.
- Price on request (POR): Possible compromise, but adds friction and potentially signals uncertainty. Rejected for v1.

**Rationale:** The primary conversion on this website is a qualified lead (sample request, catalog download, showroom appointment), not a transaction. Adding e-commerce infrastructure at v1 delays launch without adding conversion value for the target audience.

**Risk:** Losing bottom-of-funnel homeowners who want to buy small quantities online (a replacement tile, a sample). This is a real loss. Mitigated by making the showroom locator and sample request flow excellent.

**Tradeoff:** Simpler architecture, faster launch, cleaner luxury positioning. Future e-commerce capability is documented as an extension point.

---

## D-004 — Next.js App Router over Astro or Vite SPA
**Date:** 2026-06-13
**Decision:** Next.js 15 App Router as the framework.

**Alternatives rejected:**
- Astro: Better for fully static sites. Rejected because the professional portal, sample request forms with Server Actions, and Sanity preview mode require server capabilities.
- Vite + React SPA: Zero SSR means poor LCP for photography-heavy pages and poor SEO for collection/project pages where organic search is a primary channel.
- Remix: Comparable to Next.js. Rejected because the team is more likely to have Next.js familiarity and the ecosystem is more mature for Sanity integration.

**Rationale:** App Router's Server Components are the correct model for a content-heavy site where data (collections, projects) comes from a CMS. The Server/Client split keeps the JS bundle minimal while allowing rich animation on the client side.

**Risk:** Next.js 15 / App Router is still evolving. Some third-party libraries (particularly older animation libraries) do not support RSC. All animation is pre-confirmed as compatible: Motion v11 (motion/react) and GSAP are both client-only and explicitly supported.

---

## D-005 — Sanity v3 as CMS
**Date:** 2026-06-13
**Decision:** Sanity v3 as the headless CMS.

**Alternatives rejected:**
- Contentful: More expensive for the content team size this project likely has. API-first but less flexible schema design. Rejected for cost and flexibility reasons.
- Builder.io / Webflow: Visual editors add complexity and reduce component-level control. Not appropriate for a design-led project where the component design is the product.
- Static JSON files in the repository: Simple but requires a developer to update content. Not appropriate for a brand that will regularly add new collections and project case studies.
- Strapi (self-hosted): Requires infrastructure management. Added operational burden for what is a marketing site. Rejected.

**Rationale:** Sanity's flexible schema design is ideal for the structured content types (Collection with technical specs, Project with crew credits and multiple images). The free tier covers launch needs. The Studio can be embedded at `/studio` for the client's content team.

**Risk:** Sanity is a third-party service dependency. Content unavailability = site unavailability (for dynamic content). Mitigated by implementing ISR (Incremental Static Regeneration) with Sanity webhooks — pages are statically cached and only rebuild when content changes.

---

## D-006 — Turkish (tr) as Default Locale, English (en) as Secondary
**Date:** 2026-06-13
**Decision:** Turkish is the default locale (clean URLs: `/`, `/koleksiyonlar/`). English is prefixed (`/en/`, `/en/collections/`).

**Alternatives rejected:**
- English as default: Rejected. The primary market is Turkish domestic. Turkish URL structure is better for domestic SEO. The professional/export audience can navigate to `/en/` — this is standard practice.
- Subdomain for each language (tr.dogrularseramik.com / en.dogrularseramik.com): Rejected. Subdomains split domain authority. Single domain with path-based i18n is better for SEO.
- No i18n at launch (Turkish only): Rejected. The professional/export audience strategy is a stated business goal. Building i18n into the architecture from day one is far cheaper than retrofitting it later.

**Rationale:** next-intl v4 with `localePrefix: 'as-needed'` gives Turkish users clean URLs while English users get the `/en/` prefix. This is the most common pattern for brands with a dominant home market and a secondary international audience.

**Risk:** Managing two sets of CMS content (Turkish and English) for every collection, project, and space. This requires discipline from the content team. Mitigated by structuring the Sanity schema to make both fields visible and required.

---

## D-007 — Sharp Corners (2px radius) for Collection Cards
**Date:** 2026-06-13
**Decision:** Collection tiles and project cards use a 2px border-radius (essentially sharp). Buttons and navigation pills use full-radius (9999px).

**Alternatives rejected:**
- Rounded corners (12–16px) for cards: Rejected. Rounded corners on content cards in the ceramic/material space make the UI feel soft and consumer-app. The architectural reference (stone slabs, ceramic tiles) is sharp-edged. The card should reference the product's geometry.
- Consistent radius across all elements: Rejected. Having cards AND buttons both with rounded corners creates visual monotony. The contrast between sharp cards and pill buttons creates a visual system with internal logic.
- No radius system (arbitrary radii per component): Rejected. Inconsistency is the enemy of precision. Doğrular means "the correct ones." The radius system must be rigorously correct.

**Rationale:** The sharp-card / pill-button system is an internal design logic: flat architectural surfaces (the product) have sharp edges; interactive moments (buttons, pills) are soft and approachable. This is a considered distinction, not a random assignment.

**Risk:** Sharp corners can feel harsh if the surrounding context (photography, color) is not handled with equal care. This is a known risk, managed by ensuring photography bleeds into the card format rather than being contained by it.

---

## D-008 — No Global State Library at Launch
**Date:** 2026-06-13
**Decision:** No Zustand, Jotai, or React Context for global state at v1 launch.

**Alternatives rejected:**
- Zustand from day one: Rejected. Premature. The only "global" state needed at launch is: the current locale (handled by next-intl), the current nav state (handled by URL), the mobile menu open/closed state (local useState in MobileMenu component). None of these require a global store.
- React Context for theme: Rejected. The site has a fixed design — no user-switchable theme. CSS variables handle all theme logic.

**Rationale:** Adding a global state library for problems that don't exist wastes bundle size (Zustand ~3KB) and introduces unnecessary complexity. The professional portal (saved collections, user preferences) will require it — that is the correct time to add it.

---

## D-009 — GSAP + Motion Dual Library (No Single Library)
**Date:** 2026-06-13
**Decision:** Use both GSAP (for scroll-pinning and horizontal scroll) and Motion/motion/react (for component-level interactions). Never in the same component tree.

**Alternatives rejected:**
- GSAP only: GSAP's React integration (useGSAP) is excellent but more verbose for simple hover states and entry animations that Motion handles elegantly.
- Motion only: Motion lacks ScrollTrigger's pinning capabilities. The scroll-pinned project story section requires GSAP ScrollTrigger's `pin: true` feature. There is no clean Motion equivalent for this specific pattern.
- CSS animations only: Insufficient for the scroll-pinned narrative section. Acceptable for simple entry animations — and where CSS scroll-driven animations can handle it (CSS `animation-timeline: view()`), they are preferred over JS for performance.

**Rationale:** The two libraries serve distinct purposes. This is a deliberate boundary: GSAP handles scroll orchestration (a layout-level concern), Motion handles component state transitions (a component-level concern). The boundary is enforced architecturally by isolating each in its own `/components/motion/` Client Component.

**Risk:** Larger JS bundle (GSAP ~35KB + Motion ~30KB gzipped). Mitigated by: (1) GSAP loaded only on pages with scroll-pinned sections, (2) both libraries use tree-shaking, (3) total animation budget remains under 70KB.

---

## D-010 — Photography as the Primary Design Element (Not an Enhancement)
**Date:** 2026-06-13
**Decision:** The design system is built around the assumption that professional architectural photography is available. The layout, spacing, and component decisions all assume photography of editorial quality.

**Alternatives rejected:**
- Design-first with placeholder photography: The temptation is to design with placeholder images and upgrade later. Rejected. The placeholder approach produces different design decisions — tighter type, more text, more UI chrome. Designing for exceptional photography and then delivering it produces different results than designing for "good enough" photography.

**Rationale:** Every premium ceramic brand analyzed (Florim, Atlas Concorde, Laminam, Marazzi) treats photography as the product. The design systems of all of them are essentially transparent frames for the photography. Doğrular Seramik must make the same commitment.

**Risk:** If the client cannot deliver professional architectural photography at launch, the design will underperform. This is a known dependency. Mitigation: launch with a small number of high-quality images rather than many mediocre ones. Five exceptional project images are better than 30 catalog shots.

**Implementation note:** Picsum seeds with descriptive keywords will be used during development. These must be replaced with real photography before any page goes live.

---

## D-011 — Component-Level Technical Specifications in Sanity (Structured Fields, Not Rich Text)
**Date:** 2026-06-13
**Decision:** Technical product specifications (dimensions, weight, slip resistance, frost resistance, water absorption) are stored as structured Sanity schema fields with defined types — NOT as rich text or free-form text.

**Rationale:** Structured spec fields enable: (1) filtering collections by technical property, (2) generating comparison tables, (3) future API export to BIM/specification tools. Free text specs cannot be queried, filtered, or exported reliably.

**Risk:** More schema design work upfront. Accepted — the cost of retrofitting unstructured specs later is higher.

---

## D-012 — URL Slugs in Turkish for Turkish Routes
**Date:** 2026-06-13
**Decision:** Turkish routes use Turkish slugs: `/koleksiyonlar/ankara-tasi/`, `/projeler/bogazici-villa/`. English routes use English slugs: `/en/collections/ankara-stone/`, `/en/projects/bosphorus-villa/`.

**Alternatives rejected:**
- English slugs for all routes: Loses Turkish SEO opportunity. A Turkish user searching for "ankara taşı seramik" should find the Turkish URL.
- Auto-translated slugs: Machine-translated URLs produce unnatural slug strings. Rejected.
- Numeric IDs (e.g., `/koleksiyonlar/42/`): No SEO value, no human readability.

**Rationale:** SEO is a primary long-term value driver for this site. Turkish-language organic search for ceramic types and effects is a significant opportunity. Turkish URL slugs are a direct signal to Turkish Google search for these queries.

---

## D-013 — Eyebrow Restriction to 1 per 3 Sections
**Date:** 2026-06-13
**Decision:** No more than 1 eyebrow label (small uppercase label above a section heading) per 3 sections across any page.

**Rationale:** The "eyebrow above every section" pattern is the single most common AI design tell in 2025-2026. Removing most eyebrows forces the section heading and photography to carry the hierarchy alone — which is correct. Eyebrows are saved for the single moment per page where a category label is genuinely necessary for navigation.

**Risk:** Some sections may feel less structured without eyebrow labels. This is by design. The structure is carried by the layout, not by labels.

---

## D-014 — Em-Dash Complete Ban
**Date:** 2026-06-13
**Decision:** No em-dash (—) appears anywhere on the site. Zero instances.

**Rationale:** The em-dash is the most statistically over-represented AI copywriting tell in 2025-2026. In tests of AI-generated copy, the em-dash appears at 3-5× the frequency of human-written editorial copy. For a brand called "Doğrular" (the correct ones), using the language's most flagrant AI cliché is self-defeating.

**Tradeoff:** Some copy that would naturally use an em-dash must be restructured. This results in better, more considered copy — so this is a benefit, not a cost.

---

## D-015 — Grain Overlay as Fixed Pseudo-element
**Date:** 2026-06-13
**Decision:** The subtle film grain texture overlay is implemented as a `position: fixed; inset: 0; pointer-events: none;` pseudo-element in CSS. NOT attached to any scrolling container.

**Rationale:** Grain overlays on scrolling containers cause continuous GPU repaints on every scroll frame — catastrophic on mobile (30fps+ drop on low-end devices). Fixed grain overlays have exactly one repaint on load and are then composited at the GPU layer without re-rendering.

**Implementation note:** `z-index: 100` for grain overlay (above all content, below modals). The `pointer-events: none` ensures it does not interfere with any interaction.
