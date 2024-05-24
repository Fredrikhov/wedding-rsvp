import classNames from "classnames";
import footerStyle from "./Footer.module.css";
export const Footer = () => {
  return (
    <>
      <footer className={classNames(`${footerStyle.footer}`)}>
        <div className={footerStyle.div}>Footer</div>
        <p className={footerStyle.p}>Hei</p>
      </footer>
    </>
  );
};
