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

- [ ] Initialize `client/` with Next.js App Router
- [ ] Use TypeScript
- [ ] Use Tailwind CSS
- [ ] Add ESLint
- [ ] Add Prettier

### Dependency baseline

- [ ] `framer-motion`
- [ ] `lucide-react`
- [ ] `clsx`
- [ ] `tailwind-merge`
- [ ] `graphql-request`
- [ ] `react-hook-form`
- [ ] `@hookform/resolvers`
- [ ] `zod`
- [ ] `nodemailer`

### Config files

- [ ] `client/package.json`
- [ ] `client/tsconfig.json`
- [ ] `client/next.config.ts`
- [ ] `client/eslint.config.mjs`
- [ ] `client/postcss.config.mjs`
- [ ] `client/.env.example`

## Route Scaffold

### Canonical public routes to create

- [ ] `/`
- [ ] `/who-we-are`
- [ ] `/vision`
- [ ] `/core-values`
- [ ] `/history`
- [ ] `/our-pastors`
- [ ] `/churches`
- [ ] `/churches/[slug]`
- [ ] `/ministries`
- [ ] `/ministries/[slug]`
- [ ] `/youths`
- [ ] `/events`
- [ ] `/events/[slug]`
- [ ] `/watch-us-live`
- [ ] `/publications`
- [ ] `/media`
- [ ] `/contact`
- [ ] `/give`

### Root app files

- [ ] `client/app/layout.tsx`
- [ ] `client/app/page.tsx`
- [ ] `client/app/globals.css`
- [ ] `client/app/not-found.tsx`
- [ ] `client/app/opengraph-image.tsx`
- [ ] `client/app/robots.ts`
- [ ] `client/app/sitemap.ts`
- [ ] `client/app/favicon.ico`

### Dynamic route support

- [ ] `client/app/churches/[slug]/loading.tsx`
- [ ] `client/app/ministries/[slug]/loading.tsx`
- [ ] `client/app/events/loading.tsx`
- [ ] `client/app/events/[slug]/loading.tsx`

## Redirect Scaffold

These are redirects, not co-equal public routes:

- [ ] `/contact-us` -> `/contact`
- [ ] `/crm-word-of-life` -> `/churches/crm-word-of-life`
- [ ] `/crm-praise-center` -> `/churches/crm-praise-center`
- [ ] `/crm-rhode-island` -> `/churches/crm-rhode-island`
- [ ] `/grace-glory-sanctuary` -> `/churches/grace-glory-sanctuary`
- [ ] `/cwl-charismatic-women-league` -> `/ministries/cwl-charismatic-women-league`
- [ ] `/kings-men` -> `/ministries/kings-men`
- [ ] `/ministries/youths` -> `/youths`
- [ ] `/sermon` -> `/media`

Implementation location:

- [ ] `client/next.config.ts`

## Component Families

### Layout

- [ ] `client/components/layout/Navbar.tsx`
- [ ] `client/components/layout/Footer.tsx`
- [ ] `client/components/layout/PageTransition.tsx`
- [ ] `client/components/layout/FloatingGiveButton.tsx`

### Shared primitives

- [ ] `client/components/shared/Button.tsx`
- [ ] `client/components/shared/Motion.tsx`
- [ ] `client/components/shared/PageHeader.tsx`
- [ ] `client/components/shared/SectionHeader.tsx`
- [ ] `client/components/shared/MapEmbed.tsx`
- [ ] `client/components/shared/ComingSoon.tsx`

### Home

- [ ] `client/components/home/HeroSection.tsx`
- [ ] `client/components/home/WelcomeSection.tsx`
- [ ] `client/components/home/EventsArea.tsx`
- [ ] `client/components/home/WatchLiveSection.tsx`
- [ ] `client/components/home/FeaturedChurches.tsx`
- [ ] `client/components/home/GiveBanner.tsx`

### About

- [ ] `client/components/about/AboutOverview.tsx`
- [ ] `client/components/about/VisionContent.tsx`
- [ ] `client/components/about/CoreValuesGrid.tsx`
- [ ] `client/components/about/HistoryTimeline.tsx`
- [ ] `client/components/about/LeadershipPreview.tsx`

### Churches

- [ ] `client/components/churches/ChurchCard.tsx`
- [ ] `client/components/churches/ChurchGrid.tsx`
- [ ] `client/components/churches/ChurchFilterBar.tsx`
- [ ] `client/components/churches/ChurchDetailContent.tsx`
- [ ] `client/components/churches/ChurchPrograms.tsx`
- [ ] `client/components/churches/ChurchLeadership.tsx`
- [ ] `client/components/churches/ChurchVisitInfo.tsx`

### Ministries

