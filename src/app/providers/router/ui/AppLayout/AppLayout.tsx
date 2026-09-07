import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.scss";
import { Header } from "../../../../../widgets/Header";
import { Sidebar } from "../../../../../widgets/Sidebar";

const MOBILE_BREAKPOINT = 768;

const AppLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth > MOBILE_BREAKPOINT
  );

  // закрываем оверлей-сайдбар при ресайзе на мобильную ширину
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.appLayout}>
      <Header
        userName="Poornasree Thirumalai"
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <div className={styles.body}>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout