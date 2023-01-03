import './SavedCard.css';
import cardimg from '../../images/card/card/image_08.jpg';

function SavedCard() {
  return (
    <div className="savedcard">
      <img className="savedcard-img" src={cardimg} />
      <div className="savedcard__content">
        <p className="savedcard__date">November 4, 2020</p>
        <h2 className="savedcard__title">
          Everyone Needs a Special 'Sit Spot' in Nature
        </h2>
        <article className="savedcard__paragraph">
          Ever since I read Richard Louv's influential book, "Last Child in the
          Woods," the idea of having a special "sit spot" has stuck with me.
          This advice, which Louv attributes to nature educator Jon Young, is
          for both adults and children to find...
        </article>
        <p className="savedcard__topic">treehugger</p>
        <button className="savedcard__trash-btn"></button>
        <div className="savedcard__topic-remove">
          <p className="savedcard__remove-text">Removed from saved</p>
        </div>
      </div>
      <div className="savedcard__topic-mark">
        <p className="savedcard__topic-text">Nature</p>
      </div>
    </div>
  );
}

export default SavedCard;
