import { IllustrationEmpty } from "@/assets/IllustrationEmpty";
import { AppBar } from "@/components/AppBar";
import { PreviewLinks } from "@/components/PreviewLinks";
import { AppButton } from "@/components/ui/AppButton";

export const LinksPage = () => {
  return (
    <div className="relative bg-appGreyL px-[16px] md:p-[24px]">
      <div className="sticky top-0 z-50 pb-[16px] md:pb-[24px]">
        <AppBar />
      </div>

      <div className="relative h-full w-full lg:flex lg:justify-center lg:gap-[24px]">
        <section className="relative hidden min-h-full rounded-xl bg-white lg:flex lg:w-[50%] lg:justify-center lg:py-[40px] xl:py-[100px]">
          <div className="sticky top-[170px] h-fit">
            <PreviewLinks />
          </div>
        </section>
        <section className="relative flex w-full flex-col rounded-xl bg-white">
          <div className="h-full px-[24px] pb-[24px] md:px-[40px] md:pb-[40px]">
            {/* Introduction text "Customize your links" */}
            <div className="sticky top-[60px] z-40 flex flex-col rounded-md bg-white pb-[24px] pt-[24px] md:gap-[12px] md:pt-[40px]">
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
            <div className="flex flex-col rounded-xl bg-appGreyL px-[20px] py-[40px] md:gap-[40px] md:py-[100px]">
              <div>
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
                <p className="w-fit text-appGrey md:w-[488px] md:text-center">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </div>

            {/* <section className="flex flex-col gap-[24px] bg-white">
              <RegisterLinkComponent />
              <RegisterLinkComponent />
              <RegisterLinkComponent />
              <RegisterLinkComponent />
            </section> */}
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
