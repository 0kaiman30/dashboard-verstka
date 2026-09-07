import { RouteObject } from "react-router-dom"; // или RouteProps
import { appRoutes} from "../../../../shared/const/router";
import { DashboardPage } from "../../../../pages/DashboardPage";
import { MissingPage } from "../../../../pages/MissingPage";

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
    element: <MissingPage />,
  },
  [appRoutes.SETTINGS]: {
    path: appRoutes.SETTINGS,
    element: <MissingPage />,
  },
};