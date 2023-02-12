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
  option,
  isValid,
  reverse,
  text,
  nextModal,
}) {
  return (
    <div
      className={`modal modal__${name} ${isOpen && `modal_open`}`}
      onClick={closeByTarget}
    >
      <div className={`modal__content`}>
        <form onSubmit={handleSubmit} className="modal__form" noValidate>
          <h2 className={`modal__title`}>{title}</h2>
          {children}
          {signUpComplete ? (
            <button className={option} onClick={reverse}>
              {text}
            </button>
          ) : (
            <button type="submit" className={selector}>
              {buttonTxt}
            </button>
          )}
          <button onClick={close} className="modal__close-btn"></button>
          {signUpComplete ? (
            ``
          ) : (
            <div className={`modal__options`}>
              <p className="modal__options-text">or</p>
              <button
                type="button"
                onClick={(e) => nextModal(e)}
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
