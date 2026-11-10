"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon, Loader2Icon, SendIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMe } from "@/features/auth/auth.hooks";
import { formatPKR } from "@/lib/money";
import {
  useAddComment,
  useDeleteComment,
  useExpenseComments,
  useRemoveReceipt,
  useUploadReceipt,
} from "../expenses.hooks";
import type { Expense } from "../expenses.types";

const MAX_RECEIPT_BYTES = 5 * 1024 * 1024;

const timeFormat = new Intl.DateTimeFormat("en-PK", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export function ExpenseDetailsDialog({
  expense,
  trigger,
}: {
  expense: Expense;
  trigger: React.ReactElement;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{expense.description}</DialogTitle>
          <DialogDescription>
            {formatPKR(expense.amount)} · paid by {expense.paidBy.name ?? expense.paidBy.email}
          </DialogDescription>
        </DialogHeader>
        <Receipt expense={expense} />
        <Comments expenseId={expense.id} enabled={open} />
      </DialogContent>
    </Dialog>
  );
}

function Receipt({ expense }: { expense: Expense }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();
  const upload = useUploadReceipt(expense.id);
  const remove = useRemoveReceipt(expense.id);

  function onPick(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Please choose an image");
    if (file.size > MAX_RECEIPT_BYTES) return setError("The image must be under 5 MB");
    setError(undefined);
    upload.mutate(file);
  }

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-medium">Receipt</h3>
      {expense.receiptUrl ? (
        <a href={expense.receiptUrl} target="_blank" rel="noreferrer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={expense.receiptUrl}
            alt={`Receipt for ${expense.description}`}
            className="max-h-64 w-full rounded-md border object-contain"
          />
        </a>
      ) : (
        <p className="text-sm text-muted-foreground">No receipt attached.</p>
      )}
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            onPick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={upload.isPending}
          onClick={() => inputRef.current?.click()}
        >
          {upload.isPending ? <Loader2Icon className="animate-spin" /> : <ImageIcon />}
          {expense.receiptUrl ? "Replace" : "Add receipt"}
        </Button>
        {expense.receiptUrl && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={remove.isPending}
            onClick={() => remove.mutate()}
          >
            <Trash2Icon />
            Remove
          </Button>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </section>
  );
}

function Comments({ expenseId, enabled }: { expenseId: string; enabled: boolean }) {
  const { data: me } = useMe();
  const comments = useExpenseComments(expenseId, enabled);
  const add = useAddComment(expenseId);
  const remove = useDeleteComment(expenseId);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const count = comments.data?.length ?? 0;

  // Keep the newest comment in view.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [count]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    add.mutate(body, { onSuccess: () => setText("") });
  }

  return (
    <section className="space-y-2">
      <h3 className="text-sm font-medium">Comments</h3>
      {/* Fixed height so the dialog never grows as comments are added; the list scrolls. */}
      <div ref={listRef} className="h-44 overflow-y-auto rounded-md border p-2">
      {comments.isPending ? (
        <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
      ) : comments.data?.length ? (
        <ul className="space-y-3">
          {comments.data.map((comment) => (
            <li key={comment.id} className="flex items-start gap-2 text-sm">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">
                  {comment.user.id === me?.id ? "You" : (comment.user.name ?? comment.user.email)}
                  {" · "}
                  {timeFormat.format(new Date(comment.createdAt))}
                </p>
                <p className="break-words whitespace-pre-wrap">{comment.body}</p>
              </div>
              {comment.user.id === me?.id && (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Delete comment"
                  disabled={remove.isPending}
                  onClick={() => remove.mutate(comment.id)}
                >
                  <Trash2Icon />
                </Button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet.</p>
      )}
      </div>
      <form onSubmit={submit} className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a comment"
          maxLength={500}
          aria-label="Add a comment"
        />
        <Button
          type="submit"
          size="icon"
          aria-label="Post comment"
          disabled={add.isPending || !text.trim()}
        >
          <SendIcon />
        </Button>
      </form>
    </section>
  );
}