- [ ] `client/components/ministries/MinistryCard.tsx`
- [ ] `client/components/ministries/MinistryGrid.tsx`
- [ ] `client/components/ministries/MinistryDetailContent.tsx`
- [ ] `client/components/ministries/MinistryEvents.tsx`
- [ ] `client/components/ministries/MinistryNavigation.tsx`

### Events

- [ ] `client/components/events/EventListSection.tsx`
- [ ] `client/components/events/EventDetailContent.tsx`
- [ ] `client/components/shared/EventCard.tsx`
- [ ] `client/components/shared/EventGrid.tsx`

### Leadership

- [ ] `client/components/leadership/LeaderCard.tsx`
- [ ] `client/components/leadership/LeadershipGrid.tsx`
- [ ] `client/components/leadership/LeadershipHierarchy.tsx`

### Media and publications

- [ ] `client/components/media/MediaCard.tsx`
- [ ] `client/components/media/MediaGrid.tsx`
- [ ] `client/components/media/LivestreamEmbed.tsx`
- [ ] `client/components/media/PublicationCard.tsx`

### Contact

- [ ] `client/components/contact/ContactForm.tsx`
- [ ] `client/components/contact/ContactFormSection.tsx`
- [ ] `client/components/contact/FormField.tsx`
- [ ] `client/components/contact/SubmitButton.tsx`
- [ ] `client/components/contact/SuccessMessage.tsx`
- [ ] `client/components/contact/ChurchInfoSidebar.tsx`

## Data Layer Checklist

### Core files

- [ ] `client/lib/types.ts`
- [ ] `client/lib/utils.ts`
- [ ] `client/lib/mock-data.ts`
- [ ] `client/lib/wordpress.ts`
- [ ] `client/lib/event-utils.ts`
- [ ] `client/lib/og.tsx`

### Form and delivery helpers

- [ ] `client/lib/schemas/contact.ts`
- [ ] `client/lib/email.ts`
- [ ] `client/app/contact/actions.ts`

### Frontend types

- [ ] `Church`
- [ ] `Leader`
- [ ] `Ministry`
- [ ] `Event`
- [ ] `MediaItem`
- [ ] `Publication`
- [ ] `ContactFormPurpose`

### Mock-data expectations

- [ ] seed mock content for all canonical routes, including `/watch-us-live`, `/publications`, and `/media`
- [ ] keep mock content entity-based, not page-builder-fragment based
- [ ] normalize legacy content into structured records for churches, ministries, leaders, events, and media

## WordPress Server Checklist

### Local server scaffold

- [ ] `server/docker-compose.yml`
- [ ] `server/README.md`
- [ ] `server/DATA_MODELLING_GUIDE.md`
- [ ] `server/mu-plugins/nextjs-revalidation.php`

### Plugin expectations

- [ ] WPGraphQL
- [ ] Advanced Custom Fields
- [ ] WPGraphQL for ACF
- [ ] Classic Editor if needed

### Revalidation seam

- [ ] `client/app/api/revalidate/route.ts`
- [ ] shared revalidation secret env vars

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
- [ ] map `/youths`, `/cwl-charismatic-women-league`, and `/kings-men` into `ministry`
- [ ] map `/our-pastors` into `leader` records plus a leadership landing page
- [ ] remove placeholder/demo content during migration entry

## Testing Checklist

### Scripts

- [ ] `bun run lint`
- [ ] `bun run test`
- [ ] `bun run build`
- [ ] `bun run check`

### Initial test coverage

- [ ] `client/lib/event-utils.ts`
- [ ] `client/lib/wordpress.ts`
- [ ] `client/lib/schemas/contact.ts`

## Suggested Build Order

### Sprint 1

- [ ] repo scaffold
- [ ] Next.js bootstrap
- [ ] layout shell, fonts, globals, navbar, footer
- [ ] homepage shell
- [ ] About routes

### Sprint 2

- [ ] churches listing and detail
- [ ] ministries listing and detail
- [ ] `/youths`
- [ ] `/our-pastors`

### Sprint 3

- [ ] events
- [ ] `/watch-us-live`
- [ ] `/publications`
- [ ] `/media`
- [ ] `/contact`
- [ ] `/give`

### Sprint 4

- [ ] WordPress local stack
- [ ] content modelling
- [ ] GraphQL fetch layer
- [ ] replace mock data with CMS data
- [ ] redirects, metadata, and revalidation

## Done Definition

The scaffold is complete when:

- [ ] `client/` exists with a buildable Next.js app shell
- [ ] `server/` exists with a runnable local WordPress stack
- [ ] all canonical routes above exist
- [ ] all legacy flat routes are handled as redirects
- [ ] typed mock content exists for churches, ministries, leaders, events, media, and publications
- [ ] WordPress integration seams exist even before full content entry is finished
