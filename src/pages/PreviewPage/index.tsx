import { AppPublishLink } from "@/components/AppPublishLink";
import { AvatarImage } from "@/components/AvatarImage";
import { AppButton } from "@/components/ui/AppButton";
import { AppLink } from "@/components/ui/AppLink";
import useProfileUpdateAnimation from "@/hooks/useProfileUpdateAnimation";
import { useStoreApp } from "@/store";
import { ArrayAvailableSocialMedia } from "@/types/social-media";
import { twclass } from "@/utilities/twclass";

const PreviewPage = () => {
  const {
    profile_image,
    profile_file,
    profile_name,
    profile_last_name,
    profile_email,
    profile_links,
    isSubmissionAllowed,
  } = useStoreApp((state) => state.user);

  const emptyAnimation = useProfileUpdateAnimation();
  const isValidName = profile_name && profile_last_name;

  return (
    <>
      <div className="relative flex min-h-dvh w-full flex-col bg-bg-color-primary md:items-center md:gap-[80px] md:pb-[24px] lg:gap-[120px]">
        <div className="fixed top-0 z-[5] hidden h-[357px] w-full rounded-b-3xl bg-accent-primary-color bg-fixed md:block" />
        <div className="z-[10] min-w-full md:p-[24px]">
          <div className="flex justify-between gap-[16px] px-[24px] py-[16px] md:rounded-lg md:bg-bg-color-primary">
            <div className="w-full md:w-fit">
              <AppLink to={"/profile"} variant="primary">
                Back to Editor
              </AppLink>
            </div>
            <div className="w-full md:w-fit">
              <AppButton
                variant="secondary"
                disabled={isSubmissionAllowed() === false}
              >
                Share Link
              </AppButton>
            </div>
          </div>
        </div>

        <section className="z-[10] flex w-full flex-col items-center bg-bg-color-primary px-[56px] py-[48px] md:w-[349px] md:rounded-2xl md:shadow-md md:shadow-ui-border-color">
          <AvatarImage
            imageUrl={profile_image.url ?? undefined}
            imageFile={profile_file ?? undefined}
            animation={emptyAnimation}
            size="lg"
          />

          <div className="flex w-full flex-col items-center gap-[14px] pt-[25px]">
            {isValidName ? (
              <h1 className="w-full text-pretty break-words px-[20px] text-center text-3xl font-bold text-txt-color-secondary">
                {profile_name} {profile_last_name}
              </h1>
            ) : (
              <span
                className={twclass(
                  "block h-[20px] min-w-[60%] rounded-full bg-ui-border-color md:w-[80%]",
                  emptyAnimation,
                )}
              />
            )}

            {profile_email ? (
              <span className="text-pretty break-words px-[20px] text-txt-color-primary">
                {profile_email}
              </span>
            ) : (
              <span
                className={twclass(
                  "bg-ui-border-colo block h-[15px] min-w-[40%] rounded-full md:w-[60%]",
                  emptyAnimation,
                )}
              />
            )}
          </div>

          <div className="mt-[44px] flex w-full flex-col gap-[16px]">
            {profile_links.length >= 1 &&
              profile_links.map((link) => {
                const isValidPlatform = ArrayAvailableSocialMedia.find(
                  (socialMedia) => socialMedia === link.platform,
                );

                if (!isValidPlatform) {
                  return (
                    <span
                      key={link.id}
                      className={twclass(
                        "min-h-[56px] w-full rounded-lg bg-ui-border-color",
                        emptyAnimation,
                      )}
                    />
                  );
                }

                return (
                  <AppPublishLink key={link.id} socialMedia={isValidPlatform} />
                );
              })}

            {profile_links.length === 0 &&
              new Array(4)
                .fill(0)
                .map((_, index) => (
                  <span
                    key={index}
                    className={twclass(
                      "min-h-[56px] w-full rounded-lg bg-ui-border-color",
                      emptyAnimation,
                    )}
                  />
                ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default PreviewPage;
