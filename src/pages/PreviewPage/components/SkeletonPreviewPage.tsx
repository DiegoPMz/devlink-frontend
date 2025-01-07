export const SkeletonPreviewPage = () => (
  <div className="relative flex min-h-dvh w-full flex-col bg-bg-color-primary md:items-center md:gap-[80px] md:pb-[24px] lg:gap-[120px]">
    <div
      className={
        "fixed top-0 z-[5] hidden h-[400px] w-full animate-pulse rounded-b-3xl bg-gray-200 md:block"
      }
    />

    <div className="z-[10] min-w-full md:p-[24px]">
      <div className="flex justify-between gap-[16px] px-[24px] py-[16px] md:rounded-lg md:bg-bg-color-primary">
        <div className="w-full md:w-fit">
          <div className="h-[40px] w-full animate-pulse rounded-xl bg-ui-border-color md:w-[149px]" />
        </div>
        <div className="w-full md:w-fit">
          <div className="h-[40px] w-full animate-pulse rounded-xl bg-ui-border-color md:w-[126px]" />
        </div>
      </div>
    </div>

    <div
      className={
        "fixed right-[24px] top-[100px] z-[20] aspect-square h-[50px] animate-pulse rounded-xl bg-ui-border-color md:top-[200px] lg:h-[90px]"
      }
    ></div>

    <div className="z-[10] flex w-full flex-col items-center bg-bg-color-primary px-[56px] py-[48px] md:w-[380px] md:rounded-2xl md:shadow-md md:shadow-ui-border-color">
      <div className="aspect-square w-[108px] animate-pulse rounded-full bg-ui-border-color" />

      <div className="flex w-full flex-col items-center gap-[14px] pt-[25px]">
        <div
          className={
            "block h-[20px] min-w-[60%] animate-pulse rounded-full bg-ui-border-color md:w-[80%]"
          }
        />

        <div
          className={
            "bg-ui-border-colo block h-[15px] min-w-[40%] animate-pulse rounded-full md:w-[60%]"
          }
        />
      </div>

      <div className="mt-[44px] flex w-full flex-col gap-[16px]">
        {new Array(4).fill(0).map((_, index) => (
          <span
            key={index}
            className={
              "min-h-[56px] w-full animate-pulse rounded-lg bg-ui-border-color"
            }
          />
        ))}
      </div>
    </div>
  </div>
);
