const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatCurrency(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError(`Amount must be a finite number, received ${amount}`);
  }
  return formatter.format(amount);
}
