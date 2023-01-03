import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Header.css';

function Header({ isLoggedin, handleModal, theme, setTheme, changeTheme }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className={theme ? `header__switch` : `header`}>
      <Link to={'/'}>
        <p
          onClick={changeTheme}
          className={theme ? `header__logo-switch` : `header__logo`}
        >
          NewsExplorer
        </p>
      </Link>
      <div className="header__nav">
        <Link to={'/'}>
          <p
            onClick={changeTheme}
            className={theme ? `header__nav-home` : `header__nav-link`}
          >
            Home
          </p>
        </Link>
        {isLoggedin ? (
          <div className="header__nav-logged">
            <Link to={'/saved-news'}>
              <button
                onClick={setTheme}
                className={
                  theme ? `header__nav-articles` : `header__nav-article`
                }
              >
                Saved articles
              </button>
            </Link>
            <div className={theme ? `header__log-switch` : `header__nav-log`}>
              <p className="header__user">{currentUser.name}</p>
              <button
                className={
                  theme ? `header__logout-switch` : `header__nav-logout`
                }
              ></button>
            </div>
          </div>
        ) : (
          <button onClick={handleModal} className="header__nav-button">
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
