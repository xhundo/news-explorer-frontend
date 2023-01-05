import '../App/App.css';
import '../../vendor/fonts/fonts.css';
import React, { useEffect, useMemo } from 'react';
import Header from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import SignInModal from '../SignInModal/SignInModal';
import SavedNews from '../SavedNews/SavedNews';
import { searchNews } from '../../utils/ThirdPartyApi';

function App() {
  const [user, setUser] = React.useState({
    name: 'Elise',
  });
  const [isLoggedin, setIsLoggedIn] = React.useState(false);
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

  const handleLogin = () => {
    setIsLoggedIn(false);
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
        />
        <Switch>
          <Route path="/saved-news">
            <SavedNews theme={theme} changeTheme={switchTheme} />
          </Route>
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
        <SignInModal
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
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
