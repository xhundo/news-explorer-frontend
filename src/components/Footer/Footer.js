import './Footer.css';
import { Link } from 'react-router-dom';

function Footer({ changeTheme }) {
  return (
    <footer className="footer">
      <p className="footer__text">© 2021 Supersite, Powered by News API</p>
      <div className="footer__nav">
        <Link onClick={changeTheme} to={'/'} className="footer__links">
          Home
        </Link>
        <a className="footer__links" href="https://practicum.com/">
          Practicum
        </a>
        <a
          className="footer__icon-git"
          href="https://github.com/xhundo/news-explorer-frontend.git"
          alt="Github"
        ></a>
        <a className="footer__icon-facebook" alt="Facebook"></a>
      </div>
    </footer>
  );
}

export default Footer;
