import { RouteObject } from "react-router-dom"; // или RouteProps
import { appRoutes, getRouteDashboard } from "../../../../shared/const/router";
import { DashboardPage } from "../../../../pages/DashboardPage";

export const routeConfig: Record<string, RouteObject> = {
  [appRoutes.DASHBOARD]: {
    path: getRouteDashboard(),
    element: <DashboardPage />,
  }
};