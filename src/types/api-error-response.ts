export interface BaseApiErrorResponse<
  C extends Record<string, string> = { [key: string]: string },
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

export type ApiUpdateTemplateErrorResponse = BaseApiErrorResponse<{
  authentication?: string;
  user_file?: string;
}>;

export type ApiGetTemplateErrorResponse = BaseApiErrorResponse<{
  template?: string;
}>;
