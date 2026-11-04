import type { Friend } from "@/features/friends/friends.types";

// All amounts in paisa. Per person: positive = they owe you, negative = you owe them.
export type Balances = {
  net: number;
  totalOwed: number;
  totalOwe: number;
  people: { user: Friend; amount: number }[];
};
