import { api } from "@/lib/api";
import type { User } from "@/types/user";

// Users are created through the auth module (see features/auth).
export const usersService = {
  list: () => api<User[]>("/users"),
  get: (id: string) => api<User>(`/users/${id}`),
};
