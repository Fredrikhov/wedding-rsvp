import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = () =>
  Cookies.get("token") ? <Outlet /> : <Navigate to="/login" />;
