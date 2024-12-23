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
        "flex h-full w-full items-center justify-center rounded-lg px-[24px] py-[8px] font-semibold duration-200 ease-in disabled:pointer-events-none",
        variant === "primary" &&
          "bg-accent-primary-color text-accent-p-contrast-color transition-opacity active:opacity-50 disabled:opacity-50",
        variant === "secondary" &&
          "text-accent-s-contrast-color ring-1 ring-accent-primary-color transition-colors active:bg-accent-secondary-color disabled:opacity-25",
      )}
    >
      {props.children}
    </Link>
  );
};
