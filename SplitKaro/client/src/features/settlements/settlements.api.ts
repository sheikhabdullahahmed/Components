import { api } from "@/lib/api";
import type { ExpenseFilters } from "@/features/expenses/expenses.types";
import type { CreateSettlementInput, Settlement } from "./settlements.types";

export const settlementsApi = {
  list: (filters: ExpenseFilters = {}) => {
    const params = new URLSearchParams(
      Object.entries(filters).filter((entry): entry is [string, string] => Boolean(entry[1])),
    );
    const query = params.size ? `?${params}` : "";
    return api<Settlement[]>(`/settlements${query}`);
  },

  create: (data: CreateSettlementInput) =>
    api<Settlement>("/settlements", { method: "POST", body: JSON.stringify(data) }),

  remove: (id: string) => api<void>(`/settlements/${id}`, { method: "DELETE" }),
};
