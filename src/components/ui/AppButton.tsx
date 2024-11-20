import { twclass } from "@/utilities/twclass";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const AppButton = ({
  children,
  variant = "primary",
  ...props
}: AppButtonProps) => {
  return (
    <>
      <button
        {...props}
        type={props.type ?? "button"}
        className={twclass(
          "flex h-full w-full items-center justify-center rounded-lg px-[24px] py-[8px] transition-colors duration-200 ease-out disabled:pointer-events-none",
          variant === "primary" &&
            "bg-accent-primary-color text-white active:bg-accent-primary-color-h disabled:bg-accent-primary-color-h",
          variant === "secondary" &&
            "font-semibold text-accent-primary-color ring-1 ring-accent-primary-color active:bg-accent-secondary-color disabled:opacity-25",
        )}
      >
        {children}
      </button>
    </>
  );
};
