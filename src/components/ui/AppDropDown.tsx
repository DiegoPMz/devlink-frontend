import { twclass } from "@/utilities/twclass";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface OptionType {
  label: React.ReactNode;
  value: string;
}
type OptionsArrayType = OptionType[];

interface AppDropDownProps {
  options: OptionsArrayType;
}

export const AppDropDown = ({ options }: AppDropDownProps) => {
  const [optionValue, setOptionValue] = useState<string>("");
  const [labelSelected, setLabelSelected] = useState<
    OptionType["label"] | null
  >();
  const [isActive, setIsActive] = useState(false);

  function handleSelectCurrentOption(
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    reactNode: React.ReactNode,
  ) {
    setOptionValue(e.currentTarget.value);
    setLabelSelected(reactNode);
    setIsActive(false);

    // onChange(newValue); // Actualiza el valor en react-hook-form
  }

  const AppDropDownRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        AppDropDownRef.current &&
        !AppDropDownRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };

    const bodyElement = document.querySelector("body");
    bodyElement?.addEventListener("click", handleClickOutside);

    return () => {
      bodyElement?.removeEventListener("click", handleClickOutside);
    };
  }, [isActive]);

  const areValidOptions = options && options.length > 0;

  return (
    <div className="w-[300px] p-10">
      <section
        ref={AppDropDownRef}
        id="custom-drop"
        className={twclass(
          "relative flex h-[40px] min-w-[255px] items-center justify-between rounded-md bg-white text-appGreyD ring-1 ring-appBorder",
          isActive && "shadow-app ring-appPurple",
        )}
      >
        <button
          onClick={() => setIsActive(!isActive)}
          type="button"
          className="h-full w-full"
        />
        {/* This input is not visible */}
        {/* <input
          type="hidden"
          value={optionValue}
          onChange={(e) => {
            setOptionValue(e.currentTarget.value);
          }}
        /> */}
        {/* Her is where the current option its showed */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-[12px] text-appGreyD">
          <div>{labelSelected && labelSelected}</div>
          <div
            className={twclass(
              "h-fit w-fit text-appPurple transition-transform duration-[200ms] ease-custom-ease",
              isActive && "rotate-[180deg]",
            )}
          >
            <IoIosArrowUp />
          </div>
        </div>

        {/* Drop menu  */}
        {areValidOptions && (
          <>
            {isActive && (
              <div className="absolute left-0 top-[125%] flex h-fit w-full flex-col rounded-md bg-white text-appGreyD">
                {options.map((op, index) =>
                  op.value === optionValue ? (
                    <OptionComponent
                      key={op.value}
                      optionsLength={options.length}
                      selectOption={handleSelectCurrentOption}
                      option={op}
                      position={index}
                      className="text-appPurple"
                    >
                      <span className="text-appPurple">(Selected)</span>
                    </OptionComponent>
                  ) : (
                    <OptionComponent
                      key={op.value}
                      optionsLength={options.length}
                      selectOption={handleSelectCurrentOption}
                      option={op}
                      position={index}
                    />
                  ),
                )}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

// Component used above
interface OptionComponentProps {
  children?: React.ReactNode;
  className?: string;
  optionsLength: number;
  option: OptionType;
  position: number;
  selectOption: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    reactNode: React.ReactNode,
  ) => void;
}

function OptionComponent({
  optionsLength,
  option,
  position,
  selectOption,
  className = "",
  children,
}: OptionComponentProps) {
  return (
    <div key={option.value} className="relative">
      <input
        className="w-full cursor-pointer px-[16px] py-[12px] opacity-0"
        type="button"
        value={option.value}
        onClick={(e) => selectOption(e, option.label)}
      />

      <div
        className={twclass(
          "pointer-events-none absolute inset-0 flex items-center gap-[2px] px-[16px] text-appGreyD",
          className,
          {
            ["border-b-2 border-appBorder"]: position !== optionsLength - 1,
          },
        )}
      >
        {option.label}

        {children}
      </div>
    </div>
  );
}
