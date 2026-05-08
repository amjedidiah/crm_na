# CRM NA App Scaffold Checklist

This document assumes [`docs/development_plan.md`](./development_plan.md) is the strategic source of truth.

If a route, IA, or content-model decision conflicts with this checklist, the development plan wins.

## Purpose

This file operationalizes the rebuild by listing:

- repo structure
- bootstrap/config work
- exact routes to scaffold
- component and library families
- WordPress/server tasks
- testing and build order

It does **not** redefine product strategy or page-audit conclusions.

## Repo Structure

Use the same repo shape as `/Users/jay/Projects/freelance/crm_praise_center`:

- `client/` — Next.js frontend
- `server/` — local WordPress, Docker, mu-plugins, modelling docs
- `docs/` — planning and migration notes
- `crmusa2026-convention/` — read-only design reference

## Bootstrap Checklist

### Next.js app setup

- [x] Initialize `client/` with Next.js App Router
- [x] Use TypeScript
- [x] Use Tailwind CSS
- [x] Add ESLint
- [x] Add Prettier

### Dependency baseline

- [x] `framer-motion`
- [x] `lucide-react`
- [x] `clsx`
- [x] `tailwind-merge`
- [x] `graphql-request`
- [x] `react-hook-form`
- [x] `@hookform/resolvers`
- [x] `zod`
- [x] `nodemailer`

### Config files

- [x] `client/package.json`
- [x] `client/tsconfig.json`
- [x] `client/next.config.ts`
- [x] `client/eslint.config.mjs`
- [x] `client/postcss.config.mjs`
- [x] `client/.env.example`

## Route Scaffold

### Canonical public routes to create

- [x] `/`
- [x] `/who-we-are`
- [x] `/churches`
- [x] `/churches/[slug]`
- [x] `/ministries`
- [x] `/ministries/[slug]`
- [x] `/ministries/youths`
- [x] `/events`
- [x] `/events/[slug]`
- [x] `/publications`
- [x] `/publications/[slug]`
- [x] `/media`
- [x] `/contact`
- [x] `/give`

### Root app files

- [x] `client/app/layout.tsx`
- [x] `client/app/page.tsx`
- [x] `client/app/globals.css`
- [x] `client/app/not-found.tsx`
- [x] `client/app/opengraph-image.tsx`
- [x] `client/app/robots.ts`
- [x] `client/app/sitemap.ts`
- [x] `client/app/favicon.ico`

### Dynamic route support

- [x] `client/app/churches/[slug]/loading.tsx`
- [x] `client/app/ministries/[slug]/loading.tsx`
- [x] `client/app/events/loading.tsx`
- [x] `client/app/events/[slug]/loading.tsx`
- [x] `client/app/publications/[slug]/loading.tsx`

## Redirect Scaffold

These are redirects, not co-equal public routes:

- [x] `/contact-us` -> `/contact`
- [x] `/crm-word-of-life` -> `/churches/crm-word-of-life`
- [x] `/crm-praise-center` -> `/churches/crm-praise-center`
- [x] `/crm-rhode-island` -> `/churches/crm-rhode-island`
- [x] `/grace-glory-sanctuary` -> `/churches/grace-glory-sanctuary`
- [x] `/cwl-charismatic-women-league` -> `/ministries/cwl-charismatic-women-league`
- [x] `/kings-men` -> `/ministries/kings-men`
- [x] `/youths` -> `/ministries/youths`
- [x] `/sermon` -> `/media`
- [x] `/vision` -> `/who-we-are#vision`
- [x] `/history` -> `/who-we-are#history`
- [x] `/core-values` -> `/who-we-are#core-values`
- [x] `/our-pastors` -> `/who-we-are#leadership`
- [x] `/watch-us-live` -> `/media#live`

Implementation location:

- [x] `client/next.config.ts`

## Component Families

### Layout

- [x] `client/components/layout/Navbar.tsx`
- [x] `client/components/layout/Footer.tsx`
- [x] `client/components/layout/PageTransition.tsx`
- [x] `client/components/layout/FloatingGiveButton.tsx`

### Shared primitives

- [x] `client/components/shared/Button.tsx`
- [x] `client/components/shared/Motion.tsx`
- [x] `client/components/shared/PageHeader.tsx`
- [x] `client/components/shared/SectionHeader.tsx`
- [x] `client/components/shared/MapEmbed.tsx`
- [x] `client/components/shared/ComingSoon.tsx`

### Home

- [x] `client/components/home/HeroSection.tsx`
- [x] `client/components/home/WelcomeSection.tsx`
- [x] `client/components/home/EventsArea.tsx`
- [x] `client/components/home/WatchLiveSection.tsx`
- [x] `client/components/home/FeaturedChurches.tsx`
- [x] `client/components/home/GiveBanner.tsx`

### About

- [x] `client/components/about/AboutOverview.tsx`
- [x] `client/components/about/VisionContent.tsx`
- [x] `client/components/about/CoreValuesGrid.tsx`
- [x] `client/components/about/HistoryTimeline.tsx`
- [x] `client/components/about/LeadershipPreview.tsx`
- [x] `client/components/about/LeadershipSection.tsx`

### Churches

- [x] `client/components/churches/ChurchCard.tsx`
- [x] `client/components/churches/ChurchGrid.tsx`
- [x] `client/components/churches/ChurchFilterBar.tsx`
- [x] `client/components/churches/ChurchDetailContent.tsx`
- [x] `client/components/churches/ChurchPrograms.tsx`
- [x] `client/components/churches/ChurchLeadership.tsx`
- [x] `client/components/churches/ChurchVisitInfo.tsx`

