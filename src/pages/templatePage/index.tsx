import { LogoDevlinksLarge } from "@/assets/LogoDevlinksLarge";
import { LogoDevlinksSmall } from "@/assets/LogoDevlinksSmall";
import { AppPublishLink } from "@/components/AppPublishLink";
import { AvatarImage } from "@/components/AvatarImage";
import { useUserTemplate } from "@/hooks/useUserTemplate";
import { ArrayAvailableSocialMedia } from "@/types/app-social-media";
import { TEMPLATE_BG_CLASSES } from "@/types/app-template-bg";
import { APP_THEME_CLASSES } from "@/types/app-theme";
import { twclass } from "@/utilities/twclass";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const TemplatePage = () => {
  const { template, error, isPending } = useUserTemplate();

  useEffect(() => {
    document.body.style.maxWidth = "100dvw";
    document.body.style.maxHeight = "100dvh";
    document.body.style.overflow = "hidden";

    if (!error.isError) document.body.removeAttribute("style");

    return () => document.body.removeAttribute("style");
  }, [error]);

  return (
    <>
      {isPending && (
        <div
          className={twclass(
            "default-theme",
            "fixed left-0 top-0 z-[100] h-full w-full backdrop-blur-sm",
          )}
        />
      )}
      {error.isError && (
        <div
          className={twclass(
            "default-theme",
            "fixed left-0 top-0 z-[100] h-full w-full backdrop-blur-sm",
          )}
        />
      )}
      {error.isError && (
        <span
          className={twclass(
            "default-theme",
            "motion-preset-slide-down fixed left-0 right-0 top-[100px] z-[100] m-auto h-fit w-[80%] rounded-lg bg-bg-color-secondary px-[12px] py-[8px] text-center text-xl font-medium text-txt-color-secondary ring-1 ring-ui-border-color md:w-fit md:max-w-full md:p-[18px]",
          )}
        >
          {error.cause}
        </span>
      )}

      <div
        className={twclass(
          template?.theme ?? APP_THEME_CLASSES[0],
          "relative flex min-h-dvh w-full flex-col bg-bg-color-primary md:items-center md:gap-[80px] md:pb-[24px] lg:gap-[120px]",
        )}
      >
        <div
          className={twclass(
            template?.template_bg ?? TEMPLATE_BG_CLASSES[0],
            "fixed top-0 z-[5] hidden h-[400px] w-full rounded-b-3xl md:block",
          )}
        />
        <div className="top-0 z-[200] w-full px-[16px] pt-[16px] md:sticky md:px-[24px] md:pt-[24px]">
          <div className="md:hidden">
            <Link
              to={"/"}
              className="block w-fit rounded-full bg-accent-secondary-color p-[6px] ring-1 ring-ui-border-color"
            >
              <LogoDevlinksSmall />
            </Link>
          </div>
          <div className="hidden md:block">
            <Link
              to={"/"}
              className="block w-fit scale-[.8] rounded-2xl bg-bg-color-primary p-[16px] ring-1 ring-ui-border-color"
            >
              <LogoDevlinksLarge />
            </Link>
          </div>
        </div>

        <section className="z-[10] flex w-full flex-col items-center bg-bg-color-primary px-[56px] py-[30px] md:w-[380px] md:rounded-2xl md:py-[48px] md:shadow-md md:shadow-ui-border-color">
          <AvatarImage imageUrl={template?.profile_image.url} size="lg" />

          <div className="flex w-full flex-col items-center gap-[14px] pt-[25px]">
            {isPending || error.isError ? (
              <span
                className={twclass(
                  "block h-[20px] min-w-[60%] rounded-full bg-ui-border-color md:w-[80%]",
                  !error.isError && isPending && "animate-pulse",
                )}
              />
            ) : (
              <h1 className="w-full text-pretty break-words px-[20px] text-center text-3xl font-bold text-txt-color-secondary">
                {template?.profile_name} {template?.profile_last_name}
              </h1>
            )}
            {isPending || error.isError ? (
              <span
                className={twclass(
                  "block h-[15px] min-w-[40%] rounded-full bg-ui-border-color md:w-[60%]",
                  !error.isError && isPending && "animate-pulse",
                )}
              />
            ) : (
              <span className="text-pretty break-words px-[20px] text-txt-color-primary">
                {template?.profile_email}
              </span>
            )}
          </div>

          <div className="mt-[44px] flex w-full flex-col gap-[16px]">
            {isPending || error.isError ? (
              <>
                {new Array(4).fill(0).map((_, index) => (
                  <span
                    key={index}
                    className={twclass(
                      "min-h-[56px] w-full rounded-lg bg-ui-border-color",
                      !error.isError && isPending && "animate-pulse",
                    )}
                  />
                ))}
              </>
            ) : (
              <>
                {template?.profile_links.map((link) => {
                  const isValidPlatform = ArrayAvailableSocialMedia.find(
                    (socialMedia) => socialMedia === link.platform,
                  );

                  return (
                    <AppPublishLink
                      key={link.id}
                      link={link.url}
                      socialMedia={isValidPlatform ?? "x"}
                    />
                  );
                })}
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default TemplatePage;
