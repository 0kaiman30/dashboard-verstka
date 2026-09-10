import { TransactionForm } from "@/features/TransactionForm/TransactionForm";
import { TransactionsList } from "@/widgets/TransactionList/TransactionList";
import { FC } from "react";

export const TransactionPage: FC = () => {
  return (
    <>
      <TransactionsList />
      <TransactionForm />
    </>
  );
};
