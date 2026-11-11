"use client";

import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "./notifications.api";

export const notificationKeys = {
  all: ["notifications"] as const,
  list: ["notifications", "list"] as const,
  unread: ["notifications", "unread"] as const,
};

// Polled so the bell badge updates without a refresh. React Query pauses it in hidden tabs.
export const NOTIFICATION_POLL_MS = 30_000;

export function useUnreadCount() {
  return useQuery({
    queryKey: notificationKeys.unread,
    queryFn: notificationsApi.unreadCount,
    select: (data) => data.count,
    refetchInterval: NOTIFICATION_POLL_MS,
    staleTime: 0,
  });
}

export function useNotifications(enabled: boolean) {
  return useInfiniteQuery({
    queryKey: notificationKeys.list,
    queryFn: ({ pageParam }) => notificationsApi.list(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (last) => last.nextCursor ?? undefined,
    enabled,
    staleTime: 0,
  });
}

export function useMarkRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}

export function useMarkAllRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationsApi.markAllRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}
