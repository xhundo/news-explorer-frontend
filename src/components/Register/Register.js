import ModalWithForm from '../ModalWithForm/ModalWithForm';
import { useFormValidator } from '../FormValidator/FormValidator';
import './Register.css';
import { useEffect } from 'react';

function Register({
  modalOpen,
  close,
  handleCloseByTarget,
  handleCreateUser,
  modalSwitch,
  handleSignComplete,
  apiError,
  resetApiError,
}) {
  const {
    email,
    password,
    username,
    handleChange,
    handlePasswordChange,
    handleUsernameChange,
    errors,
    resetForm,
    isValid,
  } = useFormValidator();

  useEffect(() => {
    resetApiError();
    resetForm('', false);
    // eslint-disable-next-line
  }, [modalOpen]);

  const handleUserSignUp = (e) => {
    e.preventDefault();
    handleCreateUser(email, password, username)
      .then(() => {
        resetForm('', false);
      })
      .catch((e) => {
        console.log(e);
        handleSignComplete();
      });
  };

  return (
    <ModalWithForm
      isOpen={modalOpen}
      name="register"
      buttonTxt={`Sign up`}
      selector={`register__button`}
      title={`Sign up`}
      showSignUp={modalOpen}
      close={close}
      handleSubmit={handleUserSignUp}
      closeByTarget={handleCloseByTarget}
      isValid={isValid}
      nextModal={modalSwitch}
    >
      <label className="register__email-label">Email</label>
      <div className="register__content">
        <input
          type="email"
          value={email}
          minLength="2"
          maxLength="30"
          placeholder="Enter email"
          className="register__input-email"
          required
          onChange={handleChange}
        />
        <span className="register__input-error">{errors?.email}</span>
      </div>
      <label className="register__password-label">Password</label>
      <div className="register__content-password">
        <input
          required
          value={password}
          type="password"
          className="register__input-password"
          placeholder="Enter password"
          onChange={handlePasswordChange}
        />
        <span className="register__input-error">{errors?.password}</span>
      </div>
      <label className="register__label-username">Username</label>
      <div className="register__content-username">
        <input
          required
          value={username}
          type="text"
          placeholder="Enter your username"
          className="register__input-username"
          minLength="2"
          maxLength="30"
          onChange={handleUsernameChange}
        />
        <span className="register__input-error">{errors?.username}</span>
      </div>
      <div className="register__error-container">
        {apiError && (
          <span className="register__error">This email is not available</span>
        )}
      </div>
    </ModalWithForm>
  );
}

export default Register;
