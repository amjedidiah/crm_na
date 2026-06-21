# CRM NA WordPress Server

This directory mirrors the `/Users/jay/Projects/freelance/crm_praise_center/server` shape for local WordPress work.

## Intended use

- run a local WordPress instance
- install WPGraphQL and ACF-based plugins
- model the CRM NA content schema
- expose a GraphQL endpoint for the Next.js frontend in `../client`

## Expected plugins

- WPGraphQL
- Advanced Custom Fields
- WPGraphQL for ACF
- Classic Editor if the editorial team prefers it

## Revalidation

The mu-plugin in `mu-plugins/nextjs-revalidation.php` sends `{ post_type, slug }` to the Next.js `/api/revalidate` route on published saves. Configure `NEXT_PUBLIC_SITE_URL` and `REVALIDATE_SECRET` in the WordPress environment.

See [DATA_MODELLING_GUIDE.md](DATA_MODELLING_GUIDE.md) for CPT/ACF setup and [scripts/install-plugins.sh](scripts/install-plugins.sh) for local plugin installation.
