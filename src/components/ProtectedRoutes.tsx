import { useStoreApp } from "@/store";
import { useCallback, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const NOT_PROTECTED_ROUTES = ["/", "/signup", "/template"];

export const ProtectedRoutes = () => {
  const credentials = useStoreApp((state) => state.user.credentials);
  const id = useStoreApp((state) => state.user.id);

  const verifyCredentials = useCallback(() => {
    const isValidRole = credentials?.roles !== undefined;
    const isValidId = !id;
    return !isValidId && isValidRole;
  }, [credentials, id]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isNotProtectedRoute = NOT_PROTECTED_ROUTES.includes(
      location.pathname,
    );

    const hasValidCredentials = verifyCredentials();

    if (!hasValidCredentials) {
      return isNotProtectedRoute ? undefined : navigate("/");
    }

    const invalidRoutesForUserAuth = NOT_PROTECTED_ROUTES.slice(0, -1).includes(
      location.pathname,
    );
    return invalidRoutesForUserAuth
      ? navigate("/links", { replace: true })
      : undefined;
  }, [location.pathname, navigate, verifyCredentials]);

  return <Outlet />;
};
