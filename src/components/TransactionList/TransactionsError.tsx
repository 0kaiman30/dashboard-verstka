import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import cls from "./TransactionList.module.scss";

interface TransactionsErrorProps {
  error: unknown;
  isFetching: boolean;
  onRetry: () => void;
}

export function TransactionsError({ error, isFetching, onRetry }: TransactionsErrorProps) {
  const isServerError =
    typeof (error as any)?.status === "number" && (error as any).status >= 500;

  return (
    <div className={cls.stateError}>
      <p>
        {isServerError
          ? "Сервер временно недоступен (500). Попробуйте ещё раз."
          : `Не удалось загрузить транзакции: ${getErrorMessage(error)}`}
      </p>
      <button onClick={onRetry} disabled={isFetching}>
        Повторить
      </button>
    </div>
  );
}