import { getData, removeData, saveData } from "@/utilities/localStorage-utils";

export type ThemeAppValues = "dark-theme" | "midnight-theme" | "default-theme";

const PERSIST_THEME_KEY = "app_theme";

export const persistTheme = (themeValue: ThemeAppValues) =>
  saveData(themeValue, PERSIST_THEME_KEY);
export const getPersistedTheme = (): ThemeAppValues | null =>
  getData(PERSIST_THEME_KEY);
export const deletePersistedTheme = () => removeData(PERSIST_THEME_KEY);
