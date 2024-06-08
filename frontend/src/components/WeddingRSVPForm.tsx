import WeddingRSVPFormStyle from "./WeddingRSVPForm.module.css";
import { Suspense, useEffect, useState } from "react";
import { Await, useFetcher, useLoaderData } from "react-router-dom";
import { ILoader, Tattendance, Ttimestamp } from "../utils/types";
import { CardSkeleton } from "./CardSkeleton";
import { FaCheck } from "react-icons/fa";

export const WeddingRSVPForm = () => {
  const { attendance } = useLoaderData() as ILoader;
  const fetcher = useFetcher();
  const [, setAttending] = useState<boolean>();
  const [, setEpost] = useState("");
  const [, setAllergies] = useState("");
  const [, setComment] = useState("");
  const [submitAttendingLoading, setSubmitAttendingLoading] = useState(false);

  const handleChange = () => {
    setAttending((prev) => !prev);
  };

  useEffect(() => {
    if (fetcher.state == "idle") {
      setSubmitAttendingLoading(false);
    } else {
      setSubmitAttendingLoading(true);
    }
  }, [fetcher]);

  const handleChangeEpost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEpost(e.target.value);
  };

  const handleChangeAllergies = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAllergies(e.target.value);
  };

  const handleChangeComments = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const getLocalTime = (createdAt: Ttimestamp) =>
    new Date(createdAt._seconds * 1000).toLocaleTimeString();

  return (
    <div className={WeddingRSVPFormStyle.main}>
      <>
        <div className={WeddingRSVPFormStyle.outerWrapper}>
          <h1 className={WeddingRSVPFormStyle.h1}>RSVP</h1>
          <p className={WeddingRSVPFormStyle.p}>Vennlist svar innen 05/07-24</p>
        </div>
        <fetcher.Form
          method="POST"
          action="/rsvp"
          className={WeddingRSVPFormStyle.form}
        >
          <label className={`${WeddingRSVPFormStyle.label} `}>Kommer du?</label>
          <Suspense fallback={<CardSkeleton />}>
            <Await
              resolve={attendance}
              errorElement={<p>Error loadingt attendance</p>}
            >
              {(attendance: Tattendance) => (
                <>
                  <label className={WeddingRSVPFormStyle.customRadio}>
                    <input
                      type="radio"
                      name="attending"
                      value={`${true}`}
                      defaultChecked={attendance.attending == true}
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
                      value={`${false}`}
                      defaultChecked={attendance.attending == false}
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
                    defaultValue={attendance.email}
                    placeholder="Skriv din epost"
                    className={WeddingRSVPFormStyle.input}
                  />
                  <label className={WeddingRSVPFormStyle.label}>
                    Allergier
                  </label>
                  <input
                    name="allergies"
                    onChange={handleChangeAllergies}
                    defaultValue={attendance.allergy}
                    placeholder="allergier"
                    className={WeddingRSVPFormStyle.input}
                  ></input>
                  <label className={WeddingRSVPFormStyle.label}>
                    Annen info?
                  </label>
                  <input
                    name="comment"
                    onChange={handleChangeComments}
                    defaultValue={attendance.comment}
                    placeholder="Skriv din kommentar"
                    className={WeddingRSVPFormStyle.input}
                  />
                  <button
                    className={WeddingRSVPFormStyle.submitButton}
                    type="submit"
                    disabled={submitAttendingLoading}
                  >
                    Submit Form
                  </button>
                  {attendance.createdAt ? (
                    <p className={WeddingRSVPFormStyle.createdAt}>
                      <FaCheck color="green" />
                      {getLocalTime(attendance.createdAt)}
                    </p>
                  ) : (
                    <p>Not Submitted </p>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </fetcher.Form>
      </>
    </div>
  );
};
