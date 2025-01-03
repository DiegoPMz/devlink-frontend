import { useStoreApp } from "@/store";
import { twclass } from "@/utilities/twclass";

import { Outlet } from "react-router-dom";

const ThemeProvider = () => {
  const appTheme = useStoreApp((state) => state.user.theme as string);
  document.body.className = appTheme ?? undefined;

  return (
    <div className={twclass(appTheme)}>
      <Outlet />
    </div>
  );
};

export default ThemeProvider;
