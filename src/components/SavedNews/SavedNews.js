import { useContext, useEffect } from 'react';
import SavedCard from '../SavedCard/SavedCard';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews({ theme, changeTheme, cards, deleteCard }) {
  useEffect(() => {
    changeTheme();
  }, [theme]);

  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="savednews">
      <SavedNewsHeader cards={cards} />
      <ul className="saved-news__content">
        {cards.map((card) => (
          <li className="saved-news__list" key={card?._id}>
            {card.owner !== currentUser._id ? (
              ``
            ) : (
              <SavedCard card={card} deleteCard={deleteCard} />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SavedNews;
