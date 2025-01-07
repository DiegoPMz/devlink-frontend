export const SkeletonAppBar = () => (
  <div className="rounded-xl bg-bg-color-primary p-[14px] md:px-[24px] md:py-[16px]">
    <div className="flex items-center justify-between">
      <div className="aspect-square w-[32px] animate-pulse rounded-xl bg-ui-border-color md:aspect-auto md:h-[36px] md:w-[180px]" />

      <div className="flex gap-[2px]">
        <div className="h-[40px] w-[121px] animate-pulse rounded-xl bg-ui-border-color md:h-[46px]" />
        <div className="h-[40px] w-[121px] animate-pulse rounded-xl bg-ui-border-color md:h-[46px]" />
      </div>

      <div className="gap-[12px] md:flex md:items-center">
        <div className="hidden h-[40px] w-[114px] animate-pulse rounded-xl bg-ui-border-color md:block" />
        <div className="aspect-square w-[28px] animate-pulse rounded-xl bg-ui-border-color md:w-[36px]" />
      </div>
    </div>
  </div>
);
