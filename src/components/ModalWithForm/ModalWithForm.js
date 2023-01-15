import './ModalWithForm.css';

function ModalWithForm({
  children,
  selector,
  buttonTxt,
  isOpen,
  close,
  disabled,
  closeByTarget,
  name,
  title,
  handleOptions,
  showSignUp,
  revertOptions,
  signUpComplete,
  handleSignUpComplete,
  handleSubmit,
  revertSignUp,
  isValid,
}) {
  return (
    <div
      className={`modal modal__${name} ${isOpen && `modal_open`}`}
      onClick={closeByTarget}
    >
      <div
        className={
          signUpComplete
            ? `modal__content-complete`
            : showSignUp
            ? `modal__content-signup`
            : `modal__content`
        }
      >
        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          <h2
            className={
              signUpComplete ? `modal__title-complete` : `modal__title`
            }
          >
            {title}
          </h2>
          {children}
          {signUpComplete ? (
            ``
          ) : (
            <button disabled={!isValid} type="submit" className={selector}>
              {buttonTxt}
            </button>
          )}
          <button
            onClick={(e) => close(e)}
            className="modal__close-btn"
          ></button>
          {signUpComplete ? (
            <button
              onClick={(e) => revertSignUp(e)}
              className="modal__complete-btn"
            >
              Sign in
            </button>
          ) : (
            <div className="modal__options">
              <p className="modal__options-text">or</p>
              <button
                onClick={
                  showSignUp === false
                    ? (e) => handleOptions(e)
                    : (e) => revertOptions(e)
                }
                className="modal__options-btn"
              >
                {showSignUp ? `Sign in` : `Sign up`}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
