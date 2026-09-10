import { Transaction } from '@/entities/transaction/model/types';
import { categories } from './categories';

function randomTransaction(id: number): Transaction {
  const category = categories[Math.floor(Math.random() * categories.length)];
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);

  return {
    id: `tx-${id}`,
    title: `Транзакция ${id}`,
    amount: Math.round((Math.random() * 5000 + 100) * 100) / 100,
    categoryId: category.id,
    date: date.toISOString(),
  };
}

export let transactions: Transaction[] = Array.from({ length: 5000 }, (_, i) =>
  randomTransaction(i + 1)
);