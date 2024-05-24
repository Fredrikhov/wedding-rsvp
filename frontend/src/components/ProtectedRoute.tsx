import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

export const ProtectedRoute = () => {
  const [cookie, ,] = useCookies(["token"]);
  return cookie.token ? <Outlet /> : <Navigate to="/login" replace />;
};
