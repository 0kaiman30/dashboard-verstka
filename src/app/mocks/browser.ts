import { setupWorker } from "msw/browser";
import { transactionHandlers } from "./handlers/transactions";
import { categoryHandlers } from "./handlers/categories";

export const worker = setupWorker(...transactionHandlers, ...categoryHandlers);
