import { DashboardPage } from "@/pages/DashboardPage/DashboardPage";
import { MissingPage } from "@/pages/MissingPage/MissingPage";
import { TransactionPage } from "@/pages/TransactionPage/TransactionPage";
import { appRoutes } from "@/shared/lib/const/router";
import { RouteObject } from "react-router-dom";

export const routeConfig: Record<string, RouteObject> = {
  [appRoutes.DASHBOARD]: {
    path: appRoutes.DASHBOARD,
    element: <DashboardPage />,
  },
  [appRoutes.MYWALLET]: {
    path: appRoutes.MYWALLET,
    element: <MissingPage />,
  },
  [appRoutes.TRANSACTIONS]: {
    path: appRoutes.TRANSACTIONS,
    element: <TransactionPage />,
  },
  [appRoutes.SETTINGS]: {
    path: appRoutes.SETTINGS,
    element: <MissingPage />,
  },
};
