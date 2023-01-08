import './Menu.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Menu({ handleLogin, isLoggedIn, toggleTheme, setLogin, theme }) {
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    toggleTheme();
  }, [isLoggedIn]);

  return (
    <div className="menu">
      <div className="menu__overlay">
        <div
          className={
            isLoggedIn
              ? theme
                ? `menu__content-light`
                : `menu__content-logged`
              : `menu__content`
          }
        >
          <Link to={'/'}>
            <p
              className={theme ? `menu__link-dark` : `menu__link`}
              onClick={toggleTheme}
            >
              Home
            </p>
          </Link>
          {isLoggedIn ? (
            <Link
              to={'/saved-news'}
              className={theme ? `menu__save-dark` : `menu__link-saved`}
            >
              Saved articles
            </Link>
          ) : (
            ``
          )}
          {isLoggedIn ? (
            <div className={theme ? `menu__user-dark` : `menu__user-icon`}>
              <p className={theme ? `menu__username-dark` : `menu__username`}>
                {currentUser.name}
              </p>
              <button
                onClick={setLogin}
                className={theme ? `menu__logout-dark` : `menu__logout-btn`}
              ></button>
            </div>
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
