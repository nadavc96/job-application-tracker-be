import { type ReactNode, createContext, useState } from "react";

interface AuthProviderProp {
  children: ReactNode;
}
type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (tokeen: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: AuthProviderProp) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
