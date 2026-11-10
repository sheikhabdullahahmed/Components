"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Balances } from "./balances.types";

export const balanceKeys = {
  all: ["balances"] as const,
  forGroup: (groupId?: string) => ["balances", groupId ?? "all"] as const,
};

export function useBalances(groupId?: string) {
  return useQuery({
    queryKey: balanceKeys.forGroup(groupId),
    queryFn: () => api<Balances>(groupId ? `/balances?groupId=${groupId}` : "/balances"),
  });
}
