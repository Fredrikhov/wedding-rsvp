import { ActionFunctionArgs, redirect } from "react-router-dom";

export const postAttendanceAction = async ({ request }: ActionFunctionArgs) => {
  const response = await request.formData().then((formData) =>
    fetch(`${import.meta.env.VITE_BASE_API_POST_ATTENDANCE}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allergy: formData.get("allergies"),
        comment: formData.get("comment"),
        email: formData.get("epost"),
        attending: formData.get("attending") === "true" ? true : false,
      }),
    })
      .then((res) => res)
      .catch((e) => `${(e as Error).message} - Failed To Post Data`)
  );
  return response;
};

export const handleAuthAction = async ({ request }: ActionFunctionArgs) => {
  const response = await request.formData().then((formData) =>
    fetch(`${import.meta.env.VITE_BASE_API_LOGIN}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pin: formData.get("pin"),
      }),
    })
      .then(() => {
        return redirect("/");
      }) // Successfull response redirect the user to the ladingpage
      .catch((e) => `${(e as Error).message} - Failed To Post Data`)
  );
  return response;
};
