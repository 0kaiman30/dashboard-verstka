import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../../config/routeConfig.tsx";
import { AppLayout } from "../index.ts";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;

