export const UserRole = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];
