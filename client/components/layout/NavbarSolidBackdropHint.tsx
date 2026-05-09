"use client";

import { useEffect } from "react";

const FORCE_SOLID = "crmna:nav-force-solid";
const RELEASE_SOLID = "crmna:nav-release-solid";

/**
 * Mount inside error boundary UI. Error pages omit PageHeader / hero-panel, so the
 * fixed navbar must use solid “scrolled” styling or links stay near-white on canvas.
 */
function NavbarSolidBackdropHint() {
  useEffect(() => {
    globalThis.dispatchEvent(new CustomEvent(FORCE_SOLID));
    return () => {
      globalThis.dispatchEvent(new CustomEvent(RELEASE_SOLID));
    };
  }, []);
  return null;
}

export default NavbarSolidBackdropHint;
