import { useContext, useEffect } from 'react';
import SavedCard from '../SavedCard/SavedCard';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { savedCards } from '../../utils/constants';

function SavedNews({ theme, changeTheme, cards, deleteCard }) {
  useEffect(() => {
    // eslint-disable-next-line
    changeTheme(true);
  }, [theme, changeTheme]);

  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="savednews">
      <SavedNewsHeader cards={cards} />
      <ul className="saved-news__content">
        {savedCards.map((card) => (
          <li className="saved-news__list" key={card?._id}>
            <NewsCard card={card} deleteCard={deleteCard} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SavedNews;
