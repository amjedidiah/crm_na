# CRM NA Data Modelling Guide

Phase scope: connect the live Next.js site to WordPress for **churches**, **leaders**, **ministries**, **events**, **media_item** (gallery albums), and **About page** structured copy.

**Deferred this phase:** `publication` CPT (devotionals stay in JSON/mock), sermon archive CMS, site-wide globals (`SITE_NAME`, footer contact, social links).

## Canonical post types (this phase)

| CPT slug | GraphQL single | GraphQL plural | Frontend type |
| ---------- | ---------------- | ---------------- | --------------- |
| `church` | `church` | `churches` | `Church` |
| `leader` | `leader` | `leaders` | `Leader` |
| `ministry` | `ministry` | `ministries` | `Ministry` |
| `event` | `event` | `events` | `Event` |
| `media_item` | `mediaItem` | `mediaItems` | `GalleryAlbum` |
| `page` | `page` | `pages` | About structured fields only |

## Taxonomies

- `region` — USA, Canada, Mexico (optional on church/leader)
- `ministry_category`
- `event_category`
- `media_type` — maps to gallery category (`events`, `ministries`, `general`)

## Key relationships

- a `church` has one **primary leader** (`leader` post object) and optional **secondary leaders**
- a `ministry` has one or more **leader** relationships (`leaderIds` in frontend)
- an `event` can reference a `church`, a `ministry`, or both
- a `media_item` maps to a standalone gallery album; event/ministry gallery images may also be embedded on those CPTs

### GraphQL relationship shape (verify in GraphiQL after ACF setup)

```graphql
churchDetails {
  primaryLeader { nodes { slug } }
  secondaryLeaders { nodes { slug } }
}
ministryDetails {
  leaders { nodes { slug } }
}
eventDetails {
  church { nodes { slug } }
  ministry { nodes { slug } }
}
```

Leader `id` in the frontend equals the leader post **slug**.

## ACF field groups

Field group names become camelCase GraphQL field names (WPGraphQL for ACF).

### `churchDetails` (on `church`)

| ACF field | GraphQL | Frontend |
| --------- | ------- | -------- |
| `mode` | select | `Church.mode` |
| `directory_order` | number | `directoryOrder` |
| `legacy_path` | text | `legacyPath` |
| `region` | select | `region` |
| `city`, `state_or_province`, `country` | text | location fields |
| `summary` | textarea | `summary` |
| `story_paragraphs` | repeater (text) | `story[]` |
| `address`, `phone`, `email`, `website` | text | contact |
| `livestream_url` | url | `livestreamUrl` |
| `primary_leader` | post object → `leader` | `pastorId` (leader slug) |
| `secondary_leaders` | post object → `leader` | `leaderIds` |
| `service_times` | repeater | `serviceTimes[]` |
| `programs` | repeater | `programs[]` |

Post title → `name`. Post slug → `slug`. Post content may supplement `story` if repeater empty.

### `leaderDetails` (on `leader`)

| ACF field | Frontend |
| --------- | -------- |
| `title` | `title` |
| `bio` | `bio` |
| `photo` | image → `imageSrc`, `imageAlt` |
| `region` | `region` |
| `church` | post object → `churchSlug` |
| `ministry` | post object → `ministrySlug` |

### `ministryDetails` (on `ministry`)

| ACF field | Frontend |
| --------- | -------- |
| `email` | `email` |
| `legacy_path` | `legacyPath` |
| `leaders` | post objects → `leaderIds` |
| `meeting_schedule` | repeater/text → `meetingSchedule[]` |
| `focus_areas` | repeater → `focusAreas[]` |
| `photo_gallery` | gallery → `galleryImages[]` |

Excerpt/summary → `summary`. Content paragraphs → `description[]`.

### `eventDetails` (on `event`)

| ACF field | Frontend |
| --------- | -------- |
| `mode` | `mode` |
| `start_date`, `end_date` | `startDate`, `endDate` |
| `location` | `location` |
| `email` | `email` |
| `church`, `ministry` | post objects → slugs |
| `external_url` | `externalUrl` |
| `registration_url` | `registrationUrl` |
| `livestream_url` | `livestreamUrl` |
| `gallery_images` | gallery → `galleryImages[]` |

### `mediaItemDetails` (on `media_item`)

| ACF field | Frontend |
| --------- | -------- |
| `album_date` | `date` |
| `category` | `category` (`events` \| `ministries` \| `general`) |
| `cover_image` | image → `coverImage` |
| `gallery_images` | gallery → `images[]` |
| `source_href` | optional `sourceHref` |

Frontend route: `/gallery/{slug}`.

### `aboutPageFields` (on About `page`, slug `about`)

Structured copy for overview, vision, mission, strategy, history timeline, history highlights, welcome message, leadership intro. See `client/lib/about-content.ts` for target shapes.

## Notes from the legacy site audit

- church centers and ministries must stay distinct in the model
- legacy **`/media`**, **`/sermon`**, **`/watch-us-live`** redirect to **`/gallery`**
- use **`church` / `event` `livestreamUrl`** for join links
- **`publication`** deferred — live devotional route is **`/devotionals`** (JSON-backed)

## CMS vs frontend seams

- [client/lib/wordpress.ts](../client/lib/wordpress.ts) is the only data seam pages should use for CMS-backed collections
- mock fallback when `WORDPRESS_GRAPHQL_ENDPOINT` is unset or fetch fails
- [server/mu-plugins/nextjs-revalidation.php](mu-plugins/nextjs-revalidation.php) pings Next.js with `{ post_type, slug }` on published saves

## Local setup

```bash
cd server
docker compose up -d
# WordPress: http://localhost:8080/wp-admin
# GraphQL:   http://localhost:8080/graphql
```

Install plugins (see `scripts/install-plugins.sh`): WPGraphQL, ACF, WPGraphQL for ACF, CPT UI.

Set in WordPress environment or wp-config:

- `NEXT_PUBLIC_SITE_URL` — frontend origin (e.g. `http://localhost:3000`)
- `REVALIDATE_SECRET` — shared with Next.js `REVALIDATE_SECRET`
