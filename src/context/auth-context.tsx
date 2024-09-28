import { createContext, useMemo, useState } from "react";
export type AuthenticationStatus =
  | "REFRESHING"
  | "AUTHENTICATED"
  | "UNAUTHENTICATED";

type TAuthContext = {
  authenticationStatus: AuthenticationStatus;
  accessToken?: string;

  login: (params: { password?: string; username?: string }) => Promise<void>;

  setAuthenticationStatus: (status: AuthenticationStatus) => void;

  logout: () => Promise<void>;
};

export const AuthContext = createContext<TAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authenticationStatus, setAuthenticationStatus] =
    useState<AuthenticationStatus>("UNAUTHENTICATED");
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const login = async () => {};
  const logout = async () => {};

  const value = useMemo(
    () => ({
      authenticationStatus,
      setAuthenticationStatus,
      login,
      logout,
      accessToken,
    }),
    [authenticationStatus, setAuthenticationStatus, login, logout, accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
