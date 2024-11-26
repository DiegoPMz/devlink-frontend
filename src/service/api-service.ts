import {
  ApiLoginBody,
  ApiRegisterBody,
  ApiUpdateTemplate,
} from "@/types/api-request-body";
import {
  ApiGetTemplateResponse,
  ApiLoginResponse,
  ApiLogoutResponse,
  ApiRefreshTokenResponse,
  ApiRegisterResponse,
  ApiUpdateTemplateResponse,
} from "@/types/api-response";
import { apiMethodHandler, ApiServiceResponse } from "./api-handler";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export const apiLoginService = async (
  body: ApiLoginBody,
): ApiServiceResponse<ApiLoginResponse> => {
  const API = `${API_BASE_URL}/auth/login`;

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
  const API = `${API_BASE_URL}/auth/register`;

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
    const API = `${API_BASE_URL}/auth/refresh-token`;
    const OPTIONS: RequestInit = {
      credentials: "include",
      method: "GET",
      headers: {
        // prettier-ignore
        "Accept": "application/json",
      },
    };

    return await apiMethodHandler(API, OPTIONS);
  };

export const apiLogoutService =
  async (): ApiServiceResponse<ApiLogoutResponse> => {
    const API = `${API_BASE_URL}/auth/logout`;
    const OPTIONS: RequestInit = {
      credentials: "include",
      method: "GET",
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
): ApiServiceResponse<ApiUpdateTemplateResponse> => {
  const formData = new FormData();
  formData.append("data", JSON.stringify(body));
  if (file) formData.append("user_file", file);

  const API = `${API_BASE_URL}/template`;
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
): ApiServiceResponse<ApiGetTemplateResponse> => {
  const API = `${API_BASE_URL}/template/${paramID}`;
  const OPTIONS: RequestInit = {
    method: "GET",
    headers: {
      // prettier-ignore
      "Accept": "application/json",
    },
  };

  return await apiMethodHandler(API, OPTIONS);
};
