export const SkeletonLoginPage = () => (
  <div className="bg-appCustom h-[100dvh] p-[32px] md:flex md:flex-col md:items-center md:justify-center md:gap-[32px]">
    <div className="h-[40px] w-[183px] animate-pulse rounded-xl bg-ui-border-color" />
    <div className="flex flex-col gap-[30px] pt-[60px] md:w-[476px] md:rounded-xl md:bg-white md:p-[34px]">
      <div className="flex flex-col gap-[12px]">
        <div className="h-[32px] w-[60px] animate-pulse rounded-xl bg-ui-border-color" />
        <div className="flex h-fit w-full flex-col gap-[4px]">
          <div className="h-[20px] w-full animate-pulse rounded-xl bg-ui-border-color text-transparent sm:w-[90%]" />
          <div className="h-[20px] w-[20%] animate-pulse rounded-xl bg-ui-border-color text-transparent sm:hidden" />
        </div>
      </div>
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[3px]">
          <div className="h-[15px] w-[50px] animate-pulse rounded-xl bg-ui-border-color" />
          <div className="h-[48px] w-full animate-pulse rounded-xl bg-ui-border-color" />
        </div>

        <div className="flex flex-col gap-[3px]">
          <div className="h-[15px] w-[50px] animate-pulse rounded-xl bg-ui-border-color" />
          <div className="h-[48px] w-full animate-pulse rounded-xl bg-ui-border-color" />
        </div>

        <div className="h-[40px] w-full animate-pulse rounded-xl bg-ui-border-color" />

        <div className="flex flex-col items-center gap-[4px] md:flex-row md:justify-center">
          <div className="h-[18px] w-[170px] animate-pulse rounded-xl bg-ui-border-color" />
          <div className="h-[18px] w-[112px] animate-pulse rounded-xl bg-ui-border-color" />
        </div>
      </div>
    </div>
  </div>
);
