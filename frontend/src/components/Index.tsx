import indexStyle from "./Index.module.css";

export const Index = () => {
  return (
    <div className={indexStyle.wrapper}>
      <p className={indexStyle.p}>Save The Day</p>
      <p className={indexStyle.p}>Navn 1 & Navn 2</p>
      <p className={indexStyle.p}>Border-line vhit</p>
      <p className={indexStyle.p}>27/7</p>
      <p className={indexStyle.p}>RSVP</p>
      <svg className={indexStyle.svgMain}></svg>
    </div>
  );
};
