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

interface AppErrorLink {
  id: string;
  message: string;
}

interface AppError {
  Profile_email: {
    status: boolean;
    message: string;
  };
  profile_name: {
    status: boolean;
    message: string;
  };
  profile_last_name: {
    status: boolean;
    message: string;
  };
  profile_image: {
    status: boolean;
    message: string;
  };

  profile_links: {
    status: boolean;
    links: AppErrorLink[] | [];
  };
}

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
    profile_links: {
      status: false,
      links: [],
    },
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

  onChangeLinks: (id: ProfileLink["id"], value: Omit<ProfileLink, "id">) => {
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
}));
