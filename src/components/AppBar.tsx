import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { LogoDevlinksSmall } from "@/assets/LogoDevlinksSmall";
import { useEffect, useState } from "react";
import { FaBars, FaRegCircleUser } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { AppLink } from "./ui/AppLink";
import { AppLinkTab } from "./ui/AppLinkTab";
import UserMenuModal from "./UserMenuModal";

export const AppBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    if (!isMenuActive) return;

    const clickMenuOutside = (e: MouseEvent) => {
      const currentElement = e.target as HTMLElement;
      if (!currentElement.matches("#user-menu-modal")) setIsMenuActive(false);
    };

    document.body.addEventListener("click", clickMenuOutside);

    return () => {
      document.body.removeEventListener("click", clickMenuOutside);
    };
  }, [isMenuActive]);

  return (
    <header className="rounded-xl bg-white p-[14px] md:px-[24px] md:py-[16px]">
      <nav className="flex items-center justify-between">
        <div className="md:hidden">
          <LogoDevlinksSmall />
        </div>

        <div className="hidden md:block">
          <LogoDevlinksLarge />
        </div>

        <div className="flex">
          <AppLinkTab to="/links">
            <div className="flex items-center justify-center gap-[8px]">
              <LuLink className="h-[18px] w-[18px]" />

              <span className="hidden md:block">Links</span>
            </div>
          </AppLinkTab>
          <AppLinkTab to="/profile">
            <div className="flex items-center justify-center gap-[8px]">
              <FaRegCircleUser className="h-[18px] w-[18px]" />
              <span className="hidden md:block">Profile Details</span>
            </div>
          </AppLinkTab>
        </div>

        <div className="gap-[12px] md:flex md:items-center">
          <div className="hidden w-[114px] md:block">
            <AppLink variant="secondary" to={"/preview"}>
              Preview
            </AppLink>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsMenuActive(!isMenuActive)}
              className="flex items-center justify-center p-[4px] text-appPurple md:p-[8px]"
              id="user-menu-modal"
            >
              <FaBars className="pointer-events-none h-[20px] w-[20px]" />
            </button>

            {isMenuActive && <UserMenuModal />}
          </div>
        </div>
      </nav>
    </header>
  );
};
