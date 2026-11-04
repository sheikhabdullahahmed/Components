import type { Friend } from "@/features/friends/friends.types";

// `payer` gave `amount` paisa to `payee`.
export type Settlement = {
  id: string;
  amount: number;
  date: string;
  createdAt: string;
  group: { id: string; name: string } | null;
  payer: Friend;
  payee: Friend;
};

export type CreateSettlementInput = {
  payerId: string;
  payeeId: string;
  // In rupees.
  amount: number;
  groupId?: string;
  date?: string;
};
