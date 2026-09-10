import { apiClient, setBackendStatus } from "./apiClient";
import type { User } from "../models/user";
import { initialUsers } from "./mockData";

const localUsers: User[] = [...initialUsers];

const servicePath = "/SHOPSPHERE-USER-SERVICE/api/users";

export const userService = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get<User[]>(servicePath);
      setBackendStatus(true);
      return response.data;
    } catch {
      setBackendStatus(false);
      return [...localUsers];
    }
  },

  async getUserById(id: number): Promise<User | undefined> {
    try {
      const response = await apiClient.get<User>(`/user/${id}`);
      setBackendStatus(true);
      return response.data;
    } catch {
      setBackendStatus(false);
      return localUsers.find((u) => u.id === id);
    }
  },

  async login(email: string, _password?: string): Promise<User | undefined> {
    try {
      const response = await apiClient.post<User>("/user/login", {
        email,
        password: _password,
      });
      setBackendStatus(true);
      return response.data;
    } catch {
      setBackendStatus(false);
      // Fallback: match by email or return first user
      return (
        localUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
        localUsers[0]
      );
    }
  },
};
