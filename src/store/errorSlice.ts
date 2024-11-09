import {
  profileEmailSchema,
  profileFileSchema,
  profileLastNameSchema,
  profileLinkSchema,
  profileNameSchema,
} from "@/schemas/app-profile-schemas";
import { ProfileLinks } from "@/types/api-response";
import schemaValidator from "@/utilities/schema-validator";
import { StateCreator } from "zustand";
import { UserSliceProfile } from "./userSlice";

type ErrorLinkStructure = Record<keyof Omit<ProfileLinks, "id">, string | null>;
interface ErrorProfileDetails {
  isErr: boolean;
  message: string | null;
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
    value: NonNullable<UserSliceProfile[K]>,
  ) => void;
  areErrors: () => boolean;
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

const PROFILE_DEFAULT_STATE: ErrorProfileDetails = {
  isErr: false,
  message: "",
};

export const errorSlice: ErrorSliceBuildType = (set, get) => ({
  appErrors: {
    profile_email: PROFILE_DEFAULT_STATE,
    profile_name: PROFILE_DEFAULT_STATE,
    profile_last_name: PROFILE_DEFAULT_STATE,
    profile_file: PROFILE_DEFAULT_STATE,
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
      const errLinks = get().appErrors.profile_links;
      return errLinks.find((err) => err.stateId === id) ?? null;
    },

    validateProfile: (state, value) => {
      const schema_dictionary = {
        profile_email: () =>
          schemaValidator(profileEmailSchema, value as string),
        profile_name: () => schemaValidator(profileNameSchema, value as string),
        profile_last_name: () =>
          schemaValidator(profileLastNameSchema, value as string),
        profile_file: () => schemaValidator(profileFileSchema, value as File),
      };

      const errState = state;
      const { isError, schemaError } = schema_dictionary[errState]();

      if (!isError) {
        set((state) => ({
          appErrors: { ...state.appErrors, [errState]: PROFILE_DEFAULT_STATE },
        }));
        return;
      }

      const newError: ErrorProfileDetails = {
        isErr: true,
        message: schemaError?._errors[0] ?? null,
      };

      set((state) => ({
        appErrors: { ...state.appErrors, [errState]: newError },
      }));
    },
    areErrors: () => {
      const {
        profile_name,
        profile_last_name,
        profile_email,
        profile_file,
        profile_links,
      } = get().appErrors;

      const obj = [
        profile_name,
        profile_last_name,
        profile_email,
        profile_file,
      ];

      const findTemplateError = obj.some((err) => err.isErr);
      const findLinkError = profile_links.some((link) => link.isErr);

      return findTemplateError || findLinkError;
    },
  },
});
