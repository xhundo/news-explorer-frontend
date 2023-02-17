import { useEffect, useState } from 'react';

import './NewsCard.css';

function NewsCard({ isLoggedIn, card, savedCard }) {
  const currentDate = new Date(card?.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const [marked, setMarked] = useState(false);

  let currentSaved = JSON.parse(localStorage.getItem('cards'));

  useEffect(() => {
    if (
      currentSaved?.recentCards?.some(
        (savedCard) => savedCard?.title === card?.title,
      )
    ) {
      setMarked(true);
    } else {
      setMarked(false);
    }
  }, [isLoggedIn, savedCard]);

  const toggleMarked = () => {
    if (marked === true) {
      setMarked(false);
    } else if (marked === false) {
      setMarked(true);
    }
  };

  const itemSave =
    marked && isLoggedIn ? `newscard__btn-saved` : `newscard__save-btn`;

  return (
    <div className="newscard">
      <img className="newscard__img" src={card?.urlToImage} alt={card?.title} />
      <p className="newscard__date">{currentDate}</p>
      <div className="newscard__content">
        <h2 className="newscard__title">{card?.title}</h2>
        <article className="newscard__paragraph">{card?.description}</article>
        <p className="newscard__topic">{card?.source?.name}</p>
        {card.hasOwnProperty('_id') ? (
          <>
            <button className="newscard__trash-btn"></button>
            <div className="newscard__topic-remove">
              <p className="newscard__remove-text">Removed from saved</p>
            </div>
            <div className="newscard__topic-mark">
              <p className="newscard__topic-text">{card?.keyword}</p>
            </div>
          </>
        ) : (
          <button
            onClick={toggleMarked}
            disabled={!isLoggedIn}
            className={itemSave}
          ></button>
        )}
        {isLoggedIn ? (
          ``
        ) : (
          <button className="newscard__btn">Sign in to save articles</button>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
