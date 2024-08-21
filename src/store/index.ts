import { AvailableSocialMedia } from "@/types/social-media";
import { create } from "zustand";

interface AuthUserTypes {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileLink {
  id: string;
  social_media: AvailableSocialMedia | "";
  url: string;
}
interface AppUserProfile {
  id: string;
  credentials: null | string;
  Profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_image: string;
  profile_links: ProfileLink[] | [];
  profile_template: string;
}

interface AppErrorProfileItem {
  status: boolean;
  message: string;
}
interface AppErrorLink {
  id: string;
  message: string;
}
interface AppError {
  Profile_email: AppErrorProfileItem;
  profile_name: AppErrorProfileItem;
  profile_last_name: AppErrorProfileItem;
  profile_image: AppErrorProfileItem;
  profile_links: AppErrorLink[] | [];
}

type OnChangeBDNameType = keyof Omit<
  AppUserProfile,
  "id" | "credentials" | "profile_template" | "profile_links"
>;

interface useStoreAppState {
  auth: AuthUserTypes;
  userProfile: AppUserProfile;
  appError: AppError;
  generateNewLink: () => void;
  removeLink: (id: string) => void;
  onChangeLinks: (
    id: ProfileLink["id"],
    value: Omit<ProfileLink, "id">,
  ) => void;

  onChangeBasicDetails: (inputName: OnChangeBDNameType, value: string) => void;

  isSubmissionAllowed: () => boolean;
}

export const useStoreApp = create<useStoreAppState>()((set, get) => ({
  auth: {
    email: "",
    password: "",
    confirmPassword: "",
  },
  userProfile: {
    id: "",
    credentials: null,
    Profile_email: "",
    profile_image: "",
    profile_last_name: "",
    profile_links: [],
    profile_name: "",
    profile_template: "",
  },

  appError: {
    Profile_email: {
      status: false,
      message: "",
    },
    profile_image: {
      status: false,
      message: "",
    },
    profile_last_name: {
      status: false,
      message: "",
    },
    profile_name: {
      status: false,
      message: "",
    },

    profile_links: [],
  },

  generateNewLink: () => {
    const UUID = crypto.randomUUID();
    const newLink: ProfileLink = {
      id: UUID,
      social_media: "",
      url: "",
    };

    set((state) => ({
      userProfile: {
        ...state.userProfile,
        profile_links: [...state.userProfile.profile_links, newLink],
      },
    }));
  },

  removeLink: (id) => {
    const allUserLinks = get().userProfile.profile_links;
    const updatedLinks = allUserLinks.filter((link) => link.id !== id);

    set((state) => ({
      userProfile: {
        ...state.userProfile,
        profile_links: updatedLinks,
      },
    }));
  },

  onChangeLinks: (id, value) => {
    const userLinks = get().userProfile.profile_links;
    const currentLinkModified = userLinks.find((link) => link.id === id);

    if (!currentLinkModified)
      throw new Error("Invalid id. Must be one id from profile_links");

    const updateLink = userLinks.map((link) =>
      link.id === id
        ? { ...link, social_media: value.social_media, url: value.url }
        : link,
    );
    set((state) => ({
      userProfile: { ...state.userProfile, profile_links: updateLink },
    }));
  },

  onChangeBasicDetails: (inputName, value) => {
    if (inputName === "profile_name") {
      set((state) => ({
        userProfile: { ...state.userProfile, profile_name: value },
      }));
      return;
    }

    if (inputName === "profile_last_name") {
      set((state) => ({
        userProfile: { ...state.userProfile, profile_last_name: value },
      }));
      return;
    }

    if (inputName === "Profile_email") {
      set((state) => ({
        userProfile: { ...state.userProfile, Profile_email: value },
      }));
      return;
    }

    if (inputName === "profile_image") {
      set((state) => ({
        userProfile: { ...state.userProfile, profile_image: value },
      }));
      return;
    }
  },

  isSubmissionAllowed: () => {
    const appUser = get().userProfile;
    const isValidData =
      !appUser.profile_name ||
      !appUser.profile_last_name ||
      !appUser.Profile_email ||
      !appUser.profile_image;

    if (isValidData || appUser.profile_links.length < 1) return false;

    return true;
  },
}));

// const appErrors = get().appError.profile_links.links;
// const errorUrl = urlValidationService(
//   currentLinkModified.social_media,
//   value.url,
// );

// if (errorUrl.status) {
//   const existError = appErrors.find((err) => err.id === id);

//   const updateErrorsLinks: AppErrorLink[] = existError
//     ? appErrors
//     : [...appErrors, { id: id, message: errorUrl.message }];

//   set((state) => ({
//     appError: {
//       ...state.appError,
//       profile_links: {
//         status: errorUrl.status,
//         links: updateErrorsLinks,
//       },
//     },
//   }));
// } else {
//   const removedError = appErrors.filter((err) => err.id !== id);
//   set((state) => ({
//     appError: {
//       ...state.appError,
//       profile_links: {
//         status: false,
//         links: removedError,
//       },
//     },
//   }));
// }
