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
          "flex h-full w-full items-center justify-center rounded-lg px-[24px] py-[8px] duration-200 ease-out disabled:pointer-events-none",
          variant === "primary" &&
            "text-accent-p-contrast-color bg-accent-primary-color transition-opacity active:opacity-50 disabled:opacity-50",
          variant === "secondary" &&
            "text-accent-s-contrast-color font-semibold ring-1 ring-accent-primary-color transition-colors active:bg-accent-secondary-color disabled:opacity-25",
        )}
      >
        {children}
      </button>
    </>
  );
};
