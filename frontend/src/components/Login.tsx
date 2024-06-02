import { ChangeEvent, FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import loginStyle from "./Login.module.css";
import classNames from "classnames";

export const Login = () => {
  const _BASE_API_LOGIN = "http://localhost:3000/login";
  const [pin, setPin] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${_BASE_API_LOGIN}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pin: pin }),
      });
      if (response.ok) {
        setCookie("token", pin, { path: "/", maxAge: 60 * 60 * 24 });
        navigate("/");
        navigate(0);
      } else {
        setError("Feil Pin, Skrev Du Riktig Kode?");
      }
    } catch (e) {
      setError(`${(e as Error).message}`);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  return (
    <div className={classNames(`${loginStyle.div}`)}>
      <h2 className={loginStyle.h2}>Login</h2>
      <p>Enter your four-digit PIN code found on your invitation.</p>
      {error}
      <form onSubmit={handleAuth} className={loginStyle.form}>
        <label className={loginStyle.label}>PIN code</label>
        <input
          maxLength={3}
          onChange={handleOnChange}
          className={loginStyle.input}
          type="password"
          placeholder="Enter your four-digit PIN code"
        ></input>
        <button className={loginStyle.button}>Login</button>
      </form>
    </div>
  );
};
