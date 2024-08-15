import { AppPublishLink } from "@/components/AppPublishLink";
import { AppButton } from "@/components/ui/AppButton";

export const PreviewPage = () => {
  return (
    <div className="md:before:contents-[''] relative min-h-[100dvh] bg-white md:before:absolute md:before:top-0 md:before:z-10 md:before:h-[40dvh] md:before:w-full md:before:rounded-b-3xl md:before:bg-appPurple md:before:bg-fixed md:before:bg-top">
      <section className="flex flex-col gap-[54px] pb-[24px] md:items-center">
        {/* Container Navbar */}
        <div className="z-30 md:sticky md:left-0 md:top-0 md:w-full md:p-[24px]">
          <div className="flex w-full justify-between gap-[16px] px-[24px] py-[16px] md:rounded-lg md:bg-white">
            <div className="w-full md:w-fit">
              <AppButton variant="secondary">Back to Editor</AppButton>
            </div>
            <div className="w-full md:w-fit">
              <AppButton> Share Link </AppButton>
            </div>
          </div>
        </div>

        <article className="relative flex flex-col items-center gap-[54px] md:z-20 md:h-fit md:w-fit md:rounded-2xl md:bg-white md:py-[48px] md:shadow-lg md:shadow-appBorder">
          {/* Container Text information */}
          <div className="flex w-full flex-col items-center gap-[24px]">
            <div className="aspect-square w-[104px] rounded-full bg-appPurple p-[4px]">
              <span className="block h-full w-full rounded-full bg-black object-cover object-center" />
            </div>

            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold text-appGreyD">Ben Wright</h1>
              <span className="text-appGrey">ben@example.com </span>
            </div>
          </div>

          {/* Container User Links */}
          <div className="flex flex-col gap-[16px] md:px-[56px]">
            <AppPublishLink socialMedia="youtube" link="#" />
            <AppPublishLink socialMedia="facebook" link="#" />
            <AppPublishLink socialMedia="twitch" link="#" />
          </div>
        </article>
      </section>
    </div>
  );
};
