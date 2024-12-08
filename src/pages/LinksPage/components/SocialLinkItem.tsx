import { AppDropDown } from "@/components/ui/AppDropDown";
import { AppTextField } from "@/components/ui/AppTextField";
import { useStoreApp } from "@/store";
import { UserSliceType } from "@/store/userSlice";
import { ProfileLinks } from "@/types/api-response";
import { AvailableSocialMedia } from "@/types/app-social-media";
import PublishDetailsMap from "@/utilities/PublishDetailsMap";
import socialMediaPlaceholders from "@/utilities/socialMediaPlaceholders";
import { HiMiniBars2 } from "react-icons/hi2";

interface SocialLinkItemProps {
  position: number;
  link: Required<ProfileLinks>;
  removeLink: UserSliceType["user"]["removeLink"];
  onChangeLink: UserSliceType["user"]["onChangeLink"];
}

export const SocialLinkItem = ({
  position,
  link,
  removeLink,
  onChangeLink,
}: SocialLinkItemProps) => {
  const { getErrorLink } = useStoreApp((state) => state.appErrors);
  const options = Object.values(PublishDetailsMap);

  const getPlaceHolder = () => {
    return (
      socialMediaPlaceholders[link.platform as AvailableSocialMedia] ??
      undefined
    );
  };

  return (
    <div className="flex flex-col gap-[12px] rounded-lg bg-bg-color-secondary px-[20px] py-[24px] xl:px-[24px] xl:py-[28px]">
      <div className="flex justify-between text-txt-color-primary">
        <div className="flex items-center gap-[8px] font-bold">
          <HiMiniBars2 />
          <span>Link #{position + 1} </span>
        </div>
        <button
          type="button"
          formNoValidate
          className="transition-colors duration-200 ease-out hover:text-error-primary-color"
          onClick={() => removeLink(link.id)}
        >
          Remove
        </button>
      </div>
      {/*  */}
      <div className="flex flex-col gap-[12px]">
        <div>
          <label className="text-xs text-txt-color-secondary">Platform</label>
          <AppDropDown
            options={options}
            onChange={(currentOption) =>
              onChangeLink(link.id, {
                ...link,
                platform: currentOption,
              })
            }
            selected={link.platform}
          />
        </div>
        <div>
          <label className="text-xs text-txt-color-secondary">Link</label>
          <AppTextField
            placeholder={getPlaceHolder()}
            onChange={(e) =>
              onChangeLink(link.id, {
                ...link,
                url: e.target.value,
              })
            }
            value={link.url}
            error={getErrorLink(link.id)?.message.url ?? undefined}
          />
        </div>
      </div>
    </div>
  );
};
