import { api } from "@/lib/api";
import type { AddFriendResult, Friend, FriendInvite } from "./friends.types";

export const friendsApi = {
  list: () => api<Friend[]>("/friends"),

  add: (email: string) =>
    api<AddFriendResult>("/friends", { method: "POST", body: JSON.stringify({ email }) }),

  remove: (id: string) => api<void>(`/friends/${id}`, { method: "DELETE" }),

  invites: () => api<FriendInvite[]>("/friends/invites"),

  cancelInvite: (id: string) => api<void>(`/friends/invites/${id}`, { method: "DELETE" }),
};
