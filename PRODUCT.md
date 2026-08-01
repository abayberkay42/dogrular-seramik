# PRODUCT.md — Doğrular Seramik

*Internal strategy document. Updated: 2026-06-13.*

---

## 1. OVERVIEW

Doğrular Seramik is a Turkish ceramic tile brand. The name "Doğrular" (meaning "the correct/right ones" in Turkish) carries an implicit promise: precision, trustworthiness, the correct choice. The website must honor this name in every detail — the wrong font, the wrong spacing, a broken animation — all contradict the brand promise.

**The central product challenge:** Ceramic tiles are a high-consideration, low-impulse purchase. Nobody impulse-buys 200 sqm of floor tile. The website's job is not to close a sale. It is to earn the trust and aesthetic authority that leads someone to walk into a showroom, request a sample, or specify the brand on an architectural project. The entire UX must be built around this insight.

**The competitive opportunity:** Turkish ceramic brands compete on price and volume. European luxury brands (Florim, Laminam, Atlas Concorde) compete on editorial authority and architectural narrative. No Turkish brand currently occupies the position of "Turkish craft with Italian design fluency." This website claims that position.

---

## 2. BUSINESS GOALS

**Primary (12-month horizon):**
1. Establish Doğrular Seramik as a premium-positioned ceramic brand in the Turkish market — differentiated visually and editorially from domestic competitors.
2. Generate qualified architect and interior designer leads through the professional portal (sample requests, catalog downloads, showroom appointments).
3. Drive awareness among premium homeowners renovating or building in Turkey's major urban centers (Istanbul, Ankara, Izmir).

**Secondary (24-month horizon):**
4. Build international visibility — architect and designer audiences in export markets (Gulf, Europe, CIS countries where Turkish ceramics already have distribution).
5. Establish editorial authority through project case studies that get shared within the architecture and interior design community.
6. Create a long-term SEO asset — organic search traffic for ceramic and tile queries in Turkish and English.

**Out of scope (for v1 launch):**
- E-commerce / direct purchase
- Dealer/distributor portal with pricing
- Real-time stock availability
- Product configurator

---

## 3. USER GOALS

### Segment A — The Architect / Interior Designer (Primary B2B)
*How they arrive:* Referral from a colleague, brand awareness from a trade publication or exhibition, organic search for a specific tile type.*

| Goal | Priority | What the site must enable |
|---|---|---|
| Evaluate if the brand meets project aesthetic requirements | Critical | Visual editorial — collections presented as architectural narratives, not catalogs |
| Obtain technical specifications | Critical | Downloadable spec sheets: dimensions, weight, slip resistance, frost resistance, water absorption, certifications (ISO, CE) |
| Request physical samples | Critical | Frictionless sample request: minimum fields, no account creation, clear delivery expectation |
| Find application examples at architectural scale | High | Project case studies with named project, location, architect, collection used, photography at room scale |
| Download catalogs for client presentations | High | PDF catalog download (no mandatory registration for v1, optional for lead capture) |
| Locate the nearest dealer/distributor | High | Showroom / dealer map with address, phone, appointment booking |

### Segment B — The Premium Homeowner (Primary B2C)
*How they arrive:* Instagram, Pinterest, Google image search, word of mouth, visiting a showroom and then going online.*

| Goal | Priority | What the site must enable |
|---|---|---|
| Find inspiration — what could my space look like? | Critical | Space-organized browsing (Bathroom, Kitchen, Living Room, Outdoor), full-room photography |
| Understand the range and quality | High | Collection narrative pages with materiality close-ups, finish descriptions, size variants |
| Find where to buy / see in person | High | Showroom locator with opening hours |
| Share inspiration with family / designer | Medium | Clean shareable collection and project URLs, social sharing |
| Understand the brand story and quality promise | Medium | About page: Turkish craft, production process, quality certifications |

### Segment C — The Contractor / Builder (Secondary B2B)
*How they arrive:* Referral from an architect or project manager, direct commercial relationship.*

| Goal | Priority | What the site must enable |
|---|---|---|
| Verify product is available in required volume and specification | High | Technical data, format sizes, batch ordering note |
| Find the right commercial contact | High | Clear Contact / Professional path |
| Access technical documentation | Medium | Same technical downloads as Segment A |

*Segment C is served by the Professional zone without requiring dedicated pages at launch.*

---

## 4. TARGET AUDIENCE — PERSONAS

### Persona 1: KEREM — The Specification Architect
- **Age:** 35–50
- **Location:** Istanbul (Ataşehir, Levent, Maslak offices), potentially Ankara, Izmir
- **Practice size:** 5–30 person studio, residential + commercial projects
- **Decision role:** Primary material specifier. Recommends brands to clients. Has final say on surface materials for most projects.
- **Tools he uses:** ArchiCAD, AutoCAD, Miro. He reads Dezeen, Architectural Digest, ArchDaily.
- **His pain:** Turkish ceramic brands feel visually dated. He specifies Italian brands (Atlas Concorde, Rex, Marazzi) to justify quality to clients. He would prefer a Turkish brand if it matched European aesthetic standards.
- **What earns his trust:** A project case study showing work at the scale and typology he handles. Real project photography. ISO certifications. A technical specification he can cite in his project documentation. A sample that arrives promptly.
- **His journey on the site:** Lands on Projects → finds a case study that matches his current project type → goes to the collection → downloads the spec sheet → requests a sample → follows up at the showroom.

