"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { PropsWithChildren } from "react";

function ThemeProvider({ children }: Readonly<PropsWithChildren>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableColorScheme
      enableSystem
      storageKey="crm-na-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

export default ThemeProvider;
