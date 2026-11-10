import { api } from "@/lib/api";
import type {
  CreateExpenseInput,
  Expense,
  ExpenseComment,
  ExpenseFilters,
} from "./expenses.types";

export const expensesApi = {
  list: (filters: ExpenseFilters = {}) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter((entry): entry is [string, string] => Boolean(entry[1])),
    );
    const query = params.size ? `?${params}` : "";
    return api<Expense[]>(`/expenses${query}`);
  },

  create: (data: CreateExpenseInput) =>
    api<Expense>("/expenses", { method: "POST", body: JSON.stringify(data) }),

  remove: (id: string) => api<void>(`/expenses/${id}`, { method: "DELETE" }),

  uploadReceipt: (id: string, file: File) => {
    const body = new FormData();
    body.append("file", file);
    return api<Expense>(`/expenses/${id}/receipt`, { method: "POST", body });
  },

  removeReceipt: (id: string) => api<void>(`/expenses/${id}/receipt`, { method: "DELETE" }),

  comments: (id: string) => api<ExpenseComment[]>(`/expenses/${id}/comments`),

  addComment: (id: string, body: string) =>
    api<ExpenseComment>(`/expenses/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),

  removeComment: (id: string, commentId: string) =>
    api<void>(`/expenses/${id}/comments/${commentId}`, { method: "DELETE" }),
};
