export interface BaseApiErrorResponse<
  C extends Record<string, string | ProfileLinkError> = {
    [key: string]: string;
  },
> {
  status: number;
  cause: {
    service?: string;
  } & C;
}

export type ApiLoginErrorResponse = BaseApiErrorResponse<{
  email?: string;
  password?: string;
}>;

export type ApiRegisterErrorResponse = BaseApiErrorResponse<{
  email?: string;
  password?: string;
  confirm_password?: string;
}>;

export type ApiLogoutErrorResponse = BaseApiErrorResponse;

export type ApiRefreshTokenErrorResponse = BaseApiErrorResponse<{
  authentication?: string;
}>;

interface ProfileLinkError {
  platform?: {
    _errors: string[];
  };
  url?: {
    _errors: string[];
  };
}
interface ProfileLinksBaseError {
  [key: string]: ProfileLinkError;
}

export type ApiUpdateTemplateErrorResponse = BaseApiErrorResponse<{
  authentication?: string;
  profile_email?: string;
  profile_name?: string;
  profile_last_name?: string;
  profile_links?: ProfileLinksBaseError;
  user_file?: string;
  theme?: string;
  template_bg?: string;
}>;

export type ApiGetTemplateErrorResponse = BaseApiErrorResponse<{
  template?: string;
}>;
