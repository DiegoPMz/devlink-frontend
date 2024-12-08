import {
  profileEmailSchema,
  profileFileSchema,
  profileLastNameSchema,
  profileLinkSchema,
  profileNameSchema,
  profileUpdateSchemaType,
  profileUpdateWithoutLinksSchema,
  profileUpdateWithoutLinksSchemaType,
} from "@/schemas/app-profile-schemas";
import { ProfileLinks } from "@/types/api-response";
import schemaValidator from "@/utilities/schema-validator";
import { StateCreator } from "zustand";
import { UserSliceProfile, UserSliceType } from "./userSlice";

type ErrorLinkStructure = Record<keyof Omit<ProfileLinks, "id">, string | null>;
interface ErrorProfileDetails {
  isErr: boolean;
  message: string | null;
}
export interface ErrorProfileLinks {
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
    value: UserSliceProfile[K],
  ) => void;
  areErrors: () => boolean;
  clearInvalidLinkErrors: (
    links: UserSliceType["user"]["profile_links"],
  ) => void;

  validateAllProfileDetails: (
    data: profileUpdateSchemaType,
  ) => ErrorSliceState | undefined;
}

export interface ErrorSliceType {
  appErrors: ErrorSliceMethods & ErrorSliceState;
}
type ErrorSliceBuildType = StateCreator<
  ErrorSliceType & UserSliceType,
  [["zustand/devtools", never]],
  [],
  ErrorSliceType
>;

const PROFILE_DEFAULT_STATE: ErrorProfileDetails = {
  isErr: false,
  message: null,
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
        id: link.id,
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

    clearInvalidLinkErrors: (links) => {
      if (links.length === 0) {
        set((state) => ({
          appErrors: {
            ...state.appErrors,
            profile_links: [],
          },
        }));

        return;
      }
      const linkErrors = get().appErrors.profile_links;
      const errorLinkIds = linkErrors.map((err) => err.stateId);

      const findInvalidErrors = links.map((link) =>
        errorLinkIds.find((errId) => errId === link.id),
      );

      const updateLinkErrors = linkErrors.filter((err) =>
        findInvalidErrors.find((validId) => err.stateId === validId),
      );

      set((state) => ({
        appErrors: {
          ...state.appErrors,
          profile_links: updateLinkErrors,
        },
      }));
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

    validateAllProfileDetails: (data) => {
      const currentLinkErrors = data.profile_links
        .map((link) => {
          const linkSchema = profileLinkSchema.safeParse(link);
          if (linkSchema.success) return;

          const error = linkSchema.error?.format();
          const errLink: ErrorProfileLinks = {
            isErr: true,
            stateId: link.id,
            message: {
              platform: error?.platform?._errors[0] ?? null,
              url: error?.url?._errors[0] ?? null,
            },
          };

          return errLink;
        })
        .filter((val) => val !== undefined);

      const profileData: profileUpdateWithoutLinksSchemaType = {
        profile_email: data.profile_email,
        profile_last_name: data.profile_last_name,
        profile_name: data.profile_name,
        profile_file: data.profile_file,
        profile_image: data.profile_image,
      };

      const profileSchema =
        profileUpdateWithoutLinksSchema.safeParse(profileData);
      if (!profileSchema.error || currentLinkErrors.length === 0)
        return undefined;

      const schemaErrors = profileSchema.error.format();

      const newErrorState: ErrorSliceState = {
        profile_email: !schemaErrors.profile_email
          ? PROFILE_DEFAULT_STATE
          : { isErr: true, message: schemaErrors.profile_email._errors[0] },
        profile_name: !schemaErrors.profile_name
          ? PROFILE_DEFAULT_STATE
          : { isErr: true, message: schemaErrors.profile_name._errors[0] },
        profile_last_name: !schemaErrors.profile_last_name
          ? PROFILE_DEFAULT_STATE
          : { isErr: true, message: schemaErrors.profile_last_name._errors[0] },
        profile_file: !schemaErrors.profile_file
          ? PROFILE_DEFAULT_STATE
          : { isErr: true, message: schemaErrors.profile_file._errors[0] },

        profile_links: currentLinkErrors,
      };

      set((state) => ({ appErrors: { ...state.appErrors, ...newErrorState } }));

      return newErrorState;
    },
  },
});
