import { AvailableSocialMedia } from "./social-media";

export interface ProfileImage {
  id: string | null;
  url: string | null;
}
export interface ProfileLinks {
  platform: AvailableSocialMedia | string;
  url: string;
  id: string;
}
export interface ApisGeneralResponse {
  id: string;
  credentials: string;
  email: string;
  profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_image: ProfileImage;
  profile_links: ProfileLinks[] | [];
  profile_template: string | null;
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
  extends Omit<ApisGeneralResponse, "profile_image" | "profile_links"> {
  profile_image: NonNullableProfileImage;
  profile_links: ProfileLinks[];
}

export interface ApiUpdateTemplateResponse extends ApisGeneralResponseNoNulls {
  updatedAt: string;
}
export type ApiGetTemplateResponse = Omit<
  ApisGeneralResponseNoNulls,
  "id" | "credentials" | "email"
>;
export type ApiTemplateDetailsResponse = ApiCreatedAtResponse;
