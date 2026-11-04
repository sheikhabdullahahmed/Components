"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "./auth.api";
import type { AuthUser } from "./auth.types";

export const authKeys = {
  me: ["auth", "me"] as const,
};

export function useMe() {
  return useQuery({ queryKey: authKeys.me, queryFn: authApi.me });
}

// Shared success path for login and signup: cache the user, then go home.
function useOnAuthenticated() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (user: AuthUser) => {
    queryClient.setQueryData(authKeys.me, user);
    router.replace("/");
  };
}

export function useLogin() {
  const onAuthenticated = useOnAuthenticated();
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      toast.success(`Welcome back, ${user.name ?? user.email}`);
      onAuthenticated(user);
    },
  });
}

export function useSignup() {
  const onAuthenticated = useOnAuthenticated();
  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: (user) => {
      toast.success("Account created");
      onAuthenticated(user);
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.setQueryData(authKeys.me, null);
      queryClient.removeQueries({ predicate: (q) => q.queryKey[0] !== "auth" });
      router.replace("/login");
    },
    onError: () => toast.error("Could not log out, please try again"),
  });
}
