import { api } from "@/lib/api";
import type { User } from "@/types/user";

export const usersService = {
  list: () => api<User[]>("/users"),
  get: (id: string) => api<User>(`/users/${id}`),
  create: (data: { email: string; name?: string }) =>
    api<User>("/users", { method: "POST", body: JSON.stringify(data) }),
};
