import './Footer.css';
import { Link } from 'react-router-dom';

function Footer({ changeTheme }) {
  return (
    <footer className="footer">
      <p className="footer__text">© 2021 Supersite, Powered by News API</p>
      <div className="footer__nav">
        <div className="footer-nav__links">
          <Link onClick={changeTheme} to={'/'} className="footer__links">
            Home
          </Link>
          <a
            className="footer__links"
            rel="noreferrer"
            href="https://practicum.com/"
            target="_blank"
          >
            Practicum
          </a>
        </div>
        <div className="footer__icons">
          <a
            className="footer__icon-git"
            href="https://github.com/xhundo"
            rel="noreferrer"
            alt="Github"
            target="_blank"
          ></a>
          <a
            className="footer__icon-facebook"
            rel="noreferrer"
            href="https://www.facebook.com/PracticumUSA/"
            alt="Facebook"
            target="_blank"
          ></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
