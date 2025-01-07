import { SkeletonAppBar } from "./SkeletonAppBar";

export const SkeletonAppMainLayout = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className="flex h-dvh flex-col bg-bg-color-secondary xl:gap-[24px] xl:p-[24px]">
      <SkeletonAppBar />

      <div className="relative flex h-full w-full overflow-y-hidden xl:gap-[24px]">
        {/* skeleton phone mockup  */}
        <section className="sticky left-0 top-0 hidden w-[60%] max-w-[560px] items-start justify-center rounded-lg bg-bg-color-primary pt-[40px] xl:flex">
          <div className="flex h-[630px] w-[306px] flex-col items-center rounded-[50px] bg-bg-color-secondary px-[21px] pb-[40px] pt-[80px]">
            <div className="aspect-square w-[96px] animate-pulse rounded-full bg-ui-border-color" />
            <div className="flex flex-col items-center gap-[12px] pt-[25px]">
              <div
                className={
                  "h-[16px] w-[160px] animate-pulse rounded-[12px] bg-ui-border-color"
                }
              />
              <div
                className={
                  "h-[8px] w-[72px] animate-pulse rounded-[12px] bg-ui-border-color"
                }
              />
            </div>
            <div className="flex h-full w-full flex-col justify-between pt-[56px]">
              {new Array(5).fill(0).map((_, index) => (
                <span
                  key={index}
                  className={
                    "min-h-[45px] w-full animate-pulse rounded-lg bg-ui-border-color"
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* main skeleton content */}
        <div className="items flex h-full w-full flex-col bg-bg-color-secondary p-[16px] md:p-[24px] xl:p-0">
          <div className="scrollbar-custom h-full overflow-y-hidden rounded-t-lg bg-bg-color-primary p-[24px] md:p-[40px]">
            {children}
          </div>

          <div className="h-fit rounded-b-lg bg-bg-color-primary md:flex md:items-end">
            <div className="bottom-0 left-0 flex w-full gap-[20px] border-t-2 border-ui-border-color p-[16px] md:flex md:justify-end md:p-[24px] md:pr-[40px]">
              <div className="w-full md:w-[91px] xl:h-fit">
                <div className="h-[40px] w-full animate-pulse rounded-xl bg-ui-border-color" />
              </div>

              <div className="h-[42px] min-w-[52px] md:hidden">
                <div className="h-[40px] w-full animate-pulse rounded-xl bg-ui-border-color" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
