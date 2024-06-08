import LogoutStyle from "./Logout.module.css";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Logout = () => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    const removeCookie = async () => {
      await fetch(`${import.meta.env.VITE_BASE_API_LOGOUT}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delete: Cookies.get("token") }),
      })
        .then(() => setRedirect(true))
        .catch((e) => console.log((e as Error).message));
    };
    removeCookie();
  });

  return redirect ? (
    <Navigate to={"/"} />
  ) : (
    <h2 className={LogoutStyle.logout}>Logging out...</h2>
  );
};
