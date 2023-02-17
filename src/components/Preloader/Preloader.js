import './Preloader.css';

function Preloader() {
  return (
    <div className="preloader">
      <i className="circle-preloader" />
      <p className="preloader__text">Searching for news...</p>
    </div>
  );
}

export default Preloader;
