import { http, HttpResponse } from "msw";
import { categories } from "../data/categories";
import { randomDelay, shouldFail } from "./utils";

export const categoryHandlers = [
  http.get("/api/categories", async () => {
    await randomDelay();
    if (shouldFail()) {
      return HttpResponse.json(
        { message: "Internal Server Error" },
        { status: 500 },
      );
    }
    return HttpResponse.json(categories);
  }),
];
