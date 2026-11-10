// Amounts are in paisa.
type Person = { id: string; name: string | null; email: string };

export type Paged<T> = { items: T[]; total: number; page: number; pageSize: number };

export type ListParams = { page: number; search: string };

export type AdminOverview = {
  users: number;
  groups: number;
  expenses: number;
  settlements: number;
  invites: number;
  totalAmount: number;
};

export type AdminUser = Person & {
  createdAt: string;
  google: boolean;
  friends: number;
  groups: number;
  expenses: number;
};

export type AdminInvite = {
  id: string;
  email: string;
  createdAt: string;
  invitedBy: Person;
};

export type AdminExpense = {
  id: string;
  description: string;
  amount: number;
  date: string;
  receiptUrl: string | null;
  group: { id: string; name: string } | null;
  paidBy: Person;
  _count: { comments: number; splits: number };
};

export type AdminGroup = {
  id: string;
  name: string;
  createdAt: string;
  createdBy: Person;
  _count: { members: number; expenses: number };
};

export type AdminResource = "users" | "invites" | "expenses" | "groups";
