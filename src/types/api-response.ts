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
  email: string;
  credentials: string;
  profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_image: ProfileImage;
  profile_links: ProfileLinks[] | [];
  profile_template: string | null;
  updatedAt: string;
}

export interface ApiRegisterResponse
  extends Omit<ApisGeneralResponse, "updatedAt"> {
  createdAt: string;
}

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
