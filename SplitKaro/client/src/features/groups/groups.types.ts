import type { Friend } from "@/features/friends/friends.types";

export type GroupSummary = {
  id: string;
  name: string;
  _count: { members: number };
};

export type GroupMember = Friend;

export type Group = {
  id: string;
  name: string;
  createdById: string;
  createdAt: string;
  members: GroupMember[];
};

export type CreateGroupInput = {
  name: string;
  memberIds: string[];
};
