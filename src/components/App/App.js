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
import Register from '../Register/Register';
import RegisterSuccess from '../SignUpComplete/RegisterSuccess';

function App() {
  const [user, setUser] = React.useState({
    name: 'Elise',
    _id: '',
  });
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const [theme, changeTheme] = React.useState(false);
  const [signInOpen, setSignInOpen] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [signUpComplete, setSignUpComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);
  const [card, setCard] = React.useState([{}]);
  const [recentSearch, setRecentSearch] = React.useState(false);
  const [showCards, setShowCards] = React.useState(false);
  const [showInputError, setShowInputError] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [isIconActive, setIsIconActive] = React.useState(false);
  const [isSignUpOpen, setSignUpOpen] = React.useState(false);

  useEffect(() => {
    signInOpen || isSignUpOpen
      ? document.addEventListener('keydown', handleCloseByEsc)
      : document.removeEventListener('keydown', handleCloseByEsc);
  });

  const openRegisterModal = (e) => {
    e.preventDefault();
    setSignInOpen(false);
    setSignUpOpen(true);
  };

  const switchModal = (e) => {
    e.preventDefault();
    setSignUpOpen(false);
    setSignInOpen(true);
  };

  const getSearch = (search) => {
    setShowInputError(false);
    setIsLoading(true);
    setRecentSearch(false);
    setShowCards(false);
    searchNews(search)
      .then((data) => {
        setIsLoading(false);
        const searchedCard = data?.articles;
        setCard(searchedCard);
        setRecentSearch(true);
        localStorage.setItem('articles', JSON.stringify(searchedCard));
      })
      .catch((e) => {
        if (e.message === 'Search not found') {
          setShowInputError(true);
          setIsLoading(false);
          setRecentSearch(false);
        } else if (e.message === 'An error has occurred on the server') {
          console.log(e);
          setShowInputError(false);
          setIsLoading(false);
          setShowError(true);
        }
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleLogged = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    handleClose(e);
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
    setSignUpOpen(false);
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
    setSignUpOpen(false);
    setSignUpComplete(true);
  };

  const handleComplete = () => {
    setSignUpComplete(false);
  };

  const revertSignUp = (e) => {
    e.preventDefault();
    setShowSignUp(false);
    setSignUpComplete(false);
  };

  const handleCloseByEsc = (e) => {
    if (e.key === 'Escape') {
      setSignInOpen(false);
      setSignUpOpen(false);
    }
  };

  const handleCloseByTarget = (e) => {
    if (e.target === e.currentTarget) {
      setSignInOpen(false);
      setSignUpOpen(false);
      setSignUpComplete(false);
    }
  };

  const toggleOpen = () => {
    setSignUpOpen(true);
  };

  const toggleSignInComplete = (e) => {
    e.preventDefault();
    setSignUpComplete(false);
    setSignInOpen(true);
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
          isSignUpOpen={isSignUpOpen}
        />

        <Switch>
          <ProtectedRoute path="/saved-news" isLoggedIn={isLoggedin}>
            <SavedNews theme={theme} changeTheme={switchTheme} />
          </ProtectedRoute>
          <Route path="/">
            <Main
              isLoggedIn={isLoggedin}
              isLoading={isLoading}
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
          handleLogged={handleLogged}
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
          handleLogin={handleLogged}
          handleAuth={handleLogin}
          handleModal={handleModalLogin}
          handleRegister={openRegisterModal}
        />
        <Register
          modalOpen={isSignUpOpen}
          close={handleClose}
          handleCloseByTarget={handleCloseByTarget}
          handleComplete={handleSignupComplete}
          modalSwitch={switchModal}
          handleSignComplete={handleComplete}
          toggleOpen={toggleOpen}
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
        <RegisterSuccess
          completeOpen={signUpComplete}
          close={handleClose}
          closeByTarget={handleCloseByTarget}
          toggleBtn={toggleSignInComplete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
