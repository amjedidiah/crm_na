# Development Plan — CRM NA Website Rebuild

This document defines the **product**, **information architecture**, and **content-model** decisions for the CRM NA rebuild.

Implementation steps live in [`docs/app_scaffold_checklist.md`](./app_scaffold_checklist.md).

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
| `/who-we-are/` | Strong overview page with welcome messaging and About teasers. | Keep as the primary About landing page. |
| `/vision/` | Long-form CRM-wide history and prophecy content. | Keep as a long-form editorial page. |
| `/core-values/` | Empty. | Rebuild as a proper values page with real CRM NA content. |
| `/history/` | Strong CRM NA-specific history. | Keep as the canonical North America history page. |
| `/our-pastors/` | Useful leadership content, weak structure. | Preserve this as the public leadership route and rebuild it on structured leader records. |
| `/events/` | Plugin-heavy archive with no upcoming events during audit. | Keep as a first-class route, but replace the public UI with custom Next.js pages. |
| `/sermon/` | Empty. | Redirect this legacy route to `/media`. |
| `/watch-us-live/` | Contains stale theme-demo sermon/audio content. | Keep as a dedicated livestream route in v1. |
| `/publications/` | Empty. | Scaffold the route now; content depth and nav prominence can be refined later. |
| `/churches/` | Real directory intent, weak execution. | Keep as the canonical church directory. |
| `/crm-word-of-life/` | Good branch-page content model. | Migrate into `church` content and redirect to `/churches/crm-word-of-life`. |
| `/crm-praise-center/` | Rich branch-page content model. | Migrate into `church` content and redirect to `/churches/crm-praise-center`. |
| `/crm-rhode-island/` | Thin page with template leakage. | Migrate into `church` content and redirect to `/churches/crm-rhode-island`. |
| `/grace-glory-sanctuary/` | Strong branch-page content. | Migrate into `church` content and redirect to `/churches/grace-glory-sanctuary`. |
| `/ministries/` | Structurally confused and mixed with church-location behavior. | Rebuild as a true ministries hub. |
| `/cwl-charismatic-women-league/` | Empty. | Migrate into `ministry` content and redirect to `/ministries/cwl-charismatic-women-league`. |
| `/kings-men/` | Empty. | Migrate into `ministry` content and redirect to `/ministries/kings-men`. |
| `/youths/` | One of the strongest ministry pages on the site. | Keep as a prominent route and model it as ministry-backed content. |
| `/media/` | Empty. | Keep and scaffold now as the hub for sermons, livestream replays, and publications. |
| `/contact-us/` | Contact route exists, but with placeholder content. | Replace with `/contact` and redirect the legacy slug. |

## Canonical IA And Routing Defaults

### Canonical public routes

- `/`
- `/who-we-are`
- `/vision`
- `/core-values`
- `/history`
- `/our-pastors`
- `/churches`
- `/churches/[slug]`
- `/ministries`
- `/ministries/[slug]`
- `/youths`
- `/events`
- `/events/[slug]`
- `/watch-us-live`
- `/publications`
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
- `/sermon/` -> `/media`

### IA rules

- There is **no `/about` route** in the initial spec.
- `/who-we-are/` is the About landing page.
- `/watch-us-live/` stays a dedicated route in v1.
- `/publications/`, `/media/`, and `/watch-us-live/` are all scaffolded in v1.
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

## High-Level Implementation Phases

### Phase 1 — Design System And Shell

- establish the convention-derived token system
- build the shared layout and route shell in Next.js
- scaffold the canonical routes above

### Phase 2 — Structured Mock Content

- convert the audited CRM NA content into typed mock data
- build churches, ministries, leadership, media, and event templates against that data

### Phase 3 — WordPress Content Model

- configure WordPress with the required content types and taxonomies
- model churches, ministries, leaders, events, media, and publications in ACF/WPGraphQL

### Phase 4 — Integration

- replace mock data with WordPress queries
- add redirects, revalidation, sitemap behavior, and metadata completion

## Defaults And Assumptions

- Default route strategy: nested canonical routes with legacy redirects.
- Default About strategy: `/who-we-are` is the About landing page.
- Default thin-page strategy: scaffold `/watch-us-live`, `/publications`, and `/media` now.
- Default sermon handling: `/sermon` redirects to `/media`.
