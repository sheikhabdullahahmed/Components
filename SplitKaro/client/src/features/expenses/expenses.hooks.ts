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

const commentKeys = (expenseId: string) => ["expense-comments", expenseId] as const;

const errorToast = (fallback: string) => (error: unknown) =>
  toast.error(error instanceof ApiError ? error.message : fallback);

export function useExpenseComments(expenseId: string, enabled = true) {
  return useQuery({
    queryKey: commentKeys(expenseId),
    queryFn: () => expensesApi.comments(expenseId),
    enabled,
  });
}

export function useAddComment(expenseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: string) => expensesApi.addComment(expenseId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys(expenseId) });
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
    onError: errorToast("Could not post the comment"),
  });
}

export function useDeleteComment(expenseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (commentId: string) => expensesApi.removeComment(expenseId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys(expenseId) });
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
    },
    onError: errorToast("Could not delete the comment"),
  });
}

export function useUploadReceipt(expenseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => expensesApi.uploadReceipt(expenseId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      toast.success("Receipt saved");
    },
    onError: errorToast("Could not upload the receipt"),
  });
}

export function useRemoveReceipt(expenseId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => expensesApi.removeReceipt(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: expenseKeys.all });
      toast.success("Receipt removed");
    },
    onError: errorToast("Could not remove the receipt"),
  });
}
