import './SavedCard.css';
import cardimg from '../../images/card/card/image_08.jpg';

function SavedCard({ card, deleteCard }) {
  const handleCardDelete = (e) => {
    e.preventDefault();
    deleteCard(card?._id);
  };

  return (
    <div className="savedcard">
      <img className="savedcard-img" src={card?.image} />
      <div className="savedcard__content">
        <p className="savedcard__date">{card?.date}</p>
        <h2 className="savedcard__title">{card?.title}</h2>
        <article className="savedcard__paragraph">{card?.text}</article>
        <p className="savedcard__topic">{card?.source}</p>
        <button
          className="savedcard__trash-btn"
          onClick={handleCardDelete}
        ></button>
        <div className="savedcard__topic-remove">
          <p className="savedcard__remove-text">Removed from saved</p>
        </div>
      </div>
      <div className="savedcard__topic-mark">
        <p className="savedcard__topic-text">
          {card?.keyword[0].charAt(0).toUpperCase() + card?.keyword.slice(1)}
        </p>
      </div>
    </div>
  );
}

export default SavedCard;
