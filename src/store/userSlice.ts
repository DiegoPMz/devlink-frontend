import generateLinkPopupMessage from "@/components/generateLinkPopupMessage";
import generateLinkPopupToastIcon from "@/components/generateLinkPopupToastIcon";
import { profileUpdateSchemaType } from "@/schemas/app-profile-schemas";
import { apiUpdateTemplateService } from "@/service/api-service";
import { getPersistedTheme, ThemeAppValues } from "@/service/persist-theme";
import { getPersistedState } from "@/service/persist-user";
import { ProfileImage, ProfileLinks } from "@/types/api-response";
import { AvailableSocialMedia } from "@/types/app-social-media";
import handleApiWithToast from "@/utilities/handleApiWithToast";
import PublishDetailsMap from "@/utilities/PublishDetailsMap";
import toast from "react-hot-toast";
import { TbLinkOff, TbLinkPlus } from "react-icons/tb";
import { StateCreator } from "zustand";
import { AuthSliceType } from "./AuthSlice";
import { ErrorSliceType } from "./errorSlice";

export interface UserSliceProfile {
  id: string | null;
  credentials: string | null;
  profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_image: ProfileImage;
  profile_links: ProfileLinks[] | [];
  profile_template: string | null;
  profile_file: null | File;
  theme: ThemeAppValues;
}
type ProfileStateSomeKeys = keyof Pick<
  UserSliceProfile,
  "profile_email" | "profile_name" | "profile_last_name" | "profile_file"
>;
type ProfileStateSomeValues = Pick<
  UserSliceProfile,
  ProfileStateSomeKeys
>[ProfileStateSomeKeys];

interface SubmitProfileMethodResponse {
  isError: boolean;
  updated: boolean;
  templateId: string | null;
}

interface UserSliceMethods {
  handleChangeTheme: (theme: ThemeAppValues) => void;
  generateLink: () => void;
  removeLink: (id: string) => void;
  onChangeLink: (
    id: ProfileLinks["id"],
    value: Omit<ProfileLinks, "id">,
  ) => void;
  onChangeDetails: (
    inputName: ProfileStateSomeKeys,
    value: ProfileStateSomeValues,
  ) => void;

  setProfileLinks: (links: ProfileLinks[]) => void;
  handleLinkSortedToast: (linkId: ProfileLinks["id"]) => void;

  isSubmissionAllowed: () => boolean;
  handleSubmitProfile: () => Promise<SubmitProfileMethodResponse>;
}
export interface UserSliceType {
  user: UserSliceProfile & UserSliceMethods;
}

type UserSliceBuildType = StateCreator<
  UserSliceType & ErrorSliceType & AuthSliceType,
  [["zustand/devtools", never]],
  [],
  UserSliceType
>;

