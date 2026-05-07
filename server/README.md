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

The mu-plugin in `mu-plugins/nextjs-revalidation.php` is intended to ping the
Next.js app whenever a supported post type changes.
