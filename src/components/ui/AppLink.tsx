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
          "bg-appPurple text-white active:bg-appPurpleH disabled:bg-appPurpleH",
        variant === "secondary" &&
          "font-semibold text-appPurple ring-1 ring-appPurple active:bg-appPurpleL disabled:opacity-25",
      )}
    >
      {props.children}
    </Link>
  );
};
