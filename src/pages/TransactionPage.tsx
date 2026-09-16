import { TransactionForm } from "@/components/TransactionForm/TransactionForm";
import { TransactionsList } from "@/components/TransactionList/TransactionList";
import { FC } from "react";

export const TransactionPage: FC = () => {
  return (
    <>
      <TransactionsList />
      <TransactionForm />
    </>
  );
};
