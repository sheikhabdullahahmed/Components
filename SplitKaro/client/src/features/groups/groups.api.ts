import { api } from "@/lib/api";
import type { CreateGroupInput, Group, GroupSummary } from "./groups.types";

export const groupsApi = {
  list: () => api<GroupSummary[]>("/groups"),

  get: (id: string) => api<Group>(`/groups/${id}`),

  create: (data: CreateGroupInput) =>
    api<Group>("/groups", { method: "POST", body: JSON.stringify(data) }),

  rename: (id: string, name: string) =>
    api<Group>(`/groups/${id}`, { method: "PATCH", body: JSON.stringify({ name }) }),

  remove: (id: string) => api<void>(`/groups/${id}`, { method: "DELETE" }),

  addMember: (id: string, userId: string) =>
    api<Group>(`/groups/${id}/members`, { method: "POST", body: JSON.stringify({ userId }) }),

  removeMember: (id: string, userId: string) =>
    api<void>(`/groups/${id}/members/${userId}`, { method: "DELETE" }),
};
