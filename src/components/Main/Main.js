import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import NotFound from '../NotFound/NotFound';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import './Main.css';
import Error from '../Error/Error';

function Main({
  isLoggedIn,
  isLoading,
  getSearch,
  cards,
  searchComplete,
  showCards,
  toggleShowCards,
  recentSearch,
  showInputError,
  showError,
  isSaved,
  savedCard,
  addCard,
}) {
  return (
    <main className="main">
      <SearchForm showInputError={showInputError} getSearch={getSearch} />
      {cards.length === 0 && <NotFound />}
      {isLoading && cards.length !== 0 && !showInputError ? <Preloader /> : ``}
      {recentSearch && cards.length !== 0 ? (
        <NewsCardList
          savedCard={savedCard}
          isLoggedIn={isLoggedIn}
          cards={cards}
          showCards={showCards}
          toggleShowCards={toggleShowCards}
          isSaved={isSaved}
          addCard={addCard}
        />
      ) : (
        ``
      )}
      {searchComplete && cards.length !== 0 ? (
        <NewsCardList
          isLoggedIn={isLoggedIn}
          cards={cards}
          savedCard={savedCard}
          showCards={showCards}
          toggleShowCards={toggleShowCards}
          isSaved={isSaved}
          addCard={addCard}
        />
      ) : (
        ``
      )}
      {showError && <Error />}
      <About />
    </main>
  );
}

export default Main;
