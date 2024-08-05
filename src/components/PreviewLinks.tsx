import { IllustrationPhone } from "@/assets/IllustrationPhone";

export const PreviewLinks = () => {
  return (
    <div className="bg-rw">
      <div className="relative w-fit">
        <div className="rounded-[56px] bg-white invert-0">
          <IllustrationPhone />
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[611px] w-[285px] rounded-[45px]">
          <div className="flex h-full animate-pulse flex-col items-center px-[24px] py-[54px]">
            <span className="aspect-square w-[96px] rounded-full bg-appBorder" />
            <span className="mt-[24px] h-[16px] w-[160px] rounded-[12px] bg-appBorder" />
            <span className="mt-[13px] h-[8px] w-[72px] rounded-[12px] bg-appBorder" />

            <section className="absolute bottom-[44px] flex h-[300px] w-[237px] flex-col gap-[20px] overflow-y-auto">
              <span className="min-h-[44px] w-full rounded-lg bg-appBorder" />
              <span className="min-h-[44px] w-full rounded-lg bg-appBorder" />
              <span className="min-h-[44px] w-full rounded-lg bg-appBorder" />
              <span className="min-h-[44px] w-full rounded-lg bg-appBorder" />
              <span className="min-h-[44px] w-full rounded-lg bg-appBorder" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
