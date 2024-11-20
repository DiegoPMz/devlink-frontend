import { twclass } from "@/utilities/twclass";
import { Link, LinkProps } from "react-router-dom";

interface AppLinkProps extends LinkProps {
  variant?: "primary" | "secondary";
}

export const AppLink = ({ variant = "primary", ...props }: AppLinkProps) => {
  return (
    <Link
      {...props}
      className={twclass(
        "flex h-full w-full items-center justify-center rounded-lg px-[24px] py-[8px] transition-colors duration-200 ease-out disabled:pointer-events-none",
        variant === "primary" &&
          "bg-accent-primary-color text-white active:bg-accent-primary-color-h disabled:bg-accent-primary-color-h",
        variant === "secondary" &&
          "font-semibold text-accent-primary-color ring-1 ring-accent-primary-color active:bg-accent-secondary-color disabled:opacity-25",
      )}
    >
      {props.children}
    </Link>
  );
};
