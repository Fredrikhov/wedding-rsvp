import LogoutStyle from "./Logout.module.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const [redirect, setRedirect] = useState(false);
  const [cookie] = useCookies(["token"]);
  useEffect(() => {
    const removeCookie = async () => {
      await fetch(`${import.meta.env.VITE_BASE_API_LOGOUT}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ delete: cookie.token }),
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
