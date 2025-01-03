import { useStoreApp } from "@/store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const credentials = useStoreApp((state) => state.user.credentials);
  const id = useStoreApp((state) => state.user.id);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const validCredential = id && credentials;
  const noProtectedRoutes = pathname === "/" || pathname === "/signup";

  useEffect(() => {
    if (!validCredential) {
      return !noProtectedRoutes ? navigate("/") : navigate(pathname);
    }

    if (noProtectedRoutes) {
      return navigate("/links", { replace: true });
    }
  }, [validCredential, noProtectedRoutes, navigate, pathname]);

  return <Outlet />;
};
