import { useContext, useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Header.css';

function Header({
  isLoggedin,
  handleModal,
  theme,
  setTheme,
  changeTheme,
  handleMenu,
  handleMenuClose,
  isIconActive,
  setIsIconActive,
  signInOpen,
  handleLogin,
  isSignUpOpen,
}) {
  const currentUser = useContext(CurrentUserContext);

  const toggleIcon = () => {
    if (isIconActive === false) {
      setIsIconActive(true);
      handleMenu();
    } else {
      setIsIconActive(false);
      handleMenuClose();
    }
  };

  useEffect(() => {
    changeTheme(true);
  }, [isLoggedin, changeTheme]);

  return (
    <header
      className={
        theme
          ? isIconActive
            ? `header__switch-fixed`
            : `header__switch`
          : isIconActive
          ? `header__fixed`
          : `header`
      }
    >
      <Link to={'/'}>
        <p
          onClick={changeTheme}
          className={
            theme
              ? `header__logo-switch`
              : signInOpen || isSignUpOpen
              ? `header__logo-none`
              : `header__logo`
          }
        >
          NewsExplorer
        </p>
      </Link>
      <div className="header-custom__btn" onClick={toggleIcon}>
        <div
          className={
            theme
              ? `header-custom__bar1-dark ${
                  isIconActive
                    ? `header-custom__bar1_change`
                    : `header-custom__bar1-dark`
                }`
              : signInOpen || isSignUpOpen
              ? ``
              : `header-custom__bar1 ${
                  isIconActive
                    ? `header-custom__bar1_change`
                    : `header-custom__bar1`
                }`
          }
        ></div>
        <div
          className={
            theme
              ? `header-custom__bar2-dark ${
                  isIconActive
                    ? `header-custom__bar2_change`
                    : `header-custom__bar2-dark`
                }`
              : signInOpen || isSignUpOpen
              ? ``
              : `header-custom__bar2 ${
                  isIconActive
                    ? `header-custom__bar2_change`
                    : `header-custom__bar2`
                }`
          }
        ></div>
      </div>
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
                onClick={handleLogin}
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
