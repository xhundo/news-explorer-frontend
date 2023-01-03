import { useEffect } from 'react';
import SavedCard from '../SavedCard/SavedCard';

import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import './SavedNews.css';

function SavedNews({ theme, changeTheme }) {
  useEffect(() => {
    changeTheme();
  }, [theme]);

  return (
    <section className="savednews">
      <SavedNewsHeader />
      <div className="saved-news__content">
        <SavedCard />
        <SavedCard />
        <SavedCard />
        <SavedCard />
        <SavedCard />
      </div>
    </section>
  );
}

export default SavedNews;
