import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "./app/styles/globals.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./app/providers/queryClient/queryClient.ts";

async function enableMocking() {
  if (import.meta.env.MODE !== "development") return;
  const { worker } = await import("./app/mocks/browser");
  return worker.start({ onUnhandledRequest: "bypass" });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>,
  );
});