export const userSlice: UserSliceBuildType = (set, get) => ({
  user: {
    ...getPersistedState(),
    profile_file: null,
    theme: getPersistedTheme() ?? "default-theme",
    handleChangeTheme: (theme) => {
      set((state) => ({ user: { ...state.user, theme } }));
    },

    generateLink: () => {
      const UUID = crypto.randomUUID();
      const newLink: ProfileLinks = {
        id: UUID,
        platform: "",
        url: "",
      };

      set((state) => ({
        user: {
          ...state.user,
          profile_links: [...state.user.profile_links, newLink],
        },
      }));

      const links = get().user.profile_links;
      const linkPosition = links.findIndex((item) => item.id === newLink.id);

      toast(
        generateLinkPopupMessage({
          bold: "Link added",
          message: linkPosition ? `on position #${linkPosition + 1}` : "🤷‍♂️",
        }),

        {
          icon: TbLinkPlus({ className: "text-accent-primary-color" }),
        },
      );
    },
    removeLink: (id) => {
      const allUserLinks = get().user.profile_links;
      const updatedLinks = allUserLinks.filter((link) => link.id !== id);

      set((state) => ({
        user: {
          ...state.user,
          profile_links: updatedLinks,
        },
      }));

      const linkPosition = allUserLinks.findIndex((item) => item.id === id);
      toast(
        generateLinkPopupMessage({
          bold: "Link removed",
          message: `on position #${linkPosition + 1}`,
        }),

        {
          icon: TbLinkOff({ className: "text-accent-primary-color" }),
        },
      );

      get().appErrors.clearInvalidLinkErrors(updatedLinks);
    },
    onChangeLink: (id, value) => {
      const userLinks = get().user.profile_links;
      const currentLinkModified = userLinks.find((link) => link.id === id);

      if (!currentLinkModified)
        throw new Error("Invalid id. Must be one id from profile_links");

      const updateLink = userLinks.map((link) =>
        link.id === id
          ? { ...link, platform: value.platform, url: value.url }
          : link,
      );
      set((state) => ({
        user: { ...state.user, profile_links: updateLink },
      }));

      get().appErrors.validateLink({
        id,
        platform: value.platform,
        url: value.url,
      });
    },
    setProfileLinks(links) {
      set((state) => ({ user: { ...state.user, profile_links: [...links] } }));
    },
    handleLinkSortedToast: (linkId) => {
      const links = get().user.profile_links;

      const linkModified = links.find((item) => item.id === linkId);
      const linkPosition = links.findIndex((item) => item.id === linkId);

      const platformDetails = Object.values(PublishDetailsMap).find(
        (detail) => detail.value === linkModified?.platform,
      );

      if (!linkModified) return;

      toast(
        generateLinkPopupMessage({
          bold: platformDetails?.displayName ?? "Empty link",
          message: `updated to position #${linkPosition + 1}`,
        }),
        {
          icon: generateLinkPopupToastIcon(platformDetails),
        },
      );
    },

    onChangeDetails: (inputName, value) => {
      const captureValues = (stateName: typeof inputName) => {
        set((state) => ({
          user: { ...state.user, [stateName]: value },
        }));
      };

      value === null ? captureValues("profile_file") : captureValues(inputName);

      get().appErrors.validateProfile(inputName, value);
    },

    isSubmissionAllowed: () => {
      const {
        profile_name,
        profile_last_name,
        profile_email,
        profile_image,
        profile_file,
        profile_links,
      } = get().user;

      const hasInvalidProfileDetails =
        !profile_name || !profile_last_name || !profile_email;

      const isMissingUserImage =
        Object.values(profile_image).some((i) => !i) && !profile_file;

      const hasInvalidUserLinks =
        profile_links.length === 0 ||
        profile_links.some((link) => !link.platform || !link.url);

      const hasAppErrors = get().appErrors.areErrors();

      return (
        !hasInvalidProfileDetails &&
        !isMissingUserImage &&
        !hasInvalidUserLinks &&
        !hasAppErrors
      );
    },
    handleSubmitProfile: async () => {
      const {
        profile_email,
        profile_name,
        profile_last_name,
        profile_links,
        profile_file,
        profile_image,
      } = get().user;

      const appErrors = get().appErrors.validateAllProfileDetails({
        profile_email,
        profile_name,
        profile_last_name,
        profile_links,
        profile_file,
        profile_image,
      } as profileUpdateSchemaType);

      if (appErrors) {
        toast.error("Please check and fix the errors 😊");

        return {
          isError: true,
          templateId: null,
          updated: false,
        };
      }

      const response = await handleApiWithToast(
        apiUpdateTemplateService(
          {
            profile_email,
            profile_last_name,
            profile_name,
            profile_links: [
              ...profile_links.map((link) => ({
                platform: link.platform as AvailableSocialMedia,
                url: link.url,
              })),
            ],
          },

          profile_file ?? undefined,
        ),
        {
          loading: "Saving changes...",
          error: "Couldn’t save changes",
          success: "Profile saved!",
        },
      );

      if (!response.data || response.error.isError) {
        return {
          isError: true,
          updated: false,
          templateId: null,
        };
      }

      return {
        isError: false,
        updated: true,
        templateId: response.data.profile_template,
      };
    },
  },
});
