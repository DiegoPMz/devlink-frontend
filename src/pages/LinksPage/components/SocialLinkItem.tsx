import { SocialMediaCollection } from "@/components/SocialMediaCollection";
import { AppDropDown } from "@/components/ui/AppDropDown";
import { AppTextField } from "@/components/ui/AppTextField";
import { UserSliceType } from "@/store/userSlice";
import { ProfileLinks } from "@/types/api-response";
import { AvailableSocialMedia } from "@/types/social-media";
import { HiBars2 } from "react-icons/hi2";

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
  return (
    <div className="flex flex-col gap-[12px] rounded-lg bg-appGreyL p-[20px]">
      <article className="flex justify-between text-appGrey">
        <div className="flex items-center gap-[8px] font-bold">
          <HiBars2 />
          <span>Link #{position + 1} </span>
        </div>
        <button
          type="button"
          formNoValidate
          className="transition-colors duration-200 ease-out hover:text-appRed"
          onClick={() => removeLink(link.id)}
        >
          Remove
        </button>
      </article>
      {/*  */}
      <article className="flex flex-col gap-[12px]">
        <div>
          <label className="text-xs text-appGreyD" htmlFor="">
            Platform
          </label>
          <AppDropDown
            options={SocialMediaCollection}
            onChange={(e) =>
              onChangeLink(link.id, {
                ...link,
                platform: e as AvailableSocialMedia,
              })
            }
            selected={link.platform}
          />
        </div>
        <div>
          <label className="text-xs text-appGreyD" htmlFor="">
            Link
          </label>
          <AppTextField
            onChange={(e) =>
              onChangeLink(link.id, {
                ...link,
                url: e.target.value,
              })
            }
            value={link.url}
          />
        </div>
      </article>
    </div>
  );
};
