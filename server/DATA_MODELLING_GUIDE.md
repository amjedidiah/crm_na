# CRM NA Data Modelling Guide

## Canonical post types

- `church`
- `leader`
- `ministry`
- `event`
- `media_item`
- `publication`

## Taxonomies

- `region`
- `ministry_category`
- `event_category`
- `media_type`

## Key relationships

- a `church` has one primary `leader` and optional secondary leaders
- a `ministry` has one or more `leader` relationships
- an `event` can belong to a `church`, a `ministry`, or both
- a `media_item` can optionally reference a related `church`, `ministry`, or `event`

## Notes from the legacy site audit

- church centers and ministries must stay distinct in the model
- the canonical livestream destination in the Next app is **`/media#live`**, populated from `media_item` entries of type **`livestream`** (see `MediaItem` / `MediaType` in `client/lib/types.ts` and `client/app/media/page.tsx`); legacy **`/watch-us-live`** is redirect-only to `/media#live` (see `client/next.config.ts` and “Default live strategy” in `docs/development_plan.md`)
- empty legacy pages should not force empty content records; the schema should still support them

## CMS vs frontend seams

- WordPress may also use a `page` post type for unstructured pages; `server/mu-plugins/nextjs-revalidation.php` includes `page` in revalidation so edits still ping the frontend, even though `page` is not listed above as a structured CRM record type.
