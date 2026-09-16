export function computeStats(
  transactions: { amount: number; categoryId: string }[],
  categories: { id: string; name: string; color: string }[],
) {
  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  const byCategory = categories
    .map((c) => ({
      ...c,
      amount: transactions
        .filter((tx) => tx.categoryId === c.id)
        .reduce((sum, tx) => sum + tx.amount, 0),
    }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  return { total, byCategory };
}