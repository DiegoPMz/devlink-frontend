import generateLinkPopupMessage from "@/components/generateLinkPopupMessage";
import generateLinkPopupToastIcon from "@/components/generateLinkPopupToastIcon";
import { apiUpdateTemplateService } from "@/service/api-service";
import { getPersistedState } from "@/service/persist-user";
import { Credentials, ProfileImage, ProfileLinks } from "@/types/api-response";
import { AvailableSocialMedia } from "@/types/app-social-media";
import { TemplateBgTypes } from "@/types/app-template-bg";
import { ThemeAppTypes } from "@/types/app-theme";
import handleApiWithToast from "@/utilities/handleApiWithToast";
import PublishDetailsMap from "@/utilities/PublishDetailsMap";
import toast from "react-hot-toast";
import { TbLinkOff, TbLinkPlus } from "react-icons/tb";
import { StateCreator } from "zustand";
import { AuthSliceType } from "./AuthSlice";
import { ErrorSliceType } from "./errorSlice";
import { useStoreApp } from "./index";

export interface UserSliceProfile {
  id: string | null;
  credentials: Credentials | null;
  profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_image: ProfileImage;
  profile_links: ProfileLinks[] | [];
  profile_template: string | null;
  profile_file: null | File;
  theme: ThemeAppTypes;
  template_bg: TemplateBgTypes;
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
  hasError: boolean;
  updated: boolean;
  templateId: string | null;
}

interface UserSliceMethods {
  handleChangeTheme: (theme: ThemeAppTypes) => void;
  handleChangeTemplateBg: (templateBg: UserSliceProfile["template_bg"]) => void;
  clearState: () => void;

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
    handleChangeTheme: (theme) => {
      set((state) => ({ user: { ...state.user, theme } }));
    },
    handleChangeTemplateBg: (templateBg) => {
      set((state) => ({ user: { ...state.user, template_bg: templateBg } }));
    },
    clearState: () => {
      set((state) => ({
        user: {
          ...state.user,
          id: null,
          credentials: null,
          profile_email: "",
          profile_image: { id: null, url: null },
          profile_name: "",
          profile_last_name: "",
          profile_links: [],
          profile_template: null,
          profile_file: null,
          theme: "default-theme",
          template_bg: "template-custom-bg-one",
        },
      }));

      useStoreApp.persist.clearStorage();
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
          message:
            linkPosition !== undefined
              ? `on position #${linkPosition + 1}`
              : "🤷‍♂️",
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
      const ERROR_RESPONSE = {
        hasError: true,
        updated: false,
        templateId: null,
      };

      const stateUser = get().user;
      if (!stateUser.id || !stateUser.credentials) return ERROR_RESPONSE;

      const appErrors = get().appErrors.validateAllProfileDetails({
        profile_email: stateUser.profile_email,
        profile_name: stateUser.profile_name,
        profile_last_name: stateUser.profile_last_name,
        profile_links: stateUser.profile_links,
        profile_file:
          stateUser.profile_image.id && stateUser.profile_image.url
            ? undefined
            : stateUser.profile_file,
        profile_image: stateUser.profile_image,
        template_bg: stateUser.template_bg,
        theme: stateUser.theme,
      });

      const validAppErrors = () => {
        if (!appErrors) return false;

        const errorKeys = Object.keys(appErrors) as Array<
          keyof typeof appErrors
        >;
        const getCurrentErrors = errorKeys.reduce((acc: Array<string>, key) => {
          if (key === "profile_links") {
            const areLinkErrors = appErrors.profile_links
              .slice(0, 1)
              .filter((link) => link.isErr);
            return areLinkErrors.length > 0 ? [...acc, "profile_links"] : acc;
          }

          return appErrors[key].isErr ? [...acc, key] : acc;
        }, []);

        return getCurrentErrors.length === 1 && appErrors.profile_image.isErr;
      };

      if (appErrors && validAppErrors()) {
        appErrors.template_bg.isErr &&
          set((state) => ({
            user: { ...state.user, template_bg: "template-custom-bg-one" },
          }));

        appErrors.theme.isErr &&
          set((state) => ({
            user: { ...state.user, theme: "default-theme" },
          }));

        toast.error("Please check and fix the errors 😊");

        return ERROR_RESPONSE;
      }

      const response = await handleApiWithToast(
        apiUpdateTemplateService(
          {
            profile_email: stateUser.profile_email,
            profile_name: stateUser.profile_name,
            profile_last_name: stateUser.profile_last_name,
            profile_links: [
              ...stateUser.profile_links.map((link) => ({
                platform: link.platform as AvailableSocialMedia,
                url: link.url,
              })),
            ],
            theme: stateUser.theme,
            template_bg: stateUser.template_bg,
          },

          stateUser.profile_file ?? undefined,
        ),
        {
          loading: "Saving changes...",
          error: "Couldn’t save changes",
          success: "Profile saved!",
        },
      );

      if (response.error.isError || !response.data) {
        if (response.error.status === 401 || response.error.status === 403)
          get().user.clearState();
        return ERROR_RESPONSE;
      }

      const dataRes = response.data;
      set((state) => ({
        user: {
          ...state.user,
          profile_email: dataRes.profile_email,
          profile_name: dataRes.profile_name,
          profile_last_name: dataRes.profile_last_name,
          profile_links: dataRes.profile_links,
          profile_template: dataRes.profile_template,
          profile_image: dataRes.profile_image,
          theme: dataRes.theme,
          template_bg: dataRes.template_bg,
          credentials: dataRes.credentials,
          id: dataRes.id,
          profile_file: null,
        },
      }));

      return {
        hasError: false,
        updated: true,
        templateId: response.data.profile_template,
      };
    },
  },
});
