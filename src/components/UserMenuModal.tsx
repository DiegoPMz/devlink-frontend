import { useStoreApp } from "@/store";
import ThemePicker from "./ThemePicker";

const UserMenuModal = () => {
  const storeLogoutMethod = useStoreApp((state) => state.logout);
  const currentTheme = useStoreApp((state) => state.user.theme);
  const handleChangeThemeStoreMd = useStoreApp(
    (state) => state.user.handleChangeTheme,
  );

  return (
    <div className="absolute right-[100%] top-[100%] z-[300] flex h-fit w-[200px] flex-col gap-[16px] rounded-xl bg-bg-color-primary p-[8px] shadow-sm shadow-ui-border-color">
      <ThemePicker
        initialTheme={currentTheme}
        handleChangeTheme={(theme) => handleChangeThemeStoreMd(theme)}
      />

      <button
        onClick={storeLogoutMethod}
        className="w-full rounded-lg bg-accent-secondary-color p-[8px] font-medium text-accent-s-contrast-color"
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenuModal;
