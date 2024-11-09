import { apiTemplateDetailsService } from "@/service/api-service";
import { ProfileImage, ProfileLinks } from "@/types/api-response";
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
}
type ProfileStateSomeKeys = keyof Pick<
  UserSliceProfile,
  "profile_email" | "profile_name" | "profile_last_name" | "profile_file"
>;
type ProfileStateSomeValues = NonNullable<
  Pick<UserSliceProfile, ProfileStateSomeKeys>[ProfileStateSomeKeys]
>;

interface UserSliceMethods {
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
  isSubmissionAllowed: () => boolean;
  getTemplateDetails: () => void;
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
    id: null,
    credentials: null,
    profile_email: "",
    profile_name: "",
    profile_last_name: "",
    profile_image: { id: null, url: null },
    profile_links: [],
    profile_template: null,
    profile_file: null,

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

    onChangeDetails: (inputName, value) => {
      set((state) => ({
        user: { ...state.user, [inputName]: value },
      }));

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
      console.log(hasAppErrors);

      if (
        !hasInvalidProfileDetails &&
        !isMissingUserImage &&
        !hasInvalidUserLinks &&
        !hasAppErrors
      )
        return true;

      return false;
    },

    getTemplateDetails: async () => {
      const res = await apiTemplateDetailsService();

      if (res.error.isError) {
        if (res.error.status === 403) {
          get().refreshToken();
          get().user.getTemplateDetails();
        }
        return;
      }

      if (!res.data) return;

      const data = res.data;
      const newState: UserSliceProfile = {
        id: data.id,
        credentials: data.credentials,
        profile_email: data.profile_email,
        profile_name: data.profile_name,
        profile_last_name: data.profile_last_name,
        profile_image: data.profile_image,
        profile_links: data.profile_links,
        profile_template: data.profile_template,
        profile_file: null,
      };

      set((state) => ({
        user: { ...state.user, newState },
      }));
    },
  },
});
