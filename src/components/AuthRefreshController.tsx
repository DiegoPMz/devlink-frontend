import { apiRefreshTokenService } from "@/service/api-service";
import { useStoreApp } from "@/store";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";

const NOT_PROTECTED_ROUTES = ["/", "/signup", "/template"];

export const AuthRefreshController = () => {
  const [isPendingAuth, setIsPendingAuth] = useState(true);

  const credentials = useStoreApp((state) => state.user.credentials);
  const id = useStoreApp((state) => state.user.id);
  const clearState = useStoreApp((state) => state.user.clearState);

  const location = useLocation();
  const isAuthSuccessRedirect: true | undefined =
    location.state?.isAuthSuccessRedirect;
  const isANotProtectedRoute = NOT_PROTECTED_ROUTES.includes(location.pathname);

  const hasValidCredentials = useCallback(() => {
    const isValidRole = credentials?.roles !== undefined;
    const isValidId = !id;
    return !isValidId && isValidRole;
  }, [credentials, id]);

  const authServiceCall = useCallback(async () => {
    const response = await apiRefreshTokenService();
    if (response.error.isError) {
      clearState();
      return response;
    }
    return response;
  }, [clearState]);

  useEffect(() => {
    if (isANotProtectedRoute || !hasValidCredentials()) return;
    if (isAuthSuccessRedirect) return setIsPendingAuth(false);

    const triggerInitialService = async () => {
      const response = await authServiceCall();
      if (response.error.isError)
        toast("Oops! Your session ended. Please log in to continue", {
          duration: 8000,
        });

      setIsPendingAuth(false);
    };

    triggerInitialService();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const TOKEN_EXPIRED_TIME = 9 * 60 * 1000;
    let interval: NodeJS.Timeout | undefined = undefined;

    hasValidCredentials()
      ? (interval = setInterval(() => {
          authServiceCall().then((res) => {
            if (res.error.isError)
              toast("An error occurred. Please log in again 😞", {
                duration: 8000,
              });
          });
        }, TOKEN_EXPIRED_TIME))
      : clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearState, hasValidCredentials, isANotProtectedRoute]);

  return isPendingAuth ? (
    <div className="h-dvh w-full bg-bg-color-primary" />
  ) : (
    <Outlet />
  );
};
