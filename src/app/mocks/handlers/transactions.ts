import { http, HttpResponse } from "msw";
import { transactions } from "../data/transactions";
import { randomDelay, shouldFail } from "./utils";
import { Transaction } from "@/entities/transaction/model/types";

const BASE = "/api/transactions";

export const transactionHandlers = [
  http.get(BASE, async () => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
    return HttpResponse.json(transactions);
  }),

  http.get(`${BASE}/:id`, async ({ params }) => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
    const tx = transactions.find((t) => t.id === params.id);
    if (!tx) {
      return HttpResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }
    return HttpResponse.json(tx);
  }),

  http.post(BASE, async ({ request }) => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }

    const body = (await request.json()) as Partial<Transaction>;

    if (!body.title || body.amount == null || !body.categoryId) {
      return HttpResponse.json(
        { message: "title, amount и categoryId обязательны" },
        { status: 400 },
      );
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: body.title,
      amount: body.amount,
      categoryId: body.categoryId,
      date: body.date ?? new Date().toISOString(),
    };

    transactions.push(newTx);
    return HttpResponse.json(newTx, { status: 201 });
  }),

  http.patch(`${BASE}/:id`, async ({ params, request }) => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }

    const index = transactions.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }

    const body = (await request.json()) as Partial<Transaction>;
    
    if ("title" in body && !body.title) {
      return HttpResponse.json(
        { message: "title не может быть пустым" },
        { status: 400 },
      );
    }
    if ("categoryId" in body && !body.categoryId) {
      return HttpResponse.json(
        { message: "categoryId не может быть пустым" },
        { status: 400 },
      );
    }
    if (
      "amount" in body &&
      (body.amount == null || Number.isNaN(body.amount))
    ) {
      return HttpResponse.json(
        { message: "amount должен быть числом" },
        { status: 400 },
      );
    }

    transactions[index] = { ...transactions[index], ...body };
    return HttpResponse.json(transactions[index]);
  }),

  http.delete(`${BASE}/:id`, async ({ params }) => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }

    const index = transactions.findIndex((t) => t.id === params.id);
    if (index === -1) {
      return HttpResponse.json(
        { message: "Transaction not found" },
        { status: 404 },
      );
    }

    transactions.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
