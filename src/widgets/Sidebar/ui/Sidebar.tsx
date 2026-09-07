import React from "react";
import { NavLink } from "react-router-dom";
import cls from "./Sidebar.module.scss";
import { appRoutes } from "../../../shared/const/router";

const navItems = [
  { path: appRoutes.DASHBOARD, title: "Dashboard" },
  { path: appRoutes.MYWALLET, title: "My Wallet" },
  { path: appRoutes.TRANSACTIONS, title: "Transactions" },
  { path: appRoutes.SETTINGS, title: "Settings" },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className={cls.sidebar}>
      {/* Иконка пользователя (union.png из public) */}
      <div className={cls.avatarContainer}>
        <div className={cls.avatar}>
          <img src="/Union.png" alt="User avatar" className={cls.avatarImg} />
        </div>
      </div>

      {/* Навигационное меню */}
      <nav className={cls.nav}>
        <ul className={cls.navList}>
          {navItems.map((item) => (
            <li key={item.path} className={cls.navItem}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${cls.navLink} ${isActive ? cls.activeLink : ""}`
                }
              >
                <span className={cls.indicator} />
                <span className={cls.linkText}>{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Карточка подписки Premium (lock.png из public) */}
      <div className={cls.premiumCard}>
        <h3 className={cls.premiumTitle}>
          Subscribe to
          <br />
          <strong className={cls.premiumPremiumTitle}>Premium</strong>
        </h3>

        <div className={cls.premiumIcon}>
          <img src="/lock.png" alt="Lock icon" className={cls.lockImg} />
        </div>

        <button className={cls.premiumBtn}>JOIN NOW</button>
      </div>
    </aside>
  );
};