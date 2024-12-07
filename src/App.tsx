import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LinksPage } from "./pages/LinksPage";
import { LoginPage } from "./pages/LoginPage";
import { PreviewPage } from "./pages/PreviewPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RegisterPage } from "./pages/RegisterPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/links" element={<LinksPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Route>
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
