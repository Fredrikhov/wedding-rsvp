import { createBrowserRouter, defer } from "react-router-dom";
import { App } from "../App";
import { NotFound } from "../components/NotFound";
import { Index } from "../components/Index";
import { Information } from "../components/Information";
import { Login } from "../components/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { WeddingRSVPForm } from "../components/WeddingRSVPForm";
import { getAttendanceLoader, getInvitationLoader } from "./loader";
import { handleAuthAction, postAttendanceAction } from "./action";
import { Logout } from "../components/Logout";

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
        action: handleAuthAction,
        errorElement: <NotFound />,
      },
      {
        path: "/logout",
        errorElement: <NotFound />,
        element: <Logout />,
      },
      {
        path: "/",
        element: <ProtectedRoute />,
        errorElement: <NotFound />,

        children: [
          {
            path: "/rsvp",
            loader: async () => {
              return defer({
                invitation: getInvitationLoader(),
                attendance: getAttendanceLoader(),
              });
            },
            action: postAttendanceAction,
            element: <WeddingRSVPForm />,
          },
        ],
      },
    ],
  },
]);
