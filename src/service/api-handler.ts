import { ApiServiceError } from "@/utilities/AppCustomErrors";

interface ApiServiceObjectError {
  isError: boolean;
  status: number | null;
  cause: string | object | null;
}
interface ApiServiceStructureResponse<T> {
  error: ApiServiceObjectError;
  data: T | null;
}
export type ApiServiceResponse<I> = Promise<ApiServiceStructureResponse<I>>;

const DEFAULT_ERROR_RESPONSE: ApiServiceObjectError = {
  isError: false,
  status: null,
  cause: null,
};

const generateApiError = (
  status: ApiServiceObjectError["status"],
  cause: ApiServiceObjectError["cause"],
): ApiServiceObjectError => ({
  isError: true,
  status: status,
  cause: cause,
});

export const apiMethodHandler = async <E>(
  uri: string,
  options: RequestInit,
): ApiServiceResponse<E> => {
  try {
    const response = await fetch(uri, options);
    const resData: unknown = await response.json();

    if (!response.ok)
      throw new ApiServiceError(response.status, resData as object);

    return {
      error: DEFAULT_ERROR_RESPONSE,
      data: resData as E,
    };
  } catch (error: unknown) {
    if (error instanceof ApiServiceError) {
      return {
        error: generateApiError(error.status, error.resErrors),
        data: null,
      };
    } else {
      return {
        error: generateApiError(
          500,
          "An unexpected error occurred. Please try again later or contact support if the problem persists",
        ),
        data: null,
      };
    }
  }
};
