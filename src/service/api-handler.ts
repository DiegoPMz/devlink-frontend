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

    if (!response.ok) throw new ApiServiceError(response.status, resData as E);

    return {
      error: {
        isError: false,
        status: response.status,
        cause: null,
      },
      data: resData as R,
    };
  } catch (error: unknown) {
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
