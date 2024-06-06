import classNames from "classnames";
import footerStyle from "./Footer.module.css";
export const Footer = () => {
  return (
    <>
      <footer className={classNames(`${footerStyle.footer}`)}>
        <nav className={footerStyle.nav}>
          <ul className={footerStyle.footer_ul}>
            <li className={footerStyle.footer_li}>
              <a className={footerStyle.footer_a} href="#">
                Hellu
              </a>
            </li>
            <li className={footerStyle.footer_li}>
              <a className={footerStyle.footer_a} href="#">
                Hellu
              </a>
            </li>
            <li className={footerStyle.footer_li}>
              <a className={footerStyle.footer_a} href="#">
                Hellu
              </a>
            </li>
            <li className={footerStyle.footer_li}>
              <img src="/footerFlower.svg" alt="Wedding logo" />
            </li>

            <li className={footerStyle.footer_li}>
              <a className={footerStyle.footer_a} href="#">
                Hellu
              </a>
            </li>
            <li className={footerStyle.footer_li}>
              <a className={footerStyle.footer_a} href="#">
                Hellu
              </a>
            </li>
            <li className={footerStyle.footer_li}>
              <a className={footerStyle.footer_a} href="#">
                Hellu
              </a>
            </li>
          </ul>
        </nav>
        <div className={footerStyle.div_lower}>
          Copyright © 2024 Fredrik Hov Nilsen
        </div>
      </footer>
    </>
  );
};
