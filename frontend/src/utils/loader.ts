export const getInvitationLoader = () => {
  const response = fetch(`${import.meta.env.VITE_BASE_API_INVITATION}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => Object.assign(e, { error: `${(e as Error).message}` }));
  return response;
};

export const getAttendanceLoader = () => {
  const response = fetch(`${import.meta.env.VITE_BASE_API_ATTENDANCE}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => Object.assign(e, { error: `${(e as Error).message}` }));
  return response;
};
