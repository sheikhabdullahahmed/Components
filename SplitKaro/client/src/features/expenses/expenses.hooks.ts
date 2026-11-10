"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { balanceKeys } from "@/features/balances/balances.hooks";
import { ApiError } from "@/lib/api";
import { expensesApi } from "./expenses.api";
import type { ExpenseFilters } from "./expenses.types";

export const expenseKeys = {
  all: ["expenses"] as const,
  list: (filters: ExpenseFilters) => ["expenses", filters] as const,
};

export function useExpenses(filters: ExpenseFilters = {}) {
  return useQuery({
    queryKey: expenseKeys.list(filters),
    queryFn: () => expensesApi.list(filters),
  });
}

export function useCreateExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expensesApi.create,
    onSuccess: (expense) => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      queryClient.invalidateQueries({ queryKey: balanceKeys.all });
      toast.success(`Added "${expense.description}"`);
    },
  });
}

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expensesApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      queryClient.invalidateQueries({ queryKey: balanceKeys.all });
      toast.success("Expense deleted");
    },
    onError: (error) =>
      toast.error(error instanceof ApiError ? error.message : "Could not delete the expense"),
  });
}
