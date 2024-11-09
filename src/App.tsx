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
    </>
  );
};
export default App;