### Persona 2: AYÇA — The Interior Designer
- **Age:** 28–42
- **Location:** Istanbul (Nişantaşı, Bebek clients), works across residential and hospitality
- **Practice size:** 2–8 person studio, primarily high-end residential
- **Decision role:** Strongly influences client decisions. Clients trust her taste completely.
- **Tools she uses:** Instagram for inspiration, Behance, Pinterest boards, Figma for mood boards.
- **Her pain:** She presents material options to clients from glossy catalogs. If the brand's catalog looks cheap, it undermines her presentation. She needs materials that look as good in print and on screen as they do in person.
- **What earns her trust:** Aspirational photography that she can screenshot for a mood board. A collection that has a coherent story. A brand that feels European in presentation but is sourced locally (faster, cheaper logistics than importing from Italy).
- **Her journey:** Finds collection imagery on Instagram → visits the website → explores the collection in full → saves project inspiration images → contacts the brand to discuss using them for a client presentation.

### Persona 3: SELMA — The Aspirational Homeowner
- **Age:** 38–55
- **Location:** Istanbul, Ankara, Izmir — urban upper-middle-class
- **Renovation project:** Apartment or villa gut renovation, budget TRY 500K-2M+
- **Decision role:** Final decision maker on aesthetics with input from an interior designer
- **Influences:** Instagram accounts of Turkish interior design influencers, Houzz, Pinterest.
- **Her pain:** She wants her home to look like the photographs she saves on Instagram. She is afraid of making an expensive mistake. She wants to trust a brand.
- **What earns her trust:** A showroom she can visit, touch, and see samples in context. Photography that shows homes she aspires to live in. A brand story that makes her feel she's buying something made with craft and care — not a commodity.
- **Her journey:** Arrives via Instagram or Google Image search → browses Spaces section → finds her space type (bathroom, kitchen) → explores collections → looks for nearest showroom → books a visit.

---

## 5. SUCCESS METRICS

### Tier 1 — Conversion Metrics (Business Impact, Direct)

| Metric | Target at 6 months | Target at 12 months |
|---|---|---|
| Sample requests per month | 25+ | 60+ |
| Catalog / spec sheet downloads per month | 50+ | 150+ |
| Showroom appointment requests per month | 10+ | 30+ |
| Professional portal registrations | 15+ | 50+ |
| Form completion rate on sample request | >40% of form starts | >50% |

### Tier 2 — Engagement Metrics (Site Quality, Leading Indicator)

| Metric | Target |
|---|---|
| Average session duration | >3 minutes |
| Pages per session | >4.5 |
| Bounce rate | <40% |
| Collection page scroll depth | >70% of visitors reach the middle of the page |
| Project case study page scroll depth | >60% |
| Mobile engagement parity | Mobile session duration within 15% of desktop |

### Tier 3 — Brand Metrics (Long-term)

| Metric | How to Measure |
|---|---|
| Direct brand search volume growth | Google Search Console |
| Organic search visibility for collection-type queries ("mermer efektli seramik istanbul", etc.) | Search Console + Ahrefs |
| Social shares of project photography | URL tracking on case study pages |
| Return visitors (brand loyalty signal) | GA4 returning user rate |
| Time to first lead (from a new project case study page publish) | GA4 event tracking |

### Anti-Metrics (What Success Does NOT Look Like)
- **High traffic with low sample requests:** Traffic without qualified intent. Means the content is attracting the wrong audience or the conversion path is broken.
- **High bounce rate on collection pages:** Means photography quality failed or the page loaded too slowly.
- **Low mobile engagement:** The target audience (architects and homeowners) heavily uses mobile for inspiration browsing. Mobile parity is required.

---

## 6. USER JOURNEYS

### Journey 1: The Specification Path (Architect)
```
Discovery → Evaluation → Specification → Commitment
    ↓             ↓              ↓              ↓
Instagram /    Project        Technical      Sample
ArchDaily /    Gallery        spec sheet     Request
Word of       (filters by     download      → Showroom
mouth          typology)       (PDF)          meeting
                ↓
            Collection
            Deep-dive
            (materiality,
             sizes, finishes)
```

**Critical friction points to remove:**
- Sample request must work in under 2 minutes, max 4 fields
- Spec sheet must be downloadable without mandatory account creation
- Project gallery must filter by Space Type AND Collection

### Journey 2: The Inspiration Path (Homeowner)
```
Discovery → Inspiration → Trust → Action
    ↓             ↓          ↓        ↓
Instagram    Spaces      About    Showroom
/ Pinterest  section     page     Locator
search       (Bathroom,  (brand   → Book
             Kitchen,    story,   visit
             Living)     quality)
                ↓
            Collection
            detail
            (full-room
             photography,
             finishes)
```

**Critical friction points to remove:**
- Spaces section must show full-room photography, not product grids
- Showroom locator must show hours and phone, not just address
- Collections must have names that communicate aesthetic (not just codes)

### Journey 3: The Returning Professional
```
Previous customer → New project → Direct navigation → Deep search
                                        ↓
                               Collection search
                               by effect/format
                                        ↓
                               Technical download
                               or sample reorder
```

**Implication:** The site must be searchable. A filtering/search system on collections is required for returning professionals, even if it's not the hero feature.
