import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { LogoDevlinksSmall } from "@/assets/LogoDevlinksSmall";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuLink } from "react-icons/lu";
import { PiEyeBold } from "react-icons/pi";
import { AppButton } from "./ui/AppButton";
import { AppLinkTab } from "./ui/AppLinkTab";

export const AppBar = () => {
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
          <AppLinkTab to="/test">
            <div className="flex items-center justify-center gap-[8px]">
              <LuLink className="h-[18px] w-[18px]" />

              <span className="hidden md:block">Links</span>
            </div>
          </AppLinkTab>
          <AppLinkTab to="/testing">
            <div className="flex items-center justify-center gap-[8px]">
              <FaRegCircleUser className="h-[18px] w-[18px]" />
              <span className="hidden md:block">Profile Details</span>
            </div>
          </AppLinkTab>
        </div>

        <div className="h-[42px] w-[52px] md:hidden">
          <AppButton variant="secondary">
            <PiEyeBold />
          </AppButton>
        </div>

        <div className="hidden w-[114px] md:block">
          <AppButton variant="secondary"> Preview </AppButton>
        </div>
      </nav>
    </header>
  );
};
