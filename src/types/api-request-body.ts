import { AvailableSocialMedia } from "./app-social-media";

export interface ApiLoginBody {
  email: string;
  password: string;
}
export interface ApiRegisterBody {
  email: string;
  password: string;
  confirm_password: string;
}

export interface ApiUpdateTemplateLink {
  platform: AvailableSocialMedia;
  url: string;
}
export interface ApiUpdateTemplateImage {
  id: string;
  url: string;
}
export interface ApiUpdateTemplate {
  profile_email: string;
  profile_name: string;
  profile_last_name: string;
  profile_links: ApiUpdateTemplateLink[];
  profile_image?: ApiUpdateTemplateImage;
}
