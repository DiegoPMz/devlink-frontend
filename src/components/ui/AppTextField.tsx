import { twclass } from "@/utilities/twclass";
import { forwardRef } from "react";
import { GoLink } from "react-icons/go";

type InputExcludeType = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className"
>;

interface AppTextFieldProps extends InputExcludeType {
  type?: "text" | "password";
  error?: string;
  icon?: React.ReactNode;
}

// size of icon = "12px"
// icon size * 3 = "36px"
const DEFAULT_CLASS = `autofill:bg-red-600 w-full rounded-md py-[12px] pl-[36px] focus-visible:shadow-app pr-[12px] ring-1 ring-appBorder focus-visible:outline-none focus-visible:ring-appPurple`;
const ERROR_CLASS = `${DEFAULT_CLASS} text-appRed focus-visible:shadow-none  focus-visible:ring-2 focus-visible:ring-appRed ring-appRed`;

export const AppTextField = forwardRef<HTMLInputElement, AppTextFieldProps>(
  ({ error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-between px-[12px]`}
        >
          <div className="aspect-square max-w-[14px] text-appGrey">
            {icon ?? <GoLink className="h-[14px]" />}
          </div>
          {error && <span className="text-xs text-appRed"> {error} </span>}
        </div>

        <input
          {...props}
          ref={ref}
          className={twclass(error ? ERROR_CLASS : DEFAULT_CLASS)}
          type={props.type ?? "text"}
          placeholder={props.placeholder ?? "Default placeholder ~"}
        />
      </div>
    );
  },
);
