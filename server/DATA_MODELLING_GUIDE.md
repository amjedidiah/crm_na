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
- `publication_type` (values: `blog`, `devotional`)

## Key relationships

- a `church` has one primary `leader` and optional secondary leaders
- a `ministry` has one or more `leader` relationships
- an `event` can belong to a `church`, a `ministry`, or both
- a `media_item` can optionally reference a related `church`, `ministry`, or `event`

## Notes from the legacy site audit

- church centers and ministries must stay distinct in the model
- the **current** Next app routes legacy **`/media`**, **`/sermon`**, and **`/watch-us-live`** to **`/gallery`** (photo albums); there is no site-wide `#live` hash hub—use **`church` / `event` `livestreamUrl`** (and related fields in `client/lib/types.ts`) for join links
- empty legacy pages should not force empty content records; the schema should still support them
- `publication` records stay differentiated by `publication_type` (`blog`, `devotional`); the **live** marketing listing route is **`/devotionals`**, while legacy **`/publications/*`** URLs redirect there (see `client/next.config.ts`)

## CMS vs frontend seams

- WordPress may also use a `page` post type for unstructured pages; `server/mu-plugins/nextjs-revalidation.php` includes `page` in revalidation so edits still ping the frontend, even though `page` is not listed above as a structured CRM record type.
