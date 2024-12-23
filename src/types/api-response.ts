import { AvailableSocialMedia } from "./app-social-media";
import { TemplateBgTypes } from "./app-template-bg";
import { ThemeAppTypes } from "./app-theme";

export interface ProfileImage {
  id: string | null;
  url: string | null;
}
export interface ProfileLinks {
  platform: AvailableSocialMedia | string;
  url: string;
  id: string;
}

export interface Credentials {
  roles: string;
}

export interface ApisGeneralResponse {
  id: string;
  credentials: Credentials;
  email: string;
  profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_image: ProfileImage;
  profile_links: ProfileLinks[] | [];
  profile_template: string | null;
  theme: ThemeAppTypes;
  template_bg: TemplateBgTypes;
}

interface ApiCreatedAtResponse extends ApisGeneralResponse {
  createdAt: string;
}
export type ApiLoginResponse = ApiCreatedAtResponse;
export type ApiRegisterResponse = ApiCreatedAtResponse;

interface ApiSuccessResponse {
  success: boolean;
  message: string;
}
export type ApiRefreshTokenResponse = ApiSuccessResponse;
export type ApiLogoutResponse = ApiSuccessResponse;

type NonNullableProfileImage = {
  [K in keyof ProfileImage]: NonNullable<ProfileImage[K]>;
};
export interface ApisGeneralResponseNoNulls
  extends Omit<
    ApisGeneralResponse,
    "profile_image" | "profile_links" | "profile_template"
  > {
  profile_image: NonNullableProfileImage;
  profile_links: ProfileLinks[];
  profile_template: string;
}

export interface ApiUpdateTemplateResponse extends ApisGeneralResponseNoNulls {
  updatedAt: string;
}
export type ApiGetTemplateResponse = Omit<
  ApisGeneralResponseNoNulls,
  "id" | "credentials" | "email"
>;
export type ApiTemplateDetailsResponse = ApiCreatedAtResponse;
