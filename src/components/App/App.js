import '../App/App.css';
import '../../vendor/fonts/fonts.css';
import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Login from '../Login/Login';
import SavedNews from '../SavedNews/SavedNews';
import { searchNews } from '../../utils/ThirdPartyApi';
import Menu from '../Menu/Menu';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Api from '../../utils/MainApi';
import { baseUrl } from '../../utils/constants';

function App() {
  const [user, setUser] = React.useState({
    name: '',
    _id: '',
  });
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [theme, changeTheme] = React.useState(false);
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [signUpComplete, setSignUpComplete] = React.useState(false);
  const [searchComplete, setSearchComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [card, setCard] = React.useState([]);
  const [recentSearch, setRecentSearch] = React.useState(false);
  const [showCards, setShowCards] = React.useState(false);
  const [showInputError, setShowInputError] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [isIconActive, setIsIconActive] = React.useState(false);

  const apiFetch = new Api({
    baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    signInOpen
      ? document.addEventListener('keydown', handleCloseByEsc)
      : document.removeEventListener('keydown', handleCloseByEsc);
  });

  useEffect(() => {
    if (localStorage.getItem('articles')) {
      let data = JSON.parse(localStorage.getItem('articles'));
      setCard(data);
      setRecentSearch(true);
    } else {
      setCard([].length === null);
    }
  }, []);

  useEffect(() => {
    isLoading && setSearchComplete(false);
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      handleLogged();
      apiFetch
        .getCurrentUser()
        .then((res) => {
          setUser({ name: res?.data?.name, _id: res?.data?._id });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [isLoggedin]);

  const getSearch = (search) => {
    setShowInputError(false);
    setIsLoading(true);
    setRecentSearch(false);
    setShowCards(false);
    searchNews(search)
      .then((data) => {
        setIsLoading(false);
        setSearchComplete(true);
        setCard(data?.articles);
        localStorage.setItem('articles', JSON.stringify(data?.articles));
      })
      .catch((e) => {
        if (e.message === 'Search not found') {
          setShowInputError(true);
          setIsLoading(false);
        } else if (e.message === 'An error has occurred on the server') {
          console.log(e);
          setShowInputError(false);
          setIsLoading(false);
          setShowError(true);
        }
      });
  };

  const handleSignIn = async (email, password) => {
    apiFetch
      .loginUser(email, password)
      .then(() => {
        setSignInOpen(false);
        handleLogged(true);
      })
      .catch((e) => {
        console.log(e);
        handleLogin();
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleLogged = () => {
    setIsLoggedIn(true);
  };

  const handleMenu = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const switchTheme = () => {
    changeTheme(true);
  };

  const handleSaved = () => {
    setIsSaved(true);
  };

  const toggleTheme = () => {
    changeTheme(false);
  };

  const handleShowCards = () => {
    setShowCards(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setSignInOpen(false);
    setShowSignUp(false);
    setSignUpComplete(false);
  };

  const handleModalLogin = () => {
    setSignInOpen(true);
    setMenuOpen(false);
    setIsIconActive(false);
  };

  const handleShowSignUp = (e) => {
    e.preventDefault();
    setShowSignUp(true);
  };

  const toggleShowSignUp = (e) => {
    e.preventDefault();
    setShowSignUp(false);
  };

  const handleSignupComplete = (e) => {
    e.preventDefault();
    setSignUpComplete(true);
  };

  const revertSignUp = (e) => {
    e.preventDefault();
    setShowSignUp(false);
    setSignUpComplete(false);
  };

  const handleCloseByEsc = (e) => {
    e.key === 'Escape' && setSignInOpen(false);
  };

  const handleCloseByTarget = (e) => {
    e.target === e.currentTarget && setSignInOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="App">
        <Header
          isLoggedin={isLoggedin}
          handleModal={handleModalLogin}
          theme={theme}
          changeTheme={toggleTheme}
          setTheme={switchTheme}
          signInOpen={signInOpen}
          handleMenu={handleMenu}
          handleMenuClose={handleMenuClose}
          isIconActive={isIconActive}
          setIsIconActive={setIsIconActive}
          handleLogin={handleLogin}
        />

        <Switch>
          <ProtectedRoute path="/saved-news" isLoggedIn={isLoggedin}>
            <SavedNews theme={theme} changeTheme={switchTheme} />
          </ProtectedRoute>
          <Route path="/">
            <Main
              isLoggedIn={isLoggedin}
              isLoading={isLoading}
              searchComplete={searchComplete}
              getSearch={getSearch}
              cards={card}
              recentSearch={recentSearch}
              toggleShowCards={handleShowCards}
              showCards={showCards}
              showInputError={showInputError}
              showError={showError}
              handleSaved={handleSaved}
              isSaved={isSaved}
            />
          </Route>
        </Switch>
        <Footer changeTheme={toggleTheme} />
        <Login
          modalOpen={signInOpen}
          handleClose={handleClose}
          showSignUp={showSignUp}
          handleSignUp={handleShowSignUp}
          revertOptions={toggleShowSignUp}
          signUpComplete={signUpComplete}
          handleSignupComplete={handleSignupComplete}
          revertSignUp={revertSignUp}
          handleCloseByEsc={handleCloseByEsc}
          handleTarget={handleCloseByTarget}
          handleSubmit={handleSignIn}
          handleLogin={handleLogged}
          handleAuth={handleLogin}
          handleModal={handleModalLogin}
        />
        {isMenuOpen && (
          <Menu
            handleLogin={handleModalLogin}
            isLoggedIn={isLoggedin}
            toggleTheme={toggleTheme}
            setLogin={handleLogin}
            theme={theme}
          />
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
