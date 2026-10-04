import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-provider";
import SignUpPage from "@/pages/sign-up-page";
import LoginPage from "./pages/login-page";
import { DashboardPage } from "./pages/dashboard-page";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
