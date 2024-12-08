import { IllustrationPhone } from "@/assets/IllustrationPhone";
import useProfileUpdateAnimation from "@/hooks/useProfileUpdateAnimation";
import { useStoreApp } from "@/store";
import { ArrayAvailableSocialMedia } from "@/types/app-social-media";
import { twclass } from "@/utilities/twclass";
import { AppPublishLink } from "./AppPublishLink";
import { AvatarImage } from "./AvatarImage";

export const PreviewLinks = () => {
  const {
    profile_name,
    profile_last_name,
    profile_email,
    profile_links,
    profile_image,
    profile_file,
  } = useStoreApp((state) => state.user);

  const emptyAnimation = useProfileUpdateAnimation();
  const isValidName = profile_name && profile_last_name;

  return (
    <div className="relative flex h-[632px] w-[308px] items-center justify-center px-[13px] py-[44px]">
      <div className="absolute z-10 rounded-[56px]">
        <IllustrationPhone />
      </div>
      <div className="z-20 flex h-full w-full max-w-full flex-col rounded-lg bg-bg-color-primary pt-[10px]">
        <div className="flex justify-center pt-[10px]">
          <AvatarImage
            imageUrl={profile_image.url ?? undefined}
            imageFile={profile_file ?? undefined}
            animation={emptyAnimation}
          />
        </div>

        <div className="flex w-full max-w-full flex-col items-center gap-[12px] pt-[25px]">
          {isValidName ? (
            <span className="w-full text-pretty break-words text-center font-semibold leading-none text-txt-color-secondary">
              {`${profile_name} ${profile_last_name}`}
            </span>
          ) : (
            <span
              className={twclass(
                "h-[16px] w-[160px] rounded-[12px] bg-ui-border-color",
                emptyAnimation,
              )}
            />
          )}

          {profile_email ? (
            <span className="w-full text-pretty break-words text-center text-sm leading-none text-txt-color-primary">
              {profile_email}
            </span>
          ) : (
            <span
              className={twclass(
                "h-[8px] w-[72px] rounded-[12px] bg-ui-border-color",
                emptyAnimation,
              )}
            />
          )}
        </div>

        <div className="scrollbar-custom mt-[56px] flex h-[310px] w-full flex-col gap-[19px] overflow-y-auto px-[21px]">
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
                      "min-h-[45px] w-full rounded-lg bg-ui-border-color",
                      emptyAnimation,
                    )}
                  />
                );
              }

              return (
                <AppPublishLink
                  key={link.id}
                  size="sm"
                  socialMedia={isValidPlatform}
                />
              );
            })}

          {profile_links.length === 0 &&
            new Array(5)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  className={twclass(
                    "min-h-[45px] w-full rounded-lg bg-ui-border-color",
                    emptyAnimation,
                  )}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
