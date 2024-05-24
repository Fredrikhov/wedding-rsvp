import { Cookies } from "react-cookie";
import navStyle from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

export const Nav = () => {
  const cookies = new Cookies();
  const routes: string[] = ["/", "/information", "/rsvp"];
  const [isOpen, setIsOpen] = useState(false);
  cookies.get("token") ? routes.push("/logout") : routes.push("/login");

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className={navStyle.nav}>
      <ul className={navStyle.mobile_ul}>
        <li className={navStyle.mobile_li}>
          <NavLink to="/">LogoType</NavLink>
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
