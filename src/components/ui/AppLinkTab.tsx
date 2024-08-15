import { twclass } from "@/utilities/twclass";
import { NavLink, NavLinkProps } from "react-router-dom";

interface AppLinkTabProps extends NavLinkProps {
  children?: React.ReactNode;
}

const STYLE_DEFAULT =
  "relative block w-fit rounded-md px-[28px] py-[11px] text-appGrey hover:text-appPurple font-semibold  ";

const STYLE_ACTIVE = `${STYLE_DEFAULT} text-appPurple  bg-appPurpleL`;

export const AppLinkTab = ({ children, ...props }: AppLinkTabProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        twclass(isActive ? STYLE_ACTIVE : STYLE_DEFAULT)
      }
    >
      <div className="flex w-full items-center justify-center">{children}</div>
    </NavLink>
  );
};
