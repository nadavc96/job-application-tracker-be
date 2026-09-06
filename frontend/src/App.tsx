import LoginPage from "@/pages/LoginPage";
import { AuthProvider } from "./context/auth-provider";

function App() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}

export default App;
