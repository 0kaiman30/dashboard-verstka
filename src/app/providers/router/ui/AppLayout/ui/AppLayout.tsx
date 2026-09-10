import { Outlet } from "react-router-dom";
import cls from "./AppLayout.module.scss";
import { Header } from "@/widgets/Header";
import { Sidebar } from "@/widgets/Sidebar";

const AppLayout = () => {
  return (
    <div className={cls.appLayout}>
      <Header />
      <div className={cls.body}>
        <Sidebar />
        <div className={cls.content}>
          <Outlet />
          </div>
      </div>
    </div>
  );
};

export default AppLayout;
