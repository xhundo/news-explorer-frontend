import './SavedCard.css';

function SavedCard({ card }) {
  return (
    <div className="savedcard">
      <img className="savedcard-img" src={card?.image} />
      <div className="savedcard__content">
        <p className="savedcard__date">{card?.date}</p>
        <h2 className="savedcard__title">{card?.title}</h2>
        <p className="savedcard__paragraph">{card?.text}</p>
        <p className="savedcard__topic">{card?.source}</p>
        <button className="savedcard__trash-btn"></button>
        <div className="savedcard__topic-remove">
          <p className="savedcard__remove-text">Removed from saved</p>
        </div>
      </div>
      <div className="savedcard__topic-mark">
        <p className="savedcard__topic-text">{card?.keyword}</p>
      </div>
    </div>
  );
}

export default SavedCard;
