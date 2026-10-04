import { registerLogoutHandler, setStoredAccessToken } from "@/lib/auth-token";
import { type ReactNode, createContext, useEffect, useState } from "react";

interface AuthProviderProp {
  children: ReactNode;
}
type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: AuthProviderProp) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken !== null) {
      registerLogoutHandler(() => setAccessToken(null));
    }
  }, []);

  useEffect(() => {
    setStoredAccessToken(accessToken);
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
