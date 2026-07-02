# CRM NA Website Remaining Work

The CRM NA website is now live at <https://crm-na.org/>.

This document summarises the remaining post-launch work needed to polish the site, complete editable content setup, verify production behaviour, and finish handover.

## Current Status

The main public website experience is live:

- Home
- About / Vision / History / Leadership
- Churches
- Ministries
- Events
- Gallery
- Contact
- Giving
- Daily Devotional

The site includes legacy redirects, basic SEO routes, loading/error states, and a tag-based revalidation endpoint wired to WordPress saves.

**Technical integration (this phase):** The Next.js frontend reads CMS-backed collections through `client/lib/wordpress.ts` when `WORDPRESS_GRAPHQL_ENDPOINT` is set, with mock fallback until WordPress content is complete.

## Already Agreed For This Phase

- **Giving:** The current Zeffy and Zelle giving options are approved for now.
- **Admin handover:** Handover will happen through a scheduled Zoom call or shared video recording.
- **Devotionals / Publications:** The current daily devotional approach is acceptable for now (JSON-backed, not WordPress CMS).
- **Sermons:** No sermon archive CMS this phase; legacy sermon routes redirect; livestream links stay on church/event records.
- **Site globals:** Footer contact, social links, and site name remain static/env-based for now.

## What Is Left

### 1. Finish WordPress CMS Setup

Set up WordPress so CRM NA can manage website content without editing code. See [server/DATA_MODELLING_GUIDE.md](../server/DATA_MODELLING_GUIDE.md) for CPT/ACF field definitions:

- `church`, `leader`, `ministry`, `event`, `media_item`
- About page structured fields on the `about` page

Run local WordPress via `server/docker-compose.yml` and `server/scripts/install-plugins.sh`.

### 2. Migrate Final Content Into WordPress

CRM NA will need to provide or confirm final content:

- Pastor and leader photos
- Church addresses, service times, contact details, websites, and livestream links
- Ministry descriptions and contacts
- Current events
- Gallery albums (`media_item`)
- About page copy

Placeholder/demo content should be removed as final content is added.

### 3. Verify Production Services

Confirm production settings:

- Website domain and SSL
- `WORDPRESS_GRAPHQL_ENDPOINT`
- `REVALIDATE_SECRET` (WordPress + Next.js)
- Contact form email/SMTP settings
- Giving links
- Image/media domains in `client/next.config.ts`
- Convention registration link

### 4. Test Contact Forms

Test with real production email settings:

- CRM NA receives form submissions
- Visitors receive confirmation emails
- Messages route correctly for churches, ministries, and events

### 5. Run Post-Launch QA

- Mobile and desktop layouts
- Old URL redirects
- Sitemap and SEO metadata
- Open Graph/social sharing images
- Loading, error, empty, and not-found states
- WordPress edit → frontend revalidation flow
- Accessibility basics
- Final lint/test/build checks

### 6. Complete Handover

Recommended topics for Zoom call or recording:

- How to update churches, ministries, events, leaders
- How to add gallery albums (`media_item`)
- How to update About page copy
- How to update livestream links
- How giving information is updated (static for now)
- How to request future website changes

## Recommended Completion Order

1. Complete WordPress CMS setup and ACF field groups.
2. Migrate final CRM NA content into WordPress.
3. Set production `WORDPRESS_GRAPHQL_ENDPOINT` and verify the site reads CMS data.
4. Verify production services and test contact forms.
5. Run QA including revalidation after a test edit.
6. Complete the handover call or recording.

## Summary

The website is live and the CMS integration seam is in place. What remains is primarily **content migration**, **production verification**, **QA**, and **handover** — not frontend rebuilding.
