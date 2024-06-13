import navStyle from "./Nav.module.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { AuthButton } from "./AuthButton";

export const NavItem = () => {
  const [cookie] = useCookies(["token"]);
  const [isCookieAvailable, setIsCookieAvailable] = useState(false);

  useEffect(() => {
    if (cookie.token) {
      setIsCookieAvailable(true);
    } else {
      setIsCookieAvailable(false);
    }
  }, [cookie]);

  return (
    <li className={navStyle.li}>
      {isCookieAvailable ? (
        <AuthButton item={{ label: "Logout", path: "/logout" }} />
      ) : (
        <AuthButton item={{ label: "Login", path: "/login" }} />
      )}
    </li>
  );
};
