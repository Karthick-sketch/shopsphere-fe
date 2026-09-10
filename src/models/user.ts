import { UserRole } from "../types/user-role";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type { User };
