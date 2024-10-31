import { AppPublishLink } from "@/components/AppPublishLink";
import { AvatarImage } from "@/components/AvatarImage";
import { AppLink } from "@/components/ui/AppLink";
import useProfileUpdateAnimation from "@/hooks/useProfileUpdateAnimation";
import { useStoreApp } from "@/store";
import { ArrayAvailableSocialMedia } from "@/types/social-media";
import { twclass } from "@/utilities/twclass";

export const PreviewPage = () => {
  const {
    profile_image,
    profile_file,
    profile_name,
    profile_last_name,
    profile_email,
    profile_links,
  } = useStoreApp((state) => state.user);

  const emptyAnimation = useProfileUpdateAnimation();
  const isValidName = profile_name && profile_last_name;

  return (
    <>
      <div className="relative flex min-h-dvh w-full flex-col bg-white md:items-center md:gap-[80px] md:pb-[24px] lg:gap-[120px]">
        <div className="fixed top-0 z-[5] hidden h-[357px] w-full rounded-b-3xl bg-appPurple bg-fixed md:block" />
        <div className="z-[10] min-w-full md:p-[24px]">
          <div className="flex justify-between gap-[16px] px-[24px] py-[16px] md:rounded-lg md:bg-white">
            <div className="w-full md:w-fit">
              <AppLink to={"/profile"} variant="secondary">
                Back to Editor
              </AppLink>
            </div>
            <div className="w-full md:w-fit">
              <AppLink to={"#"}> Share Link </AppLink>
            </div>
          </div>
        </div>

        <section className="z-[10] flex w-full flex-col items-center bg-white px-[56px] py-[48px] md:w-[349px] md:rounded-2xl md:shadow-lg md:shadow-appBorder">
          <AvatarImage
            imageUrl={profile_image.url ?? undefined}
            imageFile={profile_file ?? undefined}
            animation={emptyAnimation}
          />

          <div className="flex w-full flex-col items-center gap-[14px] pt-[25px]">
            {isValidName ? (
              <h1 className="w-full text-pretty break-words px-[20px] text-center text-3xl font-bold text-appGreyD">
                {profile_name} {profile_last_name}
              </h1>
            ) : (
              <span
                className={twclass(
                  "block h-[20px] min-w-[60%] rounded-full bg-appBorder md:w-[80%]",
                  emptyAnimation,
                )}
              />
            )}

            {profile_email ? (
              <span className="text-pretty break-words px-[20px] text-appGrey">
                {profile_email}
              </span>
            ) : (
              <span
                className={twclass(
                  "block h-[15px] min-w-[40%] rounded-full bg-appBorder md:w-[60%]",
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
                        "min-h-[56px] w-full rounded-lg bg-appBorder",
                        emptyAnimation,
                      )}
                    />
                  );
                }

                return (
                  <AppPublishLink
                    key={link.id}
                    link="#"
                    socialMedia={isValidPlatform}
                  />
                );
              })}

            {profile_links.length === 0 &&
              new Array(4)
                .fill(0)
                .map((_, index) => (
                  <span
                    key={index}
                    className={twclass(
                      "min-h-[56px] w-full rounded-lg bg-appBorder",
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
