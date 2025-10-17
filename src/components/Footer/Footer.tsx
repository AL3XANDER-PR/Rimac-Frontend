import LogoRimacWhite from "../../assets/logo-white.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img
          width="85"
          alt="logo rimac"
          src={LogoRimacWhite}
          className="footer__logo"
        />
        <div className="footer__divider" />
        <div className="footer__text">© 2025 RIMAC Seguros y Reaseguros.</div>
      </div>
    </footer>
  );
};

export default Footer;
