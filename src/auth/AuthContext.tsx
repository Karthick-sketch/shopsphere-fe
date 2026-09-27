import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";
import AuthService from "../api/auth-service";
import AccessTokenStore from "../api/interceptor/access-token-store";
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
} from "../models/auth-user";

interface AuthContextValue {
  user: AuthUser | null;
  login: (loginRequest: LoginRequest) => Promise<void>;
  register: (registerRequest: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = AccessTokenStore.getAccessToken();
    if (token) {
      return;
    }

    AuthService.refreshToken()
      .then((response) => {
        if (!response.accessToken || !response.authUser) {
          throw new Error("Invalid response from server");
        }

        AccessTokenStore.setAccessToken(response.accessToken);
        setUser(response.authUser);
      })
      .catch((error) => {
        console.error("Failed to refresh token:", error);
        clearUser();
      });
  }, []);

  const login = useCallback(async (loginRequest: LoginRequest) => {
    const response = await AuthService.login(loginRequest);

    if (!response.accessToken || !response.authUser) {
      throw new Error("Invalid response from server");
    }

    AccessTokenStore.setAccessToken(response.accessToken);
    setUser(response.authUser);
  }, []);

  const register = useCallback(async (registerRequest: RegisterRequest) => {
    const response = await AuthService.register(registerRequest);

    if (!response.accessToken || !response.authUser) {
      throw new Error("Invalid response from server");
    }

    AccessTokenStore.setAccessToken(response.accessToken);
    setUser(response.authUser);
  }, []);

  const logout = useCallback(() => {
    clearUser();
    AuthService.logout();
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    AccessTokenStore.clearAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
