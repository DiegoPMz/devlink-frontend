// import { IllustrationEmpty } from "@/assets/IllustrationEmpty";
import { AppBar } from "@/components/AppBar";
import { PreviewLinks } from "@/components/PreviewLinks";
import { AppButton } from "@/components/ui/AppButton";
import { AppTextField } from "@/components/ui/AppTextField";

import { HiBars2 } from "react-icons/hi2";

export const LinksPage = () => {
  return (
    <div className="relative bg-appGreyL px-[16px] md:p-[24px]">
      <div className="sticky top-0 z-50 pb-[16px] md:pb-[24px]">
        <AppBar />
      </div>

      <div className="relative w-full lg:flex lg:justify-center lg:gap-[24px]">
        <section className="sticky top-[78px] z-30 hidden h-full w-fit rounded-xl bg-white px-[20px] py-[100px] lg:block xl:px-[140px]">
          <PreviewLinks />
        </section>
        <section className="h-fit w-full rounded-xl bg-white">
          <div className="relative p-[24px] md:p-[40px]">
            {/* Introduction text "Customize your links" */}
            <div className="sticky top-[-22px] flex flex-col bg-white pb-[24px] md:gap-[12px]">
              <h1 className="text-2xl font-bold text-appGreyD md:text-[32px]">
                Customize your links
              </h1>
              <p className="pb-[30px] text-appGrey">
                Add/edit/remove links below and then share all your profiles
                with the world!
              </p>

              <AppButton variant="secondary">+ Add new link </AppButton>
            </div>
            {/* Container of principal content */}
            <div className="flex flex-col rounded-xl bg-red-400 px-[20px] py-[40px] md:gap-[40px] md:py-[100px]">
              {/* <div>
                <div className="flex justify-center md:hidden">
                  <IllustrationEmpty mobile={true} />
                </div>
                <div className="hidden md:flex md:justify-center">
                  <IllustrationEmpty />
                </div>
              </div>

              <div className="flex flex-col gap-[24px] md:items-center">
                <h2 className="text-2xl font-bold text-appGreyD md:text-center md:text-[32px]">
                  Let’s get you started
                </h2>
                <p className="w-fit bg-green-200 text-appGrey md:w-[488px] md:text-center">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div> */}

              <section>
                <div className="flex justify-between text-appGrey">
                  <div className="flex items-center gap-[8px] font-bold">
                    <HiBars2 />
                    <span>Link #1</span>
                  </div>
                  <span>remove</span>
                </div>

                <div>
                  <div>
                    <label htmlFor="">Platform</label>
                    <AppTextField />
                  </div>
                  <div>
                    <label htmlFor="">Link</label>
                    <AppTextField />
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom sticky button */}
          <div className="sticky bottom-0 w-full rounded-b-xl border-t-2 border-appBorder bg-white p-[16px] md:flex md:justify-end">
            <div className="md:hidden">
              <AppButton>Save</AppButton>
            </div>

            <div className="hidden w-[92px] md:block">
              <AppButton>Save</AppButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
