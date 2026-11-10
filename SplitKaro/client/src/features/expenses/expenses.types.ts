import type { Friend } from "@/features/friends/friends.types";

type Person = Friend;

// Amounts are in paisa.
export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  createdAt: string;
  receiptUrl: string | null;
  _count: { comments: number };
  group: { id: string; name: string } | null;
  paidBy: Person;
  createdBy: Person;
  splits: { amount: number; user: Person }[];
};

export type CreateExpenseInput = {
  description: string;
  // In rupees.
  amount: number;
  paidById: string;
  participantIds: string[];
  groupId?: string;
  date?: string;
};

export type ExpenseFilters = {
  groupId?: string;
  friendId?: string;
};

export type ExpenseComment = {
  id: string;
  body: string;
  createdAt: string;
  user: Person;
};
