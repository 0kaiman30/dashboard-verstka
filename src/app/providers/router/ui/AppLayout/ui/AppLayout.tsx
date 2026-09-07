import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Sidebar } from "../../../../../../widgets/Sidebar";
import { Header } from "../../../../../../widgets/Header";

const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;