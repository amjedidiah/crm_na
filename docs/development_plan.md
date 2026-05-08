# Development Plan — CRM NA Website Rebuild

This document defines the **product**, **information architecture**, and **content-model** decisions for the CRM NA rebuild.

Implementation steps live in [`docs/app_scaffold_checklist.md`](./app_scaffold_checklist.md).

## Implementation Status Snapshot

- [x] Phase 1 shell work is implemented in the repo: Next.js app shell, shared layout, route scaffold, and design-reference-driven frontend structure.
- [x] Phase 2 structured mock content is implemented in the repo for churches, ministries, leaders, events, media, publications, and About content.
- [x] Phase 3 local WordPress scaffolding is present in the repo through `server/docker-compose.yml`, `server/README.md`, `server/DATA_MODELLING_GUIDE.md`, and the revalidation mu-plugin.
- [x] Phase 4 seams are partially implemented in the repo through redirects, metadata routes, sitemap/robots files, contact server actions, and a `client/lib/wordpress.ts` abstraction.
- [ ] Live WordPress GraphQL queries have **not** replaced mock data yet; the current `client/lib/wordpress.ts` is still mock-data-backed.

## Recommendation

Rebuild `https://crm-na.org/` as a **Next.js frontend** backed by **WordPress**, using `crmusa2026-convention/` as the primary visual reference.

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
| `/sermon/` | Empty. | Redirect this legacy route to `/media`. |
| `/watch-us-live/` | Contains stale theme-demo sermon/audio content. | Remove it as a standalone destination and redirect it to `/media#live`. |
| `/publications/` | Empty. | Keep the URL, but rebuild it as a Pastor's Corner-style editorial archive with detail pages under `/publications/[slug]`. |
| `/churches/` | Real directory intent, weak execution. | Keep as the canonical church directory. |
| `/crm-word-of-life/` | Good branch-page content model. | Migrate into `church` content and redirect to `/churches/crm-word-of-life`. |
| `/crm-praise-center/` | Rich branch-page content model. | Migrate into `church` content and redirect to `/churches/crm-praise-center`. |
| `/crm-rhode-island/` | Thin page with template leakage. | Migrate into `church` content and redirect to `/churches/crm-rhode-island`. |
| `/grace-glory-sanctuary/` | Strong branch-page content. | Migrate into `church` content and redirect to `/churches/grace-glory-sanctuary`. |
| `/ministries/` | Structurally confused and mixed with church-location behavior. | Rebuild as a true ministries hub. |
| `/cwl-charismatic-women-league/` | Empty. | Migrate into `ministry` content and redirect to `/ministries/cwl-charismatic-women-league`. |
| `/kings-men/` | Empty. | Migrate into `ministry` content and redirect to `/ministries/kings-men`. |
| `/youths/` | One of the strongest ministry pages on the site. | Migrate this content into `ministry` and redirect the legacy route to `/ministries/youths`. |
| `/media/` | Empty. | Keep as the canonical media hub, make it sermon-first, and host the permanent live section at `#live`. |
| `/contact-us/` | Contact route exists, but with placeholder content. | Replace with `/contact` and redirect the legacy slug. |

## Canonical IA And Routing Defaults

### Canonical public routes

- `/`
- `/who-we-are`
- `/churches`
- `/churches/[slug]`
- `/ministries`
- `/ministries/[slug]`
- `/ministries/youths`
- `/events`
- `/events/[slug]`
- `/publications`
- `/publications/[slug]`
- `/media`
- `/contact`
- `/give`

### Redirect policy

Legacy flat routes remain as redirects only:

- `/crm-praise-center/` -> `/churches/crm-praise-center`
- `/crm-word-of-life/` -> `/churches/crm-word-of-life`
- `/crm-rhode-island/` -> `/churches/crm-rhode-island`
- `/grace-glory-sanctuary/` -> `/churches/grace-glory-sanctuary`
- `/cwl-charismatic-women-league/` -> `/ministries/cwl-charismatic-women-league`
- `/kings-men/` -> `/ministries/kings-men`
- `/contact-us/` -> `/contact`
- `/youths/` -> `/ministries/youths`
- `/sermon/` -> `/media`
- `/vision/` -> `/who-we-are#vision`
- `/history/` -> `/who-we-are#history`
- `/core-values/` -> `/who-we-are#core-values`
- `/our-pastors/` -> `/who-we-are#leadership`
- `/watch-us-live/` -> `/media#live`

### IA rules

- There is **no `/about` route** in the initial spec.
- `/who-we-are/` is the About landing page and the canonical home for vision, history, core values, and leadership through anchored sections.
- `/media/` is the media hub and owns the permanent livestream destination at `#live`.
- Youth content lives at `/ministries/youths`, not as a flat top-level route.
- `/publications/` stays the canonical URL, but the user-facing editorial label is Pastor's Corner.
- `/publications/[slug]` is the canonical publication detail route.
- Churches and ministries must remain separate models and separate public listings.

## Content Model

### Frontend types

- `Church`
- `Leader`
- `Ministry`
- `Event`
- `MediaItem`
- `Publication`
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
- publications should support long-form editorial content with slug-backed detail pages and author metadata

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
- Default About strategy: `/who-we-are` is the consolidated About page with anchored sub-sections.
- Default live strategy: `/watch-us-live` is retired and redirected to `/media#live`.
- Default publications strategy: keep `/publications` as the canonical URL for a Pastor's Corner-style archive and use `/publications/[slug]` for detail pages.
- Default sermon handling: `/sermon` redirects to `/media`.
- Default youth handling: `/youths` redirects to `/ministries/youths`.
