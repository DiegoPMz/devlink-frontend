import { apiRefreshTokenService } from "@/service/api-service";
import { useStoreApp } from "@/store";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";

const NOT_PROTECTED_ROUTES = ["/", "/signup", "/template"];

export const AuthRefreshController = () => {
  const [isPendingAuth, setIsPendingAuth] = useState(true);
  const abortController = useRef<AbortController | undefined>(undefined);

  const credentials = useStoreApp((state) => state.user.credentials);
  const id = useStoreApp((state) => state.user.id);
  const storeClearState = useStoreApp((state) => state.user.clearState);

  const location = useLocation();
  const isAuthSuccessRedirect: true | undefined =
    location.state?.isAuthSuccessRedirect;
  const isANotProtectedRoute = NOT_PROTECTED_ROUTES.includes(location.pathname);

  const hasValidCredentials = useCallback(() => {
    const isValidRole = credentials?.roles !== undefined;
    const isValidId = !id;
    return !isValidId && isValidRole;
  }, [credentials, id]);

  useEffect(() => {
    if (isANotProtectedRoute || !hasValidCredentials()) return;
    if (isAuthSuccessRedirect) return setIsPendingAuth(false);

    abortController.current?.abort();
    abortController.current = new AbortController();

    const triggerInitialService = async () => {
      const response = await apiRefreshTokenService(
        abortController.current?.signal,
      );
      setIsPendingAuth(false);

      if (response.error.isError) {
        if (response.error.status !== 499) {
          toast("Oops! Your session ended. Please log in to continue", {
            duration: 8000,
          });
          storeClearState();
        }
      }
    };

    const initialTriggerTimeout = setTimeout(() => {
      triggerInitialService();
    }, 50);
    return () => clearTimeout(initialTriggerTimeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const TOKEN_EXPIRED_TIME = 9 * 60 * 1000;
    let interval: NodeJS.Timeout | undefined = undefined;

    hasValidCredentials()
      ? (interval = setInterval(() => {
          apiRefreshTokenService()
            .then((res) => {
              if (res.error.isError) {
                if (res.error.status !== 499) {
                  toast("Oops! Your session ended. Please log in to continue", {
                    duration: 8000,
                  });
                  storeClearState();
                }
              }
            })
            .finally(() => setIsPendingAuth(false));
        }, TOKEN_EXPIRED_TIME))
      : clearInterval(interval);

    return () => {
      if (interval) clearInterval(interval);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasValidCredentials, isANotProtectedRoute]);

  return isPendingAuth ? (
    <div className="h-dvh w-full bg-bg-color-primary" />
  ) : (
    <Outlet />
  );
};
