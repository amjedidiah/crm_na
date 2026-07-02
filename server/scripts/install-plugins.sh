#!/usr/bin/env bash
# Install required WordPress plugins into server/plugins (bind-mounted by docker-compose).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PLUGINS_DIR="$ROOT/plugins"
mkdir -p "$PLUGINS_DIR"

install_zip() {
  local name="$1"
  local url="$2"
  local dest="$PLUGINS_DIR/$name"
  if [[ -d "$dest" ]]; then
    echo "skip $name (already present)"
    return
  fi
  echo "installing $name..."
  tmp="$(mktemp -d)"
  curl -fsSL "$url" -o "$tmp/plugin.zip"
  unzip -q "$tmp/plugin.zip" -d "$tmp/extract"
  # Most WP plugin zips extract to a single folder.
  mv "$tmp/extract"/* "$PLUGINS_DIR/"
  rm -rf "$tmp"
}

# Pin versions as needed; URLs are WordPress.org latest stable zip endpoints.
install_zip "wp-graphql" "https://downloads.wordpress.org/plugin/wp-graphql.latest-stable.zip"
install_zip "advanced-custom-fields" "https://downloads.wordpress.org/plugin/advanced-custom-fields.latest-stable.zip"
install_zip "wpgraphql-acf" "https://downloads.wordpress.org/plugin/wpgraphql-acf.latest-stable.zip"
install_zip "custom-post-type-ui" "https://downloads.wordpress.org/plugin/custom-post-type-ui.latest-stable.zip"

echo "Done. Activate plugins in wp-admin and configure CPTs per DATA_MODELLING_GUIDE.md"
