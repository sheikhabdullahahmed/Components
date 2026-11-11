import { api } from "@/lib/api";
import type { NotificationPage } from "./notifications.types";

export const notificationsApi = {
  list: (cursor?: string) =>
    api<NotificationPage>(`/notifications${cursor ? `?cursor=${cursor}` : ""}`),

  unreadCount: () => api<{ count: number }>("/notifications/unread-count"),

  markRead: (id: string) => api<void>(`/notifications/${id}/read`, { method: "PATCH" }),

  markAllRead: () => api<void>("/notifications/read-all", { method: "PATCH" }),
};
