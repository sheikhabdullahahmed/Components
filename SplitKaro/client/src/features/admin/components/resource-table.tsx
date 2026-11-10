"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon, Trash2Icon } from "lucide-react";
import { useConfirm } from "@/components/shared/confirm-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminDelete, useAdminList } from "../admin.hooks";
import type { AdminResource } from "../admin.types";

export type Column<T> = {
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T extends { id: string }> = {
  resource: AdminResource;
  searchPlaceholder: string;
  columns: Column<T>[];
  // Text for the confirm dialog, e.g. { title: "Delete ali@x.com?", description: "..." }.
  confirmDelete: (row: T) => { title: string; description: string };
  // Return false to disable the delete button for a row.
  canDelete?: (row: T) => boolean;
  emptyText: string;
};

export function ResourceTable<T extends { id: string }>({
  resource,
  searchPlaceholder,
  columns,
  confirmDelete,
  canDelete = () => true,
  emptyText,
}: Props<T>) {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const list = useAdminList<T>(resource, { page, search });
  const remove = useAdminDelete(resource);
  const confirm = useConfirm();

  // Wait for a pause in typing before searching, and go back to the first page.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [input]);

  const data = list.data;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  // A page can become empty after deleting its last row.
  useEffect(() => {
    if (data && page > totalPages) setPage(totalPages);
  }, [data, page, totalPages]);

  return (
    <div className="space-y-3">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={searchPlaceholder}
        aria-label={searchPlaceholder}
        className="max-w-sm"
      />

      <div className="overflow-x-auto rounded-md border">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-xs text-muted-foreground uppercase">
            <tr>
              {columns.map((column) => (
                <th key={column.header} className={`px-3 py-2 font-medium ${column.className ?? ""}`}>
                  {column.header}
                </th>
              ))}
              <th className="w-12 px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {list.isPending ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-10 text-center">
                  <Loader2Icon className="mx-auto size-5 animate-spin text-muted-foreground" />
                </td>
              </tr>
            ) : list.isError ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-10 text-center text-destructive">
                  Could not load this list.
                </td>
              </tr>
            ) : data?.items.length ? (
              data.items.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.header} className={`px-3 py-2 ${column.className ?? ""}`}>
                      {column.cell(row)}
                    </td>
                  ))}
                  <td className="px-3 py-2 text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Delete"
                      disabled={remove.isPending || !canDelete(row)}
                      onClick={async () => {
                        const ok = await confirm({
                          ...confirmDelete(row),
                          confirmLabel: "Delete",
                          destructive: true,
                        });
                        if (ok) remove.mutate(row.id);
                      }}
                    >
                      <Trash2Icon />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-10 text-center text-muted-foreground"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {data && data.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {data.total} total · page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
