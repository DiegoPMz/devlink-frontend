import { useStoreApp } from "@/store";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const { id, credentials } = useStoreApp((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const validCredential = id && credentials;
  const noProtectedRoutes = pathname === "/" || pathname === "/signup";

  useEffect(() => {
    if (!validCredential) return navigate("/");

    if (noProtectedRoutes) {
      return navigate("/links", { replace: true });
    }
  }, [validCredential, noProtectedRoutes, navigate]);

  return <Outlet />;
};
