import { useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

function SavedNews({ theme, changeTheme, cards, deleteCard }) {
  useEffect(() => {
    // eslint-disable-next-line
    changeTheme(true);
  }, [theme, changeTheme]);

  return (
    <section className="savednews">
      <SavedNewsHeader cards={cards} />
      <ul className="saved-news__content">
        {cards.map((card) => (
          <li className="saved-news__list" key={card?._id}>
            <NewsCard card={card} deleteCard={deleteCard} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SavedNews;
