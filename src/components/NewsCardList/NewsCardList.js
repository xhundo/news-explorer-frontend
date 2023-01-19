import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  isLoggedIn,
  cards,
  toggleShowCards,
  showCards,
  isSaved,
  addCard,
  savedCard,
}) {
  const newCards = cards.slice(0, 3);
  const moreCards = cards.slice(0, 6);

  return (
    <section className="newscardlist">
      <h2 className="newscardlist__title">Search results</h2>
      <ul className="newscardlist-content">
        {showCards
          ? moreCards.map((card) => (
              <NewsCard
                savedCard={savedCard}
                isSaved={isSaved}
                key={card?.content}
                card={card}
                isLoggedIn={isLoggedIn}
                addCard={addCard}
              />
            ))
          : newCards.map((card) => (
              <NewsCard
                savedCard={savedCard}
                isSaved={isSaved}
                key={card?.content}
                card={card}
                isLoggedIn={isLoggedIn}
                addCard={addCard}
              />
            ))}
      </ul>
      <div className="newscardlist__btn-contents">
        {showCards ? (
          ``
        ) : (
          <button onClick={toggleShowCards} className="newscardlist__btn">
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
