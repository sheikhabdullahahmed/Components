export type NotificationType =
  | "EXPENSE_ADDED"
  | "EXPENSE_DELETED"
  | "EXPENSE_COMMENT"
  | "SETTLEMENT_ADDED"
  | "FRIEND_ADDED"
  | "GROUP_ADDED";

export type AppNotification = {
  id: string;
  type: NotificationType;
  message: string;
  expenseId: string | null;
  groupId: string | null;
  readAt: string | null;
  createdAt: string;
  actor: { id: string; name: string | null; email: string };
};

export type NotificationPage = {
  items: AppNotification[];
  nextCursor: string | null;
};
