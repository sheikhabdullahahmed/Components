export type Friend = {
  id: string;
  name: string | null;
  email: string;
};

export type FriendInvite = {
  id: string;
  email: string;
  createdAt: string;
};

export type AddFriendResult =
  | { status: "added"; friend: Friend }
  | { status: "invited"; email: string };
