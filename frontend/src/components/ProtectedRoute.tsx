import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [cookie] = useCookies(["token"]);
  return cookie.token ? <Outlet /> : <Navigate to="/login" />;
};
