import { useFetcher } from "react-router-dom";
import loginStyle from "./Login.module.css";
import classNames from "classnames";
import { ChangeEvent, useEffect, useState } from "react";

export const Login = () => {
  const [, setPin] = useState<string>("");
  const fetcher = useFetcher();
  const [submitAttendingLoading, setSubmitAttendingLoading] = useState(false);

  useEffect(() => {
    if (fetcher.state == "idle") {
      setSubmitAttendingLoading(false);
    } else {
      setSubmitAttendingLoading(true);
    }
  }, [fetcher]);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  return (
    <div className={classNames(`${loginStyle.div}`)}>
      <h2 className={loginStyle.h2}>Login</h2>
      <p>Enter your four-digit PIN code found on your invitation.</p>
      {fetcher.data?.error && (
        <p className={loginStyle.error}>{fetcher.data.error}</p>
      )}
      <fetcher.Form className={loginStyle.form} method="post" action="/login">
        <input
          maxLength={3}
          onChange={handleOnChange}
          className={loginStyle.input}
          name="pin"
          type="password"
          placeholder="Enter your four-digit PIN code"
        ></input>
        <button
          type="submit"
          className={loginStyle.button}
          disabled={submitAttendingLoading}
        >
          Submit
        </button>
      </fetcher.Form>
    </div>
  );
};
