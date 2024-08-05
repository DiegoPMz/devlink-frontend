interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: "primary" | "secondary";
}

export const PRIMARY_CLASS =
  "w-full flex items-center justify-center h-[100%] rounded-lg bg-appPurple py-[8px] text-white transition-colors duration-200 ease-out active:bg-appPurpleH disabled:pointer-events-none disabled:bg-appPurpleH";
export const SECONDARY_CLASS =
  "w-full flex items-center justify-center h-[100%] rounded-lg py-[8px] font-semibold text-appPurple ring-1 ring-appPurple transition-colors duration-200 ease-out active:bg-appPurpleL disabled:pointer-events-none disabled:opacity-25";

export const AppButton = ({
  children,
  variant = "primary",
  ...props
}: AppButtonProps) => {
  function variantValidation() {
    if (variant !== "primary" && variant !== "secondary") return "primary";

    return variant;
  }

  const buttonClass =
    variantValidation() === "primary" ? PRIMARY_CLASS : SECONDARY_CLASS;

  return (
    <>
      <button className={buttonClass} {...props}>
        {children}
      </button>
    </>
  );
};
