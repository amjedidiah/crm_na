# Development Plan — CRM NA Website Rebuild

This document defines the **product**, **information architecture**, and **content-model** decisions for the CRM NA rebuild.

Implementation steps live in [`docs/app_scaffold_checklist.md`](./app_scaffold_checklist.md).

## Implementation Status Snapshot

- [x] Phase 1 shell work is implemented in the repo: Next.js app shell, shared layout, route scaffold, and design-reference-driven frontend structure.
- [x] Phase 2 structured mock content is implemented in the repo for churches, ministries, leaders, events, media, publications, and About content.
- [x] Phase 3 local WordPress scaffolding is present in the repo through `server/docker-compose.yml`, `server/README.md`, `server/DATA_MODELLING_GUIDE.md`, and the revalidation mu-plugin.
- [x] Phase 4 seams are partially implemented in the repo through redirects, metadata routes, sitemap/robots files, contact server actions, and a `client/lib/wordpress.ts` abstraction.
- [ ] Live WordPress GraphQL queries have **not** replaced mock data yet; the current `client/lib/wordpress.ts` is still mock-data-backed.
- [x] **Routing drift (implemented vs original audit spec):** the marketing app uses **`/about`** as the primary About page, **`/devotionals`** for editorial / devotional listings, and **`/gallery`** as the photo hub. Legacy **`/publications/*`**, **`/media`**, **`/sermon`**, and **`/watch-us-live`** URLs are **permanent redirects** to those surfaces (see [`client/next.config.ts`](../client/next.config.ts)). The dedicated `client/components/publications/` UI tree was removed as unused; publication-shaped data still exists in the model and mock layer for `/devotionals`.

## Recommendation

Rebuild `https://www.crm-na.org/` as a **Next.js frontend** backed by **WordPress**, using `crmusa2026-convention/` as the primary visual reference.

This is the right direction because:

- the convention subdomain already contains the strongest current CRM NA visual language
- the main site has enough real content to justify a proper CMS-backed rebuild
- the current site needs both a design upgrade and a structural cleanup

The convention site should be treated as a **design system source**, not as a one-page layout to copy wholesale.

## Source Material

This document is based on:

- `/Users/jay/Projects/freelance/crm_praise_center/docs/development_plan.md`
- [`crmusa2026-convention/index.html`](../crmusa2026-convention/index.html)
- a live audit of `crm-na.org` completed on **May 7, 2026**

Pages reviewed:

- `/who-we-are/`
- `/vision/`
- `/core-values/`
- `/history/`
- `/our-pastors/`
- `/events/`
- `/sermon/`
- `/watch-us-live/`
- `/publications/`
- `/churches/`
- `/crm-word-of-life/`
- `/crm-praise-center/`
- `/crm-rhode-island/`
- `/grace-glory-sanctuary/`
- `/ministries/`
- `/cwl-charismatic-women-league/`
- `/kings-men/`
- `/youths/`
- `/media/`
- `/contact-us/`

## Audit Findings

### What is already useful

- The broad IA is directionally correct: About, Churches, Ministries, Events, Media, Contact.
- The church pages already imply a reusable content model: pastor, story, address, service times, local programs, livestream.
- The legacy content is strong enough to seed structured WordPress content, especially for history, leadership, youth, and major branches.

### What is weak or broken

- Several pages were empty as of **May 7, 2026**:
  - `/core-values/`
  - `/publications/`
  - `/sermon/`
  - `/cwl-charismatic-women-league/`
  - `/kings-men/`
  - `/media/`
- `/events/` is plugin-driven and showed no upcoming events during the audit.
- `/watch-us-live/` contains stale theme-demo sermon/audio placeholder content.
- `/contact-us/` still contains placeholder content, including fake location/phone data.
- `/ministries/` behaves more like a church directory than a ministry hub.
- `/who-we-are/` and `/history/` partially duplicate story/welcome content.
- Some church pages contain visible template leakage and inconsistent headings.

### Rebuild implication

This is not just a redesign. It is also:

- an information architecture cleanup
- a content-model cleanup
- a content-quality cleanup

## Visual Source Of Truth

Primary design source:

- [`crmusa2026-convention/index.html`](../crmusa2026-convention/index.html)

Non-negotiable design direction:

