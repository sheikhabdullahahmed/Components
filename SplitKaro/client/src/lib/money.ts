const pkr = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR" });

// The API stores and returns amounts in paisa (1 PKR = 100 paisa).
export function formatPKR(paisa: number) {
  return pkr.format(paisa / 100);
}

// Mirrors the server: leftover paisa go to the first shares.
export function splitEqually(total: number, count: number) {
  const base = Math.floor(total / count);
  const remainder = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}
