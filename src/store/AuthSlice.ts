import {
  apiLoginService,
  apiLogoutService,
  apiRefreshTokenService,
  apiRegisterService,
} from "@/service/api-service";
import {
  ApiLoginErrorResponse,
  ApiRegisterErrorResponse,
} from "@/types/api-error-response";
import { ApiLoginBody, ApiRegisterBody } from "@/types/api-request-body";
import handleApiWithToast from "@/utilities/handleApiWithToast";
import { StateCreator } from "zustand";
import { UserSliceType } from "./userSlice";

interface RefreshTokenResponse {
  status: number;
  hasError: boolean;
}

interface AuthSliceMethods {
  login: (data: ApiLoginBody) => Promise<undefined | ApiLoginErrorResponse>;
  signup: (
    data: ApiRegisterBody,
  ) => Promise<undefined | ApiRegisterErrorResponse>;
  logout: () => void;
  refreshToken: () => Promise<RefreshTokenResponse>;
}

export interface AuthSliceType extends AuthSliceMethods {}

type AuthSliceBuildType = StateCreator<
  AuthSliceType & UserSliceType,
  [["zustand/devtools", never]],
  [],
  AuthSliceType
>;

export const authSlice: AuthSliceBuildType = (set, get) => ({
  login: async (data) => {
    const response = await handleApiWithToast(apiLoginService(data), {
      loading: "Logging in...",
      success: "Login successful!",
      error: "Failed to log in",
    });

    const errors = response.error.cause;
    const userDb = response.data;

    if (!userDb || response.error.isError)
      return errors as ApiLoginErrorResponse;

    set((state) => ({
      user: {
        ...state.user,
        id: userDb.id,
        credentials: userDb.credentials,
        profile_email: userDb.profile_email,
        profile_name: userDb.profile_name,
        profile_last_name: userDb.profile_last_name,
        profile_image: userDb.profile_image,
        profile_links: userDb.profile_links,
        profile_template: userDb.profile_template,
        theme: userDb.theme,
        template_bg: userDb.template_bg,
        profile_file: null,
      },
    }));
  },

  signup: async (data) => {
    const response = await handleApiWithToast(apiRegisterService(data), {
      loading: "Registering...",
      success: "Registered successfully!",
      error: "Registration failed",
    });

    const errors = response.error.cause;
    const newUser = response.data;

    if (!newUser || response.error.isError)
      return errors as ApiRegisterErrorResponse;

    set((state) => ({
      user: {
        ...state.user,
        id: newUser.id,
        credentials: newUser.credentials,
        profile_email: newUser.profile_email,
        profile_name: newUser.profile_name,
        profile_last_name: newUser.profile_last_name,
        profile_image: newUser.profile_image,
        profile_links: newUser.profile_links,
        profile_template: newUser.profile_template,
      },
    }));
  },

  logout: async () => {
    await apiLogoutService();
    get().user.clearState();
  },

  refreshToken: async () => {
    const response = await apiRefreshTokenService();
    if (!response.error.isError && response.data) {
      return {
        status: 200,
        hasError: false,
      };
    }

    return {
      status: response.error.status,
      hasError: true,
    };
  },
});
