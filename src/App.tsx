import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ThemeProvider from "./components/ThemeProvider";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LinksPage = lazy(() => import("./pages/LinksPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PreviewPage = lazy(() => import("./pages/PreviewPage"));
const TemplatePage = lazy(() => import("./pages/TemplatePage"));

const App = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />

            <Route element={<ThemeProvider />}>
              <Route path="/links" element={<LinksPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/preview" element={<PreviewPage />} />
            </Route>
          </Route>
          <Route
            path="/template/:templateId"
            element={<TemplatePage />}
            errorElement
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Suspense>

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
