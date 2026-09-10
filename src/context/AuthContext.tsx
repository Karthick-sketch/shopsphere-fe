import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../models/user";
import { userService } from "../services/userService";

interface AuthContextType {
  currentUser: User | null;
  allUsers: User[];
  setCurrentUser: (user: User) => void;
  switchUserRole: (role: "ADMIN" | "USER") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    userService.getUsers().then((users) => {
      setAllUsers(users);
      if (users.length > 0) {
        // default to normal user
        const regular = users.find((u) => u.role === "USER") || users[0];
        setCurrentUserState(regular);
      }
    });
  }, []);

  const setCurrentUser = (user: User) => {
    setCurrentUserState(user);
  };

  const switchUserRole = (role: "ADMIN" | "USER") => {
    const matched = allUsers.find((u) => u.role === role);
    if (matched) {
      setCurrentUserState(matched);
    }
  };

  const logout = () => {
    if (allUsers.length > 0) {
      setCurrentUserState(allUsers[0]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        setCurrentUser,
        switchUserRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
