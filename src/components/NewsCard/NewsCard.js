import './NewsCard.css';

function NewsCard({ isLoggedIn, card, handleSaved, isSaved, addCard }) {
  const currentDate = new Date(card?.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });

  const createSaveCard = () => {
    handleSaveCard(
      card?.keyword,
      card?.title,
      card?.description,
      currentDate,
      card?.source?.name,
      card?.url,
      card?.urlToImage,
    );
  };

  const handleSaveCard = (keyword, title, text, date, source, link, image) => {
    addCard(keyword, title, text, date, source, link, image);
  };

  const savedCard =
    isSaved && isLoggedIn === true
      ? `newscard__btn-saved`
      : `newscard__save-btn`;

  return (
    <div className="newscard">
      <img className="newscard__img" src={card?.urlToImage} />
      <div className="newscard__content">
        <p className="newscard__date">{currentDate}</p>
        <h2 className="newscard__title">{card?.title}</h2>
        <article className="newscard__paragraph">{card?.description}</article>
        <p className="newscard__topic">{card?.source?.name}</p>
        <button
          onClick={createSaveCard}
          disabled={!isLoggedIn}
          className={savedCard}
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
