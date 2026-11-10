import { api } from "@/lib/api";
import type { AdminOverview, AdminResource, ListParams, Paged } from "./admin.types";

export const adminApi = {
  // Succeeds for admins, fails with 403 for everyone else.
  me: () => api<{ admin: true }>("/admin/me"),

  overview: () => api<AdminOverview>("/admin/overview"),

  list: <T>(resource: AdminResource, { page, search }: ListParams) => {
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    return api<Paged<T>>(`/admin/${resource}?${params}`);
  },

  remove: (resource: AdminResource, id: string) =>
    api<void>(`/admin/${resource}/${id}`, { method: "DELETE" }),
};
