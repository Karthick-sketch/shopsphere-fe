import type { UserRoleType } from "../types/user-role";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
}

export type { User };
