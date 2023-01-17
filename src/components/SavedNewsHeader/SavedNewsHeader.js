import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

function SavedNewsHeader({ cards }) {
  const currentUser = useContext(CurrentUserContext);

  const keywords = `${
    cards[0]?.keyword[0].charAt(0).toUpperCase() + cards[0]?.keyword.slice(1)
  }, ${
    cards[1]?.keyword.charAt(0).toUpperCase() + cards[1]?.keyword.slice(1)
  }, ${cards[2]?.keyword.charAt(0).toUpperCase() + cards[2]?.keyword.slice(1)}`;

  const oneKeyword = `${
    cards[0]?.keyword.charAt(0).toUpperCase() + cards[0]?.keyword.slice(1)
  }`;
  const twoKeyWords = `${
    cards[0]?.keyword.charAt(0).toUpperCase() + cards[0]?.keyword.slice(1)
  }, ${cards[1]?.keyword.charAt(0).toUpperCase() + cards[1]?.keyword.slice(1)}`;
  const keywordsAndOther = `${
    cards[0]?.keyword.charAt(0).toUpperCase() + cards[0]?.keyword.slice(1)
  }, ${
    cards[1]?.keyword.charAt(0).toUpperCase() + cards[1]?.keyword.slice(1)
  }, and ${cards.length - 3} other...`;

  return (
    <header className="saved-news__header">
      <p className="saved-news__tab-title">Saved articles</p>
      <h2 className="saved-news__title">{`${currentUser?.name}, you have ${cards.length} saved articles`}</h2>
      <div className="saved-news__key">
        <p className="saved-keywords__title">
          By keywords:
          <span className="saved-news__keywords">
            {cards.length > 3
              ? keywordsAndOther
              : cards.length === 3
              ? keywords
              : cards.length === 2
              ? twoKeyWords
              : cards.length === 1 && oneKeyword}
          </span>
        </p>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