- preserve the **navy / gold / cream** palette
- preserve the **Cinzel / Cormorant Garamond / Jost** typography system
- preserve the convention site’s restrained motion and reduced-motion discipline
- preserve the editorial rhythm of **label -> headline -> body**
- adapt the visual language to a multi-page content-heavy site

## Page-By-Page Audit

| Legacy page | Current state on live site | Rebuild recommendation |
| --- | --- | --- |
| `/who-we-are/` | Strong overview page with welcome messaging and About teasers. | Keep as the canonical About route and consolidate vision, history, values, and leadership into anchored sections. |
| `/vision/` | Long-form CRM-wide history and prophecy content. | Redirect to `/who-we-are#vision` after migrating the content into the consolidated About page. |
| `/core-values/` | Empty. | Redirect to `/who-we-are#core-values` after rebuilding values as an anchored About section. |
| `/history/` | Strong CRM NA-specific history. | Redirect to `/who-we-are#history` after migrating the content into the consolidated About page. |
| `/our-pastors/` | Useful leadership content, weak structure. | Redirect to `/who-we-are#leadership` after rebuilding leadership on structured leader records inside the About page. |
| `/events/` | Plugin-heavy archive with no upcoming events during audit. | Keep as a first-class route, but replace the public UI with custom Next.js pages. |
| `/sermon/` | Empty. | Legacy route redirects to **`/gallery`** in the Next app (see `client/next.config.ts`). |
| `/watch-us-live/` | Contains stale theme-demo sermon/audio content. | Legacy route redirects to **`/gallery`** (no site-wide `#live` hub in the current app; livestream links are per church/event where modeled). |
| `/publications/` | Empty. | Legacy **`/publications/*`** URLs redirect to **`/devotionals`**; editorial detail permalinks under `/devotionals/[slug]` are not exposed yet (dynamic slug redirects fold to the listing). |
| `/churches/` | Real directory intent, weak execution. | Keep as the canonical church directory. |
| `/crm-word-of-life/` | Good branch-page content model. | Migrate into `church` content and redirect to `/churches/crm-word-of-life`. |
| `/crm-praise-center/` | Rich branch-page content model. | Migrate into `church` content and redirect to `/churches/crm-praise-center`. |
| `/crm-rhode-island/` | Thin page with template leakage. | Migrate into `church` content and redirect to `/churches/crm-rhode-island`. |
| `/grace-glory-sanctuary/` | Strong branch-page content. | Migrate into `church` content and redirect to `/churches/grace-glory-sanctuary`. |
| `/ministries/` | Structurally confused and mixed with church-location behavior. | Rebuild as a true ministries hub. |
| `/cwl-charismatic-women-league/` | Empty. | Migrate into `ministry` content and redirect to `/ministries/cwl-charismatic-women-league`. |
| `/kings-men/` | Empty. | Migrate into `ministry` content and redirect to `/ministries/kings-men`. |
| `/youths/` | One of the strongest ministry pages on the site. | Migrate this content into `ministry` and redirect the legacy route to `/ministries/youths`. |
| `/media/` | Empty. | Legacy route redirects to **`/gallery`** (photo albums hub). Supplement with per-record livestream URLs on churches/events as needed. |
| `/contact-us/` | Contact route exists, but with placeholder content. | Replace with `/contact` and redirect the legacy slug. |

## Canonical IA And Routing Defaults

### Canonical public routes

- `/`
- `/about` — primary About / consolidated story + leadership surface
- `/who-we-are` — compatibility path; implemented as a redirect to `/about`
- `/churches`
- `/churches/[slug]`
- `/ministries`
- `/ministries/[slug]`
- `/ministries/youths`
- `/events`
- `/events/[slug]`
- `/devotionals` — editorial / devotional listing (legacy `/publications/*` redirects here)
- `/gallery`
- `/gallery/[slug]`
- `/contact`
- `/give`

### Redirect policy

Legacy flat routes remain as redirects only:

