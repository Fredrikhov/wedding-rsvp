import navStyle from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import classNames from "classnames";
import { NavItem } from "./NavItem";

export const Nav = () => {
  const routes = [
    { label: "Home", path: "/" },
    { label: "Information", path: "/information" },
    { label: "RSVP", path: "/rsvp" },
  ];
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={navStyle.nav}>
      <ul className={navStyle.mobile_ul}>
        <li className={classNames(navStyle.mobile_li, navStyle.img)}>
          <NavLink className={navStyle.logo} to="/">
            A<span className={navStyle.logo_span}>&</span>G
          </NavLink>
        </li>
        <li className={navStyle.mobile_li} onClick={toggleMenu}>
          <GiHamburgerMenu />
        </li>
      </ul>
      <ul
        className={classNames(navStyle.ul, {
          [navStyle.is_open]: isOpen,
        })}
      >
        {routes.map((route) => {
          return (
            <li key={route.path} className={navStyle.li}>
              <NavLink
                to={route.path}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  classNames(navStyle.a, {
                    [navStyle.active]: isActive,
                  })
                }
              >
                {route.label}
              </NavLink>
            </li>
          );
        })}
        <NavItem />
      </ul>
    </nav>
  );
};
