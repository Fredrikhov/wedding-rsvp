import { NavLink } from "react-router-dom";
import navStyle from "./Nav.module.css";
import classNames from "classnames";

interface AuthButtonProps {
  item: {
    label: string;
    path: string;
  };
}

export const AuthButton = ({ item }: AuthButtonProps) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        classNames(navStyle.a, {
          [navStyle.active]: isActive,
        })
      }
    >
      {item.label}
    </NavLink>
  );
};
