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
- `/watch-us-live/` should be supported by `media_item` entries of type `livestream`
- empty legacy pages should not force empty content records; the schema should still support them
