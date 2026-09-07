import { useState } from "react";
import { NavLink } from "react-router-dom";
import cls from "./Header.module.scss";
import { navItems } from "../../../shared/const/router";
import { SearchIcon } from "../../../assets/icons";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const MockUserName = "POORNASHREE THIRUMALAI"

  return (
    <header className={cls.header}>
      <div className={cls.container}>
        <div className={cls.leftContent}>
          <h1 className={cls.logo}>Wallet</h1>

          <div className={cls.search}>
            <SearchIcon className={cls.searchIcon} />
            <input type="text" className={cls.searchInput} />
          </div>
        </div>

        <div className={cls.user}>
          <span className={cls.userText}>
            Welcome back, <strong>{MockUserName}</strong>
          </span>
          <div className={cls.userAvatar}>
            <img src="/Union.png" alt="User avatar" className={cls.avatarImg} />
          </div>
        </div>

        <button
          className={`${cls.burger} ${isMenuOpen ? cls.burgerActive : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div
          className={`${cls.overlay} ${isMenuOpen ? cls.overlayOpen : ""}`}
          onClick={closeMenu}
        />

        <nav
          className={`${cls.mobileMenu} ${isMenuOpen ? cls.mobileMenuOpen : ""}`}
        >

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