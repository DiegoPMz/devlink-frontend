import { ProfileLinks } from "@/types/api-response";
import { StateCreator } from "zustand";

type ErrorLinkStructure = Record<keyof Omit<ProfileLinks, "id">, string | null>;
interface ErrorProfileDetails {
  isErr: boolean;
  message: string;
  stateId: string | null;
}
interface ErrorProfileLinks {
  isErr: boolean;
  message: ErrorLinkStructure;
  stateId: string | null;
}

type GetErrorProfileKeys = keyof Omit<ErrorSliceState, "profile_links">;

interface ErrorSliceState {
  profile_links: ErrorProfileLinks[];
  profile_email: ErrorProfileDetails;
  profile_name: ErrorProfileDetails;
  profile_last_name: ErrorProfileDetails;
  profile_file: ErrorProfileDetails;
}

interface ErrorSliceMethods {
  validateLink: (link: ProfileLinks) => void;
  getErrorLink: (id: ProfileLinks["id"]) => ErrorProfileLinks | null;
  validateProfile: <K extends GetErrorProfileKeys>(
    state: K,
    value: ErrorSliceState[K],
  ) => void;
}

export interface ErrorSliceType {
  appErrors: ErrorSliceMethods & ErrorSliceState;
}
type ErrorSliceBuildType = StateCreator<
  ErrorSliceType,
  [["zustand/devtools", never]],
  [],
  ErrorSliceType
>;

const DEFAULT_STATE = {
  isErr: false,
  message: "",
  stateId: null,
};

export const errorSlice: ErrorSliceBuildType = (set, get) => ({
  appErrors: {
    profile_email: DEFAULT_STATE,
    profile_name: DEFAULT_STATE,
    profile_last_name: DEFAULT_STATE,
    profile_file: DEFAULT_STATE,
    profile_links: [],

    validateLink: (link) => {
      console.log(link);
    },
    getErrorLink: (id) => {
      console.log(id);
      return null;
    },

    validateProfile: (state, value) => {
      console.log(state, value);
    },
  },
});
