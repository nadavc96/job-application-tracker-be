import { AuthProvider } from "./context/auth-provider";
import SignInPage from "@/pages/sign-in-page";
import SignUpPage from "@/pages/sign-up-page";

function App() {
  return (
    <AuthProvider>
      <SignUpPage />
    </AuthProvider>
  );
}

export default App;
