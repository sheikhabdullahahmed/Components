"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiError } from "@/lib/api";
import { groupsApi } from "./groups.api";
import type { Group } from "./groups.types";

export const groupKeys = {
  all: ["groups"] as const,
  detail: (id: string) => ["groups", id] as const,
};

function showError(error: unknown) {
  toast.error(error instanceof ApiError ? error.message : "Something went wrong");
}

export function useGroups() {
  return useQuery({ queryKey: groupKeys.all, queryFn: groupsApi.list });
}

export function useGroup(id: string) {
  return useQuery({
    queryKey: groupKeys.detail(id),
    queryFn: () => groupsApi.get(id),
    enabled: Boolean(id),
  });
}

// Mutations that return the updated group refresh both its detail and the sidebar list.
function useSetGroup() {
  const queryClient = useQueryClient();
  return (group: Group) => {
    queryClient.setQueryData(groupKeys.detail(group.id), group);
    queryClient.invalidateQueries({ queryKey: groupKeys.all, exact: true });
  };
}

export function useCreateGroup() {
  const setGroup = useSetGroup();
  const router = useRouter();
  return useMutation({
    mutationFn: groupsApi.create,
    onSuccess: (group) => {
      setGroup(group);
      toast.success(`Group "${group.name}" created`);
      router.push(`/groups/${group.id}`);
    },
  });
}

export function useRenameGroup(id: string) {
  const setGroup = useSetGroup();
  return useMutation({
    mutationFn: (name: string) => groupsApi.rename(id, name),
    onSuccess: setGroup,
    onError: showError,
  });
}

export function useAddGroupMember(id: string) {
  const setGroup = useSetGroup();
  return useMutation({
    mutationFn: (userId: string) => groupsApi.addMember(id, userId),
    onSuccess: setGroup,
    onError: showError,
  });
}

export function useRemoveGroupMember(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => groupsApi.removeMember(id, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: groupKeys.all }),
    onError: showError,
  });
}

// Leaving and deleting both take the user away from the group page.
function useExitGroup(id: string, mutationFn: () => Promise<void>, message: string) {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      router.push("/");
      queryClient.removeQueries({ queryKey: groupKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: groupKeys.all, exact: true });
      toast.success(message);
    },
    onError: showError,
  });
}

export function useLeaveGroup(id: string, userId: string) {
  return useExitGroup(id, () => groupsApi.removeMember(id, userId), "You left the group");
}

export function useDeleteGroup(id: string) {
  return useExitGroup(id, () => groupsApi.remove(id), "Group deleted");
}
