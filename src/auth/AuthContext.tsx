import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Simulated in-memory user store (replace with real API calls)
const MOCK_USERS: (AuthUser & { password: string })[] = [];

let nextId = 1;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem("ss_user");
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 700));

    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) {
      throw new Error("Invalid email or password.");
    }
    const { password: _pw, ...authUser } = found;
    setUser(authUser);
    localStorage.setItem("ss_user", JSON.stringify(authUser));
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await new Promise((r) => setTimeout(r, 700));

      const exists = MOCK_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (exists) {
        throw new Error("An account with this email already exists.");
      }
      const newUser = { id: nextId++, name, email, password };
      MOCK_USERS.push(newUser);
      const { password: _pw, ...authUser } = newUser;
      setUser(authUser);
      localStorage.setItem("ss_user", JSON.stringify(authUser));
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("ss_user");
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
