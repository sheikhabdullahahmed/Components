"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { balanceKeys } from "@/features/balances/balances.hooks";
import type { ExpenseFilters } from "@/features/expenses/expenses.types";
import { ApiError } from "@/lib/api";
import { formatPKR } from "@/lib/money";
import { settlementsApi } from "./settlements.api";

export const settlementKeys = {
  all: ["settlements"] as const,
  list: (filters: ExpenseFilters) => ["settlements", filters] as const,
};

export function useSettlements(filters: ExpenseFilters = {}) {
  return useQuery({
    queryKey: settlementKeys.list(filters),
    queryFn: () => settlementsApi.list(filters),
  });
}

export function useCreateSettlement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: settlementsApi.create,
    onSuccess: (settlement) => {
      queryClient.invalidateQueries({ queryKey: settlementKeys.all });
      queryClient.invalidateQueries({ queryKey: balanceKeys.all });
      toast.success(`Recorded a payment of ${formatPKR(settlement.amount)}`);
    },
  });
}

export function useDeleteSettlement() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: settlementsApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settlementKeys.all });
      queryClient.invalidateQueries({ queryKey: balanceKeys.all });
      toast.success("Payment deleted");
    },
    onError: (error) =>
      toast.error(error instanceof ApiError ? error.message : "Could not delete the payment"),
  });
}
