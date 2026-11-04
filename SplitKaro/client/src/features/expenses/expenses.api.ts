import { api } from "@/lib/api";
import type { CreateExpenseInput, Expense, ExpenseFilters } from "./expenses.types";

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
};
