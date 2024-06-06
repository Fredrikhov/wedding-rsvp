import { useFetcher, useLoaderData } from "react-router-dom";
import WeddingRSVPFormStyle from "./WeddingRSVPForm.module.css";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ILoader, Tattendance } from "../utils/types";

export const WeddingRSVPForm = () => {
  const loader = useLoaderData() as ILoader;
  const fetcher = useFetcher();
  const { createdAt }: Tattendance = loader.attendance;
  const [attending, setAttending] = useState<boolean | undefined>(true);
  const [epost, setEpost] = useState<string>("");
  const [allergy, setAllergies] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loader.attendance.error) {
      const { comment, allergy, attending, email } = loader.attendance;
      setAttending(attending);
      setEpost(email);
      setAllergies(allergy);
      setComment(comment);
    } else {
      setError(`Error during load, please refresh the page`);
    }
  }, [loader]);

  const handleChange = () => {
    setAttending((prev) => !prev);
  };

  const handleChangeEpost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpost(e.target.value);
  };

  const handleChangeAllergies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllergies(e.target.value);
  };

  const handleChangeComments = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const getLocalTime = () =>
    new Date(createdAt._seconds * 1000).toLocaleTimeString();

  return (
    <div className={WeddingRSVPFormStyle.main}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className={WeddingRSVPFormStyle.outerWrapper}>
            <h1 className={WeddingRSVPFormStyle.h1}>RSVP</h1>
            <p className={WeddingRSVPFormStyle.p}>
              Vennlist svar innen 05/07-24
            </p>
          </div>
          <fetcher.Form
            method="post"
            action="/rsvp"
            className={WeddingRSVPFormStyle.form}
          >
            <label className={`${WeddingRSVPFormStyle.label} `}>
              Kommer du?
            </label>
            <label className={WeddingRSVPFormStyle.customRadio}>
              <input
                type="radio"
                name="attending"
                value={`${attending}`}
                checked={attending == true}
                onChange={handleChange}
                className={`${WeddingRSVPFormStyle.input} `}
              />
              <div className={WeddingRSVPFormStyle.radioButton}>
                <span>Ja</span>
              </div>
            </label>
            <label className={WeddingRSVPFormStyle.customRadio}>
              <input
                type="radio"
                name="attending"
                checked={attending == false}
                value={`${attending}`}
                onChange={handleChange}
                className={`${WeddingRSVPFormStyle.input}`}
              ></input>
              <div className={WeddingRSVPFormStyle.radioButton}>
                <span>Nei</span>
              </div>
            </label>

            <label className={WeddingRSVPFormStyle.label}>Epost</label>
            <input
              name="epost"
              onChange={handleChangeEpost}
              value={epost}
              placeholder="Skriv din epost"
              className={WeddingRSVPFormStyle.input}
            />
            <label className={WeddingRSVPFormStyle.label}>Allergier</label>
            <input
              name="allergies"
              onChange={handleChangeAllergies}
              value={allergy}
              placeholder="allergier"
              className={WeddingRSVPFormStyle.input}
            ></input>
            <label className={WeddingRSVPFormStyle.label}>Annen info?</label>
            <input
              name="comment"
              onChange={handleChangeComments}
              value={comment}
              placeholder="Skriv din kommentar"
              className={WeddingRSVPFormStyle.input}
            />
            <button className={WeddingRSVPFormStyle.submitButton} type="submit">
              Submit Form
            </button>
            {createdAt ? (
              <p>
                <FaCheck />
                {getLocalTime()}
              </p>
            ) : (
              <p>Not Submitted </p>
            )}
          </fetcher.Form>
        </>
      )}
    </div>
  );
};
