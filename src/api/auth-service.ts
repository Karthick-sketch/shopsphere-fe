import apiClient from "./interceptor/api-client";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../models/auth-user";

const serviceRoute = "/shopsphere-auth-service/api/auth";

export default class AuthService {
  static async login(loginRequest: LoginRequest): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>(
      `${serviceRoute}/login`,
      loginRequest,
    );
    return res.data;
  }

  static async register(
    registerRequest: RegisterRequest,
  ): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>(
      `${serviceRoute}/register`,
      registerRequest,
    );
    return res.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post(`${serviceRoute}/logout`);
  }

  static async refreshToken(): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>(
      `${serviceRoute}/refresh`,
      {},
      { withCredentials: true },
    );
    return res.data;
  }
}
