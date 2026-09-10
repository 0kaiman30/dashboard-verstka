import React from "react";
import { NavLink } from "react-router-dom";
import cls from "./Sidebar.module.scss";
import { navItems } from "../../../shared/lib/const/router";

export const Sidebar: React.FC = () => {
  return (
    <aside className={cls.sidebar}>
      <div className={cls.avatarContainer}>
        <div className={cls.avatar}>
          <img src="/Union.png" alt="User avatar" className={cls.avatarImg} />
        </div>
      </div>

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
