import { Route, Routes } from "react-router-dom";
import { routeConfig } from "../../config/routeConfig.tsx";
import AppLayout from "../AppLayout/ui/AppLayout.tsx";
import { MissingPage } from "@/pages/MissingPage/MissingPage.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {Object.values(routeConfig).map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route path="*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
