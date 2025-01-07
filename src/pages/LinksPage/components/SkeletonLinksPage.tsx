import { SkeletonAppMainLayout } from "@/components/SkeletonAppMainLayout";

export const SkeletonLinksPage = () => (
  <SkeletonAppMainLayout>
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[12px] rounded-md bg-bg-color-primary">
        <div className="h-[36px] w-[180px] animate-pulse rounded-xl bg-ui-border-color" />
        <div className="flex flex-col gap-[6px] pb-[30px]">
          <div className="h-[20px] w-[100%] animate-pulse rounded-xl bg-ui-border-color md:w-[60%]" />
          <div className="h-[20px] w-[90%] animate-pulse rounded-xl bg-ui-border-color sm:w-[80%] md:hidden" />
        </div>

        <div className="h-[40px] w-full animate-pulse rounded-xl bg-ui-border-color" />
      </div>

      {/* Content empty links */}
      <div className="h-[417px] w-full animate-pulse rounded-xl bg-ui-border-color md:h-[449px]"></div>
    </div>
  </SkeletonAppMainLayout>
);
