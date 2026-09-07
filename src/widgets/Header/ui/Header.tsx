import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { appRoutes } from "../../../shared/const/router";
import cls from "./Header.module.scss";

const navItems = [
  { path: appRoutes.DASHBOARD, title: "Dashboard" },
  { path: appRoutes.MYWALLET, title: "My Wallet" },
  { path: appRoutes.TRANSACTIONS, title: "Transactions" },
  { path: appRoutes.SETTINGS, title: "Settings" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={cls.header}>
      <div className={cls.container}>
        {/* Логотип и поиск с gap: 24px */}
        <div className={cls.leftContent}>
          <h1 className={cls.logo}>Wallet</h1>

          <div className={cls.search}>
            <svg
              className={cls.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" className={cls.searchInput} />
          </div>
        </div>

        {/* Профиль пользователя */}
        <div className={cls.user}>
          <span className={cls.userText}>
            Welcome back, <strong>POORNASHREE THIRUMALAI</strong>
          </span>
          <div className={cls.userAvatar}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Бургер-кнопка */}
        <button
          className={`${cls.burger} ${isMenuOpen ? cls.burgerActive : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Затемнение фона при открытии меню */}
        <div
          className={`${cls.overlay} ${isMenuOpen ? cls.overlayOpen : ""}`}
          onClick={closeMenu}
        />

        {/* Полноразмерное меню справа */}
        <nav
          className={`${cls.mobileMenu} ${isMenuOpen ? cls.mobileMenuOpen : ""}`}
        >
          <div className={cls.menuHeader}>
            <span className={cls.menuTitle}>Navigation</span>
          </div>

          <ul className={cls.navList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${cls.navLink} ${isActive ? cls.activeLink : ""}`
                  }
                  onClick={closeMenu}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
