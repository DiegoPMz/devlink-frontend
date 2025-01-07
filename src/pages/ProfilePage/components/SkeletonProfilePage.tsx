import { SkeletonAppMainLayout } from "@/components/SkeletonAppMainLayout";

export const SkeletonProfilePage = () => (
  <SkeletonAppMainLayout>
    <div className="flex flex-col gap-[40px]">
      {/* Container introduction "Profile Details" */}

      <div className="flex flex-col gap-[6px]">
        <div className="h-[36px] w-[180px] animate-pulse rounded-xl bg-ui-border-color" />
        <div className="flex flex-col gap-[6px]">
          <div className="h-[20px] w-[100%] animate-pulse rounded-xl bg-ui-border-color md:w-[60%]" />
          <div className="h-[20px] w-[50%] animate-pulse rounded-xl bg-ui-border-color sm:w-[80%] md:hidden" />
        </div>
      </div>

      <div className="flex flex-col gap-[24px]">
        {/* Container Profile picture */}
        <div className="flex flex-col gap-[16px] rounded-lg bg-bg-color-secondary p-[1.25rem] md:flex-row md:items-center md:justify-between">
          <div className="h-[24px] w-[100px] animate-pulse rounded-xl bg-ui-border-color" />
          <div className="flex flex-col gap-[24px] md:w-[60%] md:flex-row md:items-center">
            <div className="aspect-square w-[193px] animate-pulse rounded-xl bg-ui-border-color" />
            <div className="h-[20px] w-[90%] animate-pulse rounded-xl bg-ui-border-color md:w-[60%]" />
          </div>
        </div>
        {/*Container User inputs  */}
        <div className="flex flex-col gap-[12px] rounded-lg bg-bg-color-secondary px-[20px] py-[24px] md:gap-[28px]">
          <div className="flex flex-col gap-[2px] md:flex-row md:items-center md:justify-between md:gap-0">
            <div className="h-[15px] w-[50px] animate-pulse rounded-xl bg-ui-border-color md:h-[24px] md:w-[100px]" />
            <div className="w-full md:w-[60%]">
              <div className="h-[48px] w-full animate-pulse rounded-xl bg-ui-border-color" />
            </div>
          </div>
          <div className="flex flex-col gap-[2px] md:flex-row md:items-center md:justify-between md:gap-0">
            <div className="h-[15px] w-[50px] animate-pulse rounded-xl bg-ui-border-color md:h-[24px] md:w-[100px]" />
            <div className="w-full md:w-[60%]">
              <div className="h-[48px] w-full animate-pulse rounded-xl bg-ui-border-color" />
            </div>
          </div>
          <div className="flex flex-col gap-[2px] md:flex-row md:items-center md:justify-between md:gap-0">
            <div className="h-[15px] w-[50px] animate-pulse rounded-xl bg-ui-border-color md:h-[24px] md:w-[80px]" />
            <div className="w-full md:w-[60%]">
              <div className="h-[48px] w-full animate-pulse rounded-xl bg-ui-border-color" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </SkeletonAppMainLayout>
);
