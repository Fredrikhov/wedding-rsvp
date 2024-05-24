import { defer } from "react-router-dom";

const _BASE_API_INVITATION = "http://localhost:3000/invitation";
const _BASE_API_ATTENDANCE = "http://localhost:3000/attendance";

const getInvitationLoader = async () => {
  const response = await fetch(`${_BASE_API_INVITATION}`, {
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
  const response = await fetch(`${_BASE_API_ATTENDANCE}`, {
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
  const [invitation, attendance] = await Promise.all([
    getInvitationLoader(),
    getAttendanceLoader(),
  ]);
  return defer({ invitation, attendance });
};
