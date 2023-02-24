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
import Register from '../Register/Register';
import RegisterSuccess from '../SignUpComplete/RegisterSuccess';

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
  const [card, setCard] = React.useState([{}]);
  const [recentSearch, setRecentSearch] = React.useState(false);
  const [showCards, setShowCards] = React.useState(false);
  const [showInputError, setShowInputError] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [isIconActive, setIsIconActive] = React.useState(false);
  const [isSignUpOpen, setSignUpOpen] = React.useState(false);
  const [showApiError, setShowApiError] = React.useState(false);
  const [savedCard, setSavedCard] = React.useState([]);
  const apiFetch = new Api({
    baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    signInOpen || isSignUpOpen
      ? document.addEventListener('keydown', handleCloseByEsc)
      : document.removeEventListener('keydown', handleCloseByEsc);
  });

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
    // eslint-disable-next-line
  }, [isLoggedin]);

  useEffect(() => {
    if (localStorage.getItem('articles')) {
      let data = JSON.parse(localStorage.getItem('articles'));
      setCard(data);
      setShowError(false);
      if (localStorage.getItem('token')) {
        setRecentSearch(true);
      }
    }
  }, [isLoggedin, user]);

  useEffect(() => {
    isLoggedin &&
      apiFetch
        .getArticles()
        .then((data) => {
          let articles = data[0]?.articles;
          const ownerArticle = articles.filter((c) => user._id === c?.owner);
          let recentCards = ownerArticle;
          if (isLoggedin === true) {
            localStorage.setItem('cards', JSON.stringify({ recentCards }));
            setSavedCard(ownerArticle);
          } else {
            localStorage.removeItem('cards');
          }
        })
        .catch((e) => {
          console.log(e);
        });
    // eslint-disable-next-line
  }, [isLoggedin, user]);

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

  const handleUserSignUp = async (email, password, username) => {
    setShowApiError(false);
    apiFetch
      .createUser(email, password, username)
      .then(() => {
        setSignUpOpen(false);
        setSignUpComplete(true);
      })
      .catch((e) => {
        console.log(e);
        e.message === `Error: 409` && setShowApiError(true);
        setSignUpOpen(true);
        setSignUpComplete(false);
      });
  };

  const saveCard = (keyword, title, text, date, source, link, image) => {
    apiFetch
      .createArticle(keyword, title, text, date, source, link, image)
      .then((res) => {
        const card = res[0]?.data;
        card.saved = true;
        const recentCards = [];
        recentCards.push(...savedCard, card);
        localStorage.setItem(
          'cards',
          JSON.stringify({
            recentCards,
          }),
        );
        setSavedCard([...savedCard, card]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeCard = (id) => {
    apiFetch
      .deleteArticle(id)
      .then((data) => {
        const deletedCard = data[0]?.data;
        const recentSave = JSON.parse(localStorage.getItem('cards'));
        const recentCards = recentSave.recentCards.filter(
          (card) => card._id !== deletedCard._id,
        );
        localStorage.setItem('cards', JSON.stringify({ recentCards }));
        setSavedCard((c) => c.filter((c) => c._id !== deletedCard._id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getSearch = (search) => {
    setShowInputError(false);
    setIsLoading(true);
    setRecentSearch(false);
    setShowCards(false);
    searchNews(search)
      .then((data) => {
        setIsLoading(false);
        // setSearchComplete(true);
        const searchedCard = data?.articles;
        addKeyword(searchedCard, search);
        setCard(searchedCard);
        if (searchedCard.length === 0) {
          setRecentSearch(false);
        } else {
          setRecentSearch(true);
        }
        localStorage.setItem('articles', JSON.stringify(searchedCard));
      })
      .catch((e) => {
        if (e.message === 'Search not found') {
          setShowInputError(true);
          setIsLoading(false);
          setRecentSearch(false);
          setSearchComplete(false);
        } else if (e.message === 'An error has occurred on the server') {
          console.log(e);
          setShowInputError(false);
          setIsLoading(false);
          setShowError(true);
        }
      });
  };

  const addKeyword = (newCards, keyword) => {
    newCards.forEach((card) => (card.keyword = keyword));
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

  const handleSignupComplete = () => {
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

  const toggleApiError = () => {
    setShowApiError(false);
  };

  const toggleOpen = () => {
    setSignUpOpen(true);
  };

  const toggleSignInComplete = () => {
    setSignUpComplete(false);
    setSignInOpen(true);
  };

  return (
    <CurrentUserContext.Provider value={user}>
      <div className="app">
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
            <SavedNews
              theme={theme}
              changeTheme={switchTheme}
              cards={savedCard}
              deleteCard={removeCard}
            />
          </ProtectedRoute>
          <Route path="/">
            <Main
              isLoggedIn={isLoggedin}
              isLoading={isLoading}
              searchComplete={searchComplete}
              getSearch={getSearch}
              savedCard={savedCard}
              cards={card}
              addCard={saveCard}
              recentSearch={recentSearch}
              toggleShowCards={handleShowCards}
              showCards={showCards}
              showInputError={showInputError}
              showError={showError}
              handleSaved={handleSaved}
              isSaved={isSaved}
              removeCard={removeCard}
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
          handleRegister={openRegisterModal}
        />
        <Register
          modalOpen={isSignUpOpen}
          close={handleClose}
          handleCloseByTarget={handleCloseByTarget}
          handleCreateUser={handleUserSignUp}
          handleComplete={handleSignupComplete}
          modalSwitch={switchModal}
          handleSignComplete={handleComplete}
          toggleOpen={toggleOpen}
          apiError={showApiError}
          resetApiError={toggleApiError}
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
