import { Link } from "react-router-dom";
import indexStyle from "./Index.module.css";

export const Index = () => {
  return (
    <div className={indexStyle.wrapper}>
      <p className={indexStyle.p_header}>
        Name <span className={indexStyle.span}>&</span> Name
      </p>
      <p className={indexStyle.date}>"Date"</p>
      <p className={indexStyle.place}>"Place"</p>
      <p className={indexStyle.p}>
        "We are so excited and can't wait to see you. Help us capture our
        wedding with you."
      </p>
      <Link className={indexStyle.button} to="/rsvp">
        RSVP
      </Link>
      <svg className={indexStyle.svgMain}></svg>
    </div>
  );
};