### Ministries

- [x] `client/components/ministries/MinistryCard.tsx`
- [x] `client/components/ministries/MinistryGrid.tsx`
- [x] `client/components/ministries/MinistryDetailContent.tsx`
- [x] `client/components/ministries/MinistryEvents.tsx`
- [x] `client/components/ministries/MinistryNavigation.tsx`

### Events

- [x] `client/components/events/EventListSection.tsx`
- [x] `client/components/events/EventDetailContent.tsx`
- [x] `client/components/shared/EventCard.tsx`
- [x] `client/components/shared/EventGrid.tsx`

### Leadership

- [x] `client/components/leadership/LeaderCard.tsx`
- [x] `client/components/leadership/LeadershipGrid.tsx`
- [x] `client/components/leadership/LeadershipHierarchy.tsx`

### Media and publications

- [x] `client/components/media/MediaCard.tsx`
- [x] `client/components/media/MediaGrid.tsx`
- [x] `client/components/media/LivestreamEmbed.tsx`
- [x] `client/components/media/PublicationCard.tsx`
- [x] `client/components/media/FeaturedSermon.tsx`
- [x] `client/components/publications/PublicationDetailContent.tsx`

### Contact

- [x] `client/components/contact/ContactForm.tsx`
- [x] `client/components/contact/ContactFormSection.tsx`
- [x] `client/components/contact/FormField.tsx`
- [x] `client/components/contact/SubmitButton.tsx`
- [x] `client/components/contact/SuccessMessage.tsx`
- [x] `client/components/contact/ChurchInfoSidebar.tsx`

## Data Layer Checklist

### Core files

- [x] `client/lib/types.ts`
- [x] `client/lib/utils.ts`
- [x] `client/lib/mock-data.ts`
- [x] `client/lib/wordpress.ts`
- [x] `client/lib/event-utils.ts`
- [x] `client/lib/og.tsx`

### Form and delivery helpers

- [x] `client/lib/schemas/contact.ts`
- [x] `client/lib/email.ts`
- [x] `client/app/contact/actions.ts`

### Frontend types

- [x] `Church`
- [x] `Leader`
- [x] `Ministry`
- [x] `Event`
- [x] `MediaItem`
- [x] `Publication`
- [x] `ContactFormPurpose`

### Mock-data expectations

- [x] seed mock content for all canonical routes, including sermon-first `/media`, anchored `/who-we-are`, and `/publications/[slug]`
- [x] keep mock content entity-based, not page-builder-fragment based
- [x] normalize legacy content into structured records for churches, ministries, leaders, events, and media
- [x] model publications as editorial content with body copy and author metadata, not outbound placeholders

## WordPress Server Checklist

### Local server scaffold

- [x] `server/docker-compose.yml`
- [x] `server/README.md`
- [x] `server/DATA_MODELLING_GUIDE.md`
- [x] `server/mu-plugins/nextjs-revalidation.php`

### Plugin expectations

- [ ] WPGraphQL
- [ ] Advanced Custom Fields
- [ ] WPGraphQL for ACF
- [ ] Classic Editor if needed

### Revalidation seam

- [x] `client/app/api/revalidate/route.ts`
- [x] shared revalidation secret env vars

## WordPress Content Modelling Checklist

### CPTs

- [ ] `church`
- [ ] `leader`
- [ ] `ministry`
- [ ] `event`
- [ ] `media_item` or `sermon`
- [ ] `publication`

### Taxonomies

- [ ] `region`
- [ ] `ministry_category`
- [ ] `event_category`
- [ ] `media_type`

### Migration mapping

- [ ] map branch pages into `church`
- [ ] map legacy `/youths`, `/cwl-charismatic-women-league`, and `/kings-men` content into `ministry`
- [ ] map legacy `/vision`, `/history`, `/core-values`, and `/our-pastors` into anchored sections on `/who-we-are`
- [ ] map legacy `/publications` content into slug-backed editorial entries for `/publications/[slug]`
- [ ] remove placeholder/demo content during migration entry

## Testing Checklist

### Scripts

- [x] `bun run lint`
- [x] `bun run test`
- [x] `bun run build`
- [x] `bun run check`

### Initial test coverage

- [x] `client/lib/event-utils.ts`
- [x] `client/lib/wordpress.ts`
- [x] `client/lib/schemas/contact.ts`

## Suggested Build Order

### Sprint 1

- [x] repo scaffold
- [x] Next.js bootstrap
- [x] layout shell, fonts, globals, navbar, footer
- [x] homepage shell
- [x] About route shell

### Sprint 2

- [x] churches listing and detail
- [x] ministries listing and detail
- [x] `/ministries/youths`
- [x] consolidated About sections inside `/who-we-are`

### Sprint 3

- [x] events
- [x] `/publications`
- [x] `/publications/[slug]`
- [x] `/media`
- [x] `/contact`
- [x] `/give`

### Sprint 4

- [ ] WordPress local stack
- [ ] content modelling
- [x] frontend WordPress fetch seam in `client/lib/wordpress.ts`
- [ ] replace mock data with CMS data
- [x] redirects, metadata, and revalidation

## Done Definition

The scaffold is complete when:

- [x] `client/` exists with a buildable Next.js app shell
- [ ] `server/` exists with a runnable local WordPress stack
- [x] all canonical routes above exist
- [x] all legacy flat routes are handled as redirects
- [x] typed mock content exists for churches, ministries, leaders, events, media, and publications
- [ ] WordPress integration seams exist even before full content entry is finished
