import './NotFound.css';
import notfoundicon from '../../images/ill/not-found_v1.svg';

function NotFound() {
  return (
    <div className="notfound">
      <img className="notfound__icon" src={notfoundicon} alt="Not found icon" />
      <p className="notfound__title">Nothing found</p>
      <p className="notfound__text">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NotFound;
