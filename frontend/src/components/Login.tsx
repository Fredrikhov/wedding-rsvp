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
      <h1>Pin</h1>
      {error}
      <form onSubmit={handleAuth}>
        <input maxLength={3} onChange={handleOnChange}></input>
        <button>Login</button>
      </form>
    </div>
  );
};