- `/crm-praise-center/` -> external canonical site (`https://www.crmpraisecenter.org/`)
- `/crm-ottawa/` -> `https://crm-can.org/`
- `/churches/crm-ottawa` -> `https://crm-can.org/`
- `/crm-word-of-life/` -> `/churches/crm-word-of-life`
- `/crm-rhode-island/` -> `/churches/crm-rhode-island`
- `/grace-glory-sanctuary/` -> `/churches/grace-glory-sanctuary`
- `/cwl-charismatic-women-league/` -> `/ministries/cwl-charismatic-women-league`
- `/kings-men/` -> `/ministries/kings-men`
- `/contact-us/` -> `/contact`
- `/youths/` -> `/ministries/youths`
- `/media/` -> `/gallery`
- `/publications` -> `/devotionals` (and nested `/publications/*` paths per `client/next.config.ts`)
- `/devotionals/[slug]` -> `/devotionals` (detail permalinks not exposed yet)
- `/sermon/` -> `/gallery`
- `/vision/` -> `/who-we-are#vision`
- `/history/` -> `/who-we-are#history`
- `/core-values/` -> `/who-we-are#core-values`
- `/our-pastors/` -> `/who-we-are#leadership`
- `/watch-us-live/` -> `/gallery`

### IA rules

- **`/about`** is the primary About landing in the Next app; **`/who-we-are`** is retained and redirects to **`/about`** (legacy flat URLs still target `/who-we-are#…` anchors in `client/next.config.ts`).
- **`/gallery`** is the photo-album hub; legacy **`/media`**, **`/sermon`**, and **`/watch-us-live`** redirect there.
- Youth content lives at **`/ministries/youths`**, not as a flat top-level route.
- **Editorial / devotional** content is listed at **`/devotionals`**; legacy **`/publications/*`** URLs redirect to that listing (slug detail routes are not separate pages yet).
- Churches and ministries must remain separate models and separate public listings.
- Live join links are modeled on **`church.livestreamUrl`** and **`event.livestreamUrl`** where needed, not a single site-wide media hash route.

## Content Model

### Frontend types

- `Church`
- `Leader`
- `Ministry`
- `Event`
- `MediaItem`
- `Publication` — includes a `type: PublicationType` field (`"blog"` | `"devotional"`)
- `PublicationType`
- `ContactFormPurpose`

### WordPress content types

- `church`
- `leader`
- `ministry`
- `event`
- `media_item` or `sermon`
- `publication`

### Core modelling rules

- a church owns location, pastoral, service, and local-program information
- a ministry owns demographic or functional fellowship information
- events can relate to a church, a ministry, or both
- media should support sermons, livestream replays, and general teaching content
- publications should support long-form editorial content with slug-backed detail pages, author metadata, and a `type` field (`"blog"` | `"devotional"`); the **current** Next listing route is **`/devotionals`**, with legacy **`/publications/*`** URLs redirected in `client/next.config.ts`

## High-Level Implementation Phases

### Phase 1 — Design System And Shell

- establish the convention-derived token system
- build the shared layout and route shell in Next.js
- scaffold the canonical routes above

Current repo status:

- [x] implemented

### Phase 2 — Structured Mock Content

- convert the audited CRM NA content into typed mock data
- build churches, ministries, leadership, media, and event templates against that data

Current repo status:

- [x] implemented with typed mock content and route templates

### Phase 3 — WordPress Content Model

- configure WordPress with the required content types and taxonomies
- model churches, ministries, leaders, events, media, and publications in ACF/WPGraphQL

Current repo status:

- [x] local server scaffold and modelling docs are present
- [ ] actual CMS/plugin configuration is still a manual setup step

### Phase 4 — Integration

- replace mock data with WordPress queries
- add redirects, revalidation, sitemap behavior, and metadata completion

Current repo status:

- [x] redirects, sitemap, robots, metadata routes, and revalidation seam are present
- [ ] live WordPress query integration is not complete

## Defaults And Assumptions

- Default route strategy: nested canonical routes with legacy redirects.
- Default About strategy: **`/about`** is the consolidated About page; **`/who-we-are`** redirects to **`/about`**; legacy flat URLs still land on **`/who-we-are#…`** anchors per `client/next.config.ts`.
- Default live strategy: **`/watch-us-live`** is redirected to **`/gallery`** alongside **`/media`** and **`/sermon`**; use record-level **`livestreamUrl`** fields for join links.
- Default publications strategy: **`/devotionals`** is the listing route in the Next app; legacy **`/publications`** and nested paths redirect there; shared list/detail presentation components previously sketched as `PublicationsListView` were removed as unused—reintroduce a dedicated RSC/module when permalinked detail pages return.
- Default sermon handling: **`/sermon`** redirects to **`/gallery`**.
- Default youth handling: `/youths` redirects to `/ministries/youths`.
