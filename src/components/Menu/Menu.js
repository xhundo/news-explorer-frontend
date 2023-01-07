import './Menu.css';
import { Link } from 'react-router-dom';

function Menu({ handleLogin, isLoggedIn }) {
  return (
    <div className="menu">
      <div className="menu__overlay">
        <div className={isLoggedIn ? `menu__content-logged` : `menu__content`}>
          <Link to={'/'} className="menu__link">
            Home
          </Link>
          {isLoggedIn ? (
            <Link to={'/saved-news'} className="menu__link-saved">
              Saved articles
            </Link>
          ) : (
            ``
          )}
          {isLoggedIn ? (
            <div className="menu_icon" />
          ) : (
            <button onClick={handleLogin} className="menu__button-signin">
              Sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Menu;
