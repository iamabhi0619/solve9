/**
 * @/theme
 *
 * Provides a `useTheme()` hook that exposes the resolved colour-scheme mode
 * ("light" | "dark") derived from the currently active Uniwind theme.
 *
 * The active Uniwind theme is a compound string such as "dark-ocean" or
 * "light-default".  We simply check whether it starts with "dark" to derive
 * the resolved mode.
 */

import { useUniwind } from "uniwind";

export type ResolvedMode = "light" | "dark";

export interface ThemeContext {
  /** The active Uniwind theme id, e.g. "dark-ocean". */
  theme: string;
  /** The resolved colour-scheme: "light" or "dark". */
  resolvedMode: ResolvedMode;
}

/**
 * Returns the active Uniwind theme and the resolved colour-scheme mode.
 *
 * @example
 * const { resolvedMode } = useTheme();
 * const iconColor = resolvedMode === "light" ? "#0F2854" : "#E6EAF2";
 */
export function useTheme(): ThemeContext {
  const { theme } = useUniwind();

  const resolvedMode: ResolvedMode = theme.startsWith("dark") ? "dark" : "light";

  return { theme, resolvedMode };
}
