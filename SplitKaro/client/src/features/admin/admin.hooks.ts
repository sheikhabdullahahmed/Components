"use client";

import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "@/features/auth/auth.api";
import { authKeys } from "@/features/auth/auth.hooks";
import type { LoginInput } from "@/features/auth/auth.types";
import { ApiError } from "@/lib/api";
import { adminApi } from "./admin.api";
import type { AdminResource, ListParams } from "./admin.types";

const adminKeys = {
  all: ["admin"] as const,
  me: ["admin", "me"] as const,
  overview: ["admin", "overview"] as const,
  list: (resource: AdminResource, params: ListParams) => ["admin", resource, params] as const,
};

export function useAdminCheck() {
  return useQuery({ queryKey: adminKeys.me, queryFn: adminApi.me, retry: false });
}

// Logs in, then confirms the account is an admin. A normal user is logged straight back out.
export function useAdminLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const user = await authApi.login(input);
      try {
        await adminApi.me();
      } catch (error) {
        await authApi.logout().catch(() => undefined);
        if (error instanceof ApiError && error.status === 403) {
          throw new ApiError(403, "This account does not have admin access");
        }
        throw error;
      }
      return user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(authKeys.me, user);
      queryClient.setQueryData(adminKeys.me, { admin: true });
      router.replace("/admin");
    },
  });
}

export function useAdminOverview() {
  return useQuery({ queryKey: adminKeys.overview, queryFn: adminApi.overview });
}

export function useAdminList<T>(resource: AdminResource, params: ListParams) {
  return useQuery({
    queryKey: adminKeys.list(resource, params),
    queryFn: () => adminApi.list<T>(resource, params),
    // Keep showing the old rows while the next page or search loads.
    placeholderData: keepPreviousData,
  });
}

export function useAdminDelete(resource: AdminResource) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminApi.remove(resource, id),
    onSuccess: () => {
      // Deleting can change the overview numbers and other lists too.
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
      toast.success("Deleted");
    },
    onError: (error) =>
      toast.error(error instanceof ApiError ? error.message : "Could not delete"),
  });
}
