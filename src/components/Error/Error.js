import './Error.css';

function Error() {
  return (
    <section className="error">
      <p className="error__text">
        Sorry, something went wrong during the request. There maybe a connection
        issue or the server may be down. Please try again later
      </p>
    </section>
  );
}

export default Error;
