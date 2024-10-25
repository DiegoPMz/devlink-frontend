import { profileLinkSchema } from "@/schemas/app-profile-schemas";
import { ProfileLinks } from "@/types/api-response";
import schemaValidator from "@/utilities/schema-validator";
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
      const errLinks = get().appErrors.profile_links;
      const { isError, schemaError } = schemaValidator(profileLinkSchema, {
        platform: link.platform,
        url: link.url,
      });

      if (!isError) {
        const removeStateError = errLinks.filter(
          (err) => err.stateId !== link.id,
        );

        set((state) => ({
          appErrors: { ...state.appErrors, profile_links: removeStateError },
        }));

        return;
      }

      const newError: ErrorProfileLinks = {
        isErr: true,
        message: {
          platform: schemaError?.platform?._errors[0] ?? "",
          url: schemaError?.url?._errors[0] ?? "",
        },
        stateId: link.id,
      };

      if (!errLinks.find((err) => err.stateId === link.id)) {
        set((state) => ({
          appErrors: {
            ...state.appErrors,
            profile_links: [...state.appErrors.profile_links, newError],
          },
        }));

        return;
      }

      const updateErrors = errLinks.map((err) =>
        err.stateId === link.id ? newError : err,
      );

      set((state) => ({
        appErrors: {
          ...state.appErrors,
          profile_links: [...updateErrors],
        },
      }));
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
