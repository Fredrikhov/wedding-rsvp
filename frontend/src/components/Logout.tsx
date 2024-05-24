import logoutStyle from "./Logout.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const [cookie, , removeCookie] = useCookies(["token"]);
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof cookie.token !== "undefined"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      handleRemoveCookie();
      setIsAuthenticated(false);
      navigate(0);
    } /* eslint-disable react-hooks/exhaustive-deps */
  }, [isAuthenticated]);

  const handleRemoveCookie = () => removeCookie("token");

  return (
    <div className={classNames(`${logoutStyle.main}`)}>
      <h1>You Are Logged Out</h1>
      <p>Please Close The Tab / Window</p>
    </div>
  );
};
