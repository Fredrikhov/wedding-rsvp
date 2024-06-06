import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { NotFound } from "../components/NotFound";
import { Index } from "../components/Index";
import { Information } from "../components/Information";
import { Login } from "../components/Login";
import { Logout } from "../components/Logout";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { WeddingRSVPForm } from "../components/WeddingRSVPForm";
import { loader } from "./loader";
import { postAttendance } from "./action";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Index />,
        errorElement: <NotFound />,
      },
      {
        path: "/information",
        element: <Information />,
        errorElement: <NotFound />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <NotFound />,
      },
      {
        path: "/logout",
        element: <Logout />,
        errorElement: <NotFound />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        errorElement: <NotFound />,

        children: [
          {
            path: "/rsvp",
            loader: loader,
            action: postAttendance,
            element: <WeddingRSVPForm />,
          },
        ],
      },
    ],
  },
]);
