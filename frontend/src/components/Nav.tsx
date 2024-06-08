import Cookies from "js-cookie";
import navStyle from "./Nav.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import classNames from "classnames";

export const Nav = () => {
  const [routes, setRoutes] = useState([
    "/",
    "/information",
    "/rsvp",
    "/login",
  ]);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const cookie = Cookies.get("token");

  useEffect(() => {
    console.log(cookie);
    setRoutes((prevRoutes) => {
      if (cookie) {
        if (!prevRoutes.includes("/logout")) {
          return updateRoutes(prevRoutes, "/login", "/logout");
        }
      } else {
        if (prevRoutes.includes("/logout")) {
          return updateRoutes(prevRoutes, "/logout", "/login");
        }
      }
      return prevRoutes;
    });
  }, [location, cookie]);

  // Helper function for adding or removing a route.
  const updateRoutes = (
    prev: string[],
    removeRoute: string,
    addRoute: string
  ) => {
    if (prev.indexOf(removeRoute) !== -1) {
      return [...prev.slice(0, -1), addRoute];
    } else {
      return [...prev, addRoute];
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={navStyle.nav}>
      <ul className={navStyle.mobile_ul}>
        <li className={classNames(`${navStyle.mobile_li}`, `${navStyle.img}`)}>
          <NavLink to="/">A & G</NavLink>
        </li>
        <li className={navStyle.mobile_li} onClick={toggleMenu}>
          <GiHamburgerMenu />
        </li>
      </ul>
      <ul className={`${navStyle.ul} ${isOpen ? navStyle.is_open : ""}`}>
        {routes.map((route) => {
          return (
            <li key={route} className={navStyle.li}>
              <NavLink
                onClick={toggleMenu}
                to={route}
                className={({ isActive }) =>
                  isActive ? `${navStyle.active}` : `${navStyle.a}`
                }
              >
                {route === "/" ? "Home" : route.split("/")}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
