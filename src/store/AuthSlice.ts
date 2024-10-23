import {
  apiLoginService,
  apiLogoutService,
  apiRefreshTokenService,
  apiRegisterService,
} from "@/service/api-service";
import { ApiLoginBody, ApiRegisterBody } from "@/types/api-request";
import { StateCreator } from "zustand";
import { UserSliceProfile, UserSliceType } from "./userSlice";

interface AuthSliceMethods {
  login: (data: ApiLoginBody) => Promise<boolean>;
  signup: (data: ApiRegisterBody) => Promise<boolean>;
  logout: () => void;
  refreshToken: () => void;
}

export interface AuthSliceType extends AuthSliceMethods {}

type AuthSliceBuildType = StateCreator<
  AuthSliceType & UserSliceType,
  [],
  [],
  AuthSliceType
>;

export const authSlice: AuthSliceBuildType = (set) => ({
  login: async (data) => {
    if (Object.values(data).some((val) => !val)) return false;

    const response = await apiLoginService(data);
    // pending
    if (response.error.isError) return false;
    if (!response.data) return false;

    const userDb = response.data;
    set((state) => ({
      user: {
        ...state.user,
        credentials: userDb.credentials,
        profile_email: userDb.email,
        profile_name: userDb.profile_name,
        profile_last_name: userDb.profile_last_name,
        profile_image: userDb.profile_image,
        profile_links: userDb.profile_links,
        profile_template: userDb.profile_template,
      },
    }));

    return true;
  },

  signup: async (data) => {
    if (Object.values(data).some((val) => !val)) return false;

    const response = await apiRegisterService(data);
    // pending
    if (response.error.isError) return false;
    if (!response.data) return false;

    const newUser = response.data;
    const newProfileState: UserSliceProfile = {
      credentials: newUser.credentials,
      profile_email: newUser.profile_email,
      profile_name: newUser.profile_name,
      profile_last_name: newUser.profile_last_name,
      profile_image: newUser.profile_image,
      profile_links: newUser.profile_links,
      profile_template: newUser.profile_template,
    };

    set((state) => ({ user: { ...state.user, newProfileState } }));

    return true;
  },

  logout: async () => {
    const response = await apiLogoutService();
    // pending
    if (response.error.isError) return;
    if (!response.data) return;

    const emptyProfileState: UserSliceProfile = {
      credentials: null,
      profile_email: "",
      profile_image: { id: null, url: null },
      profile_name: "",
      profile_last_name: "",
      profile_links: [],
      profile_template: null,
    };

    set((state) => ({ user: { ...state.user, emptyProfileState } }));
  },

  refreshToken: async () => {
    const response = await apiRefreshTokenService();
    //pending
    if (!response.error.isError && response.data) return;

    const emptyProfileState: UserSliceProfile = {
      credentials: null,
      profile_email: "",
      profile_image: { id: null, url: null },
      profile_name: "",
      profile_last_name: "",
      profile_links: [],
      profile_template: null,
    };

    set((state) => ({ user: { ...state.user, emptyProfileState } }));
  },
});