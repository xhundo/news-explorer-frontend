import { useEffect, useState } from 'react';

import './NewsCard.css';

function NewsCard({ isLoggedIn, card, savedCard }) {
  const currentDate = new Date(card?.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const [hasSaved, setHasSaved] = useState(false);

  let currentSaved = JSON.parse(localStorage.getItem('cards'));

  useEffect(() => {
    if (
      currentSaved?.recentCards?.some(
        (savedCard) => savedCard?.title === card?.title,
      )
    ) {
      setHasSaved(true);
    } else {
      setHasSaved(false);
    }
  }, [isLoggedIn, savedCard]);

  const toggleSaved = () => {
    if (hasSaved === true) {
      setHasSaved(false);
    } else if (hasSaved === false) {
      handleSaveCard();
    }
  };

  const handleSaveCard = () => {
    setHasSaved(true);
  };

  const itemSave =
    hasSaved && isLoggedIn ? `newscard__btn-saved` : `newscard__save-btn`;

  return (
    <div className="newscard">
      <img className="newscard__img" src={card?.urlToImage} alt={card?.title} />
      <p className="newscard__date">{currentDate}</p>
      <div className="newscard__content">
        <h2 className="newscard__title">{card?.title}</h2>
        <article className="newscard__paragraph">{card?.description}</article>
        <p className="newscard__topic">{card?.source?.name}</p>
        <button
          onClick={toggleSaved}
          disabled={!isLoggedIn}
          className={itemSave}
        ></button>
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
