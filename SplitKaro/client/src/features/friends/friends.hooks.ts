"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { friendsApi } from "./friends.api";

export const friendKeys = {
  all: ["friends"] as const,
  invites: ["friends", "invites"] as const,
};

export function useFriends() {
  return useQuery({ queryKey: friendKeys.all, queryFn: friendsApi.list });
}

export function useFriendInvites() {
  return useQuery({ queryKey: friendKeys.invites, queryFn: friendsApi.invites });
}

export function useAddFriend() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: friendsApi.add,
    onSuccess: (result) => {
      // Invalidates both the friend list and the pending invites.
      queryClient.invalidateQueries({ queryKey: friendKeys.all });
      if (result.status === "added") {
        toast.success(`${result.friend.name ?? result.friend.email} is now your friend`);
      } else {
        toast.success(`Invite saved. ${result.email} will be added when they sign up.`);
      }
    },
  });
}

export function useCancelInvite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: friendsApi.cancelInvite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: friendKeys.invites }),
    onError: () => toast.error("Could not cancel the invite"),
  });
}
