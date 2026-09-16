import { http, HttpResponse } from "msw";
import { categories } from "../data/categories";
import { randomDelay, shouldFail } from "./utils";
import { Category } from "@/types/CategoryType";

export const categoryHandlers = [
  http.get("/api/categories", async () => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    return HttpResponse.json(categories);
  }),

  http.put("/api/categories", async ({ request }) => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
    const next = (await request.json()) as Category[];
    categories.length = 0;
    categories.push(...next);
    return HttpResponse.json(categories);
  }),
];