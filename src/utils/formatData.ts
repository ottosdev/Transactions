export function formatAmount(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function formatDate(createdAt: string): string {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(createdAt));
}
