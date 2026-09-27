import type { UserRoleType } from "../enums/user-role";

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRoleType;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
}

interface AuthResponse {
  accessToken: string;
  authUser: AuthUser;
}

export type { AuthUser, LoginRequest, RegisterRequest, AuthResponse };
