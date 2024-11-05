import { ProfileImage, ProfileLinks } from "@/types/api-response";
import { StateCreator } from "zustand";
import { ErrorSliceType } from "./errorSlice";

export interface UserSliceProfile {
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
}
export interface UserSliceType {
  user: UserSliceProfile & UserSliceMethods;
}

type UserSliceBuildType = StateCreator<
  UserSliceType & ErrorSliceType,
  [["zustand/devtools", never]],
  [],
  UserSliceType
>;

export const userSlice: UserSliceBuildType = (set, get) => ({
  user: {
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

      const invalidProfileDetails =
        !profile_name || !profile_last_name || !profile_email;

      const notUserImageStates =
        Object.values(profile_image).some((i) => !i) && !profile_file;

      const invalidUserLinks =
        profile_links.length === 0 ||
        profile_links.some((li) => !li.platform || !li.url);

      if (invalidProfileDetails || notUserImageStates || invalidUserLinks)
        return false;
      return true;
    },
  },
});
