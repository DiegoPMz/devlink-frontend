import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ThemeProvider from "./components/ThemeProvider";
import { SkeletonLinksPage } from "./pages/LinksPage/components/SkeletonLinksPage";
import { SkeletonLoginPage } from "./pages/LoginPage/components/SkeletonLoginPage";
import { SkeletonPreviewPage } from "./pages/PreviewPage/components/SkeletonPreviewPage";
import { SkeletonProfilePage } from "./pages/ProfilePage/components/SkeletonProfilePage";
import { SkeletonRegisterPage } from "./pages/RegisterPage/components/SkeletonRegisterPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const TemplatePage = lazy(() => import("./pages/TemplatePage"));

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<SkeletonLoginPage />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/signup"
            element={
              <Suspense fallback={<SkeletonRegisterPage />}>
                <RegisterPage />
              </Suspense>
            }
          />

          <Route element={<ThemeProvider />}>
            <Route
              path="/links"
              element={
                <Suspense fallback={<SkeletonLinksPage />}>
                  <LinksPage />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<SkeletonProfilePage />}>
                  <ProfilePage />
                </Suspense>
              }
            />
            <Route
              path="/preview"
              element={
                <Suspense fallback={<SkeletonPreviewPage />}>
                  <PreviewPage />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route
          path="/template/:templateId"
          element={<TemplatePage />}
          errorElement
        />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder
        toastOptions={{
          style: {
            backgroundColor: "var(--bg-color-primary)",
            color: "var(--txt-color-secondary)",
            border: "1px solid var(--ui-border-color,red)",
          },
        }}
      />
    </>
  );
};
export default App;
