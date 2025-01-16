import { BaseApiErrorResponse } from "@/types/api-error-response";
import { ApiServiceError } from "@/utilities/AppCustomErrors";

export interface ApiServiceResponseStructure<D, E> {
  error: {
    isError: boolean;
    status: number;
    cause: E | BaseApiErrorResponse | null;
  };
  data: D | null;
}

export type ApiServiceResponse<R, E> = Promise<
  ApiServiceResponseStructure<R, E>
>;

const ERROR_STATUS_CODE = [
  // 4xx - Client Errors
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414,
  415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,

  // 5xx - Server Errors
  500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
];

export const apiMethodHandler = async <R, E extends BaseApiErrorResponse>(
  uri: string,
  options: RequestInit,
): ApiServiceResponse<R, E> => {
  try {
    const response = await fetch(uri, options);
    const contentType = response.headers.get("content-type");
    let resData: unknown;

    if (contentType?.includes("application/json"))
      resData = await response.json();

    if (ERROR_STATUS_CODE.includes(response.status)) {
      throw new ApiServiceError(response.status, resData as E);
    }

    return {
      error: {
        isError: false,
        status: response.status,
        cause: null,
      },
      data: resData as R,
    };
  } catch (error: unknown) {
    if ((error as DOMException)?.name === "AbortError") {
      return {
        error: {
          isError: true,
          status: 499,
          cause: {
            status: 499,
            cause: {
              service: "The request was manually aborted by the client",
            },
          },
        },

        data: null,
      };
    }

    if (error instanceof ApiServiceError) {
      return {
        error: {
          isError: true,
          status: error.status,
          cause: error.resErrors as E,
        },

        data: null,
      };
    } else {
      return {
        error: {
          isError: true,
          status: 500,
          cause: {
            status: 500,
            cause: {
              service: "We're having some issues. Please try again later",
            },
          },
        },
        data: null,
      };
    }
  }
};
