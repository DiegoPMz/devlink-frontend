import { twclass } from "@/utilities/twclass";
import { forwardRef } from "react";
import { LuLink } from "react-icons/lu";

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
          <div
            className={twclass(
              "aspect-square max-w-[14px] text-txt-color-primary",
              error && "text-error-primary-color",
            )}
          >
            {icon ?? <LuLink className="h-[14px]" />}
          </div>
        </div>

        {error && (
          <div className="absolute top-[100%] h-fit w-full pt-[4px]">
            <span className="block w-full text-right text-xs text-error-primary-color">
              {error}
            </span>
          </div>
        )}

        <input
          {...props}
          ref={ref}
          className={twclass(
            "w-full rounded-md bg-bg-color-primary py-[12px] pl-[36px] pr-[12px] text-txt-color-secondary ring-1 ring-ui-border-color placeholder:opacity-70 autofill:bg-error-primary-color focus-visible:shadow-app focus-visible:outline-none focus-visible:ring-accent-primary-color",
            error &&
              "text-error-primary-color ring-error-primary-color focus-visible:shadow-appError focus-visible:ring-1 focus-visible:ring-error-primary-color",
          )}
          type={props.type ?? "text"}
          placeholder={props.placeholder ?? "Default placeholder ~"}
        />
      </div>
    );
  },
);
