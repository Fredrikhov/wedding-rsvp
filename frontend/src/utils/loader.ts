import { Cookies } from "react-cookie";
import { defer, redirect } from "react-router-dom";

const getInvitationLoader = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_INVITATION}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => Object.assign(e, { error: `${(e as Error).message}` }));
  return await response;
};

const getAttendanceLoader = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_API_ATTENDANCE}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => Object.assign(e, { error: `${(e as Error).message}` }));
  return await response;
};

export const loader = async () => {
  const cookie = new Cookies().get("token");
  if (cookie) {
    const [invitation, attendance] = await Promise.all([
      getInvitationLoader(),
      getAttendanceLoader(),
    ]);
    return defer({ invitation, attendance });
  } else {
    return redirect("/login");
  }
};
