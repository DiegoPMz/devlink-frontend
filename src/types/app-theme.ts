export type ThemeAppTypes =
  | "dark-theme"
  | "midnight-theme"
  | "pastel-theme"
  | "default-theme";

export const APP_THEME_CLASSES = [
  "default-theme",
  "dark-theme",
  "midnight-theme",
  "pastel-theme",
] as const;
