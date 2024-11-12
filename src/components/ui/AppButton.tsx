import { twclass } from "@/utilities/twclass";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const PRIMARY_CLASS =
  "flex h-full w-full items-center justify-center rounded-lg bg-appPurple py-[8px] text-white transition-colors duration-200 ease-out active:bg-appPurpleH disabled:pointer-events-none disabled:bg-appPurpleH";
export const SECONDARY_CLASS =
  "w-full flex items-center justify-center h-full rounded-lg py-[8px] px-[24px] font-semibold text-appPurple ring-1 ring-appPurple transition-colors duration-200 ease-out active:bg-appPurpleL disabled:pointer-events-none disabled:opacity-25";

export const AppButton = ({
  children,
  variant = "primary",
  ...props
}: AppButtonProps) => {
  const variantValidation = variant !== "primary" && variant !== "secondary";

  return (
    <>
      <button
        {...props}
        type={props.type ?? "button"}
        className={twclass(
          "flex h-full w-full items-center justify-center rounded-lg bg-appPurple py-[8px] text-white transition-colors duration-200 ease-out active:bg-appPurpleH disabled:pointer-events-none disabled:bg-appPurpleH",
          variant === "secondary" &&
            "bg-transparent font-semibold text-appPurple ring-1 ring-appPurple active:bg-appPurpleL disabled:opacity-25",
          variantValidation && PRIMARY_CLASS,
        )}
      >
        {children}
      </button>
    </>
  );
};
