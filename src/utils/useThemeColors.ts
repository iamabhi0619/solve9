/**
 * @/utils/useThemeColors
 *
 * Provides a hook to access theme colors programmatically for use in
 * React Native components (e.g., icon colors, inline styles).
 * 
 * This hook maps the active Uniwind theme to the corresponding color values
 * defined in global.css, making them accessible to components that need
 * explicit color values rather than CSS classes.
 */

import { useTheme } from "@/theme";

export interface ThemeColors {
  background: string;
  surface: string;
  border: string;
  primary: string;
  primarySoft: string;
  foreground: string;
  muted: string;
  error: string;
  errorBg: string;
  errorText: string;
  success: string;
}

const themeColorMap: Record<string, ThemeColors> = {
  "light-default": {
    background: "#F4F7FB",
    surface: "#FFFFFF",
    border: "#D9E1F0",
    primary: "#1C4D8D",
    primarySoft: "#4988C4",
    foreground: "#0F2854",
    muted: "#4A628A",
    error: "#D64545",
    errorBg: "#FDECEA",
    errorText: "#D64545",
    success: "#10B981",
  },
  "dark-default": {
    background: "#161A22",
    surface: "#1D2230",
    border: "#2A3142",
    primary: "#5B8CFF",
    primarySoft: "#7FA7FF",
    foreground: "#E6EAF2",
    muted: "#AAB2C5",
    error: "#FF6B6B",
    errorBg: "rgba(255, 107, 107, 0.18)",
    errorText: "#FF6B6B",
    success: "#10B981",
  },
  "light-ocean": {
    background: "#F4F7FB",
    surface: "#FFFFFF",
    border: "#D9E1F0",
    primary: "#0D7A8A",
    primarySoft: "#3D9BA8",
    foreground: "#0F2854",
    muted: "#4A628A",
    error: "#D64545",
    errorBg: "#FDECEA",
    errorText: "#D64545",
    success: "#10B981",
  },
  "dark-ocean": {
    background: "#161A22",
    surface: "#1D2230",
    border: "#2A3142",
    primary: "#0D7A8A",
    primarySoft: "#3D9BA8",
    foreground: "#E6EAF2",
    muted: "#AAB2C5",
    error: "#FF6B6B",
    errorBg: "rgba(255, 107, 107, 0.18)",
    errorText: "#FF6B6B",
    success: "#10B981",
  },
  "light-forest": {
    background: "#F4F7FB",
    surface: "#FFFFFF",
    border: "#D9E1F0",
    primary: "#2D7A3A",
    primarySoft: "#4D9A5A",
    foreground: "#0F2854",
    muted: "#4A628A",
    error: "#D64545",
    errorBg: "#FDECEA",
    errorText: "#D64545",
    success: "#10B981",
  },
  "dark-forest": {
    background: "#161A22",
    surface: "#1D2230",
    border: "#2A3142",
    primary: "#2D7A3A",
    primarySoft: "#4D9A5A",
    foreground: "#E6EAF2",
    muted: "#AAB2C5",
    error: "#FF6B6B",
    errorBg: "rgba(255, 107, 107, 0.18)",
    errorText: "#FF6B6B",
    success: "#10B981",
  },
  "light-lavender": {
    background: "#F4F7FB",
    surface: "#FFFFFF",
    border: "#D9E1F0",
    primary: "#6B4DC4",
    primarySoft: "#8B6DD4",
    foreground: "#0F2854",
    muted: "#4A628A",
    error: "#D64545",
    errorBg: "#FDECEA",
    errorText: "#D64545",
    success: "#10B981",
  },
  "dark-lavender": {
    background: "#161A22",
    surface: "#1D2230",
    border: "#2A3142",
    primary: "#6B4DC4",
    primarySoft: "#8B6DD4",
    foreground: "#E6EAF2",
    muted: "#AAB2C5",
    error: "#FF6B6B",
    errorBg: "rgba(255, 107, 107, 0.18)",
    errorText: "#FF6B6B",
    success: "#10B981",
  },
  "light-sunset": {
    background: "#FDF6EE",
    surface: "#FFFFFF",
    border: "#F0DCCB",
    primary: "#C85A1A",
    primarySoft: "#D87A3A",
    foreground: "#3B1F0A",
    muted: "#8A5A3A",
    error: "#D64545",
    errorBg: "#FDECEA",
    errorText: "#D64545",
    success: "#10B981",
  },
  "dark-sunset": {
    background: "#1A1210",
    surface: "#231815",
    border: "#3A2820",
    primary: "#E87A3A",
    primarySoft: "#F89A5A",
    foreground: "#F2E6DF",
    muted: "#C5A898",
    error: "#FF6B6B",
    errorBg: "rgba(255, 107, 107, 0.18)",
    errorText: "#FF6B6B",
    success: "#10B981",
  },
};

/**
 * Returns the current theme colors based on the active theme.
 * 
 * @example
 * const colors = useThemeColors();
 * <Icon name="star" color={colors.foreground} />
 */
export function useThemeColors(): ThemeColors {
  const { theme, resolvedMode } = useTheme();
  
  // Get colors for the specific theme, fallback to default if not found
  const colors = themeColorMap[theme] || themeColorMap[`${resolvedMode}-default`];
  
  return colors;
}
