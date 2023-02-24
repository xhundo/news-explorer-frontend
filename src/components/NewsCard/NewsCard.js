import { useEffect, useState } from 'react';

import './NewsCard.css';

function NewsCard({ isLoggedIn, card, addCard, savedCard, deleteCard }) {
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
      handleDeleteCard(card);
    } else if (marked === false) {
      handleSaveCard(
        card?.keyword,
        card?.title,
        card?.description,
        currentDate,
        card?.source?.name,
        card?.url,
        card?.urlToImage,
      );
    }
  };

  const handleSaveCard = (keyword, title, text, date, source, link, image) => {
    setMarked(true);
    addCard(keyword, title, text, date, source, link, image);
  };

  const handleDeleteCard = (card) => {
    currentSaved?.recentCards?.forEach((c) => {
      if (card.title === c.title) {
        card._id = c._id;
        deleteCard(card._id);
      }
    });
  };

  const itemSave =
    marked && isLoggedIn ? `newscard__btn-saved` : `newscard__save-btn`;

  return (
    <div className="newscard">
      <img
        className="newscard__img"
        src={card.hasOwnProperty('owner') ? card?.image : card?.urlToImage}
        alt={card?.title}
      />
      <p className="newscard__date">
        {card.hasOwnProperty('owner') ? card?.date : currentDate}
      </p>
      <div className="newscard__content">
        <h2 className="newscard__title">{card?.title}</h2>
        <article className="newscard__paragraph">
          {card.hasOwnProperty('owner') ? card?.text : card?.description}
        </article>
        <p className="newscard__topic">
          {card.hasOwnProperty('owner') ? card?.source : card?.source?.name}
        </p>
        {card.hasOwnProperty('_id') && card.hasOwnProperty('owner') ? (
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
