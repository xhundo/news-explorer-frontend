import './SavedNewsHeader.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext } from 'react';

function SavedNewsHeader() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="saved-news__header">
      <p className="saved-news__tab-title">Saved articles</p>
      <h2 className="saved-news__title">{`${currentUser.name}, you have 5 saved articles`}</h2>
      <div className="saved-news__key">
        <p className="keywords__title">By keywords:</p>
        <p className="saved-news__keywords">Nature, Yellowstone, and 2 other</p>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
