import { twclass } from "@/utilities/twclass";
import { ReactNode, useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface OptionType {
  displayName: string;
  value: string;
  icon?: ReactNode;
}

interface AppDropDownProps {
  options: OptionType[];
  selected?: string;
  error?: string;
  onChange?: (option: OptionType["value"]) => void;
}

type CurrentOptionType = undefined | OptionType;

export const AppDropDown = ({
  options,
  selected,
  error,
  onChange,
}: AppDropDownProps) => {
  const [isActive, setIsActive] = useState(false);
  const [currentOption, setCurrentOption] = useState<CurrentOptionType>(
    options.find((op) => op.value === selected),
  );

  const handleSelectOption = (selectedOption: OptionType) => {
    setIsActive(false);

    if (!selectedOption.value) return;
    setCurrentOption(selectedOption);
    onChange && onChange(selectedOption.value);
  };

  const hasOptions =
    options.length > 0 && options.some((op) => op.value && op.displayName);
  const isDropMenuAvailable = hasOptions && isActive;

  const AppDropDownRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!AppDropDownRef.current) return;
      if (!AppDropDownRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    const bodyElement = document.body;
    bodyElement?.addEventListener("click", handleClickOutside);

    return () => {
      bodyElement?.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  return (
    <div
      className={twclass(
        "relative h-[40px] min-w-[255px] rounded-md bg-bg-color-primary ring-1 ring-ui-border-color",
        isActive && "shadow-app ring-accent-primary-color",
        error && "ring-error-primary-color",
      )}
    >
      <button
        type="button"
        ref={AppDropDownRef}
        className="absolute inset-0"
        onClick={() => setIsActive(!isActive)}
      />

      <div className="flex h-full w-full items-center justify-between px-[16px]">
        <div className="flex w-full items-center gap-[12px]">
          {currentOption && (
            <>
              <div className="text-txt-color-primary">{currentOption.icon}</div>
              <span className="text-txt-color-secondary">
                {currentOption.displayName}
              </span>
            </>
          )}

          {!currentOption && (
            <span
              className={twclass(
                "text-txt-color-secondary",
                error && "text-error-primary-color",
              )}
            >
              Select...
            </span>
          )}
        </div>

        <IoIosArrowUp
          className={twclass(
            "pointer-events-none h-[18px] w-[18px] rotate-0 text-accent-primary-color transition-transform duration-[200ms] ease-custom-ease",
            isActive && "rotate-180",
            error && "text-error-primary-color",
          )}
        />
      </div>

      {isDropMenuAvailable && (
        <ul className="scrollbar-custom absolute left-0 top-[125%] z-[1000] flex h-fit max-h-[287px] w-full flex-col overflow-y-scroll rounded-md bg-bg-color-primary text-txt-color-secondary ring-2 ring-ui-border-color">
          {options.map((option, i) => {
            const { displayName, value, icon } = option;
            const availableBorderBottom = i + 1 < options.length;
            const areEqualValues = currentOption?.value === value;

            return (
              <li
                key={value}
                className="relative flex w-full items-center gap-[12px] px-[16px] py-[12px]"
              >
                <button
                  type="button"
                  className="absolute inset-0"
                  onClick={() => handleSelectOption(option)}
                />

                {icon && (
                  <div
                    className={twclass(
                      "text-txt-color-primary",
                      areEqualValues && "text-accent-primary-color",
                    )}
                  >
                    {icon}
                  </div>
                )}
                <span
                  className={twclass(
                    "text-txt-color-secondary",
                    areEqualValues && "text-accent-primary-color",
                  )}
                >
                  {displayName}
                </span>

                {availableBorderBottom && (
                  <div className="absolute bottom-0 left-0 h-[2px] w-full px-[16px]">
                    <div className="h-full w-full bg-ui-border-color" />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
