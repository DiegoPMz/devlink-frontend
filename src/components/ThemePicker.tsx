import { FaCheck } from "react-icons/fa";

import {
  getPersistedTheme,
  persistTheme,
  ThemeAppValues,
} from "@/service/persist-theme";
import { useStoreApp } from "@/store";
import { twclass } from "@/utilities/twclass";
import { useState } from "react";

interface ThemeObjectType {
  value: ThemeAppValues;
  displayName: string;
}

const THEMES_APP: ThemeObjectType[] = [
  { value: "default-theme", displayName: "Default" },
  { value: "dark-theme", displayName: "Dark" },
  { value: "midnight-theme", displayName: "Midnight" },
];

const ThemePicker = () => {
  const handleChangeThemeStoreMd = useStoreApp(
    (state) => state.user.handleChangeTheme,
  );

  const themePersisted =
    THEMES_APP.find((theme) => theme.value === getPersistedTheme()) ??
    THEMES_APP[0];

  const [currentTheme, setCurrentTheme] =
    useState<ThemeObjectType>(themePersisted);

  const handleSelectTheme = (themeSetting: ThemeObjectType) => {
    if (!THEMES_APP.find((theme) => theme.value === themeSetting.value)) return;

    setCurrentTheme(themeSetting);
    persistTheme(themeSetting.value);

    handleChangeThemeStoreMd(themeSetting.value);
  };

  return (
    <ul className="flex h-fit w-full flex-col gap-[12px]">
      {THEMES_APP.map((theme) => (
        <li
          key={theme.value}
          className={twclass(
            theme.value,
            "relative flex items-center justify-between rounded-md bg-bg-color-secondary px-[16px] py-[12px]",
          )}
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={() => handleSelectTheme(theme)}
          />

          <div className="flex w-full items-center justify-center gap-[8px]">
            {currentTheme.value === theme.value ? (
              <div className="flex w-[20%] justify-end">
                <FaCheck className="h-[12px] w-[12px] text-accent-primary-color" />
              </div>
            ) : (
              <div className="flex w-[20%] justify-end">
                <div className="h-[12px] w-[12px]" />
              </div>
            )}

            <span
              className={twclass(
                "w-[100%] text-left text-sm text-txt-color-secondary",
              )}
            >
              {theme.displayName}
            </span>
          </div>

          <div className="flex h-fit w-fit gap-[4px]">
            <div className="h-[20px] w-[8px] rounded-sm bg-bg-color-primary" />
            <div className="h-[20px] w-[8px] rounded-sm bg-txt-color-primary" />
            <div className="h-[20px] w-[8px] rounded-sm bg-accent-primary-color" />
            <div className="h-[20px] w-[8px] rounded-sm bg-accent-secondary-color" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ThemePicker;
