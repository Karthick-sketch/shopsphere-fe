import { UserRole } from "../constants/user-role";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type { User };
