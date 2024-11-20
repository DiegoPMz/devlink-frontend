import { twclass } from "@/utilities/twclass";
import { NavLink, NavLinkProps } from "react-router-dom";

interface AppLinkTabProps extends NavLinkProps {
  children?: React.ReactNode;
}

export const AppLinkTab = ({ children, ...props }: AppLinkTabProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        twclass(
          "hover:text-accent-s-contrast-color relative block w-fit rounded-md px-[28px] py-[11px] font-semibold text-txt-color-primary transition-colors duration-200 ease-in",
          isActive && "text-accent-s-contrast-color bg-accent-secondary-color",
        )
      }
    >
      <div className="flex w-full items-center justify-center">{children}</div>
    </NavLink>
  );
};
