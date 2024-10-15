import {
  ApiLoginBody,
  ApiRegisterBody,
  ApiUpdateTemplate,
} from "@/types/api-request";
import {
  ApiLogoutResponse,
  ApiRefreshTokenResponse,
  ApiRegisterResponse,
  ApisGeneralResponse,
  ApisGeneralResponseNoNulls,
} from "@/types/api-response";
import { apiMethodHandler, ApiServiceResponse } from "./api-handler";

export const apiLoginService = async (
  body: ApiLoginBody,
): ApiServiceResponse<ApisGeneralResponse> => {
  const API = "http://localhost:4000/api/devlink/auth/login";
  const OPTIONS: RequestInit = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // prettier-ignore
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await apiMethodHandler(API, OPTIONS);
};

export const apiRegisterService = async (
  body: ApiRegisterBody,
): ApiServiceResponse<ApiRegisterResponse> => {
  const API = "";
  const OPTIONS: RequestInit = {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // prettier-ignore
      "Accept": "application/json",
    },
    body: JSON.stringify(body),
  };

  return await apiMethodHandler(API, OPTIONS);
};

export const apiRefreshTokenService =
  async (): ApiServiceResponse<ApiRefreshTokenResponse> => {
    const API = "";
    const OPTIONS: RequestInit = {
      credentials: "include",
      method: "POST",
      headers: {
        // prettier-ignore
        "Accept": "application/json",
      },
    };

    return await apiMethodHandler(API, OPTIONS);
  };

export const apiLogoutService =
  async (): ApiServiceResponse<ApiLogoutResponse> => {
    const API = "";
    const OPTIONS: RequestInit = {
      credentials: "include",
      method: "POST",
      headers: {
        // prettier-ignore
        "Accept": "application/json",
      },
    };

    return await apiMethodHandler(API, OPTIONS);
  };

export const apiUpdateTemplateService = async (
  body: ApiUpdateTemplate,
  file?: File,
): ApiServiceResponse<ApisGeneralResponseNoNulls> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(body));
  if (file) formData.append("user_file", file);

  const API = "";
  const OPTIONS: RequestInit = {
    credentials: "include",
    method: "PUT",
    headers: {
      // prettier-ignore
      "Accept": "application/json",
    },
    body: formData,
  };

  return await apiMethodHandler(API, OPTIONS);
};

export const apiGetTemplateService = async (
  paramID: string,
): ApiServiceResponse<ApisGeneralResponseNoNulls> => {
  const API = `http://localhost:4000/api/devlink/${paramID}`;
  const OPTIONS: RequestInit = {
    method: "GET",
    headers: {
      // prettier-ignore
      "Accept": "application/json",
    },
  };

  return await apiMethodHandler(API, OPTIONS);
};
