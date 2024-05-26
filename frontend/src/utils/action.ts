import { ActionFunctionArgs } from "react-router-dom";

const _BASE_API_ATTENDANCE = "/api/attendance";

export const postAttendance = async ({ request }: ActionFunctionArgs) => {
  const response = await request.formData().then((formData) =>
    fetch(`${_BASE_API_ATTENDANCE}`, {
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
