import { AppBar } from "@/components/AppBar";
import { PreviewLinks } from "@/components/PreviewLinks";
import { AppButton } from "@/components/ui/AppButton";
import { AppLink } from "@/components/ui/AppLink";
import { useStoreApp } from "@/store";
import { PiEyeBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export const AppMainLayout = ({ children }: React.PropsWithChildren) => {
  const { isSubmissionAllowed, handleSubmitProfile } = useStoreApp(
    (state) => state.user,
  );

  const navigate = useNavigate();
  const handleShareProfile = async () => {
    const submitResponse = await handleSubmitProfile();
    if (submitResponse.hasError) return;

    return navigate(`/template/${submitResponse.templateId}`);
  };

  return (
    <div className="flex h-dvh flex-col bg-bg-color-secondary xl:gap-[24px] xl:p-[24px]">
      <AppBar />

      <div className="relative flex h-full w-full overflow-y-hidden xl:gap-[24px]">
        <section className="sticky left-0 top-0 hidden w-[60%] max-w-[560px] items-start justify-center rounded-lg bg-bg-color-primary pt-[40px] xl:flex">
          <PreviewLinks />
        </section>

        <section className="items flex h-full w-full flex-col bg-bg-color-secondary p-[16px] md:p-[24px] xl:p-0">
          <div className="scrollbar-custom h-full overflow-y-auto rounded-t-lg bg-bg-color-primary p-[24px] md:p-[40px]">
            {children}
          </div>
          {/* Container button Save */}
          <div className="h-fit rounded-b-lg bg-bg-color-primary md:flex md:items-end">
            <div className="bottom-0 left-0 flex w-full gap-[20px] border-t-2 border-ui-border-color p-[16px] md:flex md:justify-end md:p-[24px] md:pr-[40px]">
              <div className="w-full md:w-[91px] xl:h-fit">
                <AppButton
                  disabled={isSubmissionAllowed() === false}
                  onClick={handleShareProfile}
                >
                  Save
                </AppButton>
              </div>

              <div className="h-[42px] w-[52px] md:hidden">
                <AppLink variant="secondary" to={"/preview"}>
                  <PiEyeBold className="min-w-min" />
                </AppLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
