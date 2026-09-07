import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-provider";
// import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";
import LoginPage from "./pages/login-page";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
