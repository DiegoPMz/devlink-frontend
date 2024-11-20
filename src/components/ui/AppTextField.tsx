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

export const AppTextField = forwardRef<HTMLInputElement, AppTextFieldProps>(
  ({ error, icon, ...props }, ref) => {
    return (
      <div className="relative">
        <div
          className={`pointer-events-none absolute inset-0 flex items-center justify-between px-[12px]`}
        >
          <div className="aspect-square max-w-[14px] text-txt-color-primary">
            {icon ?? <GoLink className="h-[14px]" />}
          </div>
          {error && (
            <span className="text-xs text-error-primary-color"> {error} </span>
          )}
        </div>

        <input
          {...props}
          ref={ref}
          className={twclass(
            "w-full rounded-md py-[12px] pl-[36px] pr-[12px] ring-1 ring-ui-border-color autofill:bg-error-primary-color focus-visible:shadow-app focus-visible:outline-none focus-visible:ring-accent-primary-color",
            error &&
              "text-error-primary-color ring-error-primary-color focus-visible:shadow-none focus-visible:ring-2 focus-visible:ring-error-primary-color",
          )}
          type={props.type ?? "text"}
          placeholder={props.placeholder ?? "Default placeholder ~"}
        />
      </div>
    );
  },
);
