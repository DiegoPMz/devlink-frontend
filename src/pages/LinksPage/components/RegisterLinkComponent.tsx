import { AppDropDown } from "@/components/ui/AppDropDown";
import { AppTextField } from "@/components/ui/AppTextField";
import { HiBars2 } from "react-icons/hi2";

export const RegisterLinkComponent = () => {
  return (
    <div className="flex flex-col gap-[12px] rounded-lg bg-appGreyL p-[20px]">
      <article className="flex justify-between text-appGrey">
        <div className="flex items-center gap-[8px] font-bold">
          <HiBars2 />
          <span>Link #1</span>
        </div>
        <button
          type="button"
          className="transition-colors duration-200 ease-out hover:text-appRed"
        >
          Remove
        </button>
      </article>
      {/*  */}
      <article className="flex flex-col gap-[12px]">
        <div>
          <label className="text-xs text-appGreyD" htmlFor="">
            Platform
          </label>
          <AppDropDown options={[]} />
        </div>
        <div>
          <label className="text-xs text-appGreyD" htmlFor="">
            Link
          </label>
          <AppTextField />
        </div>
      </article>
    </div>
  );
};
