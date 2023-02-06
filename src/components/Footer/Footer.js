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
          <a className="footer__links" href="https://practicum.com/">
            Practicum
          </a>
        </div>
        <div className="footer__icons">
          <a
            className="footer__icon-git"
            href="https://github.com/xhundo"
            alt="Github"
          ></a>
          <a className="footer__icon-facebook" alt="Facebook"></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
