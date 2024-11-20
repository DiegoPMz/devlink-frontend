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
          "relative block w-fit rounded-md px-[28px] py-[11px] font-semibold text-txt-color-primary hover:text-accent-primary-color",
          isActive && "bg-accent-secondary-color text-accent-primary-color",
        )
      }
    >
      <div className="flex w-full items-center justify-center">{children}</div>
    </NavLink>
  );
};